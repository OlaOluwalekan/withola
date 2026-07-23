'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import ImageExtension from '@tiptap/extension-image'
import { common, createLowlight } from 'lowlight'
import { useEffect, useCallback } from 'react'
import {
  Code,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  ImagePlus,
  Heading1,
  Heading2,
  Heading3,
  TerminalSquare,
} from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'

import 'highlight.js/styles/github-dark.css'

const lowlight = createLowlight(common)

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

const baseFolder = process.env.NEXT_PUBLIC_BASE_FOLDER

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      ImageExtension,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert max-w-none focus:outline-none min-h-[250px] p-4 border rounded-b-md dark:border-gray-700 bg-white dark:bg-gray-900',
      },
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  const setLink = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const onUpload = (result: any) => {
    if (!editor) return
    const url = result.info.secure_url
    editor.chain().focus().setImage({ src: url }).run()
  }

  if (!editor) {
    return null
  }

  const ToolbarButton = ({ onClick, isActive, children }: any) => (
    <button
      type='button'
      onClick={onClick}
      className={`p-2 flex items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
    >
      {children}
    </button>
  )

  return (
    <div className='w-full flex flex-col'>
      <div className='flex items-center flex-wrap gap-1 p-2 border border-b-0 rounded-t-md dark:border-gray-700 bg-gray-50 dark:bg-gray-800'>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive('heading', { level: 1 })}
        >
          <Heading1 className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive('heading', { level: 2 })}
        >
          <Heading2 className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive('heading', { level: 3 })}
        >
          <Heading3 className='w-4 h-4' />
        </ToolbarButton>

        <div className='w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1'></div>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
        >
          <Bold className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
        >
          <Italic className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
        >
          <UnderlineIcon className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
        >
          <Strikethrough className='w-4 h-4' />
        </ToolbarButton>

        <div className='w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1'></div>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        >
          <List className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
        >
          <ListOrdered className='w-4 h-4' />
        </ToolbarButton>

        <div className='w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1'></div>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
        >
          <Code className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
        >
          <TerminalSquare className='w-4 h-4' />
        </ToolbarButton>

        <div className='w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1'></div>

        <ToolbarButton onClick={setLink} isActive={editor.isActive('link')}>
          <LinkIcon className='w-4 h-4' />
        </ToolbarButton>

        <CldUploadWidget
          onSuccess={onUpload}
          signatureEndpoint='/api/cloudinary/sign'
          options={{
            folder: `${baseFolder}/projects/embedded`,
            resourceType: 'image',
          }}
        >
          {({ open }) => (
            <button
              type='button'
              onClick={(e) => {
                e.preventDefault()
                open()
              }}
              className='p-2 flex items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300'
              title='Insert Image'
            >
              <ImagePlus className='w-4 h-4' />
            </button>
          )}
        </CldUploadWidget>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
