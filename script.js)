好的，這就為您接續完成。

以下是包含「日記模板」和「讀書心得模板」的完整程式碼，接續上一段被截斷的部分。

### 1. HTML 結構 (`index.html`) (接續)

```html
                        <label for="taskInput" class="block text-sm font-semibold text-slate-700 mb-2">任務內容</label>
                        <input type="text" id="taskInput" class="note-input" placeholder="例如：複習數學 Ch.3、寫英文習作 p.20-25..." />
                    </div>
                    <div>
                        <label for="daySelect" class="block text-sm font-semibold text-slate-700 mb-2">安排在哪一天？</label>
                        <select id="daySelect" class="note-input">
                            <option value="mon">星期一</option>
                            <option value="tue">星期二</option>
                            <option value="wed">星期三</option>
                            <option value="thu">星期四</option>
                            <option value="fri">星期五</option>
                            <option value="sat">星期六</option>
                            <option value="sun">星期日</option>
                        </select>
                    </div>
                    <div class="flex items-end">
                        <label class="flex items-center p-3 cursor-pointer bg-yellow-50 rounded-lg border-2 border-yellow-200 hover:bg-yellow-100 transition w-full">
                            <input type="checkbox" id="isBufferCheck" class="h-5 w-5 rounded text-yellow-500 border-yellow-300" />
                            <span class="ml-2 text-sm text-yellow-800 font-semibold">🔑 抓漏時間</span>
                        </label>
                    </div>
                </div>
                <button id="addTaskBtn" class="btn btn-primary mt-4">➕ 加入計畫</button>
            </div>

            <div class="planner-grid">
                <div class="day-column" id="day-mon"><h3 class="day-header">星期一</h3><ul class="space-y-2"></ul></div>
                <div class="day-column" id="day-tue"><h3 class="day-header">星期二</h3><ul class="space-y-2"></ul></div>
                <div class="day-column" id="day-wed"><h3 class="day-header">星期三</h3><ul class="space-y-2"></ul></div>
                <div class="day-column" id="day-thu"><h3 class="day-header">星期四</h3><ul class="space-y-2"></ul></div>
                <div class="day-column" id="day-fri"><h3 class="day-header">星期五</h3><ul class="space-y-2"></ul></div>
                <div class="day-column" id="day-sat"><h3 class="day-header">星期六</h3><ul class="space-y-2"></ul></div>
                <div class="day-column" id="day-sun"><h3 class="day-header">星期日</h3><ul class="space-y-2"></ul></div>
            </div>
            <div class="flex gap-3 mt-4">
                <button id="clearPlannerBtn" class="btn btn-danger text-sm">🗑️ 清空本週計畫</button>
                <button class="btn btn-info text-sm" onclick="exportPlanner()">💾 匯出計畫</button>
            </div>
        </section>

        <!-- Note Generator -->
        <section id="tab-content-notes" class="tab-content">
            <h2 class="section-title">📝 筆記模板產生器</h2>
            <p class="text-slate-700 mb-4 text-lg leading-relaxed">
                選擇一個模板，將「輸入」轉化為「整理」和「反思」。所有筆記會自動儲存到「資料管理」。
            </p>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <div>
                        <label for="noteTemplateSelect" class="block text-sm font-semibold text-slate-700 mb-2">選擇筆記模板</label>
                        <select id="noteTemplateSelect" class="note-input">
                            <option value="default">🧠 預設模板 (學習反思)</option>
                            <option value="diary">✍️ 日記模板 (每日反思)</option>
                            <option value="book-report">📖 讀書心得 (知識萃取)</option>
                            <option value="bujo">📅 子彈筆記 (每日任務)</option>
                            <option value="zettelkasten">🗂️ 卡片盒筆記 (知識點)</option>
                            <option value="cornell">📖 康乃爾筆記 (課堂筆記)</option>
                            <option value="mindmap">🌳 心智圖筆記 (概念連結)</option>
                            <option value="feynman">👨‍🏫 費曼筆記 (用自己的話解釋)</option>
                        </select>
                    </div>

                    <!-- Default Template -->
                    <div id="template-default" class="template-fields space-y-4">
                        <div><label for="noteTheme" class="block text-sm font-semibold text-slate-700 mb-2">主題 (Theme)</label><input type="text" id="noteTheme" class="note-input" placeholder="今天學習的主題是什麼？" /></div>
                        <div><label for="notePoints" class="block text-sm font-semibold text-slate-700 mb-2">重點3句 (3 Key Points)</label><textarea id="notePoints" class="note-input h-24" placeholder="用三句話總結最重要的觀念..."></textarea></div>
                        <div><label for="noteLearned" class="block text-sm font-semibold text-slate-700 mb-2">我學到什麼 (What I Learned)</label><textarea id="noteLearned" class="note-input h-24" placeholder="我學會了如何應用..."></textarea></div>
                        <div><label for="noteQuestion" class="block text-sm font-semibold text-slate-700 mb-2">我還不懂什麼 (What I Still Don't Know)</label><textarea id="noteQuestion" class="note-input h-24" placeholder="我還是不太懂... / 我想問..."></textarea></div>
                    </div>

                    <!-- Diary Template -->
                    <div id="template-diary" class="template-fields space-y-4 hidden">
                        <div class="grid grid-cols-2 gap-4">
                            <div><label for="noteDiaryDate" class="block text-sm font-semibold text-slate-700 mb-2">日期 (Date)</label><input type="date" id="noteDiaryDate" class="note-input" /></div>
                            <div><label for="noteDiaryMood" class="block text-sm font-semibold text-slate-700 mb-2">心情/天氣</label><input type="text" id="noteDiaryMood" class="note-input" placeholder="☀️, 😊, ..." /></div>
                        </div>
                        <div><label for="noteDiaryGoodThings" class="block text-sm font-semibold text-slate-700 mb-2">今日三件好事 (Three Good Things)</label><textarea id="noteDiaryGoodThings" class="note-input h-24" placeholder="1. ...&#10;2. ...&#10;3. ..."></textarea></div>
                        <div><label for="noteDiaryImprove" class="block text-sm font-semibold text-slate-700 mb-2">一件可以做得更好的事 (One Thing to Improve)</label><textarea id="noteDiaryImprove" class="note-input h-20" placeholder="關於...，下次我可以試著..."></textarea></div>
                        <div><label for="noteDiaryReflection" class="block text-sm font-semibold text-slate-700 mb-2">今日反思 (Today's Reflection)</label><textarea id="noteDiaryReflection" class="note-input h-24" placeholder="自由書寫任何想法..."></textarea></div>
                    </div>

                    <!-- Book Report Template -->
                    <div id="template-book-report" class="template-fields space-y-4 hidden">
                        <div><label for="noteBookTitle" class="block text-sm font-semibold text-slate-700 mb-2">書名 & 作者</label><input type="text" id="noteBookTitle" class="note-input" placeholder="例如：《原子習慣》 by 詹姆斯·克利爾" /></div>
                        <div><label for="noteBookCore" class="block text-sm font-semibold text-slate-700 mb-2">本書核心概念 (一句話總結)</label><textarea id="noteBookCore" class="note-input h-20" placeholder="這本書最主要在談..."></textarea></div>
                        <div><label for="noteBookTakeaways" class="block text-sm font-semibold text-slate-700 mb-2">三個主要收穫 (Three Key Takeaways)</label><textarea id="noteBookTakeaways" class="note-input h-24" placeholder="1. ...&#10;2. ...&#10;3. ..."></textarea></div>
                        <div><label for="noteBookQuote" class="block text-sm font-semibold text-slate-700 mb-2">一句觸動我的話</label><textarea id="noteBookQuote" class="note-input h-20" placeholder="書中最讓我印象深刻的一句話是..."></textarea></div>
                        <div><label for="noteBookApply" class="block text-sm font-semibold text-slate-700 mb-2">我將如何應用 (How I'll Apply It)</label><textarea id="noteBookApply" class="note-input h-24" placeholder="根據書中的...，我計畫開始..."></textarea></div>
                    </div>

                    <!-- Bujo Template -->
                    <div id="template-bujo" class="template-fields space-y-4 hidden">
                        <div><label for="noteBujoDate" class="block text-sm font-semibold text-slate-700 mb-2">日期 (Date)</label><input type="date" id="noteBujoDate" class="note-input" /></div>
                        <div><label for="noteBujoTasks" class="block text-sm font-semibold text-slate-700 mb-2">任務 (Tasks)</label><textarea id="noteBujoTasks" class="note-input h-24" placeholder="輸入任務，每行一個..."></textarea></div>
                        <div><label for="noteBujoEvents" class="block text-sm font-semibold text-slate-700 mb-2">事件 (Events)</label><textarea id="noteBujoEvents" class="note-input h-24" placeholder="輸入事件，每行一個..."></textarea></div>
                        <div><label for="noteBujoNotes" class="block text-sm font-semibold text-slate-700 mb-2">筆記 (Notes)</label><textarea id="noteBujoNotes" class="note-input h-24" placeholder="輸入筆記，每行一個..."></textarea></div>
                    </div>

                    <!-- Zettelkasten Template -->
                    <div id="template-zettelkasten" class="template-fields space-y-4 hidden">
                        <div><label for="noteZettelID" class="block text-sm font-semibold text-slate-700 mb-2">ID (可自動生成)</label><input type="text" id="noteZettelID" class="note-input" placeholder="例如：202511100930" /></div>
                        <div><label for="noteZettelTitle" class="block text-sm font-semibold text-slate-700 mb-2">標題/概念 (Title/Concept)</label><input type="text" id="noteZettelTitle" class="note-input" placeholder="這個知識點的核心概念是什麼？" /></div>
                        <div><label for="noteZettelContent" class="block text-sm font-semibold text-slate-700 mb-2">內容 (Content)</label><textarea id="noteZettelContent" class="note-input h-32" placeholder="用自己的話寫下這個概念的完整說明..."></textarea></div>
                        <div><label for="noteZettelTags" class="block text-sm font-semibold text-slate-700 mb-2">標籤 (Tags)</label><input type="text" id="noteZettelTags" class="note-input" placeholder="用 # 符號分隔, 例如：#學習 #記憶" /></div>
                        <div><label for="noteZettelLinks" class="block text-sm font-semibold text-slate-700 mb-2">相關連結 (Links)</label><input type="text" id="noteZettelLinks" class="note-input" placeholder="用 [[...]] 符號分隔, 例如：[[202511090800]]" /></div>
                    </div>

                    <!-- Cornell Template -->
                    <div id="template-cornell" class="template-fields space-y-4 hidden">
                        <div><label for="noteCornellTitle" class="block text-sm font-semibold text-slate-700 mb-2">課程/主題</label><input type="text" id="noteCornellTitle" class="note-input" placeholder="今天上的課程或主題" /></div>
                        <div><label for="noteCornellCues" class="block text-sm font-semibold text-slate-700 mb-2">關鍵字/問題 (Cues)</label><textarea id="noteCornellCues" class="note-input h-24" placeholder="寫下重要關鍵字和問題..."></textarea></div>
                        <div><label for="noteCornellNotes" class="block text-sm font-semibold text-slate-700 mb-2">課堂筆記 (Notes)</label><textarea id="noteCornellNotes" class="note-input h-32" placeholder="詳細記錄課堂內容..."></textarea></div>
                        <div><label for="noteCornellSummary" class="block text-sm font-semibold text-slate-700 mb-2">總結 (Summary)</label><textarea id="noteCornellSummary" class="note-input h-24" placeholder="用 2-3 句話總結這堂課的核心..."></textarea></div>
                    </div>

                    <!-- Mind Map Template -->
                    <div id="template-mindmap" class="template-fields space-y-4 hidden">
                        <div><label for="noteMindmapCentral" class="block text-sm font-semibold text-slate-700 mb-2">中心主題</label><input type="text" id="noteMindmapCentral" class="note-input" placeholder="核心概念是什麼？" /></div>
                        <div><label for="noteMindmapBranches" class="block text-sm font-semibold text-slate-700 mb-2">主要分支 (每行一個)</label><textarea id="noteMindmapBranches" class="note-input h-32" placeholder="分支1&#10;分支2&#10;分支3"></textarea></div>
                        <div><label for="noteMindmapDetails" class="block text-sm font-semibold text-slate-700 mb-2">細節補充</label><textarea id="noteMindmapDetails" class="note-input h-32" placeholder="每個分支的詳細說明..."></textarea></div>
                    </div>

                    <!-- Feynman Template -->
                    <div id="template-feynman" class="template-fields space-y-4 hidden">
                        <div><label for="noteFeynmanConcept" class="block text-sm font-semibold text-slate-700 mb-2">要解釋的概念</label><input type="text" id="noteFeynmanConcept" class="note-input" placeholder="例如：光合作用" /></div>
                        <div><label for="noteFeynmanSimple" class="block text-sm font-semibold text-slate-700 mb-2">用簡單的話解釋 (像在教小學生)</label><textarea id="noteFeynmanSimple" class="note-input h-32" placeholder="想像你在跟一個8歲小孩解釋..."></textarea></div>
                        <div><label for="noteFeynmanAnalogy" class="block text-sm font-semibold text-slate-700 mb-2">用比喻/舉例說明</label><textarea id="noteFeynmanAnalogy" class="note-input h-24" placeholder="就像是..."></textarea></div>
                        <div><label for="noteFeynmanGaps" class="block text-sm font-semibold text-slate-700 mb-2">我還說不清楚的部分</label><textarea id="noteFeynmanGaps" class="note-input h-24" placeholder="哪些地方我講得不夠清楚？"></textarea></div>
                    </div>

                    <button id="generateNoteBtn" class="btn btn-primary w-full">✨ 產生筆記</button>
                </div>

                <div>
                    <label for="generatedNote" class="block text-sm font-semibold text-slate-700 mb-2">產生的筆記</label>
                    <textarea id="generatedNote" readonly placeholder="點擊「產生筆記」後，內容將顯示於此..."></textarea>
                    <div class="flex gap-3 mt-4">
                        <button id="copyNoteBtn" class="btn btn-secondary flex-1">📋 複製到剪貼簿</button>
                        <button id="clearNoteBtn" class="btn btn-clear flex-1">🗑️ 清除</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Voice Note -->
        <section id="tab-content-voice" class="tab-content">
            <h2 class="section-title">🎙️ 語音筆記工具</h2>
            <p class="text-slate-700 mb-4 text-lg leading-relaxed">
                將口說內容即時轉為文字，適合快速記錄靈感、聽課筆記或草擬文章。
            </p>
            <div class="content-box">
                <div class="voice-note-container">
                    <div class="transcript-container" id="transcriptContainer-voice">
                        <pre id="transcript-output"><span class="placeholder" id="placeholder-text-voice">點擊「開始辨識」後，你的逐字稿將會顯示在這裡...</span></pre>
                    </div>
                    
                    <div class="voice-settings">
                        <label for="languageSelector-voice">辨識語言:</label>
                        <select id="languageSelector-voice" title="選擇要進行辨識的語言">
                            <option value="zh-TW">中文 (台灣TW)</option>
                            <option value="zh-CN">中文 (中国大陆CN)</option>
                            <option value="zh-HK">粵語 (香港HK)</option>
                            <option value="en-US">English (US)</option>
                            <option value="en-GB">English (UK)</option>
                            <option value="ja-JP">日本語(JP)</option>
                            <option value="ko-KR">한국어(KR)</option>
                            <option value="es-ES">Español (España)</option>
                            <option value="fr-FR">Français</option>
                            <option value="de-DE">Deutsch</option>
                        </select>
                    </div>
                    
                    <div class="voice-controls">
                        <button id="controlBtn-voice" class="btn btn-primary">開始辨識</button>
                        <button id="copyBtn-voice" class="btn btn-secondary" disabled>複製內容</button>
                        <button id="sendToNoteBtn-voice" class="btn btn-info" disabled>📝 傳送到筆記</button>
                        <button id="exportBtn-voice" class="btn btn-clear" disabled>輸出逐字稿</button>
                    </div>

                    <div class="warning-notice">
                        ⚠️ 本工具將把收到音檔上傳 Google 請謹慎使用
                    </div>
                </div>
            </div>
            <div class="privacy-notice mt-4">
                <details>
                    <summary>使用須知 & 隱私聲明</summary>
                    <div class="content">
                        <p>本工具透過瀏覽器內建的 Web Speech API 進行語音轉文字，這會將您的聲音資料傳送到 Google 的伺服器進行處理。請務必了解以下事項：</p>
                        <h3>適合的使用場景：</h3>
                        <ul>
                            <li class="safe">輔助聆聽公開的線上演講、課程。</li>
                            <li class="safe">轉錄影片、Podcast 等公開內容。</li>
                            <li class="safe">個人學習、語言練習。</li>
                        </ul>
                        <h3>高風險場景 (絕對不要使用)：</h3>
                        <ul>
                            <li class="unsafe">任何涉及<strong>商業機密</strong>或公司內部資訊的會議。</li>
                            <li class="unsafe">任何涉及<strong>個人隱私</strong>的對話 (例如與醫生、律師的對話)。</li>
                            <li class="unsafe">任何包含<strong>敏感個資</strong>的內容 (如身分證號、密碼等)。</li>
                        </ul>
                        <p>針對敏感內容，強烈建議使用像 Whisper 這樣完全在您本機離線運作的工具，以確保資料安全。</p>
                    </div>
                </details>
            </div>
        </section>

        <!-- Flashcards -->
        <section id="tab-content-flashcards" class="tab-content">
            <h2 class="section-title">🎴 記憶卡片系統</h2>
            <p class="text-slate-700 mb-4 text-lg leading-relaxed">
                製作問答卡片，點擊翻面查看答案。定期複習加深記憶！
            </p>
            
            <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div class="content-box">
                    <h3 class="font-bold text-lg mb-3 text-blue-800">新增卡片</h3>
                    <div class="space-y-3">
                        <div><label for="flashcardQuestion" class="block text-sm font-semibold text-slate-700 mb-2">問題/正面</label><textarea id="flashcardQuestion" class="note-input h-24" placeholder="例如：什麼是光合作用？"></textarea></div>
                        <div><label for="flashcardAnswer" class="block text-sm font-semibold text-slate-700 mb-2">答案/背面</label><textarea id="flashcardAnswer" class="note-input h-24" placeholder="光合作用是植物利用光能..."></textarea></div>
                        <div><label for="flashcardCategory" class="block text-sm font-semibold text-slate-700 mb-2">分類標籤</label><input type="text" id="flashcardCategory" class="note-input" placeholder="例如：生物、第三章" /></div>
                        <button id="addFlashcardBtn" class="btn btn-primary w-full">➕ 新增卡片</button>
                    </div>
                </div>
                
                <div class="content-box">
                    <h3 class="font-bold text-lg mb-3 text-blue-800">卡片預覽</h3>
                    <div id="flashcardPreview" class="flashcard">
                        <div class="flashcard-inner">
                            <div class="flashcard-front"><div class="text-center"><p class="text-sm mb-2 opacity-75">👆 點擊卡片翻面</p><p id="previewQuestion">製作你的第一張卡片</p></div></div>
                            <div class="flashcard-back"><div class="text-center"><p class="text-sm mb-2 opacity-75">答案</p><p id="previewAnswer">背面內容會顯示在這裡</p></div></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="content-box">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-bold text-lg text-blue-800">我的卡片庫 (<span id="flashcardCount">0</span> 張)</h3>
                    <div class="flex gap-2">
                        <select id="flashcardFilterCategory" class="note-input text-sm"><option value="all">全部分類</option></select>
                        <button class="btn btn-info text-sm" onclick="startFlashcardReview()">🔄 開始複習</button>
                        <button class="btn btn-danger text-sm" onclick="clearAllFlashcards()">🗑️ 清空全部</button>
                    </div>
                </div>
                <div id="flashcardList" class="space-y-2"></div>
            </div>
        </section>

        <!-- Pomodoro Timer -->
        <section id="tab-content-pomodoro" class="tab-content">
            <h2 class="section-title">⏱️ 番茄鐘專注計時器</h2>
            <p class="text-slate-700 mb-6 text-lg leading-relaxed">
                使用番茄工作法：25 分鐘專注學習 → 5 分鐘休息 → 重複 4 次後休息 15-30 分鐘。
            </p>
            
            <div class="content-box max-w-2xl mx-auto text-center">
                <div class="mb-6">
                    <div class="timer-display" id="timerDisplay">25:00</div>
                    <div class="text-lg font-semibold text-slate-600 mb-4" id="timerStatus">準備開始學習 🍅</div>
                    <div class="progress-bar mb-4"><div class="progress-fill" id="timerProgress" style="width: 0%"></div></div>
                </div>
                
                <div class="timer-controls mb-6">
                    <button id="timerStart" class="btn btn-primary">▶️ 開始</button>
                    <button id="timerPause" class="btn btn-warning hidden">⏸️ 暫停</button>
                    <button id="timerReset" class="btn btn-danger">🔄 重置</button>
                    <button id="timerSkip" class="btn btn-info">⏭️ 跳過</button>
                </div>
                
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg"><div class="text-3xl font-bold text-blue-600" id="pomodoroCount">0</div><div class="text-sm text-slate-600">完成番茄數</div></div>
                    <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg"><div class="text-3xl font-bold text-green-600" id="studyMinutes">0</div><div class="text-sm text-slate-600">學習分鐘數</div></div>
                    <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg"><div class="text-3xl font-bold text-purple-600" id="breakMinutes">0</div><div class="text-sm text-slate-600">休息分鐘數</div></div>
                </div>
                
                <div class="mt-6 text-left bg-blue-50 p-4 rounded-lg">
                    <h4 class="font-bold text-blue-800 mb-2">📝 當前任務</h4>
                    <input type="text" id="currentTask" class="note-input" placeholder="寫下你現在要做的事..." />
                </div>
            </div>
            
            <div class="mt-6 grid md:grid-cols-3 gap-4">
                <div class="content-box">
                    <h4 class="font-bold text-blue-800 mb-2">⚙️ 自訂時長</h4>
                    <div class="space-y-2">
                        <label class="flex items-center justify-between"><span class="text-sm">專注時間 (分)</span><input type="number" id="focusTime" class="note-input w-20 text-center" value="25" min="1" max="60" /></label>
                        <label class="flex items-center justify-between"><span class="text-sm">短休息 (分)</span><input type="number" id="shortBreak" class="note-input w-20 text-center" value="5" min="1" max="15" /></label>
                        <label class="flex items-center justify-between"><span class="text-sm">長休息 (分)</span><input type="number" id="longBreak" class="note-input w-20 text-center" value="15" min="5" max="30" /></label>
                    </div>
                </div>
                
                <div class="content-box">
                    <h4 class="font-bold text-blue-800 mb-2">🔔 提醒設定</h4>
                    <label class="flex items-center gap-2 mb-2"><input type="checkbox" id="soundEnabled" class="h-4 w-4 rounded" checked /><span class="text-sm">啟用音效提示</span></label>
                    <label class="flex items-center gap-2"><input type="checkbox" id="notificationEnabled" class="h-4 w-4 rounded" /><span class="text-sm">啟用桌面通知</span></label>
                </div>
                
                <div class="content-box">
                    <h4 class="font-bold text-blue-800 mb-2">📊 今日統計</h4>
                    <div class="text-sm space-y-1 text-slate-600">
                        <div class="flex justify-between"><span>今日番茄數：</span><span class="font-bold" id="todayPomodoros">0</span></div>
                        <div class="flex justify-between"><span>今日學習：</span><span class="font-bold" id="todayStudy">0 分鐘</span></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Statistics -->
        <section id="tab-content-stats" class="tab-content">
            <h2 class="section-title">📊 學習統計分析</h2>
            <p class="text-slate-700 mb-6 text-lg leading-relaxed">
                追蹤你的學習進度，了解自己的學習習慣，持續優化！
            </p>
            
            <div class="grid md:grid-cols-4 gap-4 mb-6">
                <div class="stat-card"><div class="stat-number" id="totalTopics">0</div><div class="stat-label">總知識點</div></div>
                <div class="stat-card"><div class="stat-number" id="masteredTopics">0</div><div class="stat-label">已掌握</div></div>
                <div class="stat-card"><div class="stat-number" id="totalNotes">0</div><div class="stat-label">筆記數量</div></div>
                <div class="stat-card"><div class="stat-number" id="totalCards">0</div><div class="stat-label">記憶卡片</div></div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div class="content-box">
                    <h3 class="font-bold text-lg mb-4 text-blue-800">📈 知識掌握度分布</h3>
                    <div class="space-y-3">
                        <div>
                            <div class="flex justify-between mb-1"><span class="text-sm font-medium">✅ 已掌握</span><span class="text-sm font-bold text-green-600" id="greenPercent">0%</span></div>
                            <div class="progress-bar h-4"><div class="progress-fill bg-gradient-to-r from-green-400 to-green-600" id="greenBar" style="width: 0%"></div></div>
                        </div>
                        <div>
                            <div class="flex justify-between mb-1"><span class="text-sm font-medium">⚠️ 半懂的</span><span class="text-sm font-bold text-yellow-600" id="yellowPercent">0%</span></div>
                            <div class="progress-bar h-4"><div class="progress-fill bg-gradient-to-r from-yellow-400 to-yellow-600" id="yellowBar" style="width: 0%"></div></div>
                        </div>
                        <div>
                            <div class="flex justify-between mb-1"><span class="text-sm font-medium">❌ 不會的</span><span class="text-sm font-bold text-red-600" id="redPercent">0%</span></div>
                            <div class="progress-bar h-4"><div class="progress-fill bg-gradient-to-r from-red-400 to-red-600" id="redBar" style="width: 0%"></div></div>
                        </div>
                    </div>
                    
                    <div class="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                        <h4 class="font-bold text-sm mb-2">🎯 進步指標</h4>
                        <div class="text-sm space-y-1">
                            <div class="flex justify-between"><span>本週新增已掌握：</span><span class="font-bold text-green-600" id="weeklyProgress">0 項</span></div>
                            <div class="flex justify-between"><span>需要加強的：</span><span class="font-bold text-red-600" id="needsFocus">0 項</span></div>
                        </div>
                    </div>
                </div>
                
                <div class="content-box">
                    <h3 class="font-bold text-lg mb-4 text-blue-800">🍅 番茄鐘統計</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg"><span class="text-sm font-medium">累計番茄數</span><span class="text-2xl font-bold text-blue-600" id="statTotalPomodoros">0</span></div>
                        <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg"><span class="text-sm font-medium">累計學習時間</span><span class="text-2xl font-bold text-green-600" id="statTotalStudy">0 分鐘</span></div>
                        <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg"><span class="text-sm font-medium">平均每日番茄</span><span class="text-2xl font-bold text-purple-600" id="statAvgDaily">0</span></div>
                        <div class="flex justify-between items-center p-3 bg-orange-50 rounded-lg"><span class="text-sm font-medium">連續學習天數</span><span class="text-2xl font-bold text-orange-600" id="studyStreak">0 天</span></div>
                    </div>
                </div>
            </div>
            
            <div class="content-box mt-6">
                <h3 class="font-bold text-lg mb-4 text-blue-800">📅 本週計畫完成度</h3>
                <div id="weeklyCompletion" class="grid grid-cols-7 gap-2">
                    <div class="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"><div class="text-xs font-semibold text-slate-600 mb-2">週一</div><div class="text-2xl font-bold" id="mon-completion">0%</div><div class="text-xs text-slate-500 mt-1" id="mon-tasks">0/0</div></div>
                    <div class="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"><div class="text-xs font-semibold text-slate-600 mb-2">週二</div><div class="text-2xl font-bold" id="tue-completion">0%</div><div class="text-xs text-slate-500 mt-1" id="tue-tasks">0/0</div></div>
                    <div class="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"><div class="text-xs font-semibold text-slate-600 mb-2">週三</div><div class="text-2xl font-bold" id="wed-completion">0%</div><div class="text-xs text-slate-500 mt-1" id="wed-tasks">0/0</div></div>
                    <div class="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"><div class="text-xs font-semibold text-slate-600 mb-2">週四</div><div class="text-2xl font-bold" id="thu-completion">0%</div><div class="text-xs text-slate-500 mt-1" id="thu-tasks">0/0</div></div>
                    <div class="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"><div class="text-xs font-semibold text-slate-600 mb-2">週五</div><div class="text-2xl font-bold" id="fri-completion">0%</div><div class="text-xs text-slate-500 mt-1" id="fri-tasks">0/0</div></div>
                    <div class="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"><div class="text-xs font-semibold text-slate-600 mb-2">週六</div><div class="text-2xl font-bold" id="sat-completion">0%</div><div class="text-xs text-slate-500 mt-1" id="sat-tasks">0/0</div></div>
                    <div class="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"><div class="text-xs font-semibold text-slate-600 mb-2">週日</div><div class="text-2xl font-bold" id="sun-completion">0%</div><div class="text-xs text-slate-500 mt-1" id="sun-tasks">0/0</div></div>
                </div>
                
                <div class="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-green-800">本週整體完成度</span>
                        <span class="text-3xl font-bold text-green-600" id="overall-completion">0%</span>
                    </div>
                    <div class="progress-bar mt-3 h-3"><div class="progress-fill bg-gradient-to-r from-green-400 to-emerald-600" id="overall-bar" style="width: 0%"></div></div>
                </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6 mt-6">
                <div class="content-box bg-gradient-to-br from-blue-50 to-purple-50">
                    <h3 class="font-bold text-lg mb-3 text-blue-800">💡 智能學習建議</h3>
                    <div id="learningTips" class="space-y-2 text-slate-700"></div>
                </div>
                
                <div class="content-box bg-gradient-to-br from-orange-50 to-yellow-50">
                    <h3 class="font-bold text-lg mb-3 text-orange-800">🏆 成就系統</h3>
                    <div id="achievements" class="space-y-2">
                        <div class="flex items-center gap-3 p-2 bg-white rounded-lg"><span class="text-2xl">🌟</span><div class="flex-1"><div class="font-semibold text-sm">初學者</div><div class="text-xs text-slate-500">完成第一個番茄鐘</div></div><span class="text-xs font-bold" id="achievement-1">未達成</span></div>
                        <div class="flex items-center gap-3 p-2 bg-white rounded-lg"><span class="text-2xl">📚</span><div class="flex-1"><div class="font-semibold text-sm">知識收集者</div><div class="text-xs text-slate-500">建立10個知識點</div></div><span class="text-xs font-bold" id="achievement-2">未達成</span></div>
                        <div class="flex items-center gap-3 p-2 bg-white rounded-lg"><span class="text-2xl">🎴</span><div class="flex-1"><div class="font-semibold text-sm">記憶大師</div><div class="text-xs text-slate-500">製作20張記憶卡</div></div><span class="text-xs font-bold" id="achievement-3">未達成</span></div>
                        <div class="flex items-center gap-3 p-2 bg-white rounded-lg"><span class="text-2xl">🔥</span><div class="flex-1"><div class="font-semibold text-sm">堅持不懈</div><div class="text-xs text-slate-500">連續學習7天</div></div><span class="text-xs font-bold" id="achievement-4">未達成</span></div>
                    </div>
                </div>
            </div>
            
            <div class="content-box mt-6">
                <h3 class="font-bold text-lg mb-4 text-blue-800">📈 學習趨勢圖</h3>
                <div class="text-sm text-slate-600 mb-3">過去7天的番茄鐘數量</div>
                <div id="trendChart" class="flex items-end justify-around h-48 bg-gradient-to-t from-blue-50 to-transparent rounded-lg p-4"></div>
            </div>
        </section>

        <!-- Manager -->
        <section id="tab-content-manager" class="tab-content">
            <h2 class="section-title">📂 資料管理中心</h2>
            <p class="text-slate-700 mb-6 text-lg leading-relaxed">
                管理所有筆記、卡片和學習資料。支援搜尋、匯出和備份。
            </p>
            
            <div class="content-box mb-4">
                <div class="flex gap-3 items-center flex-wrap">
                    <input type="search" id="searchNotesInput" class="note-input flex-1" placeholder="🔍 搜尋標題、內容或標籤..." />
                    <button class="btn btn-info" onclick="exportAllData()">💾 匯出全部資料</button>
                    <button class="btn btn-warning" onclick="importData()">📥 匯入資料</button>
                    <button class="btn btn-danger" onclick="clearAllData()">🗑️ 清空全部</button>
                </div>
            </div>
            
            <div class="grid md:grid-cols-3 gap-4 mb-6">
                <button class="content-box text-center cursor-pointer hover:shadow-lg" onclick="filterNotes('all')"><div class="text-4xl mb-2">📚</div><div class="font-bold text-lg">全部筆記</div><div class="text-2xl font-bold text-blue-600" id="allNotesCount">0</div></button>
                <button class="content-box text-center cursor-pointer hover:shadow-lg" onclick="filterNotes('recent')"><div class="text-4xl mb-2">🕐</div><div class="font-bold text-lg">最近編輯</div><div class="text-sm text-slate-600">7天內</div></button>
                <button class="content-box text-center cursor-pointer hover:shadow-lg" onclick="filterNotes('important')"><div class="text-4xl mb-2">⭐</div><div class="font-bold text-lg">重要筆記</div><div class="text-sm text-slate-600">已標記</div></button>
            </div>
            
            <div id="notesManager"></div>
        </section>

    </div>

    <!-- 引用外部 JavaScript 檔案 -->
    <script src="script.js"></script>
</body>
</html>
```

### 2. CSS 樣式 (`style.css`)

這部分與上次相同，是所有的網頁樣式。

```css
/* --- 學習導航系統 原有 CSS --- */
* { box-sizing: border-box; }
body { 
    font-family: 'Inter', system-ui, sans-serif;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%);
    min-height: 100vh;
    position: relative;
}
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
}
.main-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5);
    position: relative;
    z-index: 1;
}

/* Tabs */
.tab-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    padding: 0.75rem;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-radius: 1rem;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}
.tab-btn {
    flex: 1;
    min-width: 140px;
    padding: 1rem 1.25rem;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 0.75rem;
    border: 2px solid transparent;
    text-align: center;
    user-select: none;
    position: relative;
    overflow: hidden;
}
.tab-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
}
.tab-btn:hover::before {
    left: 100%;
}
.tab-btn.active {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
}
.tab-btn.inactive {
    color: #475569;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.tab-btn.inactive:hover {
    color: #1e3a8a;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-color: #e0f2fe;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tab-content {
    display: none;
    animation: fadeIn 0.4s ease-out;
}
.tab-content.active {
    display: block;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
}

h2.section-title {
    font-size: 1.85rem;
    font-weight: 800;
    color: #1e3a8a;
    margin-bottom: 1.25rem;
    border-left: 6px solid #3b82f6;
    padding-left: 1rem;
    background: linear-gradient(90deg, #dbeafe 0%, transparent 100%);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 0 0.5rem 0.5rem 0;
}
h3.section-subtitle {
    font-size: 1.35rem;
    font-weight: 700;
    color: #1e293b;
    margin-top: 1.75rem;
    margin-bottom: 1rem;
}

.content-box {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border: 1px solid #e2e8f0;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}
.content-box:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

/* Knowledge Triage */
.knowledge-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    border-radius: 0.75rem;
    margin-bottom: 0.75rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    gap: 1rem;
    flex-wrap: wrap;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.knowledge-item:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.knowledge-item.status-green { 
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); 
    border-left: 5px solid #10b981;
}
.knowledge-item.status-yellow { 
    background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%); 
    border-left: 5px solid #eab308;
}
.knowledge-item.status-red { 
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); 
    border-left: 5px solid #ef4444;
}
.status-btn {
    border: none; 
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    font-size: 1.5rem; 
    padding: 0.5rem;
    opacity: 0.5; 
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.status-btn:hover {
    opacity: 1;
    transform: scale(1.3) rotate(5deg);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
.btn-delete {
    background: linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%);
    color: #b91c1c; 
    font-size: 0.8rem;
    font-weight: 600;
    border: none; 
    padding: 0.4rem 0.75rem; 
    border-radius: 0.5rem;
    cursor: pointer; 
    opacity: 0.8; 
    transition: all 0.3s ease;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.btn-delete:hover {
    opacity: 1; 
    background: linear-gradient(135deg, #fca5a5 0%, #f87171 100%);
    transform: scale(1.05);
}

/* Planner */
.planner-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
}
.day-column {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 1rem;
    padding: 1.25rem;
    border: 2px solid #e2e8f0;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.day-column:hover {
    border-color: #93c5fd;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
    transform: translateY(-2px);
}
.day-header {
    font-size: 1.3rem; 
    font-weight: 700; 
    color: #1e40af;
    border-bottom: 3px solid #dbeafe; 
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #dbeafe 0%, transparent 100%);
    padding-left: 0.5rem;
    border-radius: 0.5rem 0.5rem 0 0;
}
.task-item {
    display: flex; 
    align-items: center; 
    gap: 0.75rem;
    font-size: 0.95rem; 
    padding: 0.5rem;
    word-break: break-word;
    border-radius: 0.5rem;
    user-select: none;
    cursor: default;
    transition: all 0.2s ease;
    background: white;
    margin-bottom: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.task-item:hover {
    background: #f8fafc;
    transform: translateX(4px);
}
.task-item.is-buffer {
    background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%);
    border-left: 3px solid #eab308;
    color: #854d0e; 
    font-weight: 600;
}
.task-item.completed {
    text-decoration: line-through;
    color: #94a3b8;
    opacity: 0.6;
}

/* Inputs */
.note-input {
    width: 100%;
    padding: 0.85rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    resize: vertical;
    background: white;
}
.note-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
    background: #fafcff;
}

/* Buttons */
.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
}
.btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}
.btn:active::before {
    width: 300px;
    height: 300px;
}
.btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
}
.btn-primary:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
}
.btn-secondary {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
}
.btn-secondary:hover {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(16, 185, 129, 0.4);
}
.btn-danger {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
}
.btn-danger:hover {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(239, 68, 68, 0.4);
}
.btn-clear {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    color: #475569;
}
.btn-clear:hover {
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
    transform: translateY(-1px);
}
.btn-info {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    color: white;
}
.btn-info:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(139, 92, 246, 0.4);
}
.btn-warning {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
}
.btn-warning:hover {
    background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(245, 158, 11, 0.4);
}

#generatedNote {
    width: 100%;
    min-height: 350px;
    background: #fafcff;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    padding: 1.25rem;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.9rem;
    white-space: pre-wrap;
    resize: vertical;
    line-height: 1.6;
}
.template-fields {
    animation: fadeIn 0.3s ease-out;
}

/* Statistics */
.stat-card {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
    border: 2px solid #e2e8f0;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}
.stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.stat-label {
    font-size: 0.95rem;
    color: #64748b;
    margin-top: 0.5rem;
    font-weight: 600;
}

/* Notes Manager */
#notesManager {
    margin-top: 1rem;
    max-height: 400px;
    overflow-y: auto;
    border: 2px solid #e2e8f0;
    border-radius: 1rem;
    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
    padding: 1rem;
}
.note-item {
    border-bottom: 1px solid #e2e8f0;
    padding: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
}
.note-item:hover {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    transform: translateX(4px);
    border-color: transparent;
}
.note-title {
    font-weight: 700;
    color: #1e40af;
    font-size: 1.05rem;
}
.note-tags {
    color: #7c3aed;
    font-size: 0.85rem;
    margin-left: 0.75rem;
    white-space: nowrap;
    font-weight: 500;
}
.note-date {
    font-size: 0.8rem;
    color: #64748b;
    font-weight: 500;
}

/* Pomodoro Timer */
.timer-display {
    font-size: 4rem;
    font-weight: 800;
    text-align: center;
    color: #1e40af;
    margin: 2rem 0;
    font-variant-numeric: tabular-nums;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.timer-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

/* Progress Bar */
.progress-bar {
    width: 100%;
    height: 1.5rem;
    background: #e2e8f0;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}
.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
    transition: width 0.3s ease;
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
    animation: fadeIn 0.3s ease;
}
.modal {
    background: white;
    padding: 2rem;
    border-radius: 1.5rem;
    max-width: 90vw;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
}
@keyframes slideUp {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
}

.hidden {
    display: none !important;
}

/* Mind Map */
.mindmap-node {
    background: white;
    border: 2px solid #3b82f6;
    border-radius: 0.75rem;
    padding: 1rem;
    margin: 0.5rem;
    display: inline-block;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: move;
}
.mindmap-node:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3);
}

/* Flashcard */
.flashcard {
    perspective: 1000px;
    width: 100%;
    min-height: 300px;
    cursor: pointer;
}
.flashcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 300px;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}
.flashcard.flipped .flashcard-inner {
    transform: rotateY(180deg);
}
.flashcard-front, .flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 300px;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-size: 1.25rem;
    font-weight: 600;
}
.flashcard-front {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
}
.flashcard-back {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    transform: rotateY(180deg);
}

@media (max-width: 768px) {
    .tab-buttons {
        flex-direction: column;
    }
    .tab-btn {
        min-width: unset;
        flex: none;
    }
    .planner-grid {
        grid-template-columns: 1fr !important;
    }
    .timer-display {
        font-size: 3rem;
    }
}

/* --- 語音筆記 CSS --- */
.voice-note-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}
.transcript-container {
    width: 100%;
    height: 40vh;
    min-height: 300px;
    border: 2px solid #e2e8f0;
    border-radius: 1rem;
    background-color: #f8fafc;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    overflow-y: scroll;
    padding: 1rem;
}
#transcript-output {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 1rem;
    line-height: 1.7;
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
    color: #334155;
}
#transcript-output .interim { color: #94a3b8; font-style: italic; }
#transcript-output .placeholder { color: #94a3b8; }

.voice-settings {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #f1f5f9;
    padding: 0.75rem 1.25rem;
    border-radius: 1rem;
    border: 1px solid #e2e8f0;
    flex-wrap: wrap;
}
.voice-settings label {
    color: #1e3a8a;
    font-weight: 600;
    font-size: 0.9rem;
}
.voice-settings select {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    border: 2px solid #cbd5e1;
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
}
.voice-controls { 
    display: flex; 
    flex-wrap: wrap;
    gap: 0.75rem; 
    justify-content: center;
}
.voice-controls .btn {
    min-width: 150px;
    text-align: center;
}
.voice-controls .btn.listening::after {
    content: '●';
    margin-left: 0.5rem;
    color: #ef4444;
    animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}
.warning-notice {
    background: #fefce8;
    color: #854d0e;
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: center;
    width: 100%;
    border: 1px solid #fde047;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}
.privacy-notice details {
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    background: #f8fafc;
}
.privacy-notice summary {
    padding: 0.75rem 1.25rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    color: #334155;
}
.privacy-notice .content {
    padding: 0 1.25rem 1.25rem 1.25rem;
    line-height: 1.6;
    color: #475569;
    font-size: 0.9rem;
}
.privacy-notice h3 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #1e40af;
    font-weight: 600;
}
.privacy-notice ul {
    padding-left: 1.25rem;
    margin: 0;
}
.privacy-notice ul li {
    margin-bottom: 0.5rem;
}
.privacy-notice ul li.safe::before { content: '✅ '; }
.privacy-notice ul li.unsafe::before { content: '❌ '; }
.privacy-notice strong { 
    color: #be123c;
    font-weight: 700;
}
```

### 3. JavaScript 邏輯 (`script.js`)

這是驅動整個應用程式互動功能的**完整**程式碼。

```javascript
// 全域變數
const ls = window.localStorage;
let knowledgeList = JSON.parse(ls.getItem('knowledgeList') || '[]');
let planner = JSON.parse(ls.getItem('studyPlanner') || '{"mon":[], "tue":[], "wed":[], "thu":[], "fri":[], "sat":[], "sun":[]}');
let notesStorage = JSON.parse(ls.getItem('notesStorage') || '[]');
let flashcards = JSON.parse(ls.getItem('flashcards') || '[]');
let pomodoroStats = JSON.parse(ls.getItem('pomodoroStats') || '{"total": 0, "studyMinutes": 0, "breakMinutes": 0, "today": 0, "todayStudy": 0, "lastDate": ""}');
let currentFilter = 'all';
let timerInterval = null;
let timerState = {
    mode: 'focus', // focus, shortBreak, longBreak
    timeLeft: 25 * 60,
    isRunning: false,
    pomodoroCount: 0
};

// Tab切換
document.addEventListener('DOMContentLoaded', () => {
    const tabs = {
        guide: 'tab-content-guide',
        triage: 'tab-content-triage',
        planner: 'tab-content-planner',
        notes: 'tab-content-notes',
        voice: 'tab-content-voice',
        flashcards: 'tab-content-flashcards',
        pomodoro: 'tab-content-pomodoro',
        stats: 'tab-content-stats',
        manager: 'tab-content-manager'
    };

    window.setActiveTab = function(activeName) {
        Object.keys(tabs).forEach(key => {
            const btn = document.getElementById(`tab-btn-${key}`);
            const content = document.getElementById(tabs[key]);
            const isActive = key === activeName;
            
            btn.classList.toggle('active', isActive);
            btn.classList.toggle('inactive', !isActive);
            content.classList.toggle('active', isActive);
        });
        
        if (activeName === 'stats') updateStats();
        if (activeName === 'manager') renderNotesManager();

        if (activeName !== 'voice' && window.voiceNoteModule && window.voiceNoteModule.isRecognizing()) {
            window.voiceNoteModule.stopRecognition();
        }
    }

    Object.keys(tabs).forEach(key => {
        document.getElementById(`tab-btn-${key}`).addEventListener('click', () => setActiveTab(key));
    });

    // 初始化
    renderKnowledgeList();
    renderPlanner();
    renderFlashcardList();
    updatePomodoroDisplay();
    if (window.voiceNoteModule) {
        window.voiceNoteModule.init();
    }
    setActiveTab('guide');
    
    checkPomodoroDate();
});

// ===== 知識盤點 =====
function renderKnowledgeList() {
    const container = document.getElementById('knowledgeListContainer');
    container.innerHTML = '';
    
    if (knowledgeList.length === 0) {
        container.innerHTML = '<p class="text-slate-500 text-center p-6">目前沒有項目。請從上方新增。</p>';
        return;
    }
    
    const filtered = knowledgeList.filter(i => currentFilter === 'all' || i.status === currentFilter);
    
    if (filtered.length === 0) {
        container.innerHTML = '<p class="text-slate-500 text-center p-6">沒有符合此狀態的項目。</p>';
        return;
    }
    
    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = `knowledge-item status-${item.status}`;
        div.innerHTML = `
            <span class="font-semibold text-lg">${item.topic}</span>
            <div class="flex items-center gap-3 flex-wrap">
                <button class="status-btn" onclick="changeStatus(${item.id}, 'green')" title="我會的">✅</button>
                <button class="status-btn" onclick="changeStatus(${item.id}, 'yellow')" title="半懂的">⚠️</button>
                <button class="status-btn" onclick="changeStatus(${item.id}, 'red')" title="不會的">❌</button>
                <button class="btn-delete" onclick="deleteTopic(${item.id})">刪除</button>
            </div>
        `;
        
        const activeBtn = div.querySelector(`.status-btn[onclick*="${item.status}"]`);
        if (activeBtn) {
            activeBtn.style.opacity = 1;
            activeBtn.style.transform = 'scale(1.2)';
        }
        
        container.appendChild(div);
    });
}

document.getElementById('addTopicBtn').addEventListener('click', () => {
    const topic = document.getElementById('topicInput').value.trim();
    const status = document.getElementById('statusSelect').value;
    
    if (topic) {
        knowledgeList.push({ id: Date.now(), topic, status });
        ls.setItem('knowledgeList', JSON.stringify(knowledgeList));
        document.getElementById('topicInput').value = '';
        renderKnowledgeList();
    }
});

function changeStatus(id, newStatus) {
    const item = knowledgeList.find(i => i.id === id);
    if (item) {
        item.status = newStatus;
        ls.setItem('knowledgeList', JSON.stringify(knowledgeList));
        renderKnowledgeList();
    }
}

function deleteTopic(id) {
    if (confirm('確定要刪除這個項目嗎？')) {
        knowledgeList = knowledgeList.filter(i => i.id !== id);
        ls.setItem('knowledgeList', JSON.stringify(knowledgeList));
        renderKnowledgeList();
    }
}

function filterKnowledge(status) {
    currentFilter = status;
    renderKnowledgeList();
}

document.getElementById('clearTriageBtn').addEventListener('click', () => {
    if (confirm('您確定要清空所有知識盤點項目嗎？此動作無法復原。')) {
        knowledgeList = [];
        ls.setItem('knowledgeList', JSON.stringify(knowledgeList));
        renderKnowledgeList();
    }
});

function exportKnowledge() {
    const text = knowledgeList.map(i => `${i.topic}\t${i.status}`).join('\n');
    downloadFile('知識盤點.txt', text);
}

// ===== 讀書計畫 =====
function renderPlanner() {
    Object.keys(planner).forEach(day => {
        const ul = document.getElementById(`day-${day}`).querySelector('ul');
        ul.innerHTML = '';
        
        if (planner[day].length === 0) {
            ul.innerHTML = '<li class="text-slate-400 text-sm select-none">暫無任務</li>';
            return;
        }
        
        planner[day].forEach((task, idx) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            if (task.isBuffer) li.classList.add('is-buffer');
            if (task.completed) li.classList.add('completed');
            
            li.innerHTML = `
                <input type="checkbox" class="h-5 w-5 rounded" ${task.completed ? 'checked' : ''} 
                    onchange="toggleTask('${day}', ${idx})">
                <span>${task.isBuffer ? '🔑' : '⭐'} ${task.text}</span>
            `;
            
            ul.appendChild(li);
        });
    });
}

document.getElementById('addTaskBtn').addEventListener('click', () => {
    const text = document.getElementById('taskInput').value.trim();
    const day = document.getElementById('daySelect').value;
    const isBuffer = document.getElementById('isBufferCheck').checked;
    
    if (text) {
        planner[day].push({ text, isBuffer, completed: false });
        ls.setItem('studyPlanner', JSON.stringify(planner));
        document.getElementById('taskInput').value = '';
        document.getElementById('isBufferCheck').checked = false;
        renderPlanner();
    }
});

function toggleTask(day, idx) {
    planner[day][idx].completed = !planner[day][idx].completed;
    ls.setItem('studyPlanner', JSON.stringify(planner));
    renderPlanner();
}

document.getElementById('clearPlannerBtn').addEventListener('click', () => {
    if (confirm('您確定要清空本週所有計畫嗎？此動作無法復原。')) {
        planner = {"mon":[], "tue":[], "wed":[], "thu":[], "fri":[], "sat":[], "sun":[]};
        ls.setItem('studyPlanner', JSON.stringify(planner));
        renderPlanner();
    }
});

function exportPlanner() {
    const days = {mon:'一', tue:'二', wed:'三', thu:'四', fri:'五', sat:'六', sun:'日'};
    let text = '本週讀書計畫\n\n';
    Object.keys(planner).forEach(day => {
        text += `星期${days[day]}:\n`;
        planner[day].forEach(task => {
            text += `  ${task.completed ? '☑' : '☐'} ${task.text}${task.isBuffer ? ' (抓漏時間)' : ''}\n`;
        });
        text += '\n';
    });
    downloadFile('讀書計畫.txt', text);
}

// ===== 筆記產生器 =====
const noteTemplateSelect = document.getElementById('noteTemplateSelect');
const generateNoteBtn = document.getElementById('generateNoteBtn');
const copyNoteBtn = document.getElementById('copyNoteBtn');
const generatedNote = document.getElementById('generatedNote');

noteTemplateSelect.addEventListener('change', () => {
    const selected = noteTemplateSelect.value;
    document.querySelectorAll('.template-fields').forEach(div => div.classList.add('hidden'));
    document.getElementById(`template-${selected}`).classList.remove('hidden');
    
    if (selected === 'zettelkasten') {
        document.getElementById('noteZettelID').value = getTimestampID();
    } else if (selected === 'bujo' || selected === 'diary') {
        const dateField = selected === 'bujo' ? 'noteBujoDate' : 'noteDiaryDate';
        document.getElementById(dateField).value = getTodayDate();
    }
});

generateNoteBtn.addEventListener('click', () => {
    const tpl = noteTemplateSelect.value;
    let note = '';
    let meta = {id: getTimestampID(), date: new Date().toISOString(), template: tpl};
    
    if (tpl === 'default') {
        const theme = document.getElementById('noteTheme').value;
        const points = document.getElementById('notePoints').value;
        const learned = document.getElementById('noteLearned').value;
        const question = document.getElementById('noteQuestion').value;
        note = `## 🧠 主題：${theme || '（尚未填寫）'}\n--------------------\n### 🎯 重點3句\n${points || '（尚未填寫）'}\n\n### ✅ 我學到什麼\n${learned || '（尚未填寫）'}\n\n### ❓ 我還不懂什麼\n${question || '（尚未填寫）'}`;
        meta.title = theme || "學習反思";
    } else if (tpl === 'diary') {
        const date = document.getElementById('noteDiaryDate').value || getTodayDate();
        const mood = document.getElementById('noteDiaryMood').value;
        const goodThings = document.getElementById('noteDiaryGoodThings').value;
        const improve = document.getElementById('noteDiaryImprove').value;
        const reflection = document.getElementById('noteDiaryReflection').value;
        note = `## ✍️ ${date} 日記 (${mood || '心情未記錄'})\n--------------------\n### 👍 今日三件好事\n${goodThings || '（尚未填寫）'}\n\n### 🌱 一件可以做得更好的事\n${improve || '（尚未填寫）'}\n\n### 💬 今日反思\n${reflection || '（尚未填寫）'}`;
        meta.title = `${date} 的日記`;
    } else if (tpl === 'book-report') {
        const title = document.getElementById('noteBookTitle').value;
        const core = document.getElementById('noteBookCore').value;
        const takeaways = document.getElementById('noteBookTakeaways').value;
        const quote = document.getElementById('noteBookQuote').value;
        const apply = document.getElementById('noteBookApply').value;
        note = `## 📖 讀書心得：${title || '（書名未填）'}\n--------------------\n### 核心概念\n${core || '（尚未填寫）'}\n\n### 三個主要收穫\n${takeaways || '（尚未填寫）'}\n\n### 觸動我的話\n${quote || '（尚未填寫）'}\n\n### 我將如何應用\n${apply || '（尚未填寫）'}`;
        meta.title = `《${title || '未命名書籍'}》讀書心得`;
    } else if (tpl === 'bujo') {
        const date = document.getElementById('noteBujoDate').value || getTodayDate();
        const tasks = document.getElementById('noteBujoTasks').value.split('\n').filter(l => l.trim()).map(l => `⬜ ${l.trim()}`).join('\n');
        const events = document.getElementById('noteBujoEvents').value.split('\n').filter(l => l.trim()).map(l => `○ ${l.trim()}`).join('\n');
        const notes = document.getElementById('noteBujoNotes').value.split('\n').filter(l => l.trim()).map(l => `• ${l.trim()}`).join('\n');
        note = `## 📅 ${date} - 每日紀錄\n--------------------\n### ⬜ 任務\n${tasks || '（沒有任務）'}\n\n### ○ 事件\n${events || '（沒有事件）'}\n\n### • 筆記\n${notes || '（沒有筆記）'}`;
        meta.title = `每日紀錄 ${date}`;
    } else if (tpl === 'zettelkasten') {
        const id = document.getElementById('noteZettelID').value || meta.id;
        const title = document.getElementById('noteZettelTitle').value;
        const content = document.getElementById('noteZettelContent').value;
        const tags = document.getElementById('noteZettelTags').value;
        const links = document.getElementById('noteZettelLinks').value;
        note = `ID: ${id}\nTitle: ${title || '（請填寫標題）'}\n--------------------\n${content || '（請填寫內容）'}\n--------------------\nTags: ${tags || '（沒有標籤）'}\nLinks: ${links || '（沒有連結）'}`;
        meta.id = id;
        meta.title = title || '無標題';
        meta.tags = tags.split(/\s*#\s*/).filter(t => t);
    } else if (tpl === 'cornell') {
        const title = document.getElementById('noteCornellTitle').value;
        const cues = document.getElementById('noteCornellCues').value;
        const notes = document.getElementById('noteCornellNotes').value;
        const summary = document.getElementById('noteCornellSummary').value;
        note = `## 📖 康乃爾筆記：${title}\n--------------------\n### 關鍵字/問題\n${cues}\n\n### 課堂筆記\n${notes}\n\n### 總結\n${summary}`;
        meta.title = title || '康乃爾筆記';
    } else if (tpl === 'mindmap') {
        const central = document.getElementById('noteMindmapCentral').value;
        const branches = document.getElementById('noteMindmapBranches').value;
        const details = document.getElementById('noteMindmapDetails').value;
        note = `## 🌳 心智圖：${central}\n--------------------\n### 主要分支\n${branches}\n\n### 詳細內容\n${details}`;
        meta.title = central || '心智圖';
    } else if (tpl === 'feynman') {
        const concept = document.getElementById('noteFeynmanConcept').value;
        const simple = document.getElementById('noteFeynmanSimple').value;
        const analogy = document.getElementById('noteFeynmanAnalogy').value;
        const gaps = document.getElementById('noteFeynmanGaps').value;
        note = `## 👨‍🏫 費曼技巧：${concept}\n--------------------\n### 簡單解釋\n${simple}\n\n### 比喻/舉例\n${analogy}\n\n### 需要加強的部分\n${gaps}`;
        meta.title = concept || '費曼筆記';
    }
    
    generatedNote.value = note.trim();
    addNoteToStorage(meta, note.trim());
    alert('✅ 筆記已產生並儲存！');
});

copyNoteBtn.addEventListener('click', () => {
    if (!generatedNote.value) {
        alert('請先產生筆記！');
        return;
    }
    navigator.clipboard.writeText(generatedNote.value).then(() => {
        alert('📋 筆記已複製到剪貼簿！');
    });
});

document.getElementById('clearNoteBtn')?.addEventListener('click', () => {
    generatedNote.value = '';
});

function addNoteToStorage(meta, content) {
    notesStorage.push({
        id: meta.id,
        title: meta.title || '無標題',
        tags: meta.tags || [],
        template: meta.template,
        content: content,
        created: meta.date || new Date().toISOString(),
        lastModified: new Date().toISOString(),
        important: false
    });
    ls.setItem('notesStorage', JSON.stringify(notesStorage));
}

// ===== 語音筆記模組 =====
window.voiceNoteModule = (function() {
    const UIElements = {
        transcript: document.getElementById('transcript-output'),
        transcriptContainer: document.getElementById('transcriptContainer-voice'),
        controlBtn: document.getElementById('controlBtn-voice'),
        exportBtn: document.getElementById('exportBtn-voice'),
        copyBtn: document.getElementById('copyBtn-voice'),
        sendToNoteBtn: document.getElementById('sendToNoteBtn-voice'),
        languageSelector: document.getElementById('languageSelector-voice'),
    };

    const state = {
        startTime: null,
        endTime: null,
        transcriptSegments: [],
        isRecognizing: false,
        interimTranscript: '',
        isManualStop: false,
        recognition: null,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        restartTimeout: null,
        recognitionActive: false,
    };
    
    function init() {
        loadPreferences();
        setupEventListeners();
        initSpeechRecognition();
        updateButtonStates();
    }

    function setupEventListeners() {
        UIElements.controlBtn.addEventListener('click', toggleRecognition);
        UIElements.exportBtn.addEventListener('click', exportTranscript);
        UIElements.copyBtn.addEventListener('click', copyTranscript);
        UIElements.sendToNoteBtn.addEventListener('click', sendToNoteTool);
        UIElements.languageSelector.addEventListener('change', () => {
            if (state.recognition) {
                state.recognition.lang = UIElements.languageSelector.value;
            }
            savePreferences();
        });
    }

    function initSpeechRecognition() {
        if (!('webkitSpeechRecognition' in window)) {
            alert("您的瀏覽器不支援 Web Speech API，請使用最新版本的 Chrome 瀏覽器。");
            UIElements.controlBtn.disabled = true;
            return;
        }
        state.recognition = new webkitSpeechRecognition();
        state.recognition.continuous = !state.isMobile;
        state.recognition.interimResults = true;
        state.recognition.maxAlternatives = 1;
        
        state.recognition.onstart = handleRecognitionStart;
        state.recognition.onerror = handleRecognitionError;
        state.recognition.onend = handleRecognitionEnd;
        state.recognition.onresult = handleRecognitionResult;
    }

    function updateButtonStates() {
        UIElements.controlBtn.textContent = state.isRecognizing ? '停止辨識' : '開始辨識';
        UIElements.controlBtn.classList.toggle('listening', state.isRecognizing);
        
        const canExportOrCopy = !state.isRecognizing && state.transcriptSegments.length > 1;
        UIElements.exportBtn.disabled = !canExportOrCopy;
        UIElements.copyBtn.disabled = !canExportOrCopy;
        UIElements.sendToNoteBtn.disabled = !canExportOrCopy;
    }

    function toggleRecognition() {
        if (state.isRecognizing) {
            stopRecognition();
        } else {
            startRecognition();
        }
    }
    
    function startRecognition() {
        state.isManualStop = false;
        state.recognition.lang = UIElements.languageSelector.value;
        state.startTime = new Date();
        state.transcriptSegments = [{ timestamp: state.startTime, text: '--- 錄音開始 ---' }];
        state.interimTranscript = '';
        
        updateTranscriptDisplay();
        
        try {
            if (!state.recognitionActive) state.recognition.start();
        } catch (e) {
            console.error("啟動辨識失敗:", e);
            alert("無法啟動語音辨識，請重新整理頁面再試。");
        }
    }

    function stopRecognition() {
        if (!state.isRecognizing) return;
        state.isManualStop = true;
        if (state.recognitionActive) {
            state.recognition.stop();
        } else {
            handleRecognitionEnd();
        }
    }

    function handleRecognitionStart() {
        state.recognitionActive = true;
        state.isRecognizing = true;
        UIElements.languageSelector.disabled = true;
        updateButtonStates();
    }

    function handleRecognitionError(event) {
        console.error('語音辨識錯誤:', event.error, event);
        state.recognitionActive = false;
        if (event.error === 'not-allowed') {
            alert("您拒絕了麥克風權限。請允許麥克風存取以使用此功能。");
        } else if (event.error === 'network') {
            alert('網路連線問題，請檢查網路設定。');
        }
    }

    function handleRecognitionEnd() {
        state.recognitionActive = false;
        clearTimeout(state.restartTimeout);

        if (!state.isManualStop && state.isRecognizing) {
            const restartDelay = state.isMobile ? 200 : 500;
            state.restartTimeout = setTimeout(() => {
                if (state.isRecognizing && !state.recognitionActive) {
                    try {
                        state.recognition.start();
                    } catch (e) {
                        console.error('自動重啟失敗:', e);
                    }
                }
            }, restartDelay);
        } else {
            state.isRecognizing = false;
            UIElements.languageSelector.disabled = false;
            state.endTime = new Date();
            updateButtonStates();
        }
    }

    function handleRecognitionResult(event) {
        state.interimTranscript = '';
        let final_transcript_this_turn = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                final_transcript_this_turn += transcript.trim() + ' ';
            } else {
                state.interimTranscript += transcript;
            }
        }

        if (final_transcript_this_turn) {
            state.transcriptSegments.push({ timestamp: new Date(), text: final_transcript_this_turn.trim() });
        }

        updateTranscriptDisplay();
    }
    
    function updateTranscriptDisplay() {
        const finalContent = state.transcriptSegments.map(segment => `${formatTime(segment.timestamp)} ${segment.text}`).join('\n');
        UIElements.transcript.innerHTML = `<span class="placeholder" style="display:none;"></span>${finalContent}\n<span class="interim">${state.interimTranscript}</span>`;
        UIElements.transcriptContainer.scrollTop = UIElements.transcriptContainer.scrollHeight;
    }

    function getFullTranscriptText(withTimestamp = true) {
        if (withTimestamp) {
            return state.transcriptSegments.map(segment => `${formatTime(segment.timestamp)} ${segment.text}`).join('\n');
        }
        return state.transcriptSegments.map(segment => segment.text).slice(1).join('\n');
    }

    function exportTranscript() {
        if (!state.startTime || !state.endTime) return;
        const textToSave = getFullTranscriptText().replace(/\n/g, '\r\n');
        const fileName = createFileName(state.startTime, state.endTime);
        downloadFile(fileName, textToSave);
    }

    function copyTranscript() {
        if (state.transcriptSegments.length <= 1) return;
        const textToCopy = getFullTranscriptText();
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("已複製到剪貼簿！");
        }, (err) => {
            console.error('複製失敗: ', err);
            alert("複製失敗，請重試。");
        });
    }

    function sendToNoteTool() {
        if (state.transcriptSegments.length <= 1) {
            alert("沒有逐字稿內容可以傳送。");
            return;
        }
        const transcriptText = getFullTranscriptText(false);
        
        window.setActiveTab('notes');
        
        document.getElementById('noteTemplateSelect').value = 'default';
        noteTemplateSelect.dispatchEvent(new Event('change'));
        
        document.getElementById('noteTheme').value = `語音筆記 - ${new Date().toLocaleString()}`;
        document.getElementById('noteLearned').value = transcriptText;
        
        document.getElementById('notePoints').value = '';
        document.getElementById('noteQuestion').value = '';
        
        alert("逐字稿已成功傳送到筆記工具！");
    }

    function savePreferences() {
        ls.setItem('voice_note_rec_lang', UIElements.languageSelector.value);
    }

    function loadPreferences() {
        const savedRecLang = ls.getItem('voice_note_rec_lang');
        if (savedRecLang) {
            UIElements.languageSelector.value = savedRecLang;
        }
    }

    function formatTime(date) {
        const h = String(date.getHours()).padStart(2, '0');
        const m = String(date.getMinutes()).padStart(2, '0');
        const s = String(date.getSeconds()).padStart(2, '0');
        return `[${h}:${m}:${s}]`;
    }

    function createFileName(start, end) {
        const date = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;
        const startTimeStr = `${String(start.getHours()).padStart(2, '0')}-${String(start.getMinutes()).padStart(2, '0')}`;
        const endTimeStr = `${String(end.getHours()).padStart(2, '0')}-${String(end.getMinutes()).padStart(2, '0')}`;
        return `語音筆記_${date}_${startTimeStr}_to_${endTimeStr}.txt`;
    }

    return {
        init,
        stopRecognition,
        isRecognizing: () => state.isRecognizing
    };
})();

// ===== 記憶卡片 =====
function renderFlashcardList() {
    const list = document.getElementById('flashcardList');
    const count = document.getElementById('flashcardCount');
    const filter = document.getElementById('flashcardFilterCategory');
    
    count.textContent = flashcards.length;
    
    const categories = [...new Set(flashcards.map(c => c.category))];
    filter.innerHTML = '<option value="all">全部分類</option>';
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        filter.appendChild(opt);
    });
    
    if (flashcards.length === 0) {
        list.innerHTML = '<p class="text-slate-500 text-center p-4">還沒有卡片。開始製作你的第一張吧！</p>';
        return;
    }
    
    const filtered = filter.value === 'all' ? flashcards : flashcards.filter(c => c.category === filter.value);
    
    list.innerHTML = '';
    filtered.forEach((card, idx) => {
        const div = document.createElement('div');
        div.className = 'p-3 bg-white border-2 border-blue-200 rounded-lg hover:shadow-md transition';
        div.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="font-bold text-blue-800">${card.question}</div>
                    <div class="text-sm text-slate-600 mt-1">${card.category}</div>
                </div>
                <button class="btn-delete text-xs" onclick="deleteFlashcard(${idx})">刪除</button>
            </div>
        `;
        list.appendChild(div);
    });
}

document.getElementById('addFlashcardBtn').addEventListener('click', () => {
    const question = document.getElementById('flashcardQuestion').value.trim();
    const answer = document.getElementById('flashcardAnswer').value.trim();
    const category = document.getElementById('flashcardCategory').value.trim() || '未分類';
    
    if (question && answer) {
        flashcards.push({ question, answer, category, created: new Date().toISOString() });
        ls.setItem('flashcards', JSON.stringify(flashcards));
        
        document.getElementById('flashcardQuestion').value = '';
        document.getElementById('flashcardAnswer').value = '';
        document.getElementById('flashcardCategory').value = '';
        
        renderFlashcardList();
        updateFlashcardPreview(question, answer);
        alert('✅ 卡片已新增！');
    } else {
        alert('請填寫問題和答案！');
    }
});

function updateFlashcardPreview(question, answer) {
    document.getElementById('previewQuestion').textContent = question;
    document.getElementById('previewAnswer').textContent = answer;
}

document.getElementById('flashcardPreview').addEventListener('click', function() {
    this.classList.toggle('flipped');
});

function deleteFlashcard(idx) {
    if (confirm('確定要刪除這張卡片嗎？')) {
        flashcards.splice(idx, 1);
        ls.setItem('flashcards', JSON.stringify(flashcards));
        renderFlashcardList();
    }
}

function startFlashcardReview() {
    if (flashcards.length === 0) {
        alert('還沒有卡片可以複習！');
        return;
    }
    
    let currentIdx = 0;
    const modal = createModal();
    
    function showCard() {
        const card = flashcards[currentIdx];
        modal.innerHTML = `
            <h3 class="text-2xl font-bold mb-4">複習模式 (${currentIdx + 1}/${flashcards.length})</h3>
            <div class="flashcard" onclick="this.classList.toggle('flipped')">
                <div class="flashcard-inner">
                    <div class="flashcard-front">
                        <div class="text-center">
                            <p class="text-sm mb-2 opacity-75">問題</p>
                            <p>${card.question}</p>
                        </div>
                    </div>
                    <div class="flashcard-back">
                        <div class="text-center">
                            <p class="text-sm mb-2 opacity-75">答案</p>
                            <p>${card.answer}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex gap-3 mt-6">
                <button class="btn btn-primary flex-1" onclick="nextCard()">下一張 →</button>
                <button class="btn btn-danger" onclick="closeModal()">結束複習</button>
            </div>
        `;
    }
    
    window.nextCard = () => {
        currentIdx = (currentIdx + 1) % flashcards.length;
        showCard();
    };
    
    showCard();
}

function clearAllFlashcards() {
    if (confirm('確定要清空所有卡片嗎？此動作無法復原！')) {
        flashcards = [];
        ls.setItem('flashcards', JSON.stringify(flashcards));
        renderFlashcardList();
    }
}

document.getElementById('flashcardFilterCategory')?.addEventListener('change', renderFlashcardList);

// ===== 番茄鐘 =====
function updatePomodoroDisplay() {
    const minutes = Math.floor(timerState.timeLeft / 60);
    const seconds = timerState.timeLeft % 60;
    document.getElementById('timerDisplay').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const focusDuration = parseInt(document.getElementById('focusTime').value) * 60;
    const breakDuration = timerState.mode === 'shortBreak' 
        ? parseInt(document.getElementById('shortBreak').value) * 60
        : parseInt(document.getElementById('longBreak').value) * 60;

    const totalDuration = timerState.mode === 'focus' ? focusDuration : breakDuration;
    const progress = ((totalDuration - timerState.timeLeft) / totalDuration) * 100;
    
    document.getElementById('timerProgress').style.width = progress + '%';
    
    document.getElementById('pomodoroCount').textContent = pomodoroStats.total;
    document.getElementById('studyMinutes').textContent = pomodoroStats.studyMinutes;
    document.getElementById('breakMinutes').textContent = pomodoroStats.breakMinutes;
    document.getElementById('todayPomodoros').textContent = pomodoroStats.today;
    document.getElementById('todayStudy').textContent = pomodoroStats.todayStudy + ' 分鐘';
}

document.getElementById('timerStart').addEventListener('click', () => {
    if (!timerState.isRunning) {
        timerState.isRunning = true;
        document.getElementById('timerStart').classList.add('hidden');
        document.getElementById('timerPause').classList.remove('hidden');
        
        timerInterval = setInterval(() => {
            if (timerState.timeLeft > 0) {
                timerState.timeLeft--;
                updatePomodoroDisplay();
            } else {
                handleTimerComplete();
            }
        }, 1000);
    }
});

document.getElementById('timerPause').addEventListener('click', () => {
    timerState.isRunning = false;
    clearInterval(timerInterval);
    document.getElementById('timerStart').classList.remove('hidden');
    document.getElementById('timerPause').classList.add('hidden');
});

document.getElementById('timerReset').addEventListener('click', () => {
    timerState.isRunning = false;
    clearInterval(timerInterval);
    timerState.timeLeft = parseInt(document.getElementById('focusTime').value) * 60;
    timerState.mode = 'focus';
    document.getElementById('timerStart').classList.remove('hidden');
    document.getElementById('timerPause').classList.add('hidden');
    document.getElementById('timerStatus').textContent = '準備開始學習 🍅';
    updatePomodoroDisplay();
});

document.getElementById('timerSkip').addEventListener('click', () => {
    handleTimerComplete();
});

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
        if (timerState.pomodoroCount % 4 === 0) {
            timerState.mode = 'longBreak';
            timerState.timeLeft = parseInt(document.getElementById('longBreak').value) * 60;
            document.getElementById('timerStatus').textContent = '長休息時間 🎉';
        } else {
            timerState.mode = 'shortBreak';
            timerState.timeLeft = parseInt(document.getElementById('shortBreak').value) * 60;
            document.getElementById('timerStatus').textContent = '短休息時間 ☕';
        }
        
        if (document.getElementById('soundEnabled').checked) playSound();
        if (document.getElementById('notificationEnabled')?.checked) sendNotification('🎉 番茄鐘完成！', '完成一個專注時段，該休息一下了！');
        
        alert('🎉 完成一個番茄鐘！休息一下吧！');
    } else {
        const breakMin = timerState.mode === 'shortBreak' 
            ? parseInt(document.getElementById('shortBreak').value) 
            : parseInt(document.getElementById('longBreak').value);
        pomodoroStats.breakMinutes += breakMin;
        
        timerState.mode = 'focus';
        timerState.timeLeft = parseInt(document.getElementById('focusTime').value) * 60;
        document.getElementById('timerStatus').textContent = '準備開始學習 🍅';
        
        if (document.getElementById('soundEnabled').checked) playSound();
        if (document.getElementById('notificationEnabled')?.checked) sendNotification('✅ 休息結束！', '準備開始下一個番茄鐘！');
        
        alert('✅ 休息結束！準備開始下一個番茄鐘！');
    }
    
    ls.setItem('pomodoroStats', JSON.stringify(pomodoroStats));
    document.getElementById('timerStart').classList.remove('hidden');
    document.getElementById('timerPause').classList.add('hidden');
    updatePomodoroDisplay();
}

function sendNotification(title, body) {
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
            new Notification(title, { body, icon: '🍅' });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') new Notification(title, { body, icon: '🍅' });
            });
        }
    }
}

document.getElementById('notificationEnabled')?.addEventListener('change', function() {
    if (this.checked && 'Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});

function checkPomodoroDate() {
    const today = getTodayDate();
    if (pomodoroStats.lastDate !== today) {
        pomodoroStats.today = 0;
        pomodoroStats.todayStudy = 0;
        pomodoroStats.lastDate = today;
        ls.setItem('pomodoroStats', JSON.stringify(pomodoroStats));
    }
}

function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
    oscillator.frequency.value = 800;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
}

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
    
    // Check if today is in history
    if (studyHistory.includes(getTodayDate())) {
        streak = 1;
        let checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - 1);
        
        for (let i = 0; i < 365; i++) {
            const dateStr = checkDate.toISOString().split('T')[0];
            if (studyHistory.includes(dateStr)) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }
    }
    
    return streak;
}

function getFirstStudyDate() {
    const studyHistory = JSON.parse(ls.getItem('studyHistory') || '[]');
    if (studyHistory.length === 0) return null;
    return new Date(studyHistory.sort()[0]).getTime();
}

function updateWeeklyCompletion() {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    let totalTasks = 0;
    let totalCompleted = 0;
    
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
    Object.values(planner).forEach(dayTasks => {
        totalTasks += dayTasks.length;
        completedTasks += dayTasks.filter(t => t.completed).length;
    });
    
    if (totalTasks > 0 && completedTasks / totalTasks < 0.5) {
        tips.push('📋 本週計畫完成度較低，調整一下學習節奏吧！');
    }
    
    if (tips.length === 0) {
        tips.push('🎉 做得很好！繼續保持這個學習節奏！');
        tips.push('💪 你的學習習慣非常健康，為自己感到驕傲吧！');
    }
    
    document.getElementById('learningTips').innerHTML = tips.map(tip => `<p class="text-sm font-medium p-2 bg-white rounded-lg">${tip}</p>`).join('');
}

function updateAchievements() {
    const setAchievement = (id, achieved, progressText) => {
        const elem = document.getElementById(id);
        if (achieved) {
            elem.textContent = '✅ 已達成';
            elem.style.color = '#059669';
        } else {
            elem.textContent = progressText;
            elem.style.color = '';
        }
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
        days.push({
            label: date.getDate() + '日',
            count: dailyStats[dateStr] || 0
        });
    }
    
    const maxCount = Math.max(...days.map(d => d.count), 1);
    
    days.forEach(day => {
        const height = (day.count / maxCount) * 100;
        chart.innerHTML += `
            <div class="flex flex-col items-center flex-1">
                <div class="text-xs font-bold text-blue-600 mb-1">${day.count}</div>
                <div class="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500" 
                     style="height: ${height}%; min-height: ${day.count > 0 ? '20px' : '2px'}">
                </div>
                <div class="text-xs text-slate-600 mt-2">${day.label}</div>
            </div>
        `;
    });
}

function recordDailyPomodoro() {
    const today = getTodayDate();
    const dailyStats = JSON.parse(ls.getItem('dailyPomodoroStats') || '{}');
    dailyStats[today] = (dailyStats[today] || 0) + 1;
    ls.setItem('dailyPomodoroStats', JSON.stringify(dailyStats));
    
    const studyHistory = JSON.parse(ls.getItem('studyHistory') || '[]');
    if (!studyHistory.includes(today)) {
        studyHistory.push(today);
        ls.setItem('studyHistory', JSON.stringify(studyHistory));
    }
}

// ===== 資料管理 =====
function renderNotesManager(filter = '') {
    const container = document.getElementById('notesManager');
    document.getElementById('allNotesCount').textContent = notesStorage.length;
    
    let filtered = notesStorage;
    if (filter) {
        const lowerFilter = filter.toLowerCase();
        filtered = notesStorage.filter(note => 
            note.title.toLowerCase().includes(lowerFilter) ||
            note.content.toLowerCase().includes(lowerFilter) ||
            (note.tags && note.tags.some(t => t.toLowerCase().includes(lowerFilter)))
        );
    }
    
    if (filtered.length === 0) {
        container.innerHTML = '<p class="text-slate-500 text-center p-6">找不到符合的筆記。</p>';
        return;
    }
    
    container.innerHTML = '';
    filtered.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified)).forEach(note => {
        const div = document.createElement('div');
        div.className = 'note-item';
        div.innerHTML = `
            <div>
                <div class="note-title">${note.title}</div>
                ${note.tags && note.tags.length ? `<span class="note-tags">${note.tags.map(t => '#'+t).join(' ')}</span>` : ''}
            </div>
            <div class="flex items-center gap-2">
                <span class="note-date">${new Date(note.lastModified).toLocaleDateString()}</span>
                <button class="btn-delete text-xs" onclick="deleteNoteById('${note.id}', event)">刪除</button>
            </div>
        `;
        div.onclick = (e) => {
            if (!e.target.classList.contains('btn-delete')) {
                showNoteDetail(note);
            }
        };
        container.appendChild(div);
    });
}

function showNoteDetail(note) {
    const modal = createModal();
    modal.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${note.title}</h2>
        <div class="text-sm text-slate-600 mb-4">
            建立：${new Date(note.created).toLocaleString()} | 
            更新：${new Date(note.lastModified).toLocaleString()}
        </div>
        <pre class="whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border text-sm">${note.content}</pre>
        <button class="btn btn-danger mt-4" onclick="closeModal()">關閉</button>
    `;
}

function deleteNoteById(id, event) {
    event.stopPropagation();
    if (confirm('確定要刪除這筆筆記嗎？')) {
        notesStorage = notesStorage.filter(note => note.id !== id);
        ls.setItem('notesStorage', JSON.stringify(notesStorage));
        renderNotesManager(document.getElementById('searchNotesInput').value);
    }
}

document.getElementById('searchNotesInput')?.addEventListener('input', (e) => {
    renderNotesManager(e.target.value);
});

function filterNotes(type) {
    let notesToShow = [];
    if (type === 'all') {
        notesToShow = notesStorage;
    } else if (type === 'recent') {
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        notesToShow = notesStorage.filter(n => new Date(n.lastModified).getTime() > weekAgo);
    } else if (type === 'important') {
        notesToShow = notesStorage.filter(n => n.important);
    }
    renderFilteredNotes(notesToShow);
}

function renderFilteredNotes(notes) {
    const container = document.getElementById('notesManager');
    if (notes.length === 0) {
        container.innerHTML = '<p class="text-slate-500 text-center p-6">沒有符合的筆記。</p>';
        return;
    }
    container.innerHTML = '';
    notes.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified)).forEach(note => {
        const div = document.createElement('div');
        div.className = 'note-item';
        div.innerHTML = `
            <div class="note-title">${note.title}</div>
            <span class="note-date">${new Date(note.lastModified).toLocaleDateString()}</span>
        `;
        div.onclick = () => showNoteDetail(note);
        container.appendChild(div);
    });
}

// ===== 匯出/匯入功能 =====
function exportAllData() {
    const data = {
        knowledgeList,
        planner,
        notesStorage,
        flashcards,
        pomodoroStats,
        exportDate: new Date().toISOString()
    };
    const json = JSON.stringify(data, null, 2);
    downloadFile(`學習系統備份_${getTodayDate()}.json`, json);
}

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
                    alert('✅ 資料匯入成功！頁面將重新載入...');
                    location.reload();
                }
            } catch (err) {
                alert('❌ 檔案格式錯誤！');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function clearAllData() {
    if (confirm('⚠️ 確定要清空所有資料嗎？此動作無法復原！')) {
        if (confirm('⚠️ 真的確定嗎？所有筆記、卡片、計畫都會消失！')) {
            ls.clear();
            alert('✅ 所有資料已清空！頁面即將重新載入...');
            setTimeout(() => location.reload(), 1000);
        }
    }
}

// ===== 工具函數 =====
function getTimestampID() {
    const d = new Date();
    return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}${String(d.getHours()).padStart(2,'0')}${String(d.getMinutes()).padStart(2,'0')}${String(d.getSeconds()).padStart(2,'0')}`;
}

function getTodayDate() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => {
        if (e.target === overlay) closeModal();
    };
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    window.currentModal = overlay;
    return modal;
}

function closeModal() {
    if (window.currentModal) {
        document.body.removeChild(window.currentModal);
        window.currentModal = null;
    }
}
