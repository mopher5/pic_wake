interface FileHandlerProps {
  onFilesSelected: (files: File[]) => void;
}

const FileHandler = ({ onFilesSelected }: FileHandlerProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter(file =>
        file.type.startsWith('image/')
      );
      onFilesSelected(imageFiles);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    if (files) {
      const imageFiles = Array.from(files).filter(file =>
        file.type.startsWith('image/')
      );
      onFilesSelected(imageFiles);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.add('scale-105', 'border-blue-400', 'bg-blue-50');
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('scale-105', 'border-blue-400', 'bg-blue-50');
  };

  return (
    <div className="w-full max-w-3xl mx-auto transform transition-all duration-300">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-lg"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 transition-all duration-300">
          <svg
            className="w-12 h-12 mb-4 text-gray-400 transition-transform duration-300 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-lg text-gray-600 font-medium">
            <span className="text-blue-600">クリックして画像を選択</span>
            {' '}または画像をドラッグ＆ドロップ
          </p>
          <p className="text-sm text-gray-500">PNG, JPG, GIF (複数選択可能)</p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileHandler;
