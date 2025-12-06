🌟 Todo Frontend (React + Vite + Redux Toolkit + Protected Routes)

A modern, responsive, fully authenticated Task Manager Frontend built with:

⚛ React (Vite)

🛠️ Redux Toolkit

🔐 JWT Authentication

🎨 Tailwind CSS

🌐 Axios

🧭 React Router DOM

Connected to a secure Node.js backend to manage user accounts and tasks.

🚀 Features
🔑 Authentication

Login with JWT

Signup with server validation

Auto-login using stored token

Protected Routes (users cannot access dashboard without login)

Logout clears token and redirects to login page

📝 Task Management

Add new tasks

Edit tasks

Delete tasks

Mark tasks as Todo / Completed

Auto-fetch tasks after login

Stores tasks in Redux state

🎨 UI / UX

Clean modern design using TailwindCSS

Fully responsive

Separate views for Todo & Completed tasks

Easy navigation with top-bar header

📦 Tech Stack
🖥 Frontend
Tool	Purpose
React	UI Components
Vite	Fast dev & build
Redux Toolkit	State management
React Router	Navigation & protected routes
TailwindCSS	Styling
Axios	API calls
🔗 Backend (Connected To)

Node.js + Express

MongoDB + Mongoose

JWT Authentication

Bcrypt password hashing

🛠️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/your-frontend-repo.git
cd your-frontend-repo

2️⃣ Install dependencies
npm install

3️⃣ Add a .env file (optional)
VITE_API_URL=https://your-backend-url.onrender.com

4️⃣ Run development server
npm run dev


Your app will be available at:

👉 http://localhost:5173

🧱 Project Structure
src/
 ├── components/
 ├── hooks/
 ├── pages/
 ├── slices/
 ├── store/
 ├── App.jsx
 ├── main.jsx
public/
tailwind.config.js
vercel.json
package.json

🔐 Protected Route Logic

The app uses Redux + LocalStorage to store JWT tokens.

If no token is found:

User cannot access / or dashboard pages

Automatically redirected to /auth

If a valid token exists:

User is logged in

Can access tasks and profile

🚀 Deploying to Vercel

This project includes a vercel.json file to fix reload issues:

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

Deploy using:
vercel


Or connect the repo to Vercel Dashboard.
