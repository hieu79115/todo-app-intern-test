# Todo App - Intern Test

## Tech Stack

* **Frontend:** React.js (Vite), Material UI (MUI), Axios.
* **Backend:** Express.js (Node.js), RESTful API.
* **Database:** PostgreSQL (Supabase).
* **Deployment:** Vercel (Frontend) & Render (Backend).

## Cấu trúc dự án (Monorepo)
- `frontend/`: React + Vite + Material UI
- `backend/`: Express.js + Supabase

## Hướng dẫn cài đặt và chạy ở Local

### 1. Clone repository
```bash
git clone https://github.com/hieu79115/todo-app-intern-test.git
cd todo-app-intern-test
```

### 2. Chạy Backend
```bash
cd backend
npm install
npm run dev
```
*(Server sẽ chạy tại http://localhost:5000)*

### 3. Chạy Frontend
```bash
cd frontend
npm install
npm run dev
```
*(Giao diện sẽ chạy tại http://localhost:5173)*

### 🔗 Live Demo
[https://todo-app-intern-test.vercel.app/](https://todo-app-intern-test.vercel.app/)

> 💡 **Lưu ý nhỏ:** Do Backend đang được deploy trên gói miễn phí của Render, server sẽ tự động chuyển sang trạng thái ngủ (sleep) sau một khoảng thời gian không hoạt động. Trong lần truy cập đầu tiên, có thể sẽ mất khoảng 15 - 30 giây để server khởi động lại và trả về dữ liệu. Mong bạn thông cảm chờ đợi một chút nhé!
