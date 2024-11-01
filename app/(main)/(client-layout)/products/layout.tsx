import { siteTitle } from '@/utils'

export const metadata = {
  title: `Category ${siteTitle}`,
}

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
