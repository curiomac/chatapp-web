import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose && onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => onClose && onClose()}
      ></div>
      <div className="relative bg-[var(--font-color-beta)] text-black p-6 rounded-lg shadow-lg max-w-lg w-full z-10">
        <button
          className="absolute top-2 right-2 text-black hover:text-gray-600"
          onClick={() => onClose && onClose()}
        >
          &#10005;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
