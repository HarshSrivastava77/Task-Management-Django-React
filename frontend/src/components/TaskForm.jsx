import React, { useState, useEffect } from 'react';

/**
 * TaskForm Component for creating and editing tasks.
 */
export default function TaskForm({ onSubmit, editingTask, onCancelEdit, isSubmitting }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('pending');
  const [validationError, setValidationError] = useState('');

  // When editingTask changes, populate form fields
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority || 'medium');
      setStatus(editingTask.status || 'pending');
      setValidationError('');
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setStatus('pending');
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('Please enter a task title.');
      return;
    }

    setValidationError('');
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
    });

    if (!editingTask) {
      resetForm();
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2 className="form-title" id="form-heading">
          {editingTask ? '✏️ Edit Task' : '✨ Add New Task'}
        </h2>
        <p className="form-subtitle">
          {editingTask ? 'Update task details and priority' : 'Create a new task to stay organized'}
        </p>
      </div>

      <form className="task-form" onSubmit={handleSubmit} aria-labelledby="form-heading">
        {validationError && (
          <div className="toast-banner error" role="alert">
            <span>{validationError}</span>
          </div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor="task-title-input">
            Task Title *
          </label>
          <input
            id="task-title-input"
            type="text"
            className="form-input"
            placeholder="e.g. Design API architecture"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="task-description-input">
            Description
          </label>
          <textarea
            id="task-description-input"
            className="form-textarea"
            placeholder="Add relevant notes or details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="task-priority-select">
            Priority Level
          </label>
          <select
            id="task-priority-select"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
        </div>

        {editingTask && (
          <div className="form-group">
            <label className="form-label" htmlFor="task-status-select">
              Status
            </label>
            <select
              id="task-status-select"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="pending">⏳ Pending</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            id="submit-task-btn"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
          </button>

          {editingTask && (
            <button
              type="button"
              id="cancel-edit-btn"
              className="btn btn-secondary"
              onClick={onCancelEdit}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
