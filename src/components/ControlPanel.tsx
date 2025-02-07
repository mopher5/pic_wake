interface ControlPanelProps {
  onClassify: (category: 'good' | 'normal' | 'bad') => void;
  onUndo: () => void;
  canUndo: boolean;
}

const ControlPanel = ({
  onClassify,
  onUndo,
  canUndo,
}: ControlPanelProps) => {

  return (
    <div>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onClassify('good')}
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Good (G)
        </button>
        <button
          onClick={() => onClassify('normal')}
          className="px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Normal (N)
        </button>
        <button
          onClick={() => onClassify('bad')}
          className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Bad (B)
        </button>
      </div>
      <br />
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        やり直し
      </button>
    </div>
  );
};

export default ControlPanel;