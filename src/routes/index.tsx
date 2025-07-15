import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center mb-4">오늘의 클라이밍</h1>
        <p className="text-gray-600 text-center mb-8">새로운 도전을 시작해보세요!</p>
        <button className="w-full bg-blue-500 text-white py-4 rounded-2xl text-xl font-bold active:scale-95 transition-transform">
          클라이밍 시작하기
        </button>
      </div>
    </div>
  )
}
