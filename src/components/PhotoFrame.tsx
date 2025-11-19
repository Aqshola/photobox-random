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
    { top: '5%', left: '4%', width: '45%', height: '27%', zIndex: 10 },
    { top: '32%', left: '4%', width: '45%', height: '27%', zIndex: 10 },
    { top: '61%', left: '4%', width: '45%', height: '27%',  zIndex: 10 },
    // Right side photos (top to bottom) - not used yet but available for future enhancement
    { top: '5%', right: '2%', width: '45%', height: '27%',  zIndex: 10 },
    { top: '33%', right: '4%', width: '45%', height: '27%',  zIndex: 10 },
    { top: '60%', right: '4%', width: '45%', height: '27%', zIndex: 10 },
  ];

  return (
    <div className='w-fit mx-auto'>

    <div 
      ref={ref} 
      className="relative   p-0 m-0 md:w-[400px] w-full flex"
   
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
            className="absolute overflow-hidden rounded-md "
            style={{
              ...photoPositions[index],
              backgroundImage: `url(${photo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Optional decorative elements */}
          </div>
        )
      ))}

   
    </div>
    </div>
  );
});

PhotoFrame.displayName = 'PhotoFrame';

export default PhotoFrame;
