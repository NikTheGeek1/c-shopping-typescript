import { useDisclosure } from '@/hooks'

import { Icons } from '@/components'

import { truncate } from '@/utils'
import { useLanguageContext } from '@/context/LanguageContext'

interface DescriptionProps {
  description: string
}

const Description = ({ description }: DescriptionProps) => {

  //? Assets
  const [isShowDesc, showDescHandlers] = useDisclosure()


  //? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <section>
      <div className="px-3 lg:max-w-3xl xl:max-w-5xl">
        <h4 className="mb-3 lg:border-b-2 lg:border-red-500 w-fit">{dict?.other?.description}</h4>
        <p className="text-xs leading-6 tracking-wider text-gray-600 lg:text-sm lg:leading-8">
          {isShowDesc ? description : truncate(description, 300)}
        </p>
        {description.length > 300 && (
            <button
            type="button"
            className="flex items-center py-2 text-sm text-sky-400"
            onClick={showDescHandlers.toggle}
            >
            {isShowDesc ? 'Collapse' : 'Read More'}
            {!isShowDesc && <Icons.ArrowRight2 className="icon text-sky-400" />}
            </button>
        )}
      </div>
      <div className="section-divide-y " />
    </section>
  )
}

export default Description
