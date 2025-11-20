import { forwardRef } from 'react';

interface PhotoFrameProps {
  photos: (string | null)[];
}

const PhotoFrame = forwardRef<HTMLDivElement, PhotoFrameProps>(({ photos }, ref) => {

  const photoPositions = [
    // Left side
    { top: '5%', left: '4%', width: '45%', height: '27%', zIndex: 10 },
    { top: '32%', left: '4%', width: '45%', height: '27%', zIndex: 10 },
    { top: '61%', left: '4%', width: '45%', height: '27%', zIndex: 10 },
    // Right side (future use)
    { top: '5%', right: '2%', width: '45%', height: '27%', zIndex: 10 },
    { top: '33%', right: '4%', width: '45%', height: '27%', zIndex: 10 },
    { top: '60%', right: '4%', width: '45%', height: '27%', zIndex: 10 },
  ];

  return (
    <div className='w-fit mx-auto'>
      <div
        ref={ref}
        className="relative p-0 m-0 md:w-[400px] w-full flex"
        // Adding white background ensures no transparency issues in the final PNG
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* 1. The Main Frame */}
        <img
          src="/frame.png"
          alt="Photo frame"
          className="w-full h-full object-contain relative z-20 pointer-events-none"
          // crossOrigin is vital for the capture library to read the pixel data
          crossOrigin="anonymous"
        />

        {/* 2. The User Photos */}
        {photos.map((photo, index) => (
          photo && (
            <div
              key={index}
              className="absolute overflow-hidden rounded-md"
              style={{ ...photoPositions[index] }}
            >
              {/* We use IMG here instead of background-image for better export stability */}
              <img
                src={photo}
                alt={`Slot ${index}`}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
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