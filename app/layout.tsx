import '/styles/browser-styles.css'
import '/styles/main.css'
import '/styles/swiper.css'

import { enSiteTitle, siteDescription, siteTitle } from '@/utils'

export const metadata = {
  title: `${siteTitle} | ${enSiteTitle}`,
  description: `${siteDescription}`,
  icons: {
    icon: '/favicon.ico',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
