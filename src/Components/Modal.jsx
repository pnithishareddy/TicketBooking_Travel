// import React from "react";
// import { X } from "lucide-react";

// function Modal({
//   open,
//   title,
//   children,
//   onClose,
//   onConfirm,
//   confirmText = "Save",
//   danger = false,
// }) {
//   if (!open) return null;

//   return (
//     <div className="modal-backdrop">
//       <div className="modal">
//         <div className="modal-header">
//           <h2>{title}</h2>

//           <button onClick={onClose} className="modal-close">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="modal-content">{children}</div>

//         {onConfirm && (
//           <div className="modal-footer">
//             <button className="btn secondary" onClick={onClose}>
//               Cancel
//             </button>

//             <button
//               className={`btn ${danger ? "danger" : "primary"}`}
//               onClick={onConfirm}
//             >
//               {confirmText}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Modal;






















import React from "react";
import { X } from "lucide-react";

function Modal({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Save",
  danger = false,
  wide = false,
}) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className={`modal ${wide ? "modal-wide" : ""}`}>
        <div className="modal-header">
          <h2>{title}</h2>

          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">{children}</div>

        {onConfirm && (
          <div className="modal-footer">
            <button className="btn secondary" onClick={onClose}>
              Cancel
            </button>

            <button
              className={`btn ${danger ? "danger" : "primary"}`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;