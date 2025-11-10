import React, { useEffect } from "react";
import { Button } from "./Button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

/**
 * PUBLIC_INTERFACE
 * Modal dialog with backdrop; focus trapping kept minimal for simplicity.
 */
export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title || "Dialog"}>
      <div className="modal-content">
        <div style={{ padding: 16, borderBottom: "1px solid rgba(17,24,39,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <Button variant="ghost" aria-label="Close dialog" onClick={onClose}>Close</Button>
        </div>
        <div style={{ padding: 16 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
