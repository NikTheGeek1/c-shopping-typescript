'use client'

import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { useLanguageContext } from '@/context/LanguageContext'

import { useGetDetailsQuery } from '@/store/services'
import { Tab } from '@headlessui/react'
import {
  AddColors,
  AddSizes,
  Button,
  ImageList,
  SelectCategories,
  TextArea,
  TextField,
} from '@/components'
import { Category } from '@/types'


interface InitialSelectedCategories {
  levelOne: Category | null
  levelTwo: Category | null
  levelThree: Category | null
}

const initialSelectedCategories: InitialSelectedCategories = {
  levelOne: null,
  levelTwo: null,
  levelThree: null,
}

interface ProductsFormProps {
  mode: 'create' | 'edit'
  createHandler: (data: any) => void
  isLoadingCreate: boolean
  isLoadingUpdate: boolean
  updateHandler: (data: any) => void
  selectedProduct: any
}

const ProductsForm = ({
  mode,
  createHandler,
  isLoadingCreate,
  isLoadingUpdate,
  updateHandler,
  selectedProduct,
}: ProductsFormProps) => {

  //? States
  const [isDetailsSkip, setIsDetailsSkip] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories)

  //? Form Hook
  const { handleSubmit, register, reset, control, getValues, watch, setValue } = useForm()

  //? Queries
  //*   Get Details
  const { data: details } = useGetDetailsQuery(
    {
      id: selectedCategories?.levelTwo?._id || '',
    },
    { skip: isDetailsSkip }
  )

  //? Re-Renders
  //*   Select Category To Fetch Details
  useEffect(() => {
    if (selectedCategories?.levelThree?._id) {
      setIsDetailsSkip(false)
    }
  }, [selectedCategories?.levelThree?._id])

  //*   Set Details
  useEffect(() => {
    if (details) {
      //@ts-ignore  TODO: figure out useform types
      setValue('info', details.data.info)
      //@ts-ignore  TODO: figure out useform types
      setValue('specification', details.data.specification)
      //@ts-ignore  TODO: figure out useform types
      setValue('optionsType', details.data.optionsType)
    }
  }, [details])

  //*   Set Product Details On Edit Mode
  useEffect(() => {
    if (selectedProduct && mode === 'edit') {
      reset({ ...selectedProduct })
    }
  }, [selectedProduct])

  //? Handlers
  const editedCreateHandler = (data: any) => {
    if (mode === 'create')
      createHandler({
        ...data,
        category: [
          selectedCategories.levelOne?._id,
          selectedCategories.levelTwo?._id,
          selectedCategories.levelThree?._id,
        ],
        category_levels: {
          level_one: selectedCategories.levelOne?._id,
          level_two: selectedCategories.levelTwo?._id,
          Level_three: selectedCategories.levelThree?._id,
        },
      })
  }

  // ? Dictionary
  const { dict } = useLanguageContext()

  const tabListNames = [
    { id: 0, name: `${dict.admin?.create.tab}｜${dict.admin?.create.description}` },
    { id: 1, name: dict.admin?.create.image },
    { id: 2, name: dict.admin?.create.price },
    { id: 3, name: dict.admin?.create.group },
    { id: 4, name: dict.admin?.create.subProducts },
    { id: 5, name: dict.admin?.create.attributes },
    { id: 6, name: dict.admin?.create.specifications },
  ]

  return (
    <section className="p-3 md:px-3 xl:px-8 2xl:px-10">
      <form
        onSubmit={
          mode === 'create' ? handleSubmit(editedCreateHandler) : handleSubmit(updateHandler)
        }
        className="space-y-10"
      >
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-slate-200 p-1">
            {tabListNames.map(item => (
              <Tab
                key={item.id}
                className={({ selected }) =>
                  `tab
                         ${selected
                    ? 'bg-white shadow'
                    : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
                  }
                        `
                }
              >
                {item.name}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <TextField label={dict.admin?.create.tab} name="title" control={control} />

              <TextArea
                name="description"
                control={control}
                label={dict.admin?.create.description}
              />
            </Tab.Panel>

            <Tab.Panel>
              <ImageList control={control} />
            </Tab.Panel>

            <Tab.Panel>
              <div className="space-y-4 md:flex md:gap-x-2 md:items-baseline md:justify-evenly">
                <TextField
                  label={dict.admin?.create.price}
                  name="price"
                  control={control}
                  type="number"
                  inputMode="numeric"
                />
                <TextField
                  label={dict.admin?.create.inventory}
                  name="inStock"
                  control={control}
                  type="number"
                  inputMode="numeric"
                 
                />

                <TextField
                  label={dict.admin?.create.discount}
                  name="discount"
                  control={control}
                  type="number"
                  inputMode="numeric"
                 
                />
              </div>
            </Tab.Panel>

            <Tab.Panel>
              {mode === 'create' && (
                <SelectCategories
                  setSelectedCategories={setSelectedCategories}
                  selectedCategories={selectedCategories}
                />
              )}
            </Tab.Panel>

            <Tab.Panel>
              {isDetailsSkip && mode === 'create' && (
                <span className="text-red-600">{dict.admin?.create.category}</span>
              )}

              {/* @ts-ignore TODO: figure out useform types */}
              {details?.data?.optionsType === 'colors' || getValues('colors')?.length > 0 ? (
                <AddColors control={control} register={register} />
                //@ts-ignore TODO: figure out useform types
              ) : details?.data?.optionsType === 'sizes' || getValues('sizes')?.length > 0 ? (
                <AddSizes control={control} register={register} />
                //@ts-ignore TODO: figure out useform types
              ) : details?.data?.optionsType === 'none' ? (
                <span className="text-red-600">{dict.admin?.create.noProducts}</span>
              ) : null}
            </Tab.Panel>

            <Tab.Panel>
              {isDetailsSkip && mode === 'create' && (
                <span className="text-red-600">{dict.admin?.create.category}</span>
              )}
              {watch('info') && (
                <div className="text-sm space-y-1.5">
                  <span>{dict.admin?.create.attributes}</span>
                  <table className="w-full max-w-2xl mx-auto">
                    <thead className="bg-emerald-50 text-emerald-500">
                      <tr className="">
                        <th className="w-2/5  p-2.5">{dict.admin?.create.name}</th>
                        <th>{dict.admin?.create.value}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watch('info').map((_: any, index: number) => (
                        <tr key={index} className="border-b-2 border-gray-100">
                          <td className="my-0.5 text-right">
                            <input
                              type="text"
                              className="text-field__input"
                              {...register(`info.${index}.title`)}
                            />
                          </td>
                          <td className="p-2">
                            <textarea
                              rows={3}
                              className="text-field__input"
                              {...register(`info.${index}.value`)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel>
              {isDetailsSkip && mode === 'create' && (
                <span className="text-red-600">{dict.admin?.create.category}</span>
              )}
              {watch('specification') && (
                <div className="text-sm space-y-1.5">
                  <span>{dict.admin?.create.specifications}</span>
                  <table className="w-full max-w-2xl mx-auto">
                    <thead className="bg-fuchsia-50 text-fuchsia-500 ">
                      <tr>
                        <th className="w-2/5 p-2.5">{dict.admin?.create.name}</th>
                        <th>{dict.admin?.create.value}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watch('specification').map((item: any, index: number) => (
                        <tr key={index} className="border-b-2 border-gray-100">
                          <td className="my-0.5 text-right">
                            <input
                              type="text"
                              className="text-field__input"
                              {...register(`specification.${index}.title`)}
                            />
                          </td>
                          <td className="p-2">
                            <textarea
                              rows={3}
                              className="text-field__input"
                              {...register(`specification.${index}.value`)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        {mode === 'edit' ? (
          <Button
            className="mx-auto bg-amber-500"
            isRounded
            type="submit"
            isLoading={isLoadingUpdate}
          >
            {dict.admin?.create.update}
          </Button>
        ) : (
          <Button
            className="mx-auto bg-green-500"
            isRounded
            type="submit"
            isLoading={isLoadingCreate}
          >
            {dict.admin?.create.submit}
          </Button>
        )}
      </form>
    </section>
  )
}

export default ProductsForm
