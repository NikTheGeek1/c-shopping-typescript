'use client'

import { useEffect, useState } from 'react'

import { SelectBox } from '@/components'

import { useGetCategoriesQuery } from '@/store/services'
import { Category } from '@/types'

interface SelectedCategoriesProps {
  selectedCategories: {
    levelOne: any
    levelTwo: any
    levelThree: any
  }
  setSelectedCategories: (categories: {
    levelOne: any
    levelTwo: any
    levelThree: any
  }) => void
}
const SelectCategories = ({selectedCategories, setSelectedCategories}: SelectedCategoriesProps) => {
  //? Props

  //? Get Categories Query
  const { categories } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      categories: data?.data?.categories,
    }),
  })

  //? States
  const [levelOneCategories, setLevelOneCategories] = useState<Category[]>([])

  const [levelTwoCategories, setLevelTwoCategories] = useState<Category[]>([])

  const [levelThreeCategories, setlevelThreeCategories] = useState<Category[]>([])

  //? Re-Renders
  useEffect(() => {
    if (categories && selectedCategories.levelOne?._id)
      setLevelTwoCategories(
        categories?.filter(cat => cat.parent === selectedCategories.levelOne?._id)
      )

    if (categories && selectedCategories.levelTwo?._id)
      setlevelThreeCategories(
        categories.filter(cat => cat.parent === selectedCategories.levelTwo?._id)
      )
  }, [categories, selectedCategories])

  useEffect(() => {
    if (categories) setLevelOneCategories(categories.filter(cat => cat.level === 1))
  }, [categories])

  //? Handlers
  const handleLevelOneChange = (category: Category) =>
    setSelectedCategories({
      levelOne: category,
      levelTwo: {},
      levelThree: {},
    })

  const handleLevelTwoChange = (category: Category) =>
    setSelectedCategories({
      ...selectedCategories,
      levelTwo: category,
      levelThree: {},
    })

  const handleLevelThreeChange = (category: Category) =>
    setSelectedCategories({
      ...selectedCategories,
      levelThree: category,
    })

  //? Render(s)
  return (
    <div className="flex flex-wrap justify-evenly gap-y-6">
      <SelectBox
        value={selectedCategories.levelOne}
        list={levelOneCategories}
        onChange={handleLevelOneChange}
        placeholder="一级分类"
      />

      <SelectBox
        value={selectedCategories.levelTwo}
        list={levelTwoCategories}
        onChange={handleLevelTwoChange}
        placeholder="二级分类"
      />

      <SelectBox
        value={selectedCategories.levelThree}
        list={levelThreeCategories}
        onChange={handleLevelThreeChange}
        placeholder="三级分类"
      />
    </div>
  )
}

export default SelectCategories
