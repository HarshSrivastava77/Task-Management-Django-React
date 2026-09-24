import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import {
  getTasks,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
  checkBackendHealth,
} from './services/api';

/**
 * Main Application Component
 */
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: string }
  const [isConnected, setIsConnected] = useState(false);

  // Helper to show transient notification
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4500);
  };

  // Fetch tasks from Django REST API
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setIsConnected(true);
    } catch (err) {
      setIsConnected(false);
      showNotification('error', `Failed to load tasks: ${err.message}. Is Django running on http://127.0.0.1:8000?`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check health and load tasks on mount
  useEffect(() => {
    loadTasks();
    const interval = setInterval(async () => {
      const healthy = await checkBackendHealth();
      setIsConnected(healthy);
    }, 8000);

    return () => clearInterval(interval);
  }, [loadTasks]);

  // Handle Create or Update task
  const handleFormSubmit = async (taskData) => {
    try {
      setIsSubmitting(true);
      if (editingTask) {
        // Update task
        const updated = await updateTask(editingTask.id, taskData);
        setTasks((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        );
        setEditingTask(null);
        showNotification('success', `Task "${updated.title}" updated successfully!`);
      } else {
        // Create new task
        const created = await createTask(taskData);
        setTasks((prev) => [created, ...prev]);
        showNotification('success', `Task "${created.title}" created successfully!`);
      }
    } catch (err) {
      showNotification('error', `Error saving task: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Status Toggle
  const handleToggleStatus = async (taskId) => {
    try {
      const updated = await toggleTaskStatus(taskId);
      setTasks((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
      showNotification(
        'success',
        `Task marked as ${updated.status === 'completed' ? 'completed' : 'pending'}.`
      );
    } catch (err) {
      showNotification('error', `Failed to update status: ${err.message}`);
    }
  };

  // Handle Edit click
  const handleEditClick = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Handle Delete task
  const handleDeleteTask = async (taskId) => {
    const taskToDelete = tasks.find((t) => t.id === taskId);
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${taskToDelete?.title || 'this task'}"?`
    );
    if (!confirmDelete) return;

    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      if (editingTask?.id === taskId) {
        setEditingTask(null);
      }
      showNotification('success', 'Task deleted successfully.');
    } catch (err) {
      showNotification('error', `Failed to delete task: ${err.message}`);
    }
  };

  return (
    <div className="app-container">
      <Navbar isConnected={isConnected} />

      {notification && (
        <div
          id="toast-notification"
          className={`toast-banner ${notification.type}`}
          role="alert"
        >
          <span>{notification.message}</span>
          <button
            type="button"
            className="btn btn-icon"
            onClick={() => setNotification(null)}
            style={{ color: 'inherit', marginLeft: 'auto' }}
            aria-label="Dismiss alert"
          >
            ✕
          </button>
        </div>
      )}

      <StatsBar tasks={tasks} />

      <main className="main-grid">
        <aside>
          <TaskForm
            onSubmit={handleFormSubmit}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
            isSubmitting={isSubmitting}
          />
        </aside>

        <section>
          <TaskList
            tasks={tasks}
            loading={loading}
            onToggleStatus={handleToggleStatus}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
          />
        </section>
      </main>
    </div>
  );
}
