import React from 'react';

interface CaptureButtonProps {
  onClick: () => void;
  disabled: boolean;
  photoCount: number;
  totalPhotos: number;
}

const CaptureButton: React.FC<CaptureButtonProps> = ({ 
  onClick, 
  disabled, 
  photoCount, 
  totalPhotos 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 
        font-bold text-lg 
        rounded-full 
        transform transition-all duration-200
        comic-button
        ${disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 active:scale-95'
        }
        text-white
        border-2 border-white
        relative overflow-hidden
      `}
    >
      {/* Comic-style decorative elements */}
      <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-300 rounded-full transform rotate-12 opacity-80"></div>
      <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-blue-300 rounded-full transform -rotate-12 opacity-80"></div>
      
      <div className="relative z-10">
        {disabled ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <>
            <span className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="relative">
                SNAP! Photo {photoCount + 1} of {totalPhotos}
                {/* Comic-style text shadow effect */}
                <span className="absolute -top-0.5 -left-0.5 text-purple-800 opacity-30">SNAP! Photo {photoCount + 1} of {totalPhotos}</span>
              </span>
            </span>
          </>
        )}
      </div>
    </button>
  );
};

export default CaptureButton;
