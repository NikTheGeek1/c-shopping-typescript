'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useLazyGetUploadTokenQuery } from '@/store/services'
import { getFilenameExt } from '@/utils'
import { nanoid } from '@reduxjs/toolkit'
import OSS from 'ali-oss'
import { useState } from 'react'

interface UploadImageProps {
  folder?: string
  handleAddUploadedImageUrl: (url: string) => void
}

const UploadImage = ({folder, handleAddUploadedImageUrl}: UploadImageProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  // ? Dictionary
  const { dict } = useLanguageContext()

  const [getUploadToken] = useLazyGetUploadTokenQuery()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null)
  }

  const handleUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true)

    if (!file) {
      setError(dict.admin?.upload.select)
      setLoading(false)
      return
    }

    if (!file.type.startsWith('image/')) {
      setError(dict.admin?.upload.validation)
      setLoading(false)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(dict.admin?.upload.limit)
      setLoading(false)
      return
    }

    const credentials = await getUploadToken().unwrap()

    // @ts-ignore TODO: .data not founc in credentials type fix it
    const { AccessKeyId, AccessKeySecret, SecurityToken } = credentials.data
    const ossClient = new OSS({
      accessKeyId: AccessKeyId,
      accessKeySecret: AccessKeySecret,
      stsToken: SecurityToken,
      bucket: process.env.NEXT_PUBLIC_ALI_BUCKET_NAME,
      region: process.env.NEXT_PUBLIC_ALI_REGION,
    })

    const filePath = `${process.env.NEXT_PUBLIC_ALI_FILES_PATH}${folder || '/others'}/`
    const fileName = `${nanoid()}.${getFilenameExt(file.name)}`

    ossClient
      .put(`${filePath}${fileName}`, file)
      .then(result => {
        handleAddUploadedImageUrl(result.url)
        setMessage(dict.admin?.upload.success)
      })
      .catch(err => {
        console.log(`Common upload failed`, err)
        setError(err.message || dict.admin?.upload.noImage)
      })
      .finally(() => {
        setLoading(false)
      })
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
            name="file-upload"
            onChange={handleFileChange}
            className="border border-gray-300 px-3 py-2 w-full"
          />
          <button
            type="button"
            disabled={loading || !file}
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
