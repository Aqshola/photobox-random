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
    // Right side photos (top to bottom) - not used yet but available for future enhancement
    { top: '5%', right: '2%', width: '45%', height: '27%', zIndex: 10 },
    { top: '33%', right: '4%', width: '45%', height: '27%', zIndex: 10 },
    { top: '60%', right: '4%', width: '45%', height: '27%', zIndex: 10 },
  ];

  return (
    <div className='w-fit mx-auto'>
      <div
        ref={ref}
        className="relative overflow-hidden w-full "
        style={{ aspectRatio: "2 / 3" }}
      >
        <img
          src="/frame.png"
          alt="frame"
          className="w-full h-full object-contain relative z-20 pointer-events-none"
        />

        {photos.map((photo, index) => (
          photo && (
            <div
              key={index}
              className="absolute overflow-hidden"
              style={{
                ...photoPositions[index],
              }}
            >
              <img
                src={photo}
                alt={`photo-${index}`}
                className="w-full h-full object-cover"
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