import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'

// import required modules
import { Navigation, FreeMode } from 'swiper/modules'
import { ProductCard } from '@/components'

interface SimilarProductsSliderProps {
  similarProducts: {
    title: string
    products: {
      _id: string
      title: string
      price: number
      discount: number
      inStock: number
      rating: number
      colors: { id: string; hashCode: string }[]
      images: { url: string }[]
    }[]
  }
}

const SimilarProductsSlider = ({ similarProducts }: SimilarProductsSliderProps) => {
  //? Render(s)
  return (
    <section className="px-3 py-4 overflow-hidden lg:border lg:border-gray-100 lg:rounded-md">
      <h4 className="mb-3 lg:border-b-2 lg:border-red-500 w-24">{similarProducts.title}</h4>
      <Swiper
        navigation={true}
        modules={[Navigation, FreeMode]}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{ 640: { width: 640, slidesPerView: 2 } }}
        freeMode={true}
      >
        {similarProducts.products.map(item => (
          <SwiperSlide key={item._id} className="sm:border-r">
            <ProductCard product={item} slide />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default SimilarProductsSlider
