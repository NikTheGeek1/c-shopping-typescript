import { db } from '..'
import Details from '@/models/Details'

const getAll = async () => {
  await db.connect()
  const result = await Details.find().sort({
    createdAt: 'desc',
  })
  await db.disconnect()
  return result
}

const getById = async (id: string) => {
  await db.connect()
  const result = await Details.findOne({
    category_id: id,
  })
  if (!result) throw 'Details not found'
  await db.disconnect()
  return result
}

const create = async (params: any) => {
  await db.connect()
  const newDetailss = new Details(params)
  await newDetailss.save()
  await db.disconnect()
}

const _delete = async (id: string) => {
  await db.connect()
  const details = await Details.findById(id)
  if (!details) throw 'Details not found'
  await Details.findByIdAndDelete(id)
  await db.disconnect()
}

const update = async (id: string, params: any) => {
  await db.connect()
  const details = await Details.findById(id)
  if (!details) throw 'Details not found'
  await Details.findByIdAndUpdate({ _id: id }, { ...params })
  await db.disconnect()
}

export const detailsRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}
