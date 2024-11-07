import { db } from '..'
import Category from '@/models/Category'
import Product from '@/models/Product'
import { Category as CategoryType } from '@/types'

const getAll = async (query: any = {}, filter: any = {}, sort: "asc" | "desc" = "desc"): Promise<CategoryType[]> => {
  await db.connect()
  const result = await Category.find(filter)
    .lean()
    .sort({
      createdAt: sort
    })
    .exec()
  await db.disconnect()
  return result as CategoryType[]
}

const getOne = async (filter: any): Promise<CategoryType | null> => {
  try {
    await db.connect()
    const result = await Category.findOne(filter).lean().exec()
    await db.disconnect()
    return result as CategoryType
  } catch (error) {
    console.log('error', error)
    throw 'Category not found'
  }
}

const create = async (params: any): Promise<void> => {
  await db.connect()
  const category = await Category.findOne({ name: params.name }).lean<CategoryType>()
  if (category) throw 'Category name already exists'
  const newCategory = new Category(params)
  await newCategory.save()
  await db.disconnect()
}

const _delete = async (id: string): Promise<void> => {
  await db.connect()
  const product = await Product.findOne({ category: id })
  if (product) throw 'Please delete all products related to this category'

  const category = await Category.findById(id)
  if (!category) throw 'Category does not exist'
  await Category.findByIdAndDelete(id)
  await db.disconnect()
}

const update = async (id: string, params: any): Promise<void> => {
  await db.connect()
  const category = await Category.findById(id)
  if (!category) throw 'Category does not exist'
  await Category.findByIdAndUpdate({ _id: id }, params)
  await db.disconnect()
}

export const categoryRepo = {
  getAll,
  getOne,
  create,
  update,
  delete: _delete,
}
