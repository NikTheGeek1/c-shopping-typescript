import { setJson, apiHandler } from '@/helpers/api'
import { bannerRepo, categoryRepo, sliderRepo } from '@/helpers'
import { NextApiRequest, NextApiResponse } from 'next'

interface Category {
  _id: string;
  parent?: string;
}

interface Slider {
  // Define the properties of a slider here
}

interface Banner {
  // Define the properties of a banner here
}

const getFeed = apiHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const currentCategory: Category | null = await categoryRepo.getOne({
      parent: undefined,
    })
    const childCategories: Category[] = await categoryRepo.getAll(
      {},
      {
        parent: currentCategory?._id,
      }
    )

    const sliders: Slider[] = await sliderRepo.getAll({}, { category_id: currentCategory?._id })

    const bannerOneType: Banner[] = await bannerRepo.getAll(
      {},
      {
        category_id: currentCategory?._id,
        type: 'one',
      }
    )
    const bannerTwoType: Banner[] = await bannerRepo.getAll(
      {},
      {
        category_id: currentCategory?._id,
        type: 'two',
      }
    )
    return setJson({
      data: {
        currentCategory,
        childCategories,
        sliders,
        bannerOneType,
        bannerTwoType,
      },
    })
  },
  {
    isJwt: false,
  }
)

export const GET = getFeed
export const dynamic = 'force-dynamic'
