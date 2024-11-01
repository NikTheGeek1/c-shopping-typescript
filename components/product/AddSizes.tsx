'use client'


import { Control, UseFormRegister, useFieldArray } from 'react-hook-form'
import { useLanguageContext } from '@/context/LanguageContext'
import { AddIconBtn, DeleteIconBtn } from '@/components'
import { nanoid } from '@reduxjs/toolkit'
import { useRef } from 'react'

interface AddSizesProps {
  control: Control
  register: UseFormRegister<any>
}

const AddSizes = ({ control, register }: AddSizesProps) => {

  //? Refs
  const inputRef = useRef<HTMLInputElement>(null)

  //? Form Hook
  const { fields, append, remove } = useFieldArray({
    name: 'sizes',
    control,
  })

  //? Handlers
  const handleAddSize = () => {
    if (inputRef.current) {
      const newSize = inputRef.current.value.trim()

      if (!newSize) return

      append({ id: nanoid(), size: newSize })
      inputRef.current.value = ''
    }
  }

  // ? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <div className="text-sm space-y-1.5">
      <span>{dict.admin?.create.size}</span>
      <div className="w-full max-w-2xl mx-auto space-y-3">
        <div className="flex items-center gap-x-2">
          <AddIconBtn onClick={handleAddSize} />
          <input
            style={{ direction: 'ltr' }}
            type="number"
            className="inline-block outline-none input w-44"
            placeholder="..."
            ref={inputRef}
          />
        </div>
        <div className="flex flex-wrap items-baseline space-x-3 space-y-4 justify-evenly">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="shadow rounded flex items-center gap-x-3 w-1/4 px-1.5 py-2"
            >
              <DeleteIconBtn onClick={() => remove(index)} />
              <input
                style={{ direction: 'ltr' }}
                className="text-field__input "
                {...register(`sizes.${index}.size`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddSizes
