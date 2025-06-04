import { forwardRef } from 'react';

interface PhotoFrameProps {
  photos: (string | null)[];
}

const PhotoFrame = forwardRef<HTMLDivElement, PhotoFrameProps>(({ photos }, ref) => {

  // Define the positions for each photo in the frame
  // These are the positions for the 6 slots (3 on each side)
  // We'll only use the first 3 slots for now, but we could use all 6 in the future
  const photoPositions = [
    // Left side photos (top to bottom)
    { top: '5%', left: '18%', width: '30%', height: '27%', zIndex: 10 },
    { top: '32%', left: '18%', width: '30%', height: '27%', zIndex: 10 },
    { top: '61%', left: '18%', width: '30%', height: '27%',  zIndex: 10 },
    // Right side photos (top to bottom) - not used yet but available for future enhancement
    { top: '3%', right: '18%', width: '30%', height: '27%',  zIndex: 10 },
    { top: '32%', right: '18%', width: '30%', height: '27%',  zIndex: 10 },
    { top: '61%', right: '18%', width: '30%', height: '27%', zIndex: 10 },
  ];

  return (
    <div 
      ref={ref} 
      className="relative mx-auto bg-transparent"
      style={{ 
        width: '100%', 
        maxWidth: '800px',
        aspectRatio: '1/1',
      }}
    >
      {/* Frame image */}
      <img 
        src="/frame.png" 
        alt="Photo frame" 
        className="w-full h-full object-contain relative z-20"
      />
      
      {/* Overlay the photos on the frame */}
      {photos.map((photo, index) => (
        photo  && (
          <div 
            key={index}
            className="absolute overflow-hidden rounded-md shadow-lg border-2 border-white"
            style={{
              ...photoPositions[index],
              backgroundImage: `url(${photo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Optional decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        )
      ))}
    </div>
  );
});

PhotoFrame.displayName = 'PhotoFrame';

export default PhotoFrame;
