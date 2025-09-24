
# 🔐 PassOP – Password Manager App [LINK](https://passopapp.netlify.app/register)

> A full-stack password manager built using **React**, **Node.js**, **Express.js**, and **MongoDB**, designed to securely store, edit, and manage your login credentials. This project demonstrates practical usage of the MERN stack with a focus on clean UI/UX, efficient backend logic, and RESTful API architecture. Also tested thoroughly using **Postman**.

---

## 🚀 Features

✅ Modern React UI with TailwindCSS  
✅ Real-time CRUD operations (Create, Read, Update, Delete)  
✅ Unique password identification using UUID  
✅ Password visibility toggle  
✅ Copy-to-clipboard functionality  
✅ Toast notifications using `react-toastify`  
✅ Backend API integration with MongoDB  
✅ Fully tested via Postman (screenshots included)  
✅ Clean, scalable architecture (frontend + backend)


---

## 🛠 Tech Stack

| Layer         | Tech                                                                 |
|---------------|----------------------------------------------------------------------|
| Frontend      | React, Tailwind CSS, React Toastify, UUID, Lordicon                  |
| Backend       | Node.js, Express.js, CORS, Body-parser                               |
| Database      | MongoDB (Local MongoDB server using `mongod`)                        |
| Testing Tool  | Postman (VS Code Extension)                                          |

---

## 🧩 Folder Structure

```
📁 passop/
├── 📁 backend/
│   └── server.js              # Express server with MongoDB CRUD
├── 📁 src/
│   └── 📁 components         
│        └── Manager.jsx       # React component for managing UI logic
├── 📁 public/
│   └── eye.png                # Eye toggle icon
├── 📄 .env                    # Environment variables (optional)
├── 📄 package.json            # Project metadata and dependencies
```

---

## ⚙️ Installation Guide

### 🧰 Prerequisites

- Node.js installed
- MongoDB installed and running locally
- VS Code + Postman Extension (optional but recommended)

---

### 📦 Step 1: Backend Setup

```bash
cd backend
npm install
node server.js
```

⚠️ Make sure your MongoDB server is running. If not:

```bash
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath "C:\data\db"
```

---

### 💻 Step 2: Frontend Setup

```bash
cd frontend
npm install
npm start
```

Your React app will run at:  
👉 `http://localhost:3000/`

---

### 🔁 Step 3: Postman API Testing

- Import these API endpoints into Postman:

| Method | Endpoint           | Description           |
|--------|--------------------|-----------------------|
| GET    | `/`                | Fetch all passwords   |
| POST   | `/`                | Save new password     |
| DELETE | `/`                | Delete a password     |

**Body Format for POST/DELETE** (raw JSON):
```json
{
  "site": "https://example.com",
  "username": "your_username",
  "password": "your_password",
  "id": "generated-uuid"
}
```

✔ All requests return JSON responses with `success: true` flag.

---

## ✨ Functionality Overview

### 🔍 Fetching Passwords

- Auto-fetches all stored passwords when the app loads.
- Displayed in a structured table with copy and edit icons.

### ✏️ Editing a Password

- Click edit icon → data pre-fills in form → modify → click save → updated in DB.

### 🗑️ Deleting a Password

- Click trash icon → confirm deletion → record removed from UI & DB.

### 🔒 Show/Hide Password

- Toggle password visibility via eye icon.

---

## 🧪 Postman Test Proof

- All APIs were tested using the **Postman VS Code Extension**.
- JSON data was inserted and verified directly with MongoDB.
- Status codes: `200 OK` and `500 Internal Error` for invalid ops.

---

## 📦 Dependencies Used

### Frontend

- `react`, `react-toastify`, `uuid`
- `tailwindcss`, `postcss`, `autoprefixer`

### Backend

- `express`, `mongodb`, `cors`, `body-parser`, `dotenv`

---

## 🎯 Future Enhancements

- Encrypt passwords before storing them (e.g., bcrypt or AES).
- Add authentication (JWT).
- Host backend and frontend (Render/Netlify/Vercel).
- Add search and filter features.
- Dark mode toggle.

---

## 👨‍💻 Author

**MD Misbahul Haque**  
🔗 [LinkedIn](https://www.linkedin.com/in/md-misbahul-haque-191221232/) | 📧 mhaque2132@gmail.com

---

## ⭐ Final Note

This project is more than a password manager — it's a demonstration of **full-stack expertise**, **API design**, and **UI/UX attention to detail**. Built with love and tested with precision ❤️

If you found this interesting or useful, a ⭐ star would mean a lot!
