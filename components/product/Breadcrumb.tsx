import Link from 'next/link'

interface BreadcrumbProps {
  categoryLevels: {
    level_one: { name: string; slug: string }
    level_two: { name: string; slug: string }
    level_three: { name: string; slug: string }
  }
}

const Breadcrumb = ({ categoryLevels }: BreadcrumbProps) => {
  const { level_one, level_three, level_two } = categoryLevels
  console.log("${level_one.slug}", level_one.slug)
  //? Render(s)
  return (
    <div className=" pl-3">
      <Link href="/" className="inline-block px-1 py-1 text-sm text-gray-700 ">
        Home
      </Link>
      {' / '}
      <Link
        href={`/main/${level_one.slug}`}
        className="inline-block px-1 py-1 text-sm text-gray-700 "
      >
        {level_one.name}
      </Link>
      {' / '}
      <Link
        href={`/products?category=${level_two.slug}`}
        className="inline-block px-1 py-1 text-sm text-gray-700 "
      >
        {level_two.name}
      </Link>
      {' / '}
      <Link
        href={`/products?category=${level_three.slug}`}
        className="inline-block px-1 py-1 text-sm text-gray-700 "
      >
        {level_three.name}
      </Link>
    </div>
  )
}

export default Breadcrumb
