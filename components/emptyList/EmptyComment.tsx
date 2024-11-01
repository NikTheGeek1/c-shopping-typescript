import { useLanguageContext } from "@/context/LanguageContext"

export default function EmptyComment() {
   //? Dictionary
   const { dict } = useLanguageContext()
   return <p className="mt-6 text-red-800">{dict.profile?.review?.emptyComment}</p>
}
