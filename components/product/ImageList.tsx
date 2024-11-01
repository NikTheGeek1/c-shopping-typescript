'use client'

import Image from 'next/image'

import { Control, FieldError, useFieldArray } from 'react-hook-form'

import { UploadImage, Icons } from '@/components'

interface ImageListProps {
  control: Control;
}

interface FieldValues {
  url: string
}

const ImageList = ({ control }: ImageListProps) => {

  //? Refs
  // const inputRef = useRef<HTMLInputElement | null>(null)

  //? Form Hook
  const { fields, append, remove } = useFieldArray({
    name: 'images',
    control,
  })

  const handleAddUploadedImageUrl = (url: string) => append({ url })

  //? Render(s)
  return (
    <div className="space-y-3">
      <UploadImage folder="/products" handleAddUploadedImageUrl={handleAddUploadedImageUrl} />

      <div className="flex flex-wrap mx-3 gap-x-2 gap-y-3">
        {fields.map((image, idx) => (
          <div
            className="relative overflow-hidden transition-colors border border-gray-200 rounded-md max-w-max hover:border-gray-300"
            key={idx}
          >
            {/* @ts-ignore TODO: url is not in image although we append it above */}
            <Image src={image.url} width={150} height={150} alt="product image" />
            <button
              type="button"
              className="absolute z-10 -top-1 -right-1"
              onClick={() => remove(idx)}
              title="Delete"
            >
              <Icons.Delete className="p-1 text-red-500 bg-red-100 icon w-7 h-7 rounded-2xl" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageList
