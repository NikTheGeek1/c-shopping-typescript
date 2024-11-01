'use client'

import { useAppDispatch } from '@/hooks'

import { setTempColor, setTempSize, addToLastSeen } from '@/store'
import { useEffect } from 'react'

interface InitialStoreProps {
  product: any // TODO: Product type from Product mongoose schem
}

const InitialStore = ({ product }: InitialStoreProps) => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (product.colors.length > 0) {
      dispatch(setTempColor(product?.colors[0]))
      dispatch(setTempSize({id: '', size: ''}))
    } else if (product.sizes.length > 0) {
      dispatch(setTempSize(product?.sizes[0]))
      dispatch(setTempColor({id: '', hashCode: '', name: ''}))
    } else {
      dispatch(setTempColor({id: '', hashCode: '', name: ''}))
      dispatch(setTempSize({id: '', size: ''}))
    }
  }, [])
  useEffect(() => {
    dispatch(
      addToLastSeen({
        productID: product._id,
        image: product.images[0],
        title: product.title,
      })
    )
  }, [product._id])
  return null
}

export default InitialStore
