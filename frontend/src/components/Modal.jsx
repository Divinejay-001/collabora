import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl mx-4 sm:mx-auto p-4">
        <div className="relative bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-slate-200 dark:border-zinc-700">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700 rounded-t">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center transition"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 md:p-5 space-y-4 text-gray-800 dark:text-gray-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal
