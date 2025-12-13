# 🎵 TuneHive - music streaming website

A full-stack music streaming application inspired by Spotify, built with **React (Vite)**, **Node.js**, **Express**, **MongoDB**, and **Cloudinary** for media storage.


---

## Features

- **Authentication** – JWT auth with httpOnly cookies, email verification, and role-based access control.  
- **Music & Albums** – Upload songs/albums (admin), Cloudinary-backed streaming, and album-wise browsing.  
- **Playlists & Player** – Add/remove songs from playlist, global audio player with next/prev controls.  
- **Premium System** – Razorpay payments for premium access, including **secure MP3 downloads** for paid users.  
- **Modern UI** – Responsive React + Tailwind interface with search, home feed, and album pages.

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file upload)
- Cloudinary SDK
- Razorpay Integration
- CORS + Cookie Parser

---


## Setup & Installation

1. **Clone the repository**
   - git clone https://github.com/your-username/spotify-project.git
   - cd ./Spotify-Clone

2. **Install dependencies** (both frontend & backend)
   - cd ./backend && npm install
   - cd ../frontend && npm install
   
3. **Backend environment variables**
   - PORT=8000
   - MONGO_URI=your_mongo_connection
   - JWT_SECRET=your_jwt_secret
   - CLOUD_NAME=your_cloudinary_cloud
   - CLOUD_API=your_cloudinary_api
   - CLOUD_SECRET=your_cloudinary_secret
   - FRONTEND_URL=http://localhost:5173
   - RAZORPAY_KEY=your_key
   - RAZORPAY_SECRET=your_secret


4. **Frontend environment variables**
   - VITE_API_URL=http://localhost:8000
   - VITE_RAZORPAY_KEY=your_key


5. **Run the app in development**
   - cd ./backend && npm run server
   - cd ../frontend && npm run dev


