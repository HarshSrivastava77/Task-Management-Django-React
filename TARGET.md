# TARGET.md

## Project Objective

Build a simple Task Management Web Application that demonstrates how a Django backend can provide RESTful CRUD APIs to a React frontend.

## Primary Target

Create a working application where a user can:

- Create a task
- View tasks
- Update a task
- Delete a task
- Mark a task as pending or completed

## Backend Targets

- Build a Django project.
- Create a `Task` model.
- Store data in SQLite.
- Use Django REST Framework.
- Implement CRUD APIs.
- Configure URL routing.
- Return JSON responses.
- Handle basic validation and errors.

## Frontend Targets

- Build a simple React interface.
- Create reusable beginner-level components.
- Add a task form.
- Display task data.
- Connect React to the Django API.
- Handle loading and basic errors.

## Integration Target

The React frontend and Django backend must communicate successfully over HTTP.

The complete flow should be:

```text
User
 ↓
React Frontend
 ↓
REST API
 ↓
Django
 ↓
SQLite
```

## Future Integration Target

The backend structure should be understandable and organized enough to support future:

- Third-party API integrations
- AI-assisted task features
- Notifications
- Productivity tools

These should remain future enhancements rather than part of the initial beginner implementation.

## Final Expected Output

At completion, the project should:

1. Start successfully on a local machine.
2. Display a working React task-management UI.
3. Create tasks through the API.
4. Read tasks from the API.
5. Update tasks through the API.
6. Delete tasks through the API.
7. Store data in SQLite.
8. Include complete setup documentation.
9. Be simple enough for a beginner to explain in a project interview.
