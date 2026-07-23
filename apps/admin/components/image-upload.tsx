'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { ImagePlus, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  return (
    <div>
      <div className='mb-4 flex items-center gap-4 flex-wrap'>
        {value.map((url) => (
          <div
            key={url}
            className='relative w-50 h-50 rounded-md overflow-hidden border dark:border-gray-800'
          >
            <div className='z-10 absolute top-2 right-2'>
              <button
                type='button'
                onClick={() => onRemove(url)}
                className='bg-red-500 p-2 rounded-md text-white shadow-sm hover:bg-red-600 transition-colors'
              >
                <Trash2 className='h-4 w-4' />
              </button>
            </div>
            <Image fill className='object-cover' alt='Image' src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={onUpload}
        signatureEndpoint='/api/cloudinary/sign'
      >
        {({ open }) => {
          const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            open()
          }
          return (
            <button
              type='button'
              onClick={onClick}
              className='px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm border dark:border-gray-700'
            >
              <ImagePlus className='h-4 w-4' />
              Upload Image
            </button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
