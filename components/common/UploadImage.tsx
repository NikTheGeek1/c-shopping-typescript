'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useLazyGetUploadTokenQuery, useConvertImageMutation, ConvertImageResponse } from '@/store/services'
import { changeFileExtension, getFilenameExt } from '@/utils'
import { nanoid } from '@reduxjs/toolkit'
import OSS from 'ali-oss'
import { useState } from 'react'

interface UploadImageProps {
  folder?: string
  handleAddUploadedImageUrl: (url: string) => void
}

const UploadImage = ({ folder, handleAddUploadedImageUrl }: UploadImageProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  // ? Dictionary
  const { dict } = useLanguageContext()

  const [getUploadToken] = useLazyGetUploadTokenQuery()

  const [convertImage] = useConvertImageMutation()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(event.target.files || []))
  }

  const handleUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true)

    if (files.length === 0) {
      setError(dict.admin?.upload.select)
      setLoading(false)
      return
    }

    const invalidFile = files.find(file => !file.type.startsWith('image/') || file.size > 5 * 1024 * 1024)
    if (invalidFile) {
      setError(invalidFile.type.startsWith('image/') ? dict.admin?.upload.limit : dict.admin?.upload.validation)
      setLoading(false)
      return
    }

    const credentials = await getUploadToken().unwrap()

    // @ts-ignore TODO: .data not found in credentials type fix it
    const { AccessKeyId, AccessKeySecret, SecurityToken } = credentials.data
    const ossClient = new OSS({
      accessKeyId: AccessKeyId,
      accessKeySecret: AccessKeySecret,
      stsToken: SecurityToken,
      bucket: process.env.NEXT_PUBLIC_ALI_BUCKET_NAME,
      region: process.env.NEXT_PUBLIC_ALI_REGION,
    })

    const filePath = `${process.env.NEXT_PUBLIC_ALI_FILES_PATH}${folder || '/others'}/`

    try {
      const uploadPromises = files.map(async file => {
        const convertedImageResponse = await convertImage({ file }).unwrap()
        const convertedImageBuffer = new Uint8Array(convertedImageResponse.data)
        const blob = new Blob([convertedImageBuffer], { type: 'image/avif' })
        const convertedImageFile = new File([blob], changeFileExtension(file.name, 'avif'), { type: 'image/avif' })
        const fileName = `${nanoid()}.${getFilenameExt(convertedImageFile.name)}`
        const result = await ossClient.put(`${filePath}${fileName}`, convertedImageFile)
        handleAddUploadedImageUrl(result.url)
      })

      await Promise.all(uploadPromises)
      setMessage(dict.admin?.upload.success)
    } catch (err: any) {
      console.log(`Common upload failed`, err)
      setError(err.message || dict.admin?.upload.noImage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex-1 space-y-3 my-4">
        <label htmlFor="file" className="text-field__label">
          {dict.admin?.upload.plugin}
        </label>
        <div className="flex items-center gap-x-3">
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="border border-gray-300 px-3 py-2 w-full"
            formEncType='multipart/form-data'
            multiple
          />
          <button
            type="button"
            disabled={loading || files.length === 0}
            onClick={handleUpload}
            className="text-green-600 bg-green-50 w-36 hover:text-green-700 hover:bg-green-100 py-2 rounded"
          >
            {loading ? dict.admin?.upload.uploading : dict.admin?.upload.upload}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 my-1">{error}</p>}
      {message && <p className="text-green-500 my-1">{message}</p>}
    </>
  )
}

export default UploadImage

function arrayBufferToFile(array: number[], filename: string, mimeType: string) {
  const uint8Array = new Uint8Array(array);
  const blob = new Blob([uint8Array], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
}