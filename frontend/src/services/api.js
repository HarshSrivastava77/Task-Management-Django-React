/**
 * API service for communicating with the Django REST Framework backend.
 */

const API_BASE_URL = 'http://127.0.0.1:8000/api/tasks';

/**
 * Helper to handle HTTP errors and extract helpful messages.
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `Server error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (typeof errorData === 'object' && errorData !== null) {
        // Collect field validation errors if available (e.g. { title: ["This field may not be blank."] })
        const messages = Object.entries(errorData).map(
          ([key, value]) => `${key}: ${Array.isArray(value) ? value.join(' ') : value}`
        );
        errorMessage = messages.join(' | ') || errorMessage;
      }
    } catch {
      // response wasn't JSON
    }
    throw new Error(errorMessage);
  }

  // 204 No Content does not have JSON body
  if (response.status === 204) {
    return true;
  }

  return response.json();
}

/**
 * Fetch all tasks from GET /api/tasks/
 */
export async function getTasks() {
  const response = await fetch(`${API_BASE_URL}/`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  return handleResponse(response);
}

/**
 * Fetch a single task by ID from GET /api/tasks/<id>/
 */
export async function getTask(id) {
  const response = await fetch(`${API_BASE_URL}/${id}/`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  return handleResponse(response);
}

/**
 * Create a new task via POST /api/tasks/
 */
export async function createTask(taskData) {
  const response = await fetch(`${API_BASE_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
}

/**
 * Update an existing task via PUT /api/tasks/<id>/
 */
export async function updateTask(id, taskData) {
  const response = await fetch(`${API_BASE_URL}/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
}

/**
 * Partially update a task via PATCH /api/tasks/<id>/
 */
export async function patchTask(id, partialData) {
  const response = await fetch(`${API_BASE_URL}/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(partialData),
  });
  return handleResponse(response);
}

/**
 * Toggle task status between 'pending' and 'completed'
 */
export async function toggleTaskStatus(id) {
  const response = await fetch(`${API_BASE_URL}/${id}/toggle-status/`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
    },
  });
  return handleResponse(response);
}

/**
 * Delete a task via DELETE /api/tasks/<id>/
 */
export async function deleteTask(id) {
  const response = await fetch(`${API_BASE_URL}/${id}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
    },
  });
  return handleResponse(response);
}

/**
 * Quick ping to check if Django backend is reachable
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/`, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}
