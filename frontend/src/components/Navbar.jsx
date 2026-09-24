import React from 'react';

/**
 * Navbar Component displaying application branding and backend health status.
 */
export default function Navbar({ isConnected }) {
  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">✓</div>
        <div>
          <h1 className="brand-title">TaskMaster</h1>
        </div>
        <span className="brand-badge">Django + React</span>
      </div>

      <div className="server-status" title={isConnected ? 'Backend is responding normally' : 'Connecting to Django API...'}>
        <span className={`status-dot ${isConnected ? '' : 'offline'}`}></span>
        <span>{isConnected ? 'API Connected' : 'Connecting...'}</span>
      </div>
    </header>
  );
}
