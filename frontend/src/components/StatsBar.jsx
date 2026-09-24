import React from 'react';

/**
 * StatsBar Component displaying task counter metrics.
 */
export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const pending = total - completed;
  const highPriority = tasks.filter((t) => t.priority === 'high' && t.status === 'pending').length;

  return (
    <section className="stats-bar" aria-label="Task statistics">
      <div className="stat-card">
        <div className="stat-label">Total Tasks</div>
        <div className="stat-value">{total}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Pending</div>
        <div className="stat-value" style={{ color: '#818cf8' }}>{pending}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Completed</div>
        <div className="stat-value" style={{ color: '#34d399' }}>{completed}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">High Priority</div>
        <div className="stat-value" style={{ color: '#f87171' }}>{highPriority}</div>
      </div>
    </section>
  );
}
