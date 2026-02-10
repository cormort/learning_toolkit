// 全域變數
const ls = window.localStorage;

// ===== 工具函數：安全與 UI =====
function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span>${escapeHtml(message)}</span>
        </div>
    `;
    container.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 覆寫預設 alert 為 Toast (非同步，不阻塞)
window.alert = (msg) => showToast(msg, 'info');

let knowledgeList = JSON.parse(ls.getItem('knowledgeList') || '[]');
let planner = JSON.parse(ls.getItem('studyPlanner') || '{"mon":[], "tue":[], "wed":[], "thu":[], "fri":[], "sat":[], "sun":[]}');
let notesStorage = JSON.parse(ls.getItem('notesStorage') || '[]');
let flashcards = JSON.parse(ls.getItem('flashcards') || '[]');
let pomodoroStats = JSON.parse(ls.getItem('pomodoroStats') || '{"total": 0, "studyMinutes": 0, "breakMinutes": 0, "today": 0, "todayStudy": 0, "lastDate": ""}');
let currentFilter = 'all';
let timerInterval = null;
let timerState = {
    mode: 'focus',
    timeLeft: 25 * 60,
    isRunning: false,
    pomodoroCount: 0
};

// ===== 核心：當 DOM 載入完成後執行所有初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    // --- 側邊欄與響應式佈局控制 ---
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (ls.getItem('sidebarCollapsed') === 'true') {
        document.body.classList.add('sidebar-collapsed');
    }
    sidebarToggle.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-collapsed');
        ls.setItem('sidebarCollapsed', document.body.classList.contains('sidebar-collapsed'));
    });
    mobileMenuBtn.addEventListener('click', () => {
        document.body.classList.add('mobile-menu-open');
        sidebarOverlay.classList.remove('hidden');
    });
    const closeMobileMenu = () => {
        document.body.classList.remove('mobile-menu-open');
        sidebarOverlay.classList.add('hidden');
    };
    sidebarOverlay.addEventListener('click', closeMobileMenu);
    
    // --- Tab 切換邏輯 ---
    const tabs = {
        guide: 'tab-content-guide',
        triage: 'tab-content-triage',
        planner: 'tab-content-planner',
        notes: 'tab-content-notes',
        voice: 'tab-content-voice',
        flashcards: 'tab-content-flashcards',
        pomodoro: 'tab-content-pomodoro',
        stats: 'tab-content-stats',
        manager: 'tab-content-manager',
        pdf: 'tab-content-pdf' // **修正點：已加入 PDF 分頁**
    };

    window.setActiveTab = function(activeName) {
        try {
            console.log('Switching tab to:', activeName); // Debug log
            Object.keys(tabs).forEach(key => {
                const btn = document.getElementById(`tab-btn-${key}`);
                const content = document.getElementById(tabs[key]);
                const isActive = key === activeName;
                
                if (btn) btn.classList.toggle('active', isActive);
                if (content) {
                    content.classList.toggle('active', isActive);
                    // Force display style to flex-column to ensure vertical stacking and height filling
                    if (isActive) {
                        content.style.display = 'flex';
                        content.style.flexDirection = 'column';
                    } else {
                        content.style.display = 'none';
                    }
                }
            });
            
            if (activeName === 'stats') updateStats();
            if (activeName === 'manager') renderNotesManager();
            if (activeName !== 'voice' && window.voiceNoteModule && typeof window.voiceNoteModule.isRecognizing === 'function' && window.voiceNoteModule.isRecognizing()) {
                window.voiceNoteModule.stopRecognition();
            }
            if (window.innerWidth < 768) {
                closeMobileMenu();
            }
        } catch (err) {
            console.error('Error switching tab:', err);
            showToast('切換分頁時發生錯誤', 'error');
        }
    }

    Object.keys(tabs).forEach(key => {
        const btn = document.getElementById(`tab-btn-${key}`);
        if (btn) {
            btn.addEventListener('click', () => setActiveTab(key));
        }
    });

    // --- 各模組初始化 ---
    renderKnowledgeList();
    renderPlanner();
    renderFlashcardList();
    updatePomodoroDisplay();
    if (window.voiceNoteModule) {
        window.voiceNoteModule.init();
    }
    checkPomodoroDate();
    
    // --- PDF 閱讀器整合功能 ---
    const pdfUploadInput = document.getElementById('pdf-upload-input');
    const notesTextarea = document.getElementById('pdf-notes-textarea');
    let pdfViewerIframe = null; 
    // ========== START: 選取新按鈕 ==========
    const copyPdfNoteBtn = document.getElementById('copy-pdf-note-btn');
    const sendToNotesBtn = document.getElementById('send-to-notes-btn');
    const clearPdfNoteBtn = document.getElementById('clear-pdf-note-btn');
    // ========== END: 選取新按鈕 ==========
    if (pdfUploadInput && notesTextarea) {
        pdfUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file || file.type !== 'application/pdf') {
                showToast('請選擇一個有效的 PDF 檔案！', 'error');
                return;
            }
            pdfViewerIframe = document.getElementById('pdf-viewer-iframe');
            if (!pdfViewerIframe || !pdfViewerIframe.contentWindow) {
                showToast('PDF 閱讀器元件尚未準備好，請稍後再試。', 'error');
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                const pdfData = e.target.result;
                console.log('正在傳送 PDF 資料到 iframe...');
                pdfViewerIframe.contentWindow.postMessage({
                    type: 'LOAD_PDF',
                    data: pdfData
                }, 'https://cormort.github.io');
            };
            reader.readAsArrayBuffer(file);
        });

        window.addEventListener('message', (event) => {
            if (event.origin !== 'https://cormort.github.io') {
                return;
            }
            const message = event.data;
            if (message && message.type === 'TEXT_SELECTED' && message.data) {
                const currentNotes = notesTextarea.value;
                const timestamp = new Date().toLocaleString('zh-TW', { hour12: false });
                notesTextarea.value = `${currentNotes}\n--- [${timestamp}] ---\n${message.data.trim()}\n`;
                notesTextarea.scrollTop = notesTextarea.scrollHeight;
            }
        });
            // ========== START: 為新按鈕綁定事件 ==========
            if (copyPdfNoteBtn) {
                copyPdfNoteBtn.addEventListener('click', () => {
                    const content = notesTextarea.value;
                    if (content.trim()) {
                        navigator.clipboard.writeText(content).then(() => {
                            showToast('📋 筆記內容已複製到剪貼簿！', 'success');
                        }).catch(err => {
                            console.error('複製失敗:', err);
                            showToast('複製失敗，請重試。', 'error');
                        });
                    } else {
                        showToast('筆記區沒有內容可以複製。', 'warning');
                    }
                });
            }
    
            if (sendToNotesBtn) {
                sendToNotesBtn.addEventListener('click', () => {
                    const content = notesTextarea.value.trim();
                    if (content) {
                        // 使用您現有的筆記儲存邏輯
                        const title = `PDF 筆記 - ${new Date().toLocaleString('zh-TW')}`;
                        const meta = {
                            id: getTimestampID(),
                            title: title,
                            tags: ['pdf', '摘錄'],
                            template: 'default',
                            date: new Date().toISOString()
                        };
                        addNoteToStorage(meta, content);
                        showToast('✅ 筆記已成功儲存到「資料管理」！', 'success');
                        
                        // 提示使用者可以清空
                        if(confirm("筆記已儲存，要清空目前的筆記區嗎？")) {
                            notesTextarea.value = '';
                        }
                    } else {
                        showToast('筆記區沒有內容可以儲存。', 'warning');
                    }
                });
            }
    
            if (clearPdfNoteBtn) {
                clearPdfNoteBtn.addEventListener('click', () => {
                    const content = notesTextarea.value;
                    if (content.trim()) {
                        if (confirm('確定要清除筆記區的所有內容嗎？')) {
                            notesTextarea.value = '';
                        }
                    } else {
                        showToast('筆記區已經是空的了。', 'info');
                    }
                });
            }
            // ========== END: 為新按鈕綁定事件 ==========
    }

    // --- 預設顯示第一個分頁 ---
    setActiveTab('guide');
});

// ===== 知識盤點 =====
function renderKnowledgeList() {
    const container = document.getElementById('knowledgeListContainer');
    if (!container) return;
    container.innerHTML = '';
    if (knowledgeList.length === 0) { container.innerHTML = '<p class="text-slate-500 text-center p-6">目前沒有項目。請從上方新增。</p>'; return; }
    const filtered = knowledgeList.filter(i => currentFilter === 'all' || i.status === currentFilter);
    if (filtered.length === 0) { container.innerHTML = '<p class="text-slate-500 text-center p-6">沒有符合此狀態的項目。</p>'; return; }
    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = `knowledge-item status-${item.status}`;
        div.innerHTML = `<span class="font-semibold text-lg">${escapeHtml(item.topic)}</span><div class="flex items-center gap-3 flex-wrap"><button class="status-btn" onclick="changeStatus(${item.id}, 'green')" title="我會的">✅</button><button class="status-btn" onclick="changeStatus(${item.id}, 'yellow')" title="半懂的">⚠️</button><button class="status-btn" onclick="changeStatus(${item.id}, 'red')" title="不會的">❌</button><button class="btn-delete" onclick="deleteTopic(${item.id})">刪除</button></div>`;
        const activeBtn = div.querySelector(`.status-btn[onclick*="${item.status}"]`);
        if (activeBtn) { activeBtn.style.opacity = 1; activeBtn.style.transform = 'scale(1.2)'; }
        container.appendChild(div);
    });
}
document.getElementById('addTopicBtn')?.addEventListener('click', () => {
    const topicInput = document.getElementById('topicInput');
    const statusSelect = document.getElementById('statusSelect');
    if (!topicInput || !statusSelect) return;
    const topic = topicInput.value.trim();
    const status = statusSelect.value;
    if (topic) { knowledgeList.push({ id: Date.now(), topic, status }); ls.setItem('knowledgeList', JSON.stringify(knowledgeList)); topicInput.value = ''; renderKnowledgeList(); }
});
function changeStatus(id, newStatus) {
    const item = knowledgeList.find(i => i.id === id);
    if (item) { item.status = newStatus; ls.setItem('knowledgeList', JSON.stringify(knowledgeList)); renderKnowledgeList(); }
}
function deleteTopic(id) {
    if (confirm('確定要刪除這個項目嗎？')) { knowledgeList = knowledgeList.filter(i => i.id !== id); ls.setItem('knowledgeList', JSON.stringify(knowledgeList)); renderKnowledgeList(); }
}
function filterKnowledge(status) { currentFilter = status; renderKnowledgeList(); }
document.getElementById('clearTriageBtn')?.addEventListener('click', () => {
    if (confirm('您確定要清空所有知識盤點項目嗎？此動作無法復原。')) { knowledgeList = []; ls.setItem('knowledgeList', JSON.stringify(knowledgeList)); renderKnowledgeList(); }
});
function exportKnowledge() { const text = knowledgeList.map(i => `${i.topic}\t${i.status}`).join('\n'); downloadFile('知識盤點.txt', text); }

// ===== 讀書計畫 =====
function renderPlanner() {
    Object.keys(planner).forEach(day => {
        const dayColumn = document.getElementById(`day-${day}`);
        if (!dayColumn) return;
        const ul = dayColumn.querySelector('ul');
        ul.innerHTML = '';
        if (planner[day].length === 0) { ul.innerHTML = '<li class="text-slate-400 text-sm select-none">暫無任務</li>'; return; }
        planner[day].forEach((task, idx) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            if (task.isBuffer) li.classList.add('is-buffer');
            if (task.completed) li.classList.add('completed');
            li.innerHTML = `<input type="checkbox" class="h-5 w-5 rounded" ${task.completed ? 'checked' : ''} onchange="toggleTask('${day}', ${idx})"><span>${task.isBuffer ? '🔑' : '⭐'} ${escapeHtml(task.text)}</span>`;
            ul.appendChild(li);
        });
    });
}
document.getElementById('addTaskBtn')?.addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const daySelect = document.getElementById('daySelect');
    const isBufferCheck = document.getElementById('isBufferCheck');
    if (!taskInput || !daySelect || !isBufferCheck) return;
    const text = taskInput.value.trim();
    const day = daySelect.value;
    const isBuffer = isBufferCheck.checked;
    if (text) { planner[day].push({ text, isBuffer, completed: false }); ls.setItem('studyPlanner', JSON.stringify(planner)); taskInput.value = ''; isBufferCheck.checked = false; renderPlanner(); }
});
function toggleTask(day, idx) { planner[day][idx].completed = !planner[day][idx].completed; ls.setItem('studyPlanner', JSON.stringify(planner)); renderPlanner(); }
document.getElementById('clearPlannerBtn')?.addEventListener('click', () => {
    if (confirm('您確定要清空本週所有計畫嗎？此動作無法復原。')) { planner = {"mon":[], "tue":[], "wed":[], "thu":[], "fri":[], "sat":[], "sun":[]}; ls.setItem('studyPlanner', JSON.stringify(planner)); renderPlanner(); }
});
function exportPlanner() { const days = {mon:'一', tue:'二', wed:'三', thu:'四', fri:'五', sat:'六', sun:'日'}; let text = '本週讀書計畫\n\n'; Object.keys(planner).forEach(day => { text += `星期${days[day]}:\n`; planner[day].forEach(task => { text += `  ${task.completed ? '☑' : '☐'} ${task.text}${task.isBuffer ? ' (抓漏時間)' : ''}\n`; }); text += '\n'; }); downloadFile('讀書計畫.txt', text); }

// ===== 筆記產生器 =====
const noteTemplateSelect = document.getElementById('noteTemplateSelect');
const generateNoteBtn = document.getElementById('generateNoteBtn');
const copyNoteBtn = document.getElementById('copyNoteBtn');
const generatedNote = document.getElementById('generatedNote');

if (noteTemplateSelect) {
    noteTemplateSelect.addEventListener('change', () => {
        const selected = noteTemplateSelect.value;
        document.querySelectorAll('.template-fields').forEach(div => div.classList.add('hidden'));
        document.getElementById(`template-${selected}`).classList.remove('hidden');
        
        if (selected === 'zettelkasten') { document.getElementById('noteZettelID').value = getTimestampID(); } 
        else if (selected === 'bujo' || selected === 'diary') { const dateField = selected === 'bujo' ? 'noteBujoDate' : 'noteDiaryDate'; document.getElementById(dateField).value = getTodayDate(); }
    });
}
if (generateNoteBtn) {
    generateNoteBtn.addEventListener('click', () => {
        const tpl = noteTemplateSelect.value;
        let note = '';
        let meta = {id: getTimestampID(), date: new Date().toISOString(), template: tpl};
        if (tpl === 'default') { const theme = document.getElementById('noteTheme').value; const points = document.getElementById('notePoints').value; const learned = document.getElementById('noteLearned').value; const question = document.getElementById('noteQuestion').value; note = `## 🧠 主題：${theme || '（尚未填寫）'}\n--------------------\n### 🎯 重點3句\n${points || '（尚未填寫）'}\n\n### ✅ 我學到什麼\n${learned || '（尚未填寫）'}\n\n### ❓ 我還不懂什麼\n${question || '（尚未填寫）'}`; meta.title = theme || "學習反思"; }
        else if (tpl === 'diary') { const date = document.getElementById('noteDiaryDate').value || getTodayDate(); const mood = document.getElementById('noteDiaryMood').value; const goodThings = document.getElementById('noteDiaryGoodThings').value; const improve = document.getElementById('noteDiaryImprove').value; const reflection = document.getElementById('noteDiaryReflection').value; note = `## ✍️ ${date} 日記 (${mood || '心情未記錄'})\n--------------------\n### 👍 今日三件好事\n${goodThings || '（尚未填寫）'}\n\n### 🌱 一件可以做得更好的事\n${improve || '（尚未填寫）'}\n\n### 💬 今日反思\n${reflection || '（尚未填寫）'}`; meta.title = `${date} 的日記`; }
        else if (tpl === 'book-report') { const title = document.getElementById('noteBookTitle').value; const core = document.getElementById('noteBookCore').value; const takeaways = document.getElementById('noteBookTakeaways').value; const quote = document.getElementById('noteBookQuote').value; const apply = document.getElementById('noteBookApply').value; note = `## 📖 讀書心得：${title || '（書名未填）'}\n--------------------\n### 核心概念\n${core || '（尚未填寫）'}\n\n### 三個主要收穫\n${takeaways || '（尚未填寫）'}\n\n### 觸動我的話\n${quote || '（尚未填寫）'}\n\n### 我將如何應用\n${apply || '（尚未填寫）'}`; meta.title = `《${title || '未命名書籍'}》讀書心得`; }
        else if (tpl === 'bujo') { const date = document.getElementById('noteBujoDate').value || getTodayDate(); const tasks = document.getElementById('noteBujoTasks').value.split('\n').filter(l => l.trim()).map(l => `⬜ ${l.trim()}`).join('\n'); const events = document.getElementById('noteBujoEvents').value.split('\n').filter(l => l.trim()).map(l => `○ ${l.trim()}`).join('\n'); const notes = document.getElementById('noteBujoNotes').value.split('\n').filter(l => l.trim()).map(l => `• ${l.trim()}`).join('\n'); note = `## 📅 ${date} - 每日紀錄\n--------------------\n### ⬜ 任務\n${tasks || '（沒有任務）'}\n\n### ○ 事件\n${events || '（沒有事件）'}\n\n### • 筆記\n${notes || '（沒有筆記）'}`; meta.title = `每日紀錄 ${date}`; }
        else if (tpl === 'zettelkasten') { const id = document.getElementById('noteZettelID').value || meta.id; const title = document.getElementById('noteZettelTitle').value; const content = document.getElementById('noteZettelContent').value; const tags = document.getElementById('noteZettelTags').value; const links = document.getElementById('noteZettelLinks').value; note = `ID: ${id}\nTitle: ${title || '（請填寫標題）'}\n--------------------\n${content || '（請填寫內容）'}\n--------------------\nTags: ${tags || '（沒有標籤）'}\nLinks: ${links || '（沒有連結）'}`; meta.id = id; meta.title = title || '無標題'; meta.tags = tags.split(/\s*#\s*/).filter(t => t); }
        else if (tpl === 'cornell') { const title = document.getElementById('noteCornellTitle').value; const cues = document.getElementById('noteCornellCues').value; const notes = document.getElementById('noteCornellNotes').value; const summary = document.getElementById('noteCornellSummary').value; note = `## 📖 康乃爾筆記：${title}\n--------------------\n### 關鍵字/問題\n${cues}\n\n### 課堂筆記\n${notes}\n\n### 總結\n${summary}`; meta.title = title || '康乃爾筆記'; }
        else if (tpl === 'mindmap') { const central = document.getElementById('noteMindmapCentral').value; const branches = document.getElementById('noteMindmapBranches').value; const details = document.getElementById('noteMindmapDetails').value; note = `## 🌳 心智圖：${central}\n--------------------\n### 主要分支\n${branches}\n\n### 詳細內容\n${details}`; meta.title = central || '心智圖'; }
        else if (tpl === 'feynman') { const concept = document.getElementById('noteFeynmanConcept').value; const simple = document.getElementById('noteFeynmanSimple').value; const analogy = document.getElementById('noteFeynmanAnalogy').value; const gaps = document.getElementById('noteFeynmanGaps').value; note = `## 👨‍🏫 費曼技巧：${concept}\n--------------------\n### 簡單解釋\n${simple}\n\n### 比喻/舉例\n${analogy}\n\n### 需要加強的部分\n${gaps}`; meta.title = concept || '費曼筆記'; }
        generatedNote.value = note.trim(); addNoteToStorage(meta, note.trim()); alert('✅ 筆記已產生並儲存！');
    });
}
copyNoteBtn?.addEventListener('click', () => { if (!generatedNote.value) { alert('請先產生筆記！'); return; } navigator.clipboard.writeText(generatedNote.value).then(() => { alert('📋 筆記已複製到剪貼簿！'); }); });
document.getElementById('clearNoteBtn')?.addEventListener('click', () => { generatedNote.value = ''; });
function addNoteToStorage(meta, content) { notesStorage.push({ id: meta.id, title: meta.title || '無標題', tags: meta.tags || [], template: meta.template, content: content, created: meta.date || new Date().toISOString(), lastModified: new Date().toISOString(), important: false }); ls.setItem('notesStorage', JSON.stringify(notesStorage)); }

// ===== 語音筆記模組 =====
window.voiceNoteModule = (function() {
    const UIElements = { transcript: document.getElementById('transcript-output'), transcriptContainer: document.getElementById('transcriptContainer-voice'), controlBtn: document.getElementById('controlBtn-voice'), exportBtn: document.getElementById('exportBtn-voice'), copyBtn: document.getElementById('copyBtn-voice'), sendToNoteBtn: document.getElementById('sendToNoteBtn-voice'), languageSelector: document.getElementById('languageSelector-voice'), };
    const state = { startTime: null, endTime: null, transcriptSegments: [], isRecognizing: false, interimTranscript: '', isManualStop: false, recognition: null, isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), restartTimeout: null, recognitionActive: false, };
    function init() { loadPreferences(); setupEventListeners(); initSpeechRecognition(); updateButtonStates(); }
    function setupEventListeners() { UIElements.controlBtn.addEventListener('click', toggleRecognition); UIElements.exportBtn.addEventListener('click', exportTranscript); UIElements.copyBtn.addEventListener('click', copyTranscript); UIElements.sendToNoteBtn.addEventListener('click', sendToNoteTool); UIElements.languageSelector.addEventListener('change', () => { if (state.recognition) { state.recognition.lang = UIElements.languageSelector.value; } savePreferences(); }); }
    function initSpeechRecognition() { if (!('webkitSpeechRecognition' in window)) { showToast("您的瀏覽器不支援 Web Speech API，請使用最新版本的 Chrome 瀏覽器。", "error"); UIElements.controlBtn.disabled = true; return; } state.recognition = new webkitSpeechRecognition(); state.recognition.continuous = !state.isMobile; state.recognition.interimResults = true; state.recognition.maxAlternatives = 1; state.recognition.onstart = handleRecognitionStart; state.recognition.onerror = handleRecognitionError; state.recognition.onend = handleRecognitionEnd; state.recognition.onresult = handleRecognitionResult; }
    function updateButtonStates() { UIElements.controlBtn.textContent = state.isRecognizing ? '停止辨識' : '開始辨識'; UIElements.controlBtn.classList.toggle('listening', state.isRecognizing); const canExportOrCopy = !state.isRecognizing && state.transcriptSegments.length > 1; UIElements.exportBtn.disabled = !canExportOrCopy; UIElements.copyBtn.disabled = !canExportOrCopy; UIElements.sendToNoteBtn.disabled = !canExportOrCopy; }
    function toggleRecognition() { if (state.isRecognizing) { stopRecognition(); } else { startRecognition(); } }
    function startRecognition() { state.isManualStop = false; state.recognition.lang = UIElements.languageSelector.value; state.startTime = new Date(); state.transcriptSegments = [{ timestamp: state.startTime, text: '--- 錄音開始 ---' }]; state.interimTranscript = ''; updateTranscriptDisplay(); try { if (!state.recognitionActive) state.recognition.start(); } catch (e) { console.error("啟動辨識失敗:", e); showToast("無法啟動語音辨識，請重新整理頁面再試。", "error"); } }
    function stopRecognition() { if (!state.isRecognizing) return; state.isManualStop = true; if (state.recognitionActive) { state.recognition.stop(); } else { handleRecognitionEnd(); } }
    function handleRecognitionStart() { state.recognitionActive = true; state.isRecognizing = true; UIElements.languageSelector.disabled = true; updateButtonStates(); }
    function handleRecognitionError(event) { console.error('語音辨識錯誤:', event.error, event); state.recognitionActive = false; if (event.error === 'not-allowed') { showToast("您拒絕了麥克風權限。請允許麥克風存取以使用此功能。", "error"); } else if (event.error === 'network') { showToast('網路連線問題，請檢查網路設定。', 'error'); } }
    function handleRecognitionEnd() { state.recognitionActive = false; clearTimeout(state.restartTimeout); if (!state.isManualStop && state.isRecognizing) { const restartDelay = state.isMobile ? 200 : 500; state.restartTimeout = setTimeout(() => { if (state.isRecognizing && !state.recognitionActive) { try { state.recognition.start(); } catch (e) { console.error('自動重啟失敗:', e); } } }, restartDelay); } else { state.isRecognizing = false; UIElements.languageSelector.disabled = false; state.endTime = new Date(); updateButtonStates(); } }
    function handleRecognitionResult(event) { state.interimTranscript = ''; let final_transcript_this_turn = ''; for (let i = event.resultIndex; i < event.results.length; ++i) { const transcript = event.results[i][0].transcript; if (event.results[i].isFinal) { final_transcript_this_turn += transcript.trim() + ' '; } else { state.interimTranscript += transcript; } } if (final_transcript_this_turn) { state.transcriptSegments.push({ timestamp: new Date(), text: final_transcript_this_turn.trim() }); } updateTranscriptDisplay(); }
    function updateTranscriptDisplay() { const finalContent = state.transcriptSegments.map(segment => `${formatTime(segment.timestamp)} ${escapeHtml(segment.text)}`).join('\n'); UIElements.transcript.innerHTML = `<span class="placeholder" style="display:none;"></span>${finalContent}\n<span class="interim">${escapeHtml(state.interimTranscript)}</span>`; UIElements.transcriptContainer.scrollTop = UIElements.transcriptContainer.scrollHeight; }
    function getFullTranscriptText(withTimestamp = true) { if (withTimestamp) { return state.transcriptSegments.map(segment => `${formatTime(segment.timestamp)} ${segment.text}`).join('\n'); } return state.transcriptSegments.map(segment => segment.text).slice(1).join('\n'); }
    function exportTranscript() { if (!state.startTime || !state.endTime) return; const textToSave = getFullTranscriptText().replace(/\n/g, '\r\n'); const fileName = createFileName(state.startTime, state.endTime); downloadFile(fileName, textToSave); }
    function copyTranscript() { if (state.transcriptSegments.length <= 1) return; const textToCopy = getFullTranscriptText(); navigator.clipboard.writeText(textToCopy).then(() => { showToast("已複製到剪貼簿！", "success"); }, (err) => { console.error('複製失敗: ', err); showToast("複製失敗，請重試。", "error"); }); }
    function sendToNoteTool() { if (state.transcriptSegments.length <= 1) { showToast("沒有逐字稿內容可以傳送。", "warning"); return; } const transcriptText = getFullTranscriptText(false); window.setActiveTab('notes'); const noteTemplateSelect = document.getElementById('noteTemplateSelect'); noteTemplateSelect.value = 'default'; document.querySelectorAll('.template-fields').forEach(div => div.classList.add('hidden')); document.getElementById('template-default').classList.remove('hidden'); document.getElementById('noteTheme').value = `語音筆記 - ${new Date().toLocaleString()}`; document.getElementById('noteLearned').value = transcriptText; document.getElementById('notePoints').value = ''; document.getElementById('noteQuestion').value = ''; showToast("逐字稿已成功傳送到筆記工具！", "success"); }
    function savePreferences() { ls.setItem('voice_note_rec_lang', UIElements.languageSelector.value); }
    function loadPreferences() { const savedRecLang = ls.getItem('voice_note_rec_lang'); if (savedRecLang) { UIElements.languageSelector.value = savedRecLang; } }
    function formatTime(date) { const h = String(date.getHours()).padStart(2, '0'); const m = String(date.getMinutes()).padStart(2, '0'); const s = String(date.getSeconds()).padStart(2, '0'); return `[${h}:${m}:${s}]`; }
    function createFileName(start, end) { const date = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`; const startTimeStr = `${String(start.getHours()).padStart(2, '0')}-${String(start.getMinutes()).padStart(2, '0')}`; const endTimeStr = `${String(end.getHours()).padStart(2, '0')}-${String(end.getMinutes()).padStart(2, '0')}`; return `語音筆記_${date}_${startTimeStr}_to_${endTimeStr}.txt`; }
    return { init, stopRecognition, isRecognizing: () => state.isRecognizing };
})();

// ===== 記憶卡片 =====
function renderFlashcardList() {
    const list = document.getElementById('flashcardList');
    const count = document.getElementById('flashcardCount');
    const filter = document.getElementById('flashcardFilterCategory');
    if (!list) return;
    
    // 確保所有卡片都有 ID (兼容舊資料)
    flashcards.forEach((card, i) => { if(!card.id) card.id = Date.now() + i; });
    
    count.textContent = flashcards.length;
    const categories = [...new Set(flashcards.map(c => c.category))];
    filter.innerHTML = '<option value="all">全部分類</option>';
    categories.forEach(cat => { 
        const opt = document.createElement('option'); 
        opt.value = escapeHtml(cat); 
        opt.textContent = escapeHtml(cat); 
        filter.appendChild(opt); 
    });
    
    if (flashcards.length === 0) { list.innerHTML = '<p class="text-slate-500 text-center p-4">還沒有卡片。開始製作你的第一張吧！</p>'; return; }
    
    const filtered = filter.value === 'all' ? flashcards : flashcards.filter(c => c.category === filter.value);
    list.innerHTML = '';
    
    filtered.forEach((card) => {
        const div = document.createElement('div');
        div.className = 'p-3 bg-white border-2 border-blue-200 rounded-lg hover:shadow-md transition';
        div.innerHTML = `<div class="flex justify-between items-start"><div class="flex-1"><div class="font-bold text-blue-800">${escapeHtml(card.question)}</div><div class="text-sm text-slate-600 mt-1">${escapeHtml(card.category)}</div></div><button class="btn-delete text-xs" onclick="deleteFlashcard(${card.id})">刪除</button></div>`;
        list.appendChild(div);
    });
}

document.getElementById('addFlashcardBtn')?.addEventListener('click', () => {
    const question = document.getElementById('flashcardQuestion').value.trim();
    const answer = document.getElementById('flashcardAnswer').value.trim();
    const category = document.getElementById('flashcardCategory').value.trim() || '未分類';
    if (question && answer) { 
        flashcards.push({ id: Date.now(), question, answer, category, created: new Date().toISOString() }); 
        ls.setItem('flashcards', JSON.stringify(flashcards)); 
        document.getElementById('flashcardQuestion').value = ''; 
        document.getElementById('flashcardAnswer').value = ''; 
        document.getElementById('flashcardCategory').value = ''; 
        renderFlashcardList(); 
        updateFlashcardPreview(question, answer); 
        showToast('✅ 卡片已新增！', 'success'); 
    } else { 
        showToast('請填寫問題和答案！', 'error'); 
    }
});

function updateFlashcardPreview(question, answer) { 
    document.getElementById('previewQuestion').textContent = question; 
    document.getElementById('previewAnswer').textContent = answer; 
}

document.getElementById('flashcardPreview')?.addEventListener('click', function() { this.classList.toggle('flipped'); });

function deleteFlashcard(id) { 
    if (confirm('確定要刪除這張卡片嗎？')) { 
        flashcards = flashcards.filter(c => c.id !== id); 
        ls.setItem('flashcards', JSON.stringify(flashcards)); 
        renderFlashcardList(); 
    } 
}

function startFlashcardReview() {
    if (flashcards.length === 0) { showToast('還沒有卡片可以複習！', 'error'); return; }
    let currentIdx = 0;
    const modal = createModal();
    function showCard() { 
        const card = flashcards[currentIdx]; 
        modal.innerHTML = `<h3 class="text-2xl font-bold mb-4">複習模式 (${currentIdx + 1}/${flashcards.length})</h3><div class="flashcard" onclick="this.classList.toggle('flipped')"><div class="flashcard-inner"><div class="flashcard-front"><div class="text-center"><p class="text-sm mb-2 opacity-75">問題</p><p>${escapeHtml(card.question)}</p></div></div><div class="flashcard-back"><div class="text-center"><p class="text-sm mb-2 opacity-75">答案</p><p>${escapeHtml(card.answer)}</p></div></div></div></div><div class="flex gap-3 mt-6"><button class="btn btn-primary flex-1" onclick="nextCard()">下一張 →</button><button class="btn btn-danger" onclick="closeModal()">結束複習</button></div>`; 
    }
    window.nextCard = () => { currentIdx = (currentIdx + 1) % flashcards.length; showCard(); };
    showCard();
}

function clearAllFlashcards() { 
    if (confirm('確定要清空所有卡片嗎？此動作無法復原！')) { 
        flashcards = []; 
        ls.setItem('flashcards', JSON.stringify(flashcards)); 
        renderFlashcardList(); 
    } 
}

// ===== 番茄鐘 =====
function updatePomodoroDisplay() {
    const timerDisplay = document.getElementById('timerDisplay');
    if (!timerDisplay) return;
    const minutes = Math.floor(timerState.timeLeft / 60);
    const seconds = timerState.timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const focusDuration = parseInt(document.getElementById('focusTime').value) * 60;
    const breakDuration = timerState.mode === 'shortBreak' ? parseInt(document.getElementById('shortBreak').value) * 60 : parseInt(document.getElementById('longBreak').value) * 60;
    const totalDuration = timerState.mode === 'focus' ? focusDuration : breakDuration;
    const progress = totalDuration > 0 ? ((totalDuration - timerState.timeLeft) / totalDuration) * 100 : 0;
    document.getElementById('timerProgress').style.width = progress + '%';
    document.getElementById('pomodoroCount').textContent = pomodoroStats.total;
    document.getElementById('studyMinutes').textContent = pomodoroStats.studyMinutes;
    document.getElementById('breakMinutes').textContent = pomodoroStats.breakMinutes;
    document.getElementById('todayPomodoros').textContent = pomodoroStats.today;
    document.getElementById('todayStudy').textContent = pomodoroStats.todayStudy + ' 分鐘';
}
document.getElementById('timerStart')?.addEventListener('click', () => { if (!timerState.isRunning) { timerState.isRunning = true; document.getElementById('timerStart').classList.add('hidden'); document.getElementById('timerPause').classList.remove('hidden'); timerInterval = setInterval(() => { if (timerState.timeLeft > 0) { timerState.timeLeft--; updatePomodoroDisplay(); } else { handleTimerComplete(); } }, 1000); } });
document.getElementById('timerPause')?.addEventListener('click', () => { timerState.isRunning = false; clearInterval(timerInterval); document.getElementById('timerStart').classList.remove('hidden'); document.getElementById('timerPause').classList.add('hidden'); });
document.getElementById('timerReset')?.addEventListener('click', () => { timerState.isRunning = false; clearInterval(timerInterval); timerState.timeLeft = parseInt(document.getElementById('focusTime').value) * 60; timerState.mode = 'focus'; document.getElementById('timerStart').classList.remove('hidden'); document.getElementById('timerPause').classList.add('hidden'); document.getElementById('timerStatus').textContent = '準備開始學習 🍅'; updatePomodoroDisplay(); });
document.getElementById('timerSkip')?.addEventListener('click', () => { handleTimerComplete(); });
function handleTimerComplete() {
    clearInterval(timerInterval);
    timerState.isRunning = false;
    if (timerState.mode === 'focus') {
        pomodoroStats.total++;
        pomodoroStats.today++;
        const focusMin = parseInt(document.getElementById('focusTime').value);
        pomodoroStats.studyMinutes += focusMin;
        pomodoroStats.todayStudy += focusMin;
        recordDailyPomodoro();
        timerState.pomodoroCount++;
        if (timerState.pomodoroCount % 4 === 0) { timerState.mode = 'longBreak'; timerState.timeLeft = parseInt(document.getElementById('longBreak').value) * 60; document.getElementById('timerStatus').textContent = '長休息時間 🎉'; } 
        else { timerState.mode = 'shortBreak'; timerState.timeLeft = parseInt(document.getElementById('shortBreak').value) * 60; document.getElementById('timerStatus').textContent = '短休息時間 ☕'; }
        if (document.getElementById('soundEnabled').checked) playSound();
        if (document.getElementById('notificationEnabled')?.checked) sendNotification('🎉 番茄鐘完成！', '完成一個專注時段，該休息一下了！');
        showToast('🎉 完成一個番茄鐘！休息一下吧！', 'success');
    } else {
        const breakMin = timerState.mode === 'shortBreak' ? parseInt(document.getElementById('shortBreak').value) : parseInt(document.getElementById('longBreak').value);
        pomodoroStats.breakMinutes += breakMin;
        timerState.mode = 'focus';
        timerState.timeLeft = parseInt(document.getElementById('focusTime').value) * 60;
        document.getElementById('timerStatus').textContent = '準備開始學習 🍅';
        if (document.getElementById('soundEnabled').checked) playSound();
        if (document.getElementById('notificationEnabled')?.checked) sendNotification('✅ 休息結束！', '準備開始下一個番茄鐘！');
        showToast('✅ 休息結束！準備開始下一個番茄鐘！', 'success');
    }
    ls.setItem('pomodoroStats', JSON.stringify(pomodoroStats));
    document.getElementById('timerStart').classList.remove('hidden');
    document.getElementById('timerPause').classList.add('hidden');
    updatePomodoroDisplay();
}
function sendNotification(title, body) { if ('Notification' in window) { if (Notification.permission === 'granted') { new Notification(title, { body, icon: '🍅' }); } else if (Notification.permission !== 'denied') { Notification.requestPermission().then(permission => { if (permission === 'granted') new Notification(title, { body, icon: '🍅' }); }); } } }
document.getElementById('notificationEnabled')?.addEventListener('change', function() { if (this.checked && 'Notification' in window && Notification.permission === 'default') { Notification.requestPermission(); } });
function checkPomodoroDate() { const today = getTodayDate(); if (pomodoroStats.lastDate !== today) { pomodoroStats.today = 0; pomodoroStats.todayStudy = 0; pomodoroStats.lastDate = today; ls.setItem('pomodoroStats', JSON.stringify(pomodoroStats)); } }
function playSound() { const audioContext = new (window.AudioContext || window.webkitAudioContext)(); const oscillator = audioContext.createOscillator(); oscillator.connect(audioContext.destination); oscillator.frequency.value = 800; oscillator.start(); oscillator.stop(audioContext.currentTime + 0.2); }

// ===== 統計 =====
function updateStats() {
    const total = knowledgeList.length;
    const green = knowledgeList.filter(i => i.status === 'green').length;
    const yellow = knowledgeList.filter(i => i.status === 'yellow').length;
    const red = knowledgeList.filter(i => i.status === 'red').length;
    document.getElementById('totalTopics').textContent = total;
    document.getElementById('masteredTopics').textContent = green;
    document.getElementById('totalNotes').textContent = notesStorage.length;
    document.getElementById('totalCards').textContent = flashcards.length;
    document.getElementById('needsFocus').textContent = red + yellow;
    if (total > 0) {
        document.getElementById('greenPercent').textContent = Math.round((green / total) * 100) + '%';
        document.getElementById('yellowPercent').textContent = Math.round((yellow / total) * 100) + '%';
        document.getElementById('redPercent').textContent = Math.round((red / total) * 100) + '%';
        document.getElementById('greenBar').style.width = (green / total * 100) + '%';
        document.getElementById('yellowBar').style.width = (yellow / total * 100) + '%';
        document.getElementById('redBar').style.width = (red / total * 100) + '%';
    }
    document.getElementById('statTotalPomodoros').textContent = pomodoroStats.total;
    document.getElementById('statTotalStudy').textContent = pomodoroStats.studyMinutes;
    const streak = calculateStudyStreak();
    document.getElementById('studyStreak').textContent = streak;
    const firstDay = getFirstStudyDate();
    const daysActive = firstDay ? Math.max(1, Math.ceil((Date.now() - firstDay) / (1000 * 60 * 60 * 24))) : 1;
    const avgDaily = Math.round(pomodoroStats.total / daysActive);
    document.getElementById('statAvgDaily').textContent = avgDaily;
    updateWeeklyCompletion();
    generateLearningTips();
    updateAchievements();
    drawTrendChart();
}
function calculateStudyStreak() {
    const studyHistory = JSON.parse(ls.getItem('studyHistory') || '[]');
    if (studyHistory.length === 0) return 0;
    let streak = 0;
    const today = new Date(getTodayDate());
    if (studyHistory.includes(getTodayDate())) {
        streak = 1;
        let checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - 1);
        for (let i = 0; i < 365; i++) {
            const dateStr = checkDate.toISOString().split('T')[0];
            if (studyHistory.includes(dateStr)) { streak++; checkDate.setDate(checkDate.getDate() - 1); } 
            else { break; }
        }
    }
    return streak;
}
function getFirstStudyDate() { const studyHistory = JSON.parse(ls.getItem('studyHistory') || '[]'); if (studyHistory.length === 0) return null; return new Date(studyHistory.sort()[0]).getTime(); }
function updateWeeklyCompletion() {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    let totalTasks = 0, totalCompleted = 0;
    days.forEach(day => {
        const tasks = planner[day] || [];
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        totalTasks += total;
        totalCompleted += completed;
        document.getElementById(`${day}-completion`).textContent = percent + '%';
        document.getElementById(`${day}-tasks`).textContent = `${completed}/${total}`;
    });
    const overallPercent = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
    document.getElementById('overall-completion').textContent = overallPercent + '%';
    document.getElementById('overall-bar').style.width = overallPercent + '%';
}
function generateLearningTips() {
    const tips = [];
    const redCount = knowledgeList.filter(i => i.status === 'red').length;
    const yellowCount = knowledgeList.filter(i => i.status === 'yellow').length;
    const streak = calculateStudyStreak();
    if (redCount > 5) tips.push('⚠️ 你有較多不熟悉的知識點，建議優先處理紅色項目！');
    if (yellowCount > redCount * 2) tips.push('💡 你有很多半懂的內容，建議加強理解，避免考試時混淆！');
    if (pomodoroStats.today < 2) tips.push('🍅 今天的番茄鐘數量較少，試著再完成 1-2 個番茄鐘吧！');
    if (flashcards.length < 10) tips.push('🎴 製作更多記憶卡片可以幫助你更好地記憶重點！');
    if (notesStorage.length === 0) tips.push('📝 開始製作筆記吧！整理過的知識更容易記住！');
    if (streak >= 7) tips.push(`🔥 太棒了！你已經連續學習 ${streak} 天，繼續保持！`);
    if (streak === 0 && pomodoroStats.total > 0) tips.push('😴 今天還沒有學習記錄，開啟一個番茄鐘開始吧！');
    let totalTasks = 0, completedTasks = 0;
    Object.values(planner).forEach(dayTasks => { totalTasks += dayTasks.length; completedTasks += dayTasks.filter(t => t.completed).length; });
    if (totalTasks > 0 && completedTasks / totalTasks < 0.5) { tips.push('📋 本週計畫完成度較低，調整一下學習節奏吧！'); }
    if (tips.length === 0) { tips.push('🎉 做得很好！繼續保持這個學習節奏！'); tips.push('💪 你的學習習慣非常健康，為自己感到驕傲吧！'); }
    document.getElementById('learningTips').innerHTML = tips.map(tip => `<p class="text-sm font-medium p-2 bg-white rounded-lg">${tip}</p>`).join('');
}
function updateAchievements() {
    const setAchievement = (id, achieved, progressText) => {
        const elem = document.getElementById(id);
        if (achieved) { elem.textContent = '✅ 已達成'; elem.style.color = '#059669'; } 
        else { elem.textContent = progressText; elem.style.color = ''; }
    };
    setAchievement('achievement-1', pomodoroStats.total >= 1, '未達成');
    setAchievement('achievement-2', knowledgeList.length >= 10, `${knowledgeList.length}/10`);
    setAchievement('achievement-3', flashcards.length >= 20, `${flashcards.length}/20`);
    const streak = calculateStudyStreak();
    setAchievement('achievement-4', streak >= 7, `${streak}/7 天`);
}
function drawTrendChart() {
    const chart = document.getElementById('trendChart');
    if (!chart) return;
    chart.innerHTML = '';
    const dailyStats = JSON.parse(ls.getItem('dailyPomodoroStats') || '{}');
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        days.push({ label: date.getDate() + '日', count: dailyStats[dateStr] || 0 });
    }
    const maxCount = Math.max(...days.map(d => d.count), 1);
    days.forEach(day => {
        const height = (day.count / maxCount) * 100;
        chart.innerHTML += `<div class="flex flex-col items-center flex-1"><div class="text-xs font-bold text-blue-600 mb-1">${day.count}</div><div class="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500" style="height: ${height}%; min-height: ${day.count > 0 ? '20px' : '2px'}"></div><div class="text-xs text-slate-600 mt-2">${day.label}</div></div>`;
    });
}
function recordDailyPomodoro() {
    const today = getTodayDate();
    const dailyStats = JSON.parse(ls.getItem('dailyPomodoroStats') || '{}');
    dailyStats[today] = (dailyStats[today] || 0) + 1;
    ls.setItem('dailyPomodoroStats', JSON.stringify(dailyStats));
    const studyHistory = JSON.parse(ls.getItem('studyHistory') || '[]');
    if (!studyHistory.includes(today)) { studyHistory.push(today); ls.setItem('studyHistory', JSON.stringify(studyHistory)); }
}

// ===== 資料管理 =====
function renderNotesManager(filter = '') {
    const container = document.getElementById('notesManager');
    if (!container) return;
    document.getElementById('allNotesCount').textContent = notesStorage.length;
    let filtered = notesStorage;
    if (filter) { const lowerFilter = filter.toLowerCase(); filtered = notesStorage.filter(note => note.title.toLowerCase().includes(lowerFilter) || note.content.toLowerCase().includes(lowerFilter) || (note.tags && note.tags.some(t => t.toLowerCase().includes(lowerFilter)))); }
    if (filtered.length === 0) { container.innerHTML = '<p class="text-slate-500 text-center p-6">找不到符合的筆記。</p>'; return; }
    container.innerHTML = '';
    filtered.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified)).forEach(note => {
        const div = document.createElement('div');
        div.className = 'note-item';
        div.innerHTML = `<div><div class="note-title">${escapeHtml(note.title)}</div>${note.tags && note.tags.length ? `<span class="note-tags">${note.tags.map(t => '#'+escapeHtml(t)).join(' ')}</span>` : ''}</div><div class="flex items-center gap-2"><span class="note-date">${new Date(note.lastModified).toLocaleDateString()}</span><button class="btn-delete text-xs" onclick="deleteNoteById('${note.id}', event)">刪除</button></div>`;
        div.onclick = (e) => { if (!e.target.classList.contains('btn-delete')) { showNoteDetail(note); } };
        container.appendChild(div);
    });
}
function showNoteDetail(note) {
    const modal = createModal();
    // 我們在按鈕區新增一個 div 來更好地佈局
    modal.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${escapeHtml(note.title)}</h2>
        <div class="text-sm text-slate-600 mb-4">建立：${new Date(note.created).toLocaleString()} | 更新：${new Date(note.lastModified).toLocaleString()}</div>
        <pre id="modal-note-content" class="whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border text-sm">${escapeHtml(note.content)}</pre>
        
        <!-- ========== START: 修改後的按鈕區 ========== -->
        <div class="flex gap-3 mt-4">
            <button id="generate-slides-btn" class="btn btn-info flex-1">🚀 生成簡報</button>
            <button class="btn btn-danger flex-1" onclick="closeModal()">關閉</button>
        </div>
        <!-- ========== END: 修改後的按鈕區 ========== -->
    `;

    // 為新按鈕綁定事件
    document.getElementById('generate-slides-btn').addEventListener('click', () => {
        generateSlidesFromNote();
    });
}

// ===== 簡報生成功能 =====

/**
 * 解析筆記內容，將其轉換為幻燈片物件陣列。
 * 規則：以 '##' 開頭的行作為新幻燈片的標題。
 * @param {string} noteContent - 筆記的完整內容。
 * @returns {Array<{title: string, content: string}>}
 */
function parseNoteToSlides(noteContent) {
    const slides = [];
    const lines = noteContent.split('\n');
    let currentSlide = null;

    lines.forEach(line => {
        if (line.trim().startsWith('## ')) {
            // 如果是新標題，儲存上一張幻燈片，並開始新的
            if (currentSlide) {
                currentSlide.content = currentSlide.content.trim();
                slides.push(currentSlide);
            }
            currentSlide = {
                title: line.trim().substring(3), // 移除 '## '
                content: ''
            };
        } else {
            // 如果還沒開始第一張幻燈片，就把內容加到預設的第一張
            if (!currentSlide) {
                currentSlide = { title: '開頭', content: '' };
            }
            currentSlide.content += line + '\n';
        }
    });

    // 加入最後一張幻燈片
    if (currentSlide) {
        currentSlide.content = currentSlide.content.trim();
        slides.push(currentSlide);
    }

    return slides;
}

/**
 * 從當前彈出視窗的筆記內容生成簡報。
 */
function generateSlidesFromNote() {
    const noteContentElement = document.getElementById('modal-note-content');
    if (!noteContentElement) {
        showToast('錯誤：找不到筆記內容。', 'error');
        return;
    }
    const noteContent = noteContentElement.innerText;
    const slidesData = parseNoteToSlides(noteContent);

    if (slidesData.length === 0) {
        showToast('筆記內容無法解析成幻燈片。請使用 "## 標題" 來分隔您的幻燈片。', 'warning');
        return;
    }

    showToast(`準備生成 ${slidesData.length} 頁簡報，請稍候...`, 'info');

    // 創建一個隱藏的 iframe
    let iframe = document.getElementById('slide-gen-iframe');
    if (iframe) {
        iframe.remove();
    }
    iframe = document.createElement('iframe');
    iframe.id = 'slide-gen-iframe';
    iframe.src = 'https://cormort.github.io/slide_html_gen/'; // **您的 slide_html_gen 網址**
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // 等待 iframe 載入完成後發送訊息
    iframe.onload = () => {
        console.log('Slide Generator Iframe 已載入，正在傳送資料...');
        iframe.contentWindow.postMessage({
            type: 'GENERATE_SLIDES',
            data: slidesData
        }, 'https://cormort.github.io');
    };
}

function deleteNoteById(id, event) { 
    event.stopPropagation(); 
    if (confirm('確定要刪除這筆筆記嗎？')) { 
        notesStorage = notesStorage.filter(note => note.id !== id); 
        ls.setItem('notesStorage', JSON.stringify(notesStorage)); 
        renderNotesManager(document.getElementById('searchNotesInput').value); 
    } 
}

function renderFilteredNotes(notes) {
    const container = document.getElementById('notesManager');
    if (!container) return;
    if (notes.length === 0) { container.innerHTML = '<p class="text-slate-500 text-center p-6">沒有符合的筆記。</p>'; return; }
    container.innerHTML = '';
    notes.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified)).forEach(note => {
        const div = document.createElement('div');
        div.className = 'note-item';
        div.innerHTML = `<div class="note-title">${escapeHtml(note.title)}</div><span class="note-date">${new Date(note.lastModified).toLocaleDateString()}</span>`;
        div.onclick = () => showNoteDetail(note);
        container.appendChild(div);
    });
}

// ===== 匯出/匯入功能 =====
function exportAllData() { const data = { knowledgeList, planner, notesStorage, flashcards, pomodoroStats, exportDate: new Date().toISOString() }; const json = JSON.stringify(data, null, 2); downloadFile(`學習系統備份_${getTodayDate()}.json`, json); }
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (confirm('確定要匯入資料嗎？這將覆蓋現有資料！')) {
                    if (data.knowledgeList) ls.setItem('knowledgeList', JSON.stringify(data.knowledgeList));
                    if (data.planner) ls.setItem('studyPlanner', JSON.stringify(data.planner));
                    if (data.notesStorage) ls.setItem('notesStorage', JSON.stringify(data.notesStorage));
                    if (data.flashcards) ls.setItem('flashcards', JSON.stringify(data.flashcards));
                    if (data.pomodoroStats) ls.setItem('pomodoroStats', JSON.stringify(data.pomodoroStats));
                    showToast('✅ 資料匯入成功！頁面將重新載入...', 'success');
                    setTimeout(() => location.reload(), 1500);
                }
            } catch (err) { showToast('❌ 檔案格式錯誤！', 'error'); }
        };
        reader.readAsText(file);
    };
    input.click();
}
function clearAllData() { if (confirm('⚠️ 確定要清空所有資料嗎？此動作無法復原！')) { if (confirm('⚠️ 真的確定嗎？所有筆記、卡片、計畫都會消失！')) { ls.clear(); showToast('✅ 所有資料已清空！頁面即將重新載入...', 'success'); setTimeout(() => location.reload(), 1500); } } }

// ===== 工具函數 =====
function getTimestampID() { const d = new Date(); return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}${String(d.getHours()).padStart(2,'0')}${String(d.getMinutes()).padStart(2,'0')}${String(d.getSeconds()).padStart(2,'0')}`; }
function getTodayDate() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function downloadFile(filename, content) { const blob = new Blob([content], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url); }
function createModal() { const overlay = document.createElement('div'); overlay.className = 'modal-overlay'; overlay.onclick = (e) => { if (e.target === overlay) closeModal(); }; const modal = document.createElement('div'); modal.className = 'modal'; overlay.appendChild(modal); document.body.appendChild(overlay); window.currentModal = overlay; return modal; }
function closeModal() { if (window.currentModal) { document.body.removeChild(window.currentModal); window.currentModal = null; } }
