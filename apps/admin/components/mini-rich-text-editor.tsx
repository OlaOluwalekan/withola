"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { useEffect, useCallback } from 'react'
import { Code, Bold, Italic, Link as LinkIcon } from 'lucide-react'

interface MiniRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MiniRichTextEditor({ value, onChange }: MiniRichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        strike: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[60px] px-3 py-2 text-sm',
      },
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor])

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  return (
    <div className="w-full flex-1 flex flex-col border rounded-md dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}><Bold className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}><Italic className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive('code') ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}><Code className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={setLink} className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}><LinkIcon className="w-3.5 h-3.5" /></button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
