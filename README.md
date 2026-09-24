# TaskMaster — Full-Stack Task Management Web Application

A clean, modern, and beginner-friendly full-stack task management web application built with **Django REST Framework (DRF)**, **SQLite**, and **React (Vite)**.

Designed with a decoupled architecture where Django serves RESTful CRUD APIs and React provides a responsive, interactive UI. The codebase is deliberately structured to be easy to understand, test, explain in technical interviews, and extend with future AI or third-party integrations.

---

## 📑 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Key Features](#-key-features)
- [Tools & Technology Stack](#-tools--technology-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Prerequisites](#-prerequisites)
- [Step-by-Step Execution Guide](#-step-by-step-execution-guide)
  - [Terminal 1: Django Backend](#terminal-1-django-backend-setup--run)
  - [Terminal 2: React Frontend](#terminal-2-react-frontend-setup--run)
- [REST API Endpoints Reference](#-rest-api-endpoints-reference)
- [Running Automated Tests](#-running-automated-tests)
- [AI & Third-Party Integration Readiness](#-ai--third-party-integration-readiness)
- [Troubleshooting & FAQs](#-troubleshooting--faqs)
- [Learning Outcomes for Beginners](#-learning-outcomes-for-beginners)

---

## 🏛 Overview & Architecture

The application implements a decoupled client-server architecture:

```text
┌────────────────────────────────────────────────────────┐
│                   React 18 Frontend                    │
│    (Components: TaskForm, TaskList, TaskItem, Navbar)   │
└───────────────────────────┬────────────────────────────┘
                            │
              HTTP Requests │ JSON Responses
              (fetch API)   │ (CORS Enabled)
                            ▼
┌────────────────────────────────────────────────────────┐
│                Django REST Framework API                │
│    (Router -> ViewSets -> Serializers -> Task Model)   │
└───────────────────────────┬────────────────────────────┘
                            │ ORM
                            ▼
┌────────────────────────────────────────────────────────┐
│                    SQLite Database                     │
│                     (db.sqlite3)                       │
└────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

- **Full CRUD Operations**: Create, read, update (PUT/PATCH), and delete tasks.
- **Instant Status Toggling**: Mark tasks as `pending` or `completed` with a single click and real-time strikethrough styling.
- **Priority Categorization**: Color-coded badges for `low` (green), `medium` (amber), and `high` (coral/red).
- **Search & Filter Tabs**: Filter by status (**All**, **Pending**, **Completed**) or perform instant live text searches across titles and descriptions.
- **Live Metrics Dashboard**: Real-time counters showing total, pending, completed, and high-priority tasks.
- **Backend Connection Health Indicator**: Dynamic ping status displaying whether the backend API is live or unreachable.
- **CORS Configured**: Pre-configured headers allowing smooth local communication between ports `5173` and `8000`.
- **Extensible Architecture**: Dedicated service layer (`tasks/services.py`) prepared for future AI task assistance, calendar sync, or notifications.

---

## 🛠 Tools & Technology Stack

### Backend
| Tool / Library | Version | Purpose |
|---|---|---|
| **Python** | 3.10+ | Core programming language |
| **Django** | 5.x | High-level Python web framework |
| **Django REST Framework** | 3.15+ | Toolkit for building robust RESTful APIs |
| **django-cors-headers** | 4.x | Middleware to handle Cross-Origin Resource Sharing (CORS) |
| **SQLite3** | Built-in | Lightweight, zero-configuration relational database |

### Frontend
| Tool / Library | Version | Purpose |
|---|---|---|
| **React** | 18.x | Modern UI component library |
| **Vite** | 5.x | Next-generation fast frontend build tool and dev server |
| **Vanilla CSS3** | Custom | Responsive glassmorphism design system without heavy CSS frameworks |
| **Google Fonts** | Outfit & Plus Jakarta Sans | Typography for clean, modern aesthetic |

---

## 📂 Project Directory Structure

```text
Todo/
├── backend/
│   ├── config/                  # Django project root configuration
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py          # DRF, CORS, database, and app settings
│   │   ├── urls.py              # Main URL router linking to /api/
│   │   └── wsgi.py
│   ├── tasks/                   # Tasks application module
│   │   ├── migrations/          # SQLite database migration files
│   │   ├── __init__.py
│   │   ├── admin.py             # Django admin panel registration
│   │   ├── apps.py              # Application configuration
│   │   ├── models.py            # Task model definition
│   │   ├── serializers.py       # DRF ModelSerializer with data validation
│   │   ├── services.py          # Extensibility layer for future AI/3rd-party services
│   │   ├── tests.py             # 8 automated unit tests for all CRUD endpoints
│   │   ├── urls.py              # DefaultRouter routes for /api/tasks/
│   │   └── views.py             # TaskViewSet implementation
│   ├── db.sqlite3               # SQLite database file
│   ├── manage.py                # Django CLI management script
│   ├── requirements.txt         # Python dependencies
│   └── venv/                    # Isolated Python virtual environment
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Branding and live backend ping indicator
│   │   │   ├── StatsBar.jsx     # Real-time task counter cards
│   │   │   ├── TaskForm.jsx     # Create and edit task form
│   │   │   ├── TaskItem.jsx     # Individual task card with action triggers
│   │   │   └── TaskList.jsx     # Filter tabs, live search, and list renderer
│   │   ├── services/
│   │   │   └── api.js           # REST API client using browser fetch()
│   │   ├── App.jsx              # Main React state & notification coordinator
│   │   ├── index.css            # Dark glassmorphism styling & animations
│   │   └── main.jsx             # React DOM root entry point
│   ├── index.html               # Main HTML entry with SEO metadata
│   ├── package.json             # NPM dependencies and scripts
│   └── vite.config.js           # Vite development configuration
├── .gitignore                   # Ignores venv, node_modules, pycache, db.sqlite3
└── README.md                    # Project documentation (this file)
```

---

## 📋 Prerequisites

Before running the project, verify that your machine has:
1. **Python 3.10 or higher**: Check by running `python --version` in terminal.
2. **Node.js (v18+) and npm**: Check by running `node -v` and `npm -v`.

---

## 🚀 Step-by-Step Execution Guide

To execute the project, you will use **two separate terminals**: one for the Django backend server and one for the React frontend server.

### Terminal 1: Django Backend Setup & Run

1. Open your terminal (PowerShell, Command Prompt, or Bash) and navigate to the `backend` folder:
   ```powershell
   cd backend
   ```

2. **Activate the virtual environment**:
   - On Windows (PowerShell):
     ```powershell
     .\venv\Scripts\activate
     ```
   - On Windows (Command Prompt):
     ```cmd
     venv\Scripts\activate.bat
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   *(You will see `(venv)` appear at the beginning of your terminal prompt).*

3. *(First-time setup only)* **Install dependencies**:
   ```powershell
   pip install -r requirements.txt
   ```

4. *(First-time setup only)* **Apply database migrations**:
   ```powershell
   python manage.py migrate
   ```

5. **Start the Django development server**:
   ```powershell
   python manage.py runserver
   ```

   **Output confirmation:**
   ```text
   Starting development server at http://127.0.0.1:8000/
   Quit the server with CTRL-BREAK.
   ```
   > Keep this terminal open. The backend is now ready and listening at `http://127.0.0.1:8000/`.

---

### Terminal 2: React Frontend Setup & Run

1. Open a **second terminal** window and navigate to the `frontend` folder:
   ```powershell
   cd frontend
   ```

2. *(First-time setup only)* **Install Node packages**:
   ```powershell
   npm install
   ```

3. **Start the Vite development server**:
   ```powershell
   npm run dev
   ```

   **Output confirmation:**
   ```text
     VITE v5.4.21  ready in 340 ms

     ➜  Local:   http://localhost:5173/
   ```

4. **Launch in Browser**:
   Open your browser and navigate to:
   👉 **`http://localhost:5173/`**

---

## 📡 REST API Endpoints Reference

Base URL: `http://127.0.0.1:8000/api/tasks/`

| HTTP Method | Endpoint | Description | Request Body Example | Success Status |
|---|---|---|---|:---:|
| `GET` | `/api/tasks/` | List all tasks | None | `200 OK` |
| `POST` | `/api/tasks/` | Create a new task | `{"title": "Task 1", "description": "Notes", "priority": "high", "status": "pending"}` | `201 Created` |
| `GET` | `/api/tasks/<id>/` | Retrieve a single task | None | `200 OK` |
| `PUT` | `/api/tasks/<id>/` | Replace/update entire task | `{"title": "New Title", "description": "New", "priority": "low", "status": "completed"}` | `200 OK` |
| `PATCH` | `/api/tasks/<id>/` | Partially update task | `{"status": "completed"}` | `200 OK` |
| `PATCH` | `/api/tasks/<id>/toggle-status/` | Toggle pending ↔ completed | None | `200 OK` |
| `DELETE` | `/api/tasks/<id>/` | Remove a task | None | `204 No Content` |

---

## 🧪 Running Automated Tests

A comprehensive unit test suite is included in `backend/tasks/tests.py` covering all CRUD operations, title validation, and action toggles.

To execute the test suite:

```powershell
cd backend
.\venv\Scripts\activate
python manage.py test tasks
```

**Expected output:**
```text
Creating test database for alias 'default'...
........
----------------------------------------------------------------------
Ran 8 tests in 0.060s

OK
Destroying test database for alias 'default'...
```

---

## 🤖 AI & Third-Party Integration Readiness

As specified in the project architecture requirements, the backend includes an isolated service module:
👉 [`backend/tasks/services.py`](backend/tasks/services.py)

This module demonstrates where future external capabilities can be integrated without modifying the core views or data models:

1. **AI Task Assistance (`TaskAIService`)**:
   - Automated priority estimation based on task title and description urgency keywords.
   - Placeholder for integrating LLM APIs (e.g., Google Gemini or OpenAI) to auto-generate task summaries or sub-task breakdowns.
2. **Third-Party Notifications (`TaskNotificationService`)**:
   - Dispatch alerts via email, Slack webhooks, or calendar sync upon task creation or completion.

---

## ❓ Troubleshooting & FAQs

- **Q: Frontend says "Connecting..." or fails to save tasks?**  
  **A**: Ensure the Django backend is actively running on port `8000` (`python manage.py runserver`). Check the `CORS_ALLOWED_ORIGINS` in `backend/config/settings.py` includes your frontend port (`http://localhost:5173`).

- **Q: Port 8000 or 5173 is already in use?**  
  **A**: You can start Django on a custom port by running:
  ```powershell
  python manage.py runserver 8080
  ```
  *(Remember to update `API_BASE_URL` in `frontend/src/services/api.js` to match).*

- **Q: How to reset the database?**  
  **A**: Delete `backend/db.sqlite3` and run:
  ```powershell
  python manage.py migrate
  ```

---

## 🎓 Learning Outcomes for Beginners

After working with this project, a developer can confidently explain:
1. How **Django models** define database tables and relations.
2. How **Django REST Framework Serializers** transform ORM objects into JSON and validate user input.
3. How **ModelViewSet** and routers handle standard HTTP REST methods cleanly.
4. How **CORS** allows two distinct local servers to securely exchange data.
5. How **React components** manage state (`useState`, `useEffect`, `useMemo`) to consume REST APIs via `fetch`.
6. How to write automated **unit tests** in Django for REST API validation.
