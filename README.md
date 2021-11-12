# 家庭記帳本

## 基本功能
- 使用者可以透過Email註冊帳號

- 使用者可以透過Facebook登入

- 在首頁一次瀏覽所有支出的清單

- 在首頁看到所有支出清單的總金額
  
- 新增一筆支出

- 編輯任何一筆支出的所有屬性

- 刪除任何一筆支出

- 在首頁可以根據支出「類別」篩選支出廳


## 安裝
- git clone  此專案
```
https://github.com/chenchiachi/expense-tracker.git
```
- cd 至專案資料夾
- 安裝 npm 套件
```
npm install
```
- 載入種子資料
```
npm run seed
```
- 使用 npm 開啟程式
```
npm run dev
```

## 版本
- bcryptjs: 2.4.3
- body-parser: 1.19.0
- Bootstrap: 4.2.1
- connect-flash: 0.1.1
- dotenv: 10.0.0
- express: 4.17.1
- express-handlebars: 5.3.3
- express-session: 1.17.2
- method-override: 3.0.0
- mongoose: 5.13.7
- passport: 0.5.0
- passport-facebook: 3.0.0
- passport-local: 1.0.0

## 種子資料
```
email: user1@example.com
password: 12345678
```
```
email: user2@example.com
password: 12345678
```