# Antigravity Prompt — Task Management Web Application

I am providing you with an image of a project description. Read the image carefully and use it as the source of truth for the project requirements.

## Project identified from the image

**Task Management Web Application (Backend Integrations)**  
**Backend:** Django, Python, SQLite

The project description says:
- Build a scalable web-based task management system.
- Focus on efficient backend handling and data routing.
- Implement RESTful APIs for CRUD operations.
- Keep the architecture ready for future third-party API and AI integrations.

## Your Goal

Build this project from scratch as a **simple, beginner-friendly full-stack application**. Do not over-engineer it. The project should be easy for a beginner/fresher to understand, run, modify, and explain in an interview.

### Required Stack

Backend:
- Python
- Django
- Django REST Framework
- SQLite

Frontend:
- Basic React.js frontend
- HTML
- CSS
- JavaScript
- Keep the React implementation simple; do not introduce unnecessary advanced state-management libraries.

### Core Features

Implement a basic Task Management System with:
1. Create a task
2. View all tasks
3. View a single task
4. Update a task
5. Delete a task
6. Mark a task as completed/pending
7. Basic task fields such as:
   - title
   - description
   - status
   - priority
   - created_at
   - updated_at
8. REST API endpoints for CRUD operations.
9. Connect the React frontend to the Django REST API.
10. Display API errors in a simple user-friendly way.

### Backend Requirements

Use a clean but beginner-friendly Django structure:
- project
- app
- models
- serializers
- views/viewsets
- URLs
- database

Use Django REST Framework for APIs.

Keep the API design straightforward, for example:
- GET /api/tasks/
- POST /api/tasks/
- GET /api/tasks/<id>/
- PUT/PATCH /api/tasks/<id>/
- DELETE /api/tasks/<id>/

Use SQLite as the default database.

Do not add authentication, Redis, Celery, Docker, microservices, Kafka, WebSockets, or cloud deployment unless absolutely necessary. These are out of scope for this beginner version.

### Frontend Requirements

Create a basic React UI with:
- Task list
- Add task form
- Edit task
- Delete task
- Change task status
- Simple loading state
- Simple error message
- Clean beginner-friendly CSS

Keep the UI functional rather than visually complex.

### Third-Party / AI Integration Readiness

The original project mentions future third-party API and AI integrations.

For this version:
- Do NOT build a complicated AI system.
- Structure the backend cleanly so another API or AI service could be added later.
- Add a small explanation/documentation showing where future integrations could be placed.
- Optionally create a simple placeholder service/module, but do not use paid APIs or API keys.

### Development Rules

1. First create the project structure.
2. Then implement the Django backend.
3. Create the database model and migrations.
4. Implement REST APIs.
5. Test every CRUD endpoint.
6. Then create the React frontend.
7. Connect React with the Django API.
8. Test the complete application.
9. Fix errors before considering the project complete.
10. Keep the code readable and beginner-friendly.
11. Add comments only where they help understanding.
12. Avoid unnecessary abstractions and advanced patterns.
13. Use a requirements.txt file.
14. Add a .gitignore.
15. Provide clear setup and run commands for Windows.

## Expected Folder Structure

Use a structure similar to:

task-management/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── config/
│   └── tasks/
├── frontend/
│   ├── package.json
│   ├── src/
│   └── ...
├── README.md
├── IMPLEMENTATION.md
└── TARGET.md

You may adjust the structure slightly if there is a clear reason, but keep it simple.

## Documentation Requirements

Create these files:

### IMPLEMENTATION.md
Explain:
- project setup
- backend implementation
- database model
- serializer
- API implementation
- URL routing
- CRUD flow
- frontend implementation
- frontend/backend connection
- testing steps
- future integration approach

### README.md
Include:
- project title
- project overview
- features
- technology stack
- folder structure
- prerequisites
- installation
- backend run commands
- frontend run commands
- API endpoints
- how to use the application
- future improvements

### TARGET.md
Clearly define:
- project objective
- learning objectives
- functional targets
- backend targets
- frontend targets
- API targets
- expected final output
- beginner learning outcomes

## Important

Before writing code:
1. Read the provided project image carefully.
2. Confirm the implementation matches the project description in the image.
3. Keep all functionality aligned with the stated project.
4. Do not add unnecessary advanced features.
5. Build the project step-by-step and keep it suitable for a beginner/fresher portfolio.
6. At the end, verify that the application can actually be started locally and that CRUD operations work from the React frontend.

Generate the complete project with all source files and documentation.
