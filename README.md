<<<<<<< HEAD

# CraftPal

**Overview**
- **Project:** CraftPal — a full-stack marketplace and community platform for makers to track materials, manage projects, sell products, and connect with other creators.
- **Repo layout:** `backend/` (Express + MongoDB API) and `frontend/` (React + Vite UI).

**Live Demo**
- **Frontend (Production):** https://your-frontend-demo.example  <!-- replace with your frontend URL -->
- **Backend (API):** https://your-backend-demo.example  <!-- replace with your backend URL -->

If you have deployed to Vercel/Netlify/Render, replace the placeholders above with the actual URLs.

**Features**
- **Authentication:** Email / JWT-based auth and Google sign-in hooks present.
- **Marketplace:** List and browse products and materials.
- **Community:** Posts and video sharing.
- **Finance & Projects:** Track expenses, transactions, and project progress.
- **AI Assistant:** Integrated AI tools (OpenAI) for creative assistance.

**Tech Stack**
- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- **Dev tools:** Nodemon, Vite, ESLint

**Quick Start (Windows / cmd.exe)**

- Clone the repo:

```
git clone <your-repo-url> craftpal
cd craftpal
```

- Backend (API):

```
cd backend
npm install
REM create a .env file with the variables shown below
npm run dev
```

- Frontend (UI):

```
cd frontend
npm install
npm run dev
```

Open the frontend dev server URL (usually `http://localhost:5173`) in your browser.

**Environment Variables**
- Create a `.env` in `backend/` with at least:

```
MONGO_URI=mongodb://127.0.0.1:27017/craftpal
PORT=5000
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=sk-...
```

Replace keys/values with production secrets when you deploy.

**API / Important Endpoints (summary)**
- `POST /api/auth/register` — register a user
- `POST /api/auth/login` — login, returns JWT
- `GET /api/posts` — list community posts
- `POST /api/products` — create product (auth required)

Check `backend/src/controllers` and `backend/src/routes` for the full list of endpoints and request/response shapes.

**Seed sample data**
- The project includes a seeder at `backend/src/seed.js` to populate sample users and posts.

Run it from the `backend` folder (ensure `MONGO_URI` is set):

```
cd backend
node src/seed.js
```

**Testing**
- There are no automated tests included in this repo currently. You can exercise the API with Postman or curl against the running dev server.

**Deployment notes**
- Frontend: deploy to Vercel or Netlify (Vite apps work out of the box). Set the frontend's environment variables (if any) and point to the deployed backend API URL.
- Backend: deploy to Render, Heroku, or Fly.io; set `MONGO_URI`, `JWT_SECRET`, and `OPENAI_API_KEY` in the provider's secrets.

**Contributing**
- Fork the repo, create a feature branch, and open a PR with a clear description. Keep changes focused and add documentation for new public behavior.

**License**
- This project does not include a license file. Add a `LICENSE` (e.g., MIT) if you intend to make it open source.

**Contact / Maintainers**
- If you want help deploying or want me to add CI/deployment configs, reply here with your target provider and I can add them.

---

Replace the demo placeholders above with your actual production URLs once available. If you'd like, I can add deploy configuration for Vercel/Netlify/Render and wire the exact demo links into this README.
=======
# MERN Stack Capstone Project

This assignment focuses on designing, developing, and deploying a comprehensive full-stack MERN application that showcases all the skills you've learned throughout the course.

## Assignment Overview

You will:
1. Plan and design a full-stack MERN application
2. Develop a robust backend with MongoDB, Express.js, and Node.js
3. Create an interactive frontend with React.js
4. Implement testing across the entire application
5. Deploy the application to production

## Getting Started

1. Accept the GitHub Classroom assignment
2. Clone the repository to your local machine
3. Follow the instructions in the `Week8-Assignment.md` file
4. Plan, develop, and deploy your capstone project

## Files Included

- `Week8-Assignment.md`: Detailed assignment instructions

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git and GitHub account
- Accounts on deployment platforms (Render/Vercel/Netlify/etc.)

## Project Ideas

The `Week8-Assignment.md` file includes several project ideas, but you're encouraged to develop your own idea that demonstrates your skills and interests.

## Submission

Your project will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Commit and push your code regularly
2. Include comprehensive documentation
3. Deploy your application and add the live URL to your README.md
4. Create a video demonstration and include the link in your README.md

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [GitHub Classroom Guide](https://docs.github.com/en/education/manage-coursework-with-github-classroom) 
>>>>>>> second/main
