import { useRef, useState, useEffect, useCallback } from "react";
import domtoimage from 'dom-to-image-more';
import type { PhotoBoothState } from "../types";
// @ts-ignore - These modules exist but TypeScript can't find them
import CaptureButton from "./CaptureButton";
// @ts-ignore - These modules exist but TypeScript can't find them
import PhotoFrame from "./PhotoFrame";
import SuccessModal from "./SuccessModal"; // Import the modal

const PhotoBooth = () => {
  const DEFAULT_STATE_ARRAY = Array.from({ length: 6 }).fill(null) as any;
  const [state, setState] = useState<PhotoBoothState>({
    photos: DEFAULT_STATE_ARRAY,
    currentPhotoIndex: 0,
    isCapturing: false,
    isFinalPreview: false,
  });

  const [countdown, setCountdown] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoFrameRef = useRef<HTMLDivElement>(null);
  const countdownIntervalRef = useRef<number | undefined>(undefined);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Set video properties for better quality
        videoRef.current.style.objectFit = "cover";
        videoRef.current.style.imageRendering = "auto";
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  // Initialize webcam
  useEffect(() => {
    startWebcam();

    // Cleanup function to stop webcam when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const [showFlash, setShowFlash] = useState(false);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      // Trigger flash animation
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 500);

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
        willReadFrequently: true,
      });

      if (context) {
        // Set ultra-high-resolution canvas dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

  


        // Draw video frame to canvas (flipped horizontally) with sharpening
        context.translate(canvas.width, 0);
        context.scale(-1, 1);

        // Apply multiple passes for better quality
        // First pass - base image
        context.drawImage(video, 0, 0, canvas.width, canvas.height);


        // Convert to high-quality data URL with optimal settings
        const photoDataUrl = canvas.toDataURL("image/jpeg", 1.0);

        // Update photos array with new photo
        setState((prev) => {
          const newPhotos = [...prev.photos];
          newPhotos[prev.currentPhotoIndex] = photoDataUrl;

          const newIndex = prev.currentPhotoIndex + 1;
          const isFinalPreview = newIndex >= 6;

          return {
            ...prev,
            photos: newPhotos,
            currentPhotoIndex: newIndex,
            isCapturing: !isFinalPreview,
            isFinalPreview,
          };
        });
      }
    }
  }, [state.currentPhotoIndex]);

  const startCountdown = useCallback(() => {
    if (state.currentPhotoIndex >= 6 || state.isCapturing) return;

    setState((prev) => ({ ...prev, isCapturing: true }));

    let timeLeft = 12; // Total time in seconds
    setCountdown(timeLeft);

    // Take first photo immediately
    capturePhoto();

    // Set up interval to take remaining photos every 2 seconds
    countdownIntervalRef.current = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);

      // Take photo every 2 seconds
      if (timeLeft % 2 === 0) {
        capturePhoto();
      }

      // Check if we've completed the countdown
      if (timeLeft <= 0) {
        clearInterval(countdownIntervalRef.current);
        setCountdown(null);
      }
    }, 1000); // Update countdown every second
  }, [state.currentPhotoIndex, state.isCapturing, capturePhoto]);

  const resetPhotoBooth = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    setCountdown(null);
    setState({
      photos: DEFAULT_STATE_ARRAY,
      currentPhotoIndex: 0,
      isCapturing: false,
      isFinalPreview: false,
    });

    startWebcam();
  };

  const generateFinalImage = async () => {
    if (photoFrameRef.current && state.isFinalPreview) {
      try {
        // Apply high-quality settings to the source element
        const element = photoFrameRef.current;
        const images = element.getElementsByTagName('img');
        for (let img of images) {
          img.style.imageRendering = 'high-quality';
        }

        // Generate high-quality PNG using dom-to-image
        // Determine scale based on screen width
        const isMobile = window.innerWidth <= 768;
        const scale = isMobile ? 5 : 3;
        
        const w=element.offsetWidth*scale
        const h=element.offsetHeight*scale
        const dataUrl = await domtoimage.toPng(element, {
          quality: 2.0,
          width:w,
          height: h,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${w}px`,
            height: `${h}px`
          }
        });

        // Download the image
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `photobooth-${new Date().toISOString().slice(0, 10)}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowSuccessModal(true);
      } catch (error) {
        console.error("Error generating final image:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4">
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      <h1 className="text-4xl font-bold mb-6 text-pink-600 text-center">
        Nomin Booth
      </h1>

      {!state.isFinalPreview ? (
        <div className="relative w-full">
          {/* Hidden canvas for capturing photos */}
          <canvas ref={canvasRef} className="hidden"></canvas>

          {/* Webcam video feed */}
          <div className="w-full flex justify-center relative">
            <div className="w-[50%] max-w-[700px] relative aspect-[10/9] rounded-xl shadow-xl border-4 border-purple-500 mb-6">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />

              {/* Camera flash effect */}
              <div
                className={`camera-flash absolute inset-0 pointer-events-none ${
                  showFlash ? "flash-animation" : ""
                }`}
              ></div>

              {/* Countdown overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="text-white text-base font-bold">
                    {countdown - 2}
                  </div>
                </div>
              )}
            </div>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
              <CaptureButton
                onClick={startCountdown}
                disabled={state.isCapturing}
                photoCount={state.currentPhotoIndex}
                totalPhotos={6}
              />
            </div>
          </div>

          {/* Preview of captured photos */}
          <div className="flex flex-wrap justify-center gap-4 mt-14 md:mt-4">
            {state.photos.map((photo, index) => (
              <div
                key={index}
                className={`w-[25%] aspect-[10/9] rounded-lg overflow-hidden border-2 ${
                  index === state.currentPhotoIndex
                    ? "border-green-500 animate-pulse"
                    : photo
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                {photo ? (
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">{index + 1}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full">
          <>
            <PhotoFrame ref={photoFrameRef} photos={state.photos} />
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={generateFinalImage}
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              >
                Download
              </button>
              <button
                onClick={resetPhotoBooth}
                className="px-6 py-3 bg-pink-600 text-white font-bold rounded-full shadow-lg hover:bg-pink-700 transition-colors"
              >
                Retake
              </button>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default PhotoBooth;
