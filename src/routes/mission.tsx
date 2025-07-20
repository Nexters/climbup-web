import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mission')({
  component: Mission,
})

function Mission() {
  return <div>Hello "/mission"!</div>
}
