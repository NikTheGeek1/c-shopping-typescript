import { useLanguageContext } from '@/context/LanguageContext'
import { useDisclosure } from '@/hooks'
import { Icons, SearchModal } from '@/components'
import { cn } from '@/utils/mergeClasses'

interface SearchProps {
  className?: string
}

export default function Search({ className }: SearchProps) {
  //? Assets
  const [isShowSearchModal, searchModalHandlers] = useDisclosure()

  // ? Dictionary
  const translation = useLanguageContext()

  //? Render(s)
  return (
    <div className={cn('flex flex-row flex-grow max-w-3xl', className)}>
      <div
        onClick={searchModalHandlers.open}
        className="flex flex-row flex-grow rounded-md bg-zinc-200/80"
      >
        <button className="flex-grow py-1 px-3 text-left bg-transparent outline-none cursor-pointer text-gray-400 focus:border-none">
          {translation?.dict?.header?.search.placeholder}
        </button>
        <button className="p-2">
          <Icons.Search className="icon text-gray-400" />
        </button>
      </div>
      <SearchModal isShow={isShowSearchModal} onClose={searchModalHandlers.close} />
    </div>
  )
}
