# 📝 Blogify — MERN Blog Web App

**Blogify** is a modern full-stack blogging platform built using the MERN stack. It allows users to create, edit, and manage blog posts with ease. The app includes authentication, CRUD features, and a clean, responsive UI.

---

## 🚀 Features

- ✍️ Create, edit, and delete blog posts
- 🔒 User authentication (signup/login/logout)
- 🧑‍💻 Each user can manage their own posts
- 🗂️ Clean list and detail views for blogs
- 📱 Fully responsive with modern UI
- 📅 Posts sorted by creation date

---

## 🛠 Tech Stack

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **State Management**: React Context API
- **Others**: Axios, React Router

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-blog-repo.git
cd your-blog-repo
```
### 2.  Setup Backend
```bash
cd backend
npm install
```
### 3.  Create a .env file in the backend folder and add:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
### 4. Start the backend server:
```bash
npm start
```

### 5. Setup Frontend
```bash
cd ../frontend
npm install
```
### 6. Add a .env file in the frontend folder:
```bash
REACT_APP_API_URL=http://localhost:5000
REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
```
### 7. Start the frontend:
```bash
npm start
```

---

###👤 Author
- Made with ❤️ by Rituraj Paul
