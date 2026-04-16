import React from 'react';
import './AlertModal.css';

function AlertModal() {
  return (
    <div className="alert-box">
      <h2>Alert</h2>
      <p>High risk detected!</p>
      <div className="alert-buttons">
        <button>Dismiss</button>
        <button>View Details</button>
      </div>
    </div>
  );
}

export default AlertModal;