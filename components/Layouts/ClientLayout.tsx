import { Header, Footer } from '@/components'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
