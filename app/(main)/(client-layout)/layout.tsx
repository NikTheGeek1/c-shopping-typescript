import { ClientLayout } from '@/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientLayout>{children}</ClientLayout>
    </>
  )
}
