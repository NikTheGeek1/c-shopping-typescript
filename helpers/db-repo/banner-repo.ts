import { db } from '..'
import Banner from '@/models/Banner'

const getAll = async (query = {}, filter = {}, sort = {}) => {
  await db.connect()
  const result = await Banner.find(filter)
    .lean()
    .sort({
      createdAt: 'desc',
    })
    .exec()
  await db.disconnect()
  return result
}

const getById = async (id: string) => {
  await db.connect()
  const result = await Banner.findById(id)
  if (!result) throw 'Data not found'
  await db.disconnect()
  return result
}

const create = async (params: any) => {
  await db.connect()
  const newBanner = new Banner(params)
  await newBanner.save()
  await db.disconnect()
}

const _delete = async (id: string) => {
  await db.connect()
  const result = await Banner.findById(id)
  if (!result) throw 'Data not found'
  await Banner.findByIdAndDelete(id)
  await db.disconnect()
}

const update = async (id: string, params: any) => {
  await db.connect()
  const result = await Banner.findById(id)
  if (!result) throw 'Data not found'
  await Banner.findByIdAndUpdate({ _id: id }, { ...params })
  await db.disconnect()
}

export const bannerRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}
