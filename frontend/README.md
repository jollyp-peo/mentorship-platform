# 🎓 Mentorship Matching Platform

A full-stack mentorship matching web application that connects mentees and mentors, allowing users to request mentorship, book sessions, and manage availability.

## 🚀 Features

### ✅ General Users
- Register and login with JWT authentication
- Update personal profile (bio, skills, goals)
- Role-based access (Admin, Mentor, Mentee)

### 👨‍🏫 Mentor
- Set weekly availability
- View and accept/reject mentorship requests
- Schedule sessions with accepted mentees
- Provide feedback after each session

### 🧑‍🎓 Mentee
- Browse and filter mentors by skill
- Send mentorship requests
- Book sessions with accepted mentors
- View upcoming and past sessions with feedback

### 🛠️ Admin
- View all users and sessions
- Monitor mentorship activity

## 🧩 Tech Stack

| Frontend          | Backend              | Database |
|------------------|----------------------|----------|
| React + Vite     | Node.js + Express    | SQLite   |
| Tailwind CSS     | Prisma ORM           |          |
| React Router DOM | JWT Auth             |          |

## 📁 Project Structure

```bash
dsa-project/
├── backend/
│   ├── prisma/           # Prisma schema and migrations
│   ├── src/
│   │   ├── controllers/  # Express route logic
│   │   ├── routes/       # Express route handlers
│   │   ├── middlewares/  # JWT authentication
│   │   └── server.ts     # Main server entry point
├── frontend/
│   ├── src/
│   │   ├── pages/        # React pages (Dashboard, Login, etc.)
│   │   ├── components/   # Shared UI components
│   │   └── App.tsx       # Routing setup

##  Clone the Repo
```bash
git clone https://github.com/jollyp-peo/mentorship-platform.git
cd mentorship-platform

##  Backend Setup
```bash
cd backend
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run dev

##  Frontend Setup
```bash
cd frontend
npm install
npm run dev

## .env
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret"

##👤 Author
Built with ❤️ Peter Ode|jollypeo