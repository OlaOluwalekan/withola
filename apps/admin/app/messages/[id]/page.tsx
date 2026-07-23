import { prisma } from '@repo/database'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'

export default async function ViewMessagePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const msg = await prisma.message.findUnique({
    where: { id },
  })

  if (!msg) notFound()

  // Auto-mark as read
  if (!msg.isRead) {
    await prisma.message.update({
      where: { id: msg.id },
      data: { isRead: true },
    })
  }

  return (
    <div className='space-y-6 max-w-4xl'>
      <div>
        <Link
          href='/messages'
          className='inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 mb-4 transition-colors'
        >
          <ArrowLeft className='w-4 h-4' /> Back to Inbox
        </Link>
        <h1 className='text-2xl font-bold'>{msg.subject}</h1>
      </div>

      <div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border dark:border-gray-800'>
        <div className='flex justify-between items-start mb-6 pb-6 border-b dark:border-gray-800'>
          <div>
            <div className='font-medium text-lg'>{msg.senderName}</div>
            <a
              href={`mailto:${msg.senderEmail}`}
              className='text-blue-600 hover:underline'
            >
              {msg.senderEmail}
            </a>
          </div>
          <div className='text-sm text-gray-500'>
            {new Date(msg.createdAt).toLocaleString()}
          </div>
        </div>

        <div className='prose dark:prose-invert max-w-none whitespace-pre-wrap'>
          {msg.content}
        </div>

        {msg.attachments.length > 0 && (
          <div className='mt-8 pt-6 border-t dark:border-gray-800'>
            <h3 className='font-medium mb-4 text-gray-500 uppercase tracking-wider text-sm'>
              Attachments
            </h3>
            <div className='flex gap-4 flex-wrap'>
              {msg.attachments.map((url, i) => (
                <div
                  key={i}
                  className='relative w-48 h-48 rounded-lg overflow-hidden border dark:border-gray-700 group'
                >
                  <Image
                    src={url}
                    alt={`Attachment ${i}`}
                    fill
                    className='object-cover'
                  />
                  <a
                    href={url}
                    target='_blank'
                    rel='noreferrer'
                    className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium'
                  >
                    View Original
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
