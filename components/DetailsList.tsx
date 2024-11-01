'use client'
import { useRef } from 'react'

import { Control, UseFormRegister, useFieldArray } from 'react-hook-form'

import { AddIconBtn, DeleteIconBtn } from '@/components'

interface DetailsListProps {
  categoryName: string
  name: string
  control: Control
  register: UseFormRegister<any>
}

const DetailsList = ({categoryName, name, control, register}: DetailsListProps) => {

  //? Refs
  const newDetailRef = useRef<HTMLInputElement>(null)

  //? Form
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  })

  //? Handlers
  const handleAddNewDetail = () => {
    if (newDetailRef.current) {
      append({ title: newDetailRef.current.value })
      newDetailRef.current.value = ''
    }
  }

  //? Render
  return (
    <section>
      <div className="mb-2 text-sm lg:text-base">
        {name === 'info' ? <span>Features</span> : <span>Specifications</span>}{' '}
        <span className={name === 'info' ? ' text-emerald-600' : ' text-fuchsia-600'}>
          {categoryName}
        </span>
      </div>
      <table className="w-full">
        <thead
          className={
            name === 'info' ? 'bg-emerald-50 text-emerald-500' : 'bg-fuchsia-50 text-fuchsia-500'
          }
        >
          <tr className="">
            <th>Name</th>
            <th className="w-1/4 p-2.5">值</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id} className="border-b-2 border-gray-100">
              <td className="flex items-center p-2 gap-x-2">
                <DeleteIconBtn onClick={() => remove(index)} />
                <input className="text-field__input" {...register(`${name}.${index}.title`)} />
              </td>
              <td
                className={
                  name === 'info'
                    ? 'bg-emerald-50 text-emerald-500'
                    : 'bg-fuchsia-50 text-fuchsia-500'
                }
              ></td>
            </tr>
          ))}
          <tr className="border-b-2 border-green-50">
            <td className="flex p-2">
              <AddIconBtn onClick={handleAddNewDetail} />
              <input
                type="text"
                className="text-field__input "
                ref={newDetailRef}
                placeholder="..."
              />
            </td>
            <td
              className={
                name === 'info'
                  ? 'bg-emerald-50 text-emerald-500'
                  : 'bg-fuchsia-50 text-fuchsia-500'
              }
            ></td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default DetailsList