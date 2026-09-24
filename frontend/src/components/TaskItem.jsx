import React from 'react';

/**
 * TaskItem Component representing a single task card.
 */
export default function TaskItem({ task, onToggleStatus, onEdit, onDelete }) {
  const isCompleted = task.status === 'completed';

  // Format timestamp nicely
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <article
      id={`task-item-${task.id}`}
      className={`task-card ${isCompleted ? 'completed' : ''}`}
      aria-label={`Task: ${task.title}`}
    >
      {/* Checkbox status toggle */}
      <button
        type="button"
        id={`toggle-task-${task.id}`}
        className={`task-status-btn ${isCompleted ? 'checked' : ''}`}
        onClick={() => onToggleStatus(task.id)}
        title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
        aria-label={isCompleted ? 'Mark as pending' : 'Mark as completed'}
      >
        ✓
      </button>

      {/* Task text & details */}
      <div className="task-content">
        <h3 className="task-title" id={`task-title-${task.id}`}>
          {task.title}
        </h3>

        {task.description && (
          <p className="task-desc" id={`task-desc-${task.id}`}>
            {task.description}
          </p>
        )}

        <div className="task-footer">
          {/* Priority Badge */}
          <span className={`badge badge-priority-${task.priority}`}>
            ● {task.priority.toUpperCase()}
          </span>

          {/* Status Badge */}
          <span className={`badge badge-status-${task.status}`}>
            {isCompleted ? 'COMPLETED' : 'PENDING'}
          </span>

          {/* Formatted Date */}
          <span className="task-time" title={`Created at ${task.created_at}`}>
            {formatDate(task.created_at)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="task-actions">
        <button
          type="button"
          id={`edit-task-btn-${task.id}`}
          className="btn btn-icon"
          onClick={() => onEdit(task)}
          title="Edit task"
          aria-label={`Edit ${task.title}`}
        >
          ✏️
        </button>

        <button
          type="button"
          id={`delete-task-btn-${task.id}`}
          className="btn btn-icon"
          style={{ color: '#ef4444' }}
          onClick={() => onDelete(task.id)}
          title="Delete task"
          aria-label={`Delete ${task.title}`}
        >
          🗑️
        </button>
      </div>
    </article>
  );
}
