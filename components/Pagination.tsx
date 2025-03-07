import { Icons } from '@/components'

import { useMediaQuery } from '@/hooks'
import { useLanguageContext } from '@/context/LanguageContext'

interface IPaginationProps {
  pagination: {
    currentPage: number
    nextPage: number
    previousPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    lastPage: number
  }
  changeRoute: (data: any) => void
  section: string
  client: boolean
}

export default function Pagination({ pagination, changeRoute, section, client }: IPaginationProps) {
  //? Props

  const { currentPage, nextPage, previousPage, hasNextPage, hasPreviousPage, lastPage } = pagination

  const isDesktop = useMediaQuery('(min-width:1024px)')

  //? Handlers
  const scrollToTop = () => {
    const element = document.getElementById(section)

    const scrollY = (client && isDesktop) ? ((element?.offsetTop ?? 0) - 115) : (element?.offsetTop ?? 0);

    window.scrollTo(0, scrollY)
  }

  //? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <nav>
      <ul className="inline-flex items-center w-full px-10 gap-x-2">
        <div className="ml-auto">
          {hasPreviousPage && (
            <li
              className="flex items-center p-1 text-red-500 cursor-pointer"
              onClick={() => {
                changeRoute({ page: previousPage })
                scrollToTop()
              }}
            >
              <Icons.ArrowLeft className="text-red-500 icon" />
              {dict.profile?.order?.previous}
            </li>
          )}
        </div>
        {currentPage !== 1 && previousPage !== 1 && (
          <li
            className="w-8 h-8 p-1 text-center transition-colors border-2 border-transparent cursor-pointer hover:text-red-500 hover:border-red-500 rounded-2xl"
            onClick={() => {
              changeRoute({ page: 1 })
              scrollToTop()
            }}
          >
            1
          </li>
        )}
        {hasPreviousPage && previousPage !== 1 && <li>...</li>}

        {hasPreviousPage && (
          <li
            className="w-8 h-8 p-1 text-center transition-colors border-2 border-transparent cursor-pointer hover:text-red-500 hover:border-red-500 rounded-2xl"
            onClick={() => {
              changeRoute({ page: previousPage })
              scrollToTop()
            }}
          >
            {previousPage}
          </li>
        )}
        <li
          className="cursor-pointer w-8 h-8 p-1.5 text-center bg-red-500 text-white rounded-2xl"
          onClick={() => {
            changeRoute({ page: currentPage })
            scrollToTop()
          }}
        >
          {currentPage}
        </li>
        {hasNextPage && (
          <li
            className="w-8 h-8 p-1 text-center transition-colors border-2 border-transparent cursor-pointer hover:text-red-500 hover:border-red-500 rounded-2xl"
            onClick={() => {
              changeRoute({ page: nextPage })
              scrollToTop()
            }}
          >
            {nextPage}
          </li>
        )}
        {hasNextPage && nextPage !== lastPage && <li>...</li>}
        {lastPage !== currentPage && lastPage !== nextPage && (
          <li
            className="w-8 h-8 p-1 text-center transition-colors border-2 border-transparent cursor-pointer hover:text-red-500 hover:border-red-500 rounded-2xl"
            onClick={() => {
              changeRoute({ page: lastPage })
              scrollToTop()
            }}
          >
            {lastPage}
          </li>
        )}
        <div className="mr-auto">
          {hasNextPage && (
            <li
              className="flex items-center p-1 text-red-500 cursor-pointer"
              onClick={() => {
                changeRoute({ page: nextPage })
                scrollToTop()
              }}
            >
              {dict.profile?.order?.next}
              <Icons.ArrowRight2 className="text-red-500 icon" />
            </li>
          )}
        </div>
      </ul>
    </nav>
  )
}
