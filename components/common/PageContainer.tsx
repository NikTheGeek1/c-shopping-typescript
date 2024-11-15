import { BackIconBtn } from '@/components'

interface PageContainerProps {
  title: string
  children: React.ReactNode
}

const PageContainer = ({ title, children }: PageContainerProps) => {

  //? Render(s)
  return (
    <>
      <div className="flex items-center py-1">
        <div className="lg:hidden">
          <BackIconBtn />
        </div>
        <h3 className="pb-1 text-gray-500 dark:text-gray-200 text-sm lg:border-red-500 lg:border-b-2 lg:mx-3 md:text-base">
          {title}
        </h3>
      </div>
      <div className="section-divide-y"></div>

      {children}
    </>
  )
}

export default PageContainer
