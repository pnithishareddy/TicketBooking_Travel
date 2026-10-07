import { CheckCircle, X } from "lucide-react";
import React from "react";
function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast">
      <CheckCircle size={20} />
      <span>{message}</span>

      <button onClick={onClose}>
        <X size={17} />
      </button>
    </div>
  );
}

export default Toast;