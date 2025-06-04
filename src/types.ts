export interface PhotoProps {
  src: string | null;
  index: number;
}

export interface PhotoBoothState {
  photos: (string | null)[];
  currentPhotoIndex: number;
  isCapturing: boolean;
  isFinalPreview: boolean;
}
