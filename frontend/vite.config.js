import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  base: "/static/", //與 Django 的 STATIC_URL 對齊, Vite 在構建 index.html 時為所有靜態資源（JS、CSS、圖片等）的引用添加 /static/ 前綴。
  build: {
    outDir: "../backend/static", // 將構建檔案輸出到 Django 的 static 目錄
    emptyOutDir: true, // 每次構建時清空輸出目錄
    assetsDir: "assets", // 將所有靜態資源放到 assets 目錄 default
  },
});
