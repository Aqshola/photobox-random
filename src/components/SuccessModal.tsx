import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-yellow-300 border-4 border-black rounded-2xl shadow-xl p-8 max-w-xs w-full text-center relative comic-font animate-bounce-in">
        <button
          className="absolute top-2 right-2 text-black hover:text-red-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex flex-col items-center gap-3">
          <span className="text-5xl">🎉</span>
          <h2 className="text-2xl font-extrabold text-black mb-2 comic-font drop-shadow">Success!</h2>
          <p className="text-lg font-semibold text-black mb-2">Your comic photo has been saved!</p>
          <button
            className="mt-4 px-6 py-2 bg-pink-500 border-2 border-black rounded-full shadow hover:bg-pink-600 text-white font-bold text-lg comic-font transition-all"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          80% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.7s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .comic-font {
          font-family: 'Bangers', 'Comic Sans MS', cursive, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default SuccessModal;
