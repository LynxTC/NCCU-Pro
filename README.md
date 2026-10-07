# **🎓 NCCU Pro - 政大個人化學程潛能分析師**

這是一個專為國立政治大學學生設計的開源工具「NCCU Pro」，透過上傳從校務全人系統匯出的「課業學習」JSON 檔案，即可快速檢核學分學程或微學程的修習進度，並提供智慧推薦功能，挖掘您潛在的學程資格。

## **🌐 線上版本**

本專案已正式佈署，您可以直接訪問以下網址使用：

* **前端介面：** https://nccupro.onrender.com
* **後端 API 服務：** `https://program-checker-backend.onrender.com`

## **✨ 專案特色**

* **🔮 智慧學程推薦：** 系統自動分析您的修課紀錄，計算所有學程的完成度，並推薦匹配度最高的學程，讓您不錯過任何取得證書的機會。
* **✏️ 自選學程檢核：** 支援學分學程、微學程及院級專長學程（如商學院）的進度檢核，清楚列出已修畢、修習中及缺漏的科目。
* **📊 視覺化報告：** 清晰呈現各分類（如必修、選修、群組要求）的門數與學分達成率，並自動處理複雜的規則（如：通識限修一門、同性質課程擇一認列、平均成績門檻等）。
* **📱 PWA 支援：** 支援漸進式網頁應用 (PWA)，可直接安裝至手機或電腦桌面，享受原生 App 般的流暢體驗與離線瀏覽功能。
* **🎭 資料隱私優先：** 採用「資料不落地」原則，檢核過程僅在伺服器記憶體中進行運算，絕不儲存您的成績單或個人資料。
* **🎨 現代化介面：** 結合 Vue 3 與 Tailwind CSS，提供拖曳上傳、側邊欄清單管理與流暢的動畫效果。

## **🛠️ tech-stack**

| 類別 | 技術名稱 | 說明 |
| :---- | :---- | :---- |
| **後端 (Backend)** | Go 1.25 | 使用 `gorilla/mux v1.8.1` 處理路由，實作高效的核心檢核邏輯與 RESTful API。 |
| **前端 (Frontend)** | Vue 3.4 (Composition API) | 使用 Vite 8 建置，結合 Tailwind CSS 3 與 PWA 技術 (Service Worker) 打造現代化 UI。 |
| **資料交換** | JSON | 前後端透過 JSON 格式傳遞學程定義與檢核結果。 |
| **佈署 (Deployment)** | Render | 雲端服務佈署（前後端分離部署）。 |

## **📂 專案結構**

```text
program-checker/
├── backend/                   # Go 後端核心
│   ├── main.go                    # API 路由、資料載入、核心檢核與推薦邏輯
│   ├── special_handlers.go        # 特殊學程規則、進階前處理與後處理邏輯
│   └── data/                      # 學程資料庫 (JSON)
│       ├── credit_programs.json       # 學分學程
│       ├── micro_programs.json        # 微學程
│       ├── commerce_specialty_programs.json  # 院級專長學程（商學院）
│       ├── taica_programs.json        # TAICA 跨院 AI 學分學程
│       └── departments_grouped.json   # 系所歸屬定義
├── frontend/                  # Vue 3 前端介面
│   ├── public/                    # PWA 靜態資源（Manifest、Icons）
│   ├── src/
│   │   ├── components/            # Vue 元件（上傳、檢核結果卡、Modal）
│   │   ├── App.vue                # 根元件（主頁面、狀態管理、API 呼叫）
│   │   └── ...
│   ├── service-worker.js          # Service Worker（PWA 離線快取）
│   └── ...
├── test_data/                 # 測試用學生資料
└── README.md
```

## **🔌 API 端點**

後端提供以下 RESTful API：

| 方法 | 路徑 | 說明 |
| :---- | :---- | :---- |
| `GET` | `/healthcheck` | 健康檢查（防止雲端服務休眠） |
| `GET` | `/api/programs` | 取得所有學程列表（依學院分組） |
| `POST` | `/api/check` | 上傳課程 JSON，檢核指定學程完成度 |
| `POST` | `/api/recommend` | 上傳課程 JSON，推薦完成度最高的前五名學程 |

> `/api/check` 與 `/api/recommend` 均接受 `multipart/form-data`，欄位為 `student_json`（JSON 檔案）。`/api/check` 另需 `program_ids`（逗號分隔的學程 ID 字串）。

## **快速開始 (開發環境)**

如果您想在本地環境運行或參與開發，請參考以下步驟：

### **步驟 1: 後端環境 (Go)**

1. 進入後端目錄：
   ```bash
   cd backend
   ```
2. 確保已備妥學程定義檔（位於 `data/` 目錄下）：
   * `data/micro_programs.json`
   * `data/credit_programs.json`
   * `data/commerce_specialty_programs.json`
   * `data/taica_programs.json`
   * `data/departments_grouped.json`
3. 啟動服務 (預設 Port 8080)：
   ```bash
   go run .
   ```

### **步驟 2: 前端環境 (Vue)**

1. 進入前端目錄：
   ```bash
   cd frontend
   ```
2. 安裝依賴：
   ```bash
   npm install
   ```
3. 確認環境變數：
   開發時 `.env.development` 中 `VITE_API_BASE_URL` 留空即可（Vite 代理會自動將 `/api` 請求轉發至 `http://127.0.0.1:8080`）：
   ```
   VITE_API_BASE_URL=
   ```
4. 啟動開發伺服器：
   ```bash
   npm run dev
   ```

## **💡 使用指南**

1. **取得資料：** 登入政大 iNCCU -> 全人系統 -> 資料格式化匯出 -> 下載「課業學習」JSON 檔。
2. **上傳檔案：** 在本工具上傳該 JSON 檔。
3. **選擇模式：**
   * **智慧推薦：** 點擊「啟動推薦分析」，查看系統計算出的高完成度學程排行。
   * **學程檢核：** 切換至「學程檢核」頁籤，手動勾選感興趣的學程（支援跨學院搜尋）。
4. **查看結果：** 閱讀詳細的檢核報告，包含學分統計、修習中課程提示及未達標原因。
5. **安裝 App：** 在支援的瀏覽器中，點擊網址列的安裝圖示或「加到主畫面」，即可將 NCCU Pro 安裝至您的裝置。

## **📝 學程定義維護**

後端 `backend/data` 資料夾中的 JSON 檔案定義了各學程的規則：

* `data/credit_programs.json`: 一般學分學程
* `data/micro_programs.json`: 微學程
* `data/commerce_specialty_programs.json`: 院級專長學程（目前僅商學院使用）
* `data/taica_programs.json`: TAICA 跨院人工智慧學分學程（採用「課程類別池」架構，由 `categories` 定義共用課程池，再由 `programs` 引用）
* `data/departments_grouped.json`: 系所歸屬定義（用於判斷學生學籍歸屬，檢查是否牴觸學程身分限制）

### **JSON 結構說明（一般學程）**

若您希望協助更新學程資料，請參考以下欄位定義：

```json
"program_id": {
    "name": "學程名稱",
    "url": "學程官方網址",
    "min_credits": 20.0,
    "description": "學程通過條件描述",
    "general_education_courses": ["通識A", "通識B"],
    "requirements": [
        {
            "category": "必修課程",
            "min_credits": 6.0,
            "min_count": 2,
            "max_count": 1,
            "max_credits": 0,
            "courses": ["課程A", "課程B"]
        }
    ]
}
```

### **JSON 結構說明（TAICA 學程）**

`taica_programs.json` 採用兩層式架構，`category_ref` 欄位可引用 `categories` 中的共用課程池，後端啟動時會自動注入對應的課程清單：

```json
{
    "categories": {
        "程式設計類課程": ["基礎程式設計C++", "計算機程式"],
        "機率類課程": ["機率與統計", "機率論"]
    },
    "programs": {
        "學院名稱": {
            "program_id": {
                "name": "學程名稱",
                "min_credits": 15.0,
                "requirements": [
                    {
                        "category": "程式設計",
                        "category_ref": "程式設計類課程",
                        "min_credits": 3.0
                    }
                ]
            }
        }
    }
}
```

## **🤝 貢獻指南**

歡迎提交 Pull Request 來新增或修正學程資料！如果您發現某個學程的規則有誤，或是有新的學程想要加入，請直接修改上述的 JSON 檔案並提交變更。

## **⚖️ 免責聲明**

本工具為學生開發之輔助系統，檢核邏輯雖力求準確，但仍可能因學校政策變動或特殊修課狀況而有誤差。**最終修畢資格與學分認定，悉以國立政治大學教務處及各學程設置單位之正式審核結果為準。**
