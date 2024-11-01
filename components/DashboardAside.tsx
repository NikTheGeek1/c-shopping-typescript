import Link from 'next/link'

import { Icons, BoxLink, Logout, LogoH, LanguageSwitcher, LogoChina } from '@/components'
import { useLanguageContext } from '@/context/LanguageContext'

export default function ProfileAside() {
  const { dict } = useLanguageContext()

  const profilePaths = [
    {
      name: 'Add Product',
      Icon: Icons.Plus,
      path: '/admin/products/create',
    },
    {
      name: 'Manage Products',
      Icon: Icons.Save,
      path: '/admin/products',
    },
    {
      name: 'Manage Orders',
      Icon: Icons.Bag,
      path: '/admin/orders',
    },
    {
      name: 'Manage Categories',
      Icon: Icons.Category,
      path: '/admin/categories',
    },
    {
      name: 'Category Specifications',
      Icon: Icons.Location,
      path: '/admin/details',
    },
    {
      name: 'Manage Users',
      Icon: Icons.Users,
      path: '/admin/users',
    },
    {
      name: 'Manage Reviews',
      Icon: Icons.Comment,
      path: '/admin/reviews',
    },
    {
      name: 'Manage Sliders',
      Icon: Icons.Slider,
      path: '/admin/sliders',
    },
    {
      name: 'Manage Banners',
      Icon: Icons.Image,
      path: '/admin/banners',
    },
  ]

  //? Render(s)
  return (
    <aside className="sticky mt-6 lg:border lg:border-gray-200 lg:rounded-md lg:pt-4 min-w-max top-6">
      <Link passHref href="/">
        {dict.lang === '中文' ? (
          <LogoChina className="w-40 h-12 mx-auto" />
        ) : (
          <LogoH className="w-40 h-12 mx-auto" />
        )}
      </Link>
      <div className="mt-4">
        <div className="flex-center py-4 mx-4 text-xs font-medium text-gray-700 border-t border-gray-300 gap-x-1 md:text-sm">
          <LanguageSwitcher />
        </div>
        {profilePaths.map((item, index) => (
          <BoxLink key={index} path={item.path} name={item.name}>
            <item.Icon className="icon text-black" />
          </BoxLink>
        ))}
        <Logout />
      </div>
    </aside>
  )
}
