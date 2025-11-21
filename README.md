
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
- Licensed under the MIT License. See the `LICENSE` file for details.
- [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Contact / Maintainers**
- **Maintainer:** `arynjeri` — GitHub: https://github.com/arynjeri
- **Support & issues:** Open an issue in this repository for bugs, questions, or feature requests.
- **Contributions:** PRs welcome — fork the repo, create a branch, and open a pull request. Please include a clear description and tests/notes for public-facing changes.


