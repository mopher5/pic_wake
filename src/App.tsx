import { useEffect, useState, useCallback } from 'react';
import JSZip from 'jszip';
import ControlPanel from './components/ControlPanel';
import FileHandler from './components/FileHandler';
"use client";

type Category = 'good' | 'normal' | 'bad';

interface ClassifiedImage {
  file: File;
  category: Category;
}

function App() {
  const [images, setImages] = useState<File[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [classifiedImages, setClassifiedImages] = useState<ClassifiedImage[]>([]);

  const currentImage = images[currentIndex];
  const currentImageUrl = currentImage ? URL.createObjectURL(currentImage) : null;

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (currentImageUrl) {
        URL.revokeObjectURL(currentImageUrl);
      }
    };
  }, [currentImageUrl]);

  // キーボードショートカット
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!images.length) return;

      switch (e.key.toLowerCase()) {
        case 'g':
          handleClassify('good');
          break;
        case 'n':
          handleClassify('normal');
          break;
        case 'b':
          handleClassify('bad');
          break;
        case 'z':
          if (e.ctrlKey || e.metaKey) {
            handleUndo();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [images, currentIndex]);

  const handleFilesSelected = (files: File[]) => {
    setImages(files);
    setCurrentIndex(0);
    setClassifiedImages([]);
  };

  const handleClassify = (category: Category) => {
    if (!currentImage) return;

    setTimeout(() => {
      setClassifiedImages(prev => [...prev, { file: currentImage, category }]);
      setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  const handleUndo = () => {
    if (classifiedImages.length === 0) return;
    setTimeout(() => {
      const newClassifiedImages = [...classifiedImages];
      newClassifiedImages.pop();
      setClassifiedImages(newClassifiedImages);
      setCurrentIndex(prev => prev - 1);
    }, 300);
  };

  const handleDownload = useCallback(async () => {
    const zip = new JSZip();

    // カテゴリごとにフォルダを作成
    const goodZip = zip.folder('good');
    const normalZip = zip.folder('normal');
    const badZip = zip.folder('bad');

    // 画像を分類してZIPに追加
    for (const { file, category } of classifiedImages) {
      const targetZip = category === 'good' ? goodZip : category === 'normal' ? normalZip : badZip;
      if (targetZip) {
        targetZip.file(file.name, file);
      }
    }

    // ZIPをダウンロード
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'classified_images.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [classifiedImages]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 font-roboto">
          画像仕分けツール
        </h1>

        <div className="mb-8">
            <FileHandler onFilesSelected={handleFilesSelected} />
          {/* <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full p-2 border rounded"
          /> */}
        </div>

        {images.length > 0 && (
          <div className="space-y-6">
            <div className="relative h-[400px] w-full">
              {currentIndex < images.length && (
                <img
                  src={URL.createObjectURL(images[currentIndex])}
                  alt={`画像 ${currentIndex + 1}`}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <ControlPanel
              onClassify={handleClassify}
              onUndo={handleUndo}
              canUndo={classifiedImages.length > 0}
            />

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(currentIndex / images.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-center mt-2">
                進捗: {currentIndex}/{images.length} 画像
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div>
                <h3 className="font-bold text-green-500 mb-2">
                  Good: {classifiedImages.filter(x => x.category === 'good').length}
                </h3>
              </div>
              <div>
                <h3 className="font-bold text-yellow-500 mb-2">
                  Normal: {classifiedImages. filter(x => x.category === 'normal').length}
                </h3>
              </div>
              <div>
                <h3 className="font-bold text-red-500 mb-2">
                  Bad: {classifiedImages.filter(x => x.category === 'bad').length}
                </h3>
              </div>
            </div>

            <button
              onClick={handleDownload}
              disabled={!(classifiedImages.length > 0)}
              className={`w-full px-4 py-2 rounded text-sm shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              (classifiedImages.length > 0)
                ? 'bg-blue-600 text-white hover:bg-green-700 active:bg-blue-500 hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              ダウンロード
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
