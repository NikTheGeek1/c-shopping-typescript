import Link from 'next/link'
import { Search, Signup, Cart, Navbar, Sidebar, AddressBar, LogoH, LanguageSwitcher } from '@/components'
import { ThemeToggle } from './ThemeToggle'
export default function Header() {
  return (
    <>
      <header className="px-4 lg:shadow xl:fixed xl:z-20 xl:top-0 xl:left-0 xl:right-0 bg-background border-b dark:border-gray-500">
        <div className="container lg:flex lg:py-2">
          <div className="inline-flex items-center justify-between w-full border-b lg:border-b-0 lg:max-w-min lg:mr-8">
            <Link passHref href="/">
              <LogoH className="w-40 h-14" />
            </Link>
            <Sidebar />
          </div>
          <div className="inline-flex items-center justify-between w-full py-2 border-b lg:border-b-0 space-x-10">
            <Search className="flex flex-grow space-x-7" />
            <div className="inline-flex items-center space-x-4 pr-4">
              <ThemeToggle />
              <LanguageSwitcher />
              <Signup />
              <span className="hidden lg:block bg-gray-300 dark:bg-gray-700 w-0.5 h-8" />
              <Cart />
            </div>
          </div>
        </div>
        <div className="container py-2 flex justify-between mx-auto relative">
          <Navbar />
          <AddressBar />
        </div>
      </header>
    </>
  )
}
