import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/difficulty')({
  component: DifficultySelect,
})

function DifficultySelect() {
  const difficulties = [
    { level: '초급', color: 'bg-green-500', description: '클라이밍을 처음 시작하시나요?' },
    { level: '중급', color: 'bg-yellow-500', description: '기본기를 익히셨나요?' },
    { level: '고급', color: 'bg-red-500', description: '새로운 도전을 원하시나요?' },
  ]

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold text-center my-8">난이도 선택</h1>
      <div className="flex-1 flex flex-col gap-4">
        {difficulties.map((diff) => (
          <button
            key={diff.level}
            className={`${diff.color} text-white p-6 rounded-2xl shadow-lg active:scale-95 transition-transform`}
          >
            <div className="text-2xl font-bold mb-2">{diff.level}</div>
            <div className="text-sm opacity-90">{diff.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
} 