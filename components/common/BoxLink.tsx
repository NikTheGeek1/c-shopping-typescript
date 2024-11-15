import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Icons } from '@/components'

interface BoxLinkProps {
  children: React.ReactNode
  path: string
  name: string
}

export default function BoxLink({ children, path, name }: BoxLinkProps) {

  //? Assets
  const asPath = usePathname()

  //? Render(s)
  return (
    <div
      className={`transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 px-3 ${asPath === path ? 'border-r-4 border-red-600' : 'border-r-4 border-white'
        }`}
    >
      <Link
        href={path}
        className="flex-center py-4 mx-4 text-xs font-medium text-gray-700 border-t border-gray-300 gap-x-1 md:text-sm"
      >
        {children}
        <span className="mr-auto ml-3 text-gray-700 dark:text-gray-200">{name}</span>
        <Icons.ArrowRight2 className="icon text-gray-700 dark:text-gray-200 lg:mr-3" />
      </Link>
    </div>
  )
}
