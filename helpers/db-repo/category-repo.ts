import { db } from '..'
import Category from '@/models/Category'
import Product from '@/models/Product'

const getAll = async (query: any = {}, filter: any = {}, sort: "asc" | "desc" = "desc") => {
  await db.connect()
  const result = await Category.find(filter)
    .lean()
    .sort({
      createdAt: sort
    })
    .exec()
  await db.disconnect()
  return result
}

const getOne = async (filter: any) => {
  try {
    await db.connect()
    const result = await Category.findOne(filter).lean().exec()
    await db.disconnect()
    return result
  } catch (error) {
    console.log('error', error)
    throw 'Category not found'
  }
}

const create = async (params: any) => {
  await db.connect()
  const category = await Category.findOne({ name: params.name })
  if (category) throw 'Category name already exists'
  const newCategory = new Category(params)
  await newCategory.save()
  await db.disconnect()
}

const _delete = async (id: string) => {
  await db.connect()
  const product = await Product.findOne({ category: id })
  if (product) throw 'Please delete all products related to this category'

  const category = await Category.findById(id)
  if (!category) throw 'Category does not exist'
  await Category.findByIdAndDelete(id)
  await db.disconnect()
}

const update = async (id: string, params: any) => {
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
