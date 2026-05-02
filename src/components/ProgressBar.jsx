export default function ProgressBar({ currentPhase }) {
  return (
    <div className="flex gap-2 justify-center py-4">
      {[1, 2, 3, 4, 5].map(n => (
        <div
          key={n}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black transition-all
            ${n < currentPhase ? 'bg-green-400 text-white scale-95' : ''}
            ${n === currentPhase ? 'bg-orange-400 text-white scale-110 shadow-lg' : ''}
            ${n > currentPhase ? 'bg-gray-200 text-gray-400' : ''}
          `}
        >
          {n < currentPhase ? '✓' : n}
        </div>
      ))}
    </div>
  )
}
