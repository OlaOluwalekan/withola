'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { ImagePlus, Trash2, FileIcon } from 'lucide-react'
import Image from 'next/image'

interface FileUploadProps {
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
  folder?: string
  resourceType?: 'image' | 'raw' | 'video' | 'auto'
  clientAllowedFormats?: string[]
  maxFiles?: number
}

const baseFolder = process.env.NEXT_PUBLIC_BASE_FOLDER

export function FileUpload({
  value,
  onChange,
  onRemove,
  folder = 'projects',
  resourceType = 'image',
  clientAllowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'],
  maxFiles = 10,
}: FileUploadProps) {
  const isAtLimit = value.length >= maxFiles
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  const isImage = (url: string) => {
    return (
      /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(url) ||
      resourceType === 'image'
    )
  }



  return (
    <div>
      <div className='mb-4 flex items-center gap-4 flex-wrap'>
        {value.map((url) => (
          <div
            key={url}
            className='relative w-50 h-50 rounded-md overflow-hidden border dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center'
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
            {isImage(url) ? (
              <Image
                fill
                className='object-cover'
                alt='Uploaded file'
                src={url}
              />
            ) : (
              <div className='flex flex-col items-center gap-2 text-gray-500'>
                <FileIcon className='h-10 w-10' />
                <span className='text-xs max-w-37.5 truncate px-2'>
                  {url.split('/').pop()}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={onUpload}
        signatureEndpoint='/api/cloudinary/sign'
        options={{
          folder: `${baseFolder}/${folder}`,
          resourceType: resourceType,
          clientAllowedFormats: clientAllowedFormats,
        }}
      >
        {({ open }) => {
          const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            if (!isAtLimit) open()
          }
          return (
            <div className='flex items-center gap-3'>
              <button
                type='button'
                onClick={onClick}
                disabled={isAtLimit}
                className='px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm border dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ImagePlus className='h-4 w-4' />
                Upload {resourceType === 'image' ? 'Image' : 'File'}
              </button>
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                {value.length} / {maxFiles}
              </span>
            </div>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
