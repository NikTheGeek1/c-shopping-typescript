import { db } from '..'
import Slider from '@/models/Slider'

const getAll = async (query = {}, filter = {}, sort = {}) => {
  await db.connect()
  const result = await Slider.find(filter).lean().exec()
  await db.disconnect()
  return result
}

const getById = async (id: number) => {
  await db.connect()
  const result = await Slider.findById(id)
  if (!result) throw 'Data not found'
  await db.disconnect()
  return result
}

const getOne = async (filter: any) => {
  try {
    await db.connect()
    const result = await Slider.findOne(filter).lean().exec()
    await db.disconnect()
    return result
  } catch (error) {
    console.log(error)
    throw '无此数据Slider'
  }
}

const create = async (params: any) => {
  await db.connect()
  const newSlider = new Slider(params)
  await newSlider.save()
  await db.disconnect()
}

const _delete = async (id: number) => {
  await db.connect()
  const result = await Slider.findById(id)
  if (!result) throw 'Data not found'
  await Slider.findByIdAndDelete(id)
  await db.disconnect()
}

const update = async (id: number, params: any) => {
  await db.connect()
  const result = await Slider.findById(id)
  if (!result) throw 'Data not found'
  await Slider.findByIdAndUpdate({ _id: id }, { ...params })
  await db.disconnect()
}

export const sliderRepo = {
  getAll,
  getById,
  getOne,
  create,
  update,
  delete: _delete,
}
