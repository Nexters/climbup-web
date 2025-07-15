import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId')({
  component: UserProfile,
})

function UserProfile() {
  const { userId } = Route.useParams()

  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        <div>
          <h1 className="text-xl font-bold">사용자 #{userId}</h1>
          <p className="text-sm text-gray-600">클라이밍 마스터</p>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-3">통계</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">32</div>
              <div className="text-sm text-gray-600">완료</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">89%</div>
              <div className="text-sm text-gray-600">성공률</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">12</div>
              <div className="text-sm text-gray-600">연속</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-3">최근 기록</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-medium">챌린지 #{i}</div>
                  <div className="text-sm text-gray-600">2024.03.{10 + i}</div>
                </div>
                <div className="text-green-500 font-medium">성공</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 