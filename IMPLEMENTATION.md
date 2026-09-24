# IMPLEMENTATION.md

## 1. Project Overview

The Task Management Web Application is a beginner-friendly full-stack project using Django, Django REST Framework, SQLite, and React.

The backend provides CRUD REST APIs for tasks, while the React frontend consumes those APIs.

## 2. Backend Setup

```bash
mkdir task-management
cd task-management

python -m venv venv
venv\Scripts\activate

mkdir backend
cd backend

pip install django djangorestframework django-cors-headers
django-admin startproject config .
python manage.py startapp tasks
```

Create `requirements.txt`:

```txt
Django>=5.0,<6.0
djangorestframework>=3.15.0
django-cors-headers>=4.3.0
```

## 3. Django Configuration

Add the required applications to `INSTALLED_APPS`:

- `rest_framework`
- `corsheaders`
- `tasks`

Configure CORS for the local React development server in `config/settings.py`.

## 4. Task Model

Create a simple `Task` model containing:

- `title`
- `description`
- `status`
- `priority`
- `created_at`
- `updated_at`

Example status values:

- `pending`
- `completed`

Example priority values:

- `low`
- `medium`
- `high`

## 5. Database

Use SQLite because it is simple and requires no separate database server.

Run:

```bash
python manage.py makemigrations
python manage.py migrate
```

## 6. Serializer

Create a Django REST Framework serializer to convert `Task` model objects into JSON and validate incoming request data.

## 7. REST API

Implement CRUD endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks/` | List tasks |
| POST | `/api/tasks/` | Create task |
| GET | `/api/tasks/<id>/` | Get one task |
| PUT | `/api/tasks/<id>/` | Update full task |
| PATCH | `/api/tasks/<id>/` | Partially update task |
| PATCH | `/api/tasks/<id>/toggle-status/` | Toggle task status |
| DELETE | `/api/tasks/<id>/` | Delete task |

A `ModelViewSet` is used because it keeps the implementation simple and clean.

## 8. URL Routing

Register the task API routes using Django REST Framework's router (`DefaultRouter`).

This creates a clean routing structure and keeps URL configuration simple.

## 9. Backend Testing

Run the automated test suite before testing the frontend:

```bash
python manage.py test tasks
```

All 8 test cases verify:
- GET (list & retrieve)
- POST (create & validation check)
- PUT & PATCH (updates)
- PATCH toggle-status action
- DELETE (removal)

## 10. Frontend Setup

From the project root:

```bash
cd frontend
npm install
npm run dev
```

Use React with modern Vanilla CSS styling and modular components:

- `Navbar`: App title, branding, and live backend connection badge.
- `StatsBar`: Quick overview of total, pending, completed, and high-priority tasks.
- `TaskForm`: Handles creating and editing tasks with input validation.
- `TaskItem`: Task card with priority pill, status toggle checkbox, timestamps, and edit/delete actions.
- `TaskList`: Manages search filtering, status tab filters (All/Pending/Completed), and empty states.
- `api.js`: Centralized REST API service module utilizing browser `fetch()`.

## 11. Connecting React to Django

The communication flow:

```text
React UI
   ↓
fetch() HTTP Request
   ↓
Django REST API (urls.py -> views.py)
   ↓
TaskSerializer
   ↓
Task Model (ORM)
   ↓
SQLite Database (db.sqlite3)
```

## 12. Future Integration Readiness

The backend contains a dedicated service layer in `backend/tasks/services.py`:
- `TaskAIService`: Demonstrates placeholder for AI task suggestions, summarization, or priority estimation.
- `TaskNotificationService`: Architecture hook for third-party alerts (Slack, email, SMS).

## 13. Final Verification

Run backend:
```bash
cd backend
.\venv\Scripts\activate
python manage.py runserver
```

Run frontend in another terminal:
```bash
cd frontend
npm run dev
```

Open `http://localhost:5173/` and verify the complete CRUD flow.
