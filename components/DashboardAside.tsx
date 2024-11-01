import { useLanguageContext } from '@/context/LanguageContext'
import { BoxLink, Icons, LogoChina, LogoH, Logout } from '@/components'
import Link from 'next/link'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function ProfileAside() {
  // ? Dictionary
  const { dict } = useLanguageContext()

  const profilePaths = [
    {
      name: dict.admin?.create.title,
      Icon: Icons.Plus,
      path: '/admin/products/create',
    },
    {
      name: dict.admin?.products.title,
      Icon: Icons.Save,
      path: '/admin/products',
    },
    {
      name: dict.admin?.orders.title,
      Icon: Icons.Bag,
      path: '/admin/orders',
    },
    {
      name: dict.admin?.category.title,
      Icon: Icons.Category,
      path: '/admin/categories',
    },
    {
      name: dict.admin?.details.title,
      Icon: Icons.Location,
      path: '/admin/details',
    },
    {
      name: dict.admin?.user.title,
      Icon: Icons.Users,
      path: '/admin/users',
    },
    {
      name: dict.admin?.review.title,
      Icon: Icons.Comment,
      path: '/admin/reviews',
    },
    {
      name: dict.admin?.slider.title,
      Icon: Icons.Slider,
      path: '/admin/sliders',
    },
    {
      name: dict.admin?.banner.title,
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
