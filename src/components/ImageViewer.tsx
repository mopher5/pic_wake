interface ImageViewerProps {
  currentImage: string | null;
  onZoomIn: () => void;
  onZoomOut: () => void;
  zoom: number;
}

const ImageViewer = ({ currentImage, onZoomIn, onZoomOut, zoom }: ImageViewerProps) => {
  if (!currentImage) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)] bg-gray-100 rounded-lg">
        <p className="text-gray-500">画像を選択してください</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-8rem)] relative overflow-hidden">
      <img
        src={currentImage}
        alt="Current"
        style={{ transform: `scale(${zoom})` }}
        className="w-auto h-auto max-w-[80%] max-h-[80%] object-contain transition-all duration-300 ease-out shadow-lg rounded-lg"
      />
      <div className="absolute bottom-6 right-6 flex gap-2">
      <button
        onClick={onZoomOut}
        className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      <button
        onClick={onZoomIn}
        className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      </div>
    </div>
  );
};

export default ImageViewer;
