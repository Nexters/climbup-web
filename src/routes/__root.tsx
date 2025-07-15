import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-md w-full mx-auto relative">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
})
