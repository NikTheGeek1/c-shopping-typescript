import Link from 'next/link'

import { ResponsiveImage } from '@/components'

interface CategoriesProps {
  homePage?: boolean
  childCategories: {
    title: string
    categories: {
      name: string
      slug: string
      image: string
    }[]
  }
  color: string
  name: string
}

const Categories = ({ homePage, childCategories, color, name }: CategoriesProps) => {

  //? Re-Renders
  if (childCategories.categories.length > 0 && color && name) {
    return (
      <section className="px-3">
        <h4 className="mb-3 text-xl text-center">
          <span
            className="text-xl"
            style={{
              color,
            }}
          >
            {name}
          </span>
          {' - '}
          {childCategories.title}
        </h4>
        <div className="flex flex-wrap justify-center gap-4 mx-auto space-x-4 w-fit">
          {childCategories.categories.map((item, index) => (
            <div key={index} className="text-center">
              <Link
                href={homePage ? `/main/${item.slug}` : `/products?category=${item.slug}`}
                className="text-center"
              >
                <ResponsiveImage
                  dimensions="w-24 h-24 lg:h-44 lg:w-44"
                  className="mx-auto mb-1"
                  src={item.image}
                  alt={item.name}
                />
                <span className="text-sm text-black dark:text-white">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    )
  }
  return null
}

export default Categories
