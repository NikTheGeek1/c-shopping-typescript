'use client'

import { useEffect } from 'react'

import { CustomCheckbox } from '@/components'

import { useAppDispatch, useAppSelector, useDebounce } from '@/hooks'

import { loadFilters, updateFilter, resetFilter, RootState } from '@/store'

import { useUrlQuery } from '@/hooks'

interface FilterOperationProps {
  mainMaxPrice: number
  mainMinPrice: number
  handleChangeRoute: (query: Record<string, string | number | boolean>) => void
  onClose?: () => void
}


const FilterOperation = ({ mainMinPrice, mainMaxPrice, handleChangeRoute, onClose }: FilterOperationProps) => {

  //? Assets
  const dispatch = useAppDispatch()
  const query = useUrlQuery()

  //? State
  const filters = useAppSelector((state: RootState) => state.filters)

  //? Debounced Values
  const debouncedMinPrice = useDebounce(filters.minPrice, 1200)
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 1200)

  //? Handlers
  const handlefilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target
    const filterValue = type === 'checkbox' ? checked : +value
    dispatch(updateFilter({ name: name, value: filterValue }))

    if (type === 'checkbox') handleChangeRoute({ [name]: filterValue })
  }

  const handleResetFilters = () => {
    handleChangeRoute({ inStock: '', discount: '', price: '' })
    dispatch(resetFilter({ maxPrice: mainMaxPrice, minPrice: mainMinPrice }))
    if (onClose) onClose()
  }

  const canReset =
    !!query.inStock ||
    !!query.discount ||
    mainMinPrice !== debouncedMinPrice ||
    mainMaxPrice !== debouncedMaxPrice

  //? Re-Renders
  //*   load Filters
  useEffect(() => {
    dispatch(
      loadFilters({
        price: `${mainMinPrice}-${mainMaxPrice}`,
        discount: 'false',
        inStock: 'false',
        ...query,
      })
    )
  }, [query.category, mainMaxPrice, mainMinPrice, dispatch])

  //*   Change Route After Debounce
  useEffect(() => {
    if (debouncedMinPrice && mainMinPrice !== debouncedMinPrice)
      handleChangeRoute({
        price: `${debouncedMinPrice}-${debouncedMaxPrice}`,
      })
  }, [debouncedMinPrice])

  useEffect(() => {
    if (debouncedMaxPrice && mainMaxPrice !== debouncedMaxPrice)
      handleChangeRoute({
        price: `${debouncedMinPrice}-${debouncedMaxPrice}`,
      })
  }, [debouncedMaxPrice])

  //*   Close Modal on Change Filter
  useEffect(() => {
    if (onClose) onClose()
  }, [filters.discount, filters.inStock, debouncedMaxPrice, debouncedMinPrice])

  //? Render(s)
  return (
    <>
      <div className="flex justify-end ">
        <button
          type="button"
          className="text-sm text-sky-500"
          onClick={handleResetFilters}
          disabled={!canReset}
        >
          Clear Filters
        </button>
      </div>

      <div className="divide-y">
        <CustomCheckbox
          name="inStock"
          checked={filters.inStock}
          onChange={handlefilter}
          label="In Stock"
        />

        <CustomCheckbox
          name="discount"
          checked={filters.discount}
          onChange={handlefilter}
          label="Discount Only"
        />

        <div className="py-4">
          <span className="font-medium text-gray-700">Price Range</span>
          <div className="flex items-center justify-between gap-x-1">
            <span className="text-base">From</span>
            <input
              type="number"
              className="w-3/4 px-1 text-xl text-left border-b border-gray-200 outline-none"
              style={{ direction: 'ltr' }}
              name="minPrice"
              value={filters.minPrice || 0}
              onChange={handlefilter}
            />
            <span className="w-6 h-6">€</span>
          </div>
          <div className="flex items-center justify-between mt-2 mb-4 gap-x-1">
            <span className="text-base">To</span>
            <input
              type="number"
              className="w-3/4 px-1 text-xl text-left border-b border-gray-200 outline-none"
              style={{ direction: 'ltr' }}
              name="maxPrice"
              value={filters.maxPrice || 0}
              onChange={handlefilter}
            />
            <span className="w-6 h-6">€</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterOperation
