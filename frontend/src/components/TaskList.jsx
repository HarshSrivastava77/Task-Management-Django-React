import React, { useState, useMemo } from 'react';
import TaskItem from './TaskItem';

/**
 * TaskList Component managing filters, search, and list view.
 */
export default function TaskList({
  tasks,
  loading,
  onToggleStatus,
  onEdit,
  onDelete,
}) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tasks based on status and search query
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (filter === 'pending' && task.status !== 'pending') return false;
      if (filter === 'completed' && task.status !== 'completed') return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = (task.description || '').toLowerCase().includes(query);
        return matchesTitle || matchesDesc;
      }

      return true;
    });
  }, [tasks, filter, searchQuery]);

  return (
    <section className="list-container" aria-label="Tasks list section">
      {/* Filter and Search Bar */}
      <div className="filter-toolbar">
        <div className="filter-tabs" role="tablist" aria-label="Task filters">
          <button
            type="button"
            id="filter-all-btn"
            role="tab"
            aria-selected={filter === 'all'}
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button
            type="button"
            id="filter-pending-btn"
            role="tab"
            aria-selected={filter === 'pending'}
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({tasks.filter((t) => t.status === 'pending').length})
          </button>
          <button
            type="button"
            id="filter-completed-btn"
            role="tab"
            aria-selected={filter === 'completed'}
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({tasks.filter((t) => t.status === 'completed').length})
          </button>
        </div>

        <div className="search-box">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            id="task-search-input"
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search tasks"
          />
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="loading-indicator" role="status">
          <div className="spinner"></div>
          <span>Loading tasks from backend...</span>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredTasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h4 className="empty-title">
            {searchQuery
              ? 'No matching tasks found'
              : filter === 'all'
              ? 'No tasks yet'
              : `No ${filter} tasks`}
          </h4>
          <p className="empty-desc">
            {searchQuery
              ? 'Try searching with a different term or clear the search input.'
              : filter === 'all'
              ? 'Use the form to create your very first task!'
              : `You have no tasks marked as ${filter}.`}
          </p>
        </div>
      )}

      {/* Task Cards */}
      {!loading && filteredTasks.length > 0 && (
        <div className="task-cards" id="tasks-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
