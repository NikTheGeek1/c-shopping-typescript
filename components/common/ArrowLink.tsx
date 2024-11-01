import Link from 'next/link'

import { Icons } from '@/components'

interface ArrowLinkProps {
  children: string
  path: string
}

const ArrowLink = ({ children, path }: ArrowLinkProps) => {
  //? Render(s)
  return (
    <Link href={path} className="inline-flex items-center text-sm text-blue-400 max-w-max">
      <span className="text-sky-500">{children}</span>
      <Icons.ArrowRight2 className="icon text-sky-500 " />
    </Link>
  )
}

export default ArrowLink
