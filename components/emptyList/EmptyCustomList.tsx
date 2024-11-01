import { useLanguageContext } from '@/context/LanguageContext'

export default function EmptyCustomList() {
  // ? Dictionary
  const { dict } = useLanguageContext()

  return (
    <div className="text-center text-red-500 lg:border lg:border-gray-200 lg:rounded-md lg:py-4">
      {dict.header?.search?.modal?.empty?.list}
    </div>
  )
}
