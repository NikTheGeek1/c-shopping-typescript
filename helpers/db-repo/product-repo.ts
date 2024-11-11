import { db } from '..'
import Category from '@/models/Category'
import Product from '@/models/Product'
import { Product as ProductType } from '@/types'

const getAll = async ({ page, page_size }: { page: number; page_size: number }, filter: any, sort: "asc" | "desc" = "desc") => {
  await db.connect()
  const products = await Product.find(filter)
    .select(
      '-description -info -specification -category -category_levels -sizes  -reviews -numReviews'
    )
    .skip((page - 1) * page_size)
    .limit(page_size)
    .sort(sort)
  const productsLength = await Product.countDocuments(filter)

  const mainMaxPrice = Math.max(
    ...(await Product.find({
      ...filter.categoryFilter,
      inStock: { $gte: 1 },
    }).distinct('price'))
  )
  const mainMinPrice = Math.min(
    ...(await Product.find({
      ...filter.categoryFilter,
      inStock: { $gte: 1 },
    }).distinct('price'))
  )

  await db.disconnect()
  return {
    mainMaxPrice,
    mainMinPrice,
    products,
    productsLength,
    pagination: {
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page_size * page < productsLength,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(productsLength / page_size),
    },
  }
}

const getById = async (id: number) => {
  await db.connect()
  const result = await Product.findById(id)
  if (!result) throw 'Product does not exist'
  await db.disconnect()
  return result
}

const create = async (params: any) => {
  await db.connect()
  const newProduct = new Product(params)
  const mainCategory = await Category.findOne({
    parent: undefined,
  })

  if (mainCategory) newProduct.category.unshift(mainCategory?._id)
  await newProduct.save()
  await db.disconnect()
}

const _delete = async (id: number) => {
  await db.connect()
  const product = await Product.findById(id)
  if (!product) throw 'Product does not exist'
  await Product.findByIdAndDelete(id)
  await db.disconnect()
}

const update = async (id: number, params: any) => {
  await db.connect()
  const product = await Product.findById(id)
  if (!product) throw 'Product does not exist'
  await Product.findByIdAndUpdate({ _id: id }, { ...params })
  await db.disconnect()
}

const getItemDetail = async (id: number) => {
  await db.connect()
  const product = await Product.findById({ _id: id })
    .populate('category_levels.level_one')
    .populate('category_levels.level_two')
    .populate('category_levels.level_three')
    .lean() as ProductType;

  if (!product) return { notFound: true }

  const productCategoryID = product.category.pop()

  const smilarProducts = await Product.find({
    category: { $in: productCategoryID },
    inStock: { $gte: 1 },
    _id: { $ne: product._id },
  })
    .select(
      '-description -info -specification -category -category_levels -sizes  -reviews -numReviews'
    )
    .limit(11)
    .lean()

  await db.disconnect()
  return {
    product,
    smilarProducts: {
      title: 'Similar Products',
      products: smilarProducts,
    },
  }
}

export const productRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getItemDetail,
}
