# 🎓 國立政治大學學分學程修習檢核工具

這是一個前後端分離的工具，旨在幫助國立政治大學的學生透過上傳「全人資料」JSON 檔案，快速檢核其修習進度，並判斷是否滿足特定學分學程或微學程的修畢要求。

## ✨ 專案特色

  * **前後端分離架構：** 邏輯清晰，易於維護和擴展。
  * **Go 語言核心檢核：** 檢核邏輯運行速度快，穩定可靠。
  * **Vue 3 現代介面：** 提供直覺、響應式的用戶介面來選取學程並展示結果。
  * **高度可配置性：** 所有學分學程要求定義在獨立的 `programs.json` 檔案中，方便更新和增減。

## 🛠️ 技術棧

| 類別 | 技術名稱 | 說明 |
| :--- | :--- | :--- |
| **後端 (API & 檢核核心)** | Go 語言 (Golang) | 負責處理檔案上傳、JSON 解析、學程邏輯運算，並提供 RESTful API 服務。 |
| | Gorilla Mux | Go 語言的路由與 HTTP 處理套件。 |
| **前端 (UI & 互動)** | Vue 3 (Composition API) | 負責用戶介面渲染、數據綁定和 API 請求。 |
| | Vite | 快速的前端開發與構建工具。 |
| | Tailwind CSS | 響應式 CSS 框架，用於快速風格化。 |

## 🚀 專案結構

```
/program-checker
├── backend/
│   ├── main.go               # Go 後端服務與檢核核心邏輯
│   ├── programs.json         # 各學分學程/微學程的定義檔案 (可編輯)
│   ├── go.mod                # Go 模組依賴配置
│   └── ...
└── frontend/
    ├── src/
    │   ├── App.vue           # 核心檢核介面組件
    │   ├── main.js           # Vue 應用程式入口
    │   └── index.css         # Tailwind 基礎與自定義樣式
    ├── index.html            # HTML 應用程式入口
    ├── package.json          # npm/前端依賴配置
    └── ...
```

## ⚙️ 安裝與執行

### 前提條件

請確保您的系統已安裝以下軟體：

  * **Go 語言** (v1.18+)
  * **Node.js** (v18+) 及 **npm**

### 步驟 1: 初始化 Go 後端

1.  進入後端目錄：

    ```bash
    cd program-checker/backend
    ```

2.  初始化 Go 模組並下載依賴：

    ```bash
    # 使用您的路徑名稱進行初始化
    go mod init your.domain/program-checker-backend 
    go get github.com/gorilla/mux
    go mod tidy
    ```

3.  啟動後端服務 (預設運行於 **`:8080`** 端口)：

    ```bash
    go run main.go
    ```

    > **提示：** 保持此終端機視窗開啟，後端服務運行時，任何錯誤（例如 JSON 解析失敗）都會在此處輸出。

### 步驟 2: 初始化 Vue 前端

1.  開啟新的終端機視窗，進入前端目錄：
    ```bash
    cd program-checker/frontend
    ```
2.  安裝所有 npm 依賴項：
    ```bash
    npm install
    ```
3.  啟動前端開發伺服器 (預設運行於 **`:5173`** 端口)：
    ```bash
    npm run dev
    ```

### 步驟 3: 瀏覽應用程式

  * 在瀏覽器中開啟：**`http://localhost:5173`**

## 💡 使用方法

1.  **上傳檔案：** 點擊「上傳全人資料」按鈕，選擇您的「全人資料」JSON 檔案。
2.  **選取學程：** 勾選您想要檢核的一個或多個學分學程/微學程。
3.  **開始檢核：** 點擊「開始檢核」按鈕。
4.  **查看結果：** 應用程式將會即時顯示每個學程的修習狀態、已修學分、以及分類課程的達成情況。

## 📝 學程定義維護

所有學分學程的詳細要求（包含最低學分、課程分類、必選科目列表）都定義在 **`backend/programs.json`** 檔案中。

若要新增、修改或移除學程，請直接編輯此檔案，並重新啟動 Go 後端服務。

### `programs.json` 結構示例

```json
{
    "defense_security": {
        "name": "國防安全微學程",
        "min_credits": 8.0,
        "description": "至少修滿 8 學分，並包含基礎課程與核心課程至少各 1 門。",
        "requirements": [
            {
                "category": "基礎課程 (Min 1 門)",
                "min_count": 1,
                "courses": ["全民國防教育軍事訓練—國際情勢", "..."]
            }
            // ... 更多要求
        ]
    }
}
```