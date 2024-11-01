'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  DiscountProduct,
  EmptySearchList,
  Icons,
  Modal,
  ProductPrice,
  ResponsiveImage,
  ShowWrapper,
} from '@/components'

import { truncate } from '@/utils'

import { useGetProductsQuery } from '@/store/services'

import { useDebounce } from '@/hooks'

interface SearchModalProps {
  isShow: boolean
  onClose: () => void
}

const SearchModal = ({ isShow, onClose }: SearchModalProps) => {

  //? States
  const [search, setSearch] = useState('')

  // ? Dictionary
  const translation = useLanguageContext()

  //? Assets
  const debouncedSearch = useDebounce(search, 1200)

  //? Search Products Query
  const { data, isSuccess, isFetching, error, isError, refetch } = useGetProductsQuery(
    {
      search,
    },
    { skip: !Boolean(debouncedSearch) || search !== debouncedSearch }
  )

  //? Re-Renders
  //* Reset Search
  useEffect(() => {
    if (!isShow) {
      setSearch('')
    }
  }, [isShow])

  //? Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleRemoveSearch = () => {
    setSearch('')
  }

  //? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect="bottom-to-top">
      <Modal.Content
        onClose={onClose}
        className="flex flex-col h-screen py-3 pl-2 pr-4 bg-white lg:h-fit md:rounded-lg gap-y-3"
      >
        <Modal.Header onClose={onClose}>
          {translation?.dict?.header?.search.modal.title}
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-row my-3 rounded-md bg-zinc-200/80">
            <div className="p-2">
              <Icons.Search className="icon  text-gray-500" />
            </div>
            <input
              type="text"
              placeholder={translation?.dict?.header?.search.modal.title}
              className="flex-grow p-1 text-left bg-transparent outline-none input focus:border-none"
              value={search}
              onChange={handleChange}
            />
            <button type="button" className="p-2" onClick={handleRemoveSearch}>
              <Icons.Close className="icon text-gray-500" />
            </button>
          </div>
          <div className="overflow-y-auto lg:max-h-[500px]">
            <ShowWrapper
              error={error}
              isError={isError}
              refetch={refetch}
              isFetching={isFetching}
              isSuccess={isSuccess}
              dataLength={data ? data?.data?.productsLength : 0}
              emptyComponent={<EmptySearchList />}
            >
              <div className="px-4 py-3 divide-y space-y-3">
                {data?.data?.productsLength &&
                  data?.data.productsLength > 0 &&
                  search.length > 0 &&
                  data?.data?.products.map(item => (
                    <article key={item._id} className="py-2">
                      <Link href={`/products/${item._id}`} onClick={() => onClose()}>
                        <ResponsiveImage
                          dimensions="w-20 h-20"
                          src={item.images[0].url}
                          alt={item.title}
                        />
                        {/* check item title to make it bilingual */}
                        <span className="py-2 text-sm">{truncate(item.title, 70)}</span>
                        <div className="flex justify-between">
                          <div>
                            {item.discount > 0 && <DiscountProduct discount={item.discount} />}
                          </div>
                          <ProductPrice
                            inStock={item.inStock}
                            discount={item.discount}
                            price={item.price}
                          />
                        </div>
                      </Link>
                    </article>
                  ))}
              </div>
            </ShowWrapper>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default SearchModal
