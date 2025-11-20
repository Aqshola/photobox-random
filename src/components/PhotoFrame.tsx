import { objectFit } from 'html2canvas-pro/dist/types/css/property-descriptors/object-fit';
import { forwardRef } from 'react';

interface PhotoFrameProps {
  photos: (string | null)[];
}

const PhotoFrame = forwardRef<HTMLDivElement, PhotoFrameProps>(({ photos }, ref) => {

  const photoPositions = [
    // Left side
    { top: '5%', left: '1%', width: '60%', zIndex: 10, },
    { top: '33%', left: '1%', width: '60%', zIndex: 10 },
    { top: '61%', left: '1%', width: '60%', zIndex: 10 },
    // Right side (future use)
    { top: '5%', right: '-6%', width: '59%', zIndex: 10 },
    { top: '33%', right: '-6%', width: '59%', height: '27%', zIndex: 10 },
    { top: '60%', right: '-6%', width: '59%', height: '27%', zIndex: 10 },
  ];

  return (
    <div className='w-fit mx-auto'>
      <div
        ref={ref}
        className="relative p-0 m-0 md:w-[400px] w-full flex overflow-hidden"
      >
        <img
          src="/frame.png"
          alt="frame"
          className="w-full h-full object-contain relative z-20 pointer-events-none"
        />

        {photos.map((photo, index) => (
          photo && (
            <div
              key={photo}
              className="absolute"
              style={{ ...photoPositions[index] }}
            >
              {/* We use IMG here instead of background-image for better export stability */}
              <img
                src={photo}
                alt={`Slot ${index}`}


              />
            </div>
          )
        ))}
      </div>
    </div>
  );
});

PhotoFrame.displayName = 'PhotoFrame';

export default PhotoFrame;