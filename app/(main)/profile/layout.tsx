import { ProfileLayout } from '@/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProfileLayout>{children}</ProfileLayout>
    </>
  )
}
