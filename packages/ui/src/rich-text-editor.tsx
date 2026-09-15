"use client";

import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  LucideIcon,
  Strikethrough,
  TerminalSquare,
  UnderlineIcon,
} from "lucide-react";
import ToolbarButton from "./rich-text-toolbar-button";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ImageExtension from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { useCallback, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  baseFolder: string;
}

const headingsList: {
  id: number;
  icon: LucideIcon;
  value: 1 | 2 | 3 | 4 | 5 | 6;
}[] = [
  {
    id: 1,
    icon: Heading1,
    value: 1,
  },
  {
    id: 2,
    icon: Heading2,
    value: 2,
  },
  {
    id: 3,
    icon: Heading3,
    value: 3,
  },
];

const lowlight = createLowlight(common);

const RichTextEditor = ({
  value,
  onChange,
  baseFolder,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // replaced by CodeBlockLowlight
      }),
      Underline,
      ImageExtension,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[250px] p-4 border rounded-b-md dark:border-gray-700 bg-white dark:bg-gray-900",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const onUpload = (result: any) => {
    if (!editor) return;
    const url = result.info.secure_url;
    editor.chain().focus().setImage({ src: url }).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center flex-wrap gap-1 p-2 border border-b-0 rounded-t-md dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {headingsList.map((heading) => {
          return (
            <ToolbarButton
              key={heading.id}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: heading.value })
                  .run()
              }
              isActive={editor.isActive("heading", { level: heading.value })}
            >
              <heading.icon className="w-4 h-4" />
            </ToolbarButton>
          );
        })}
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
        >
          <Code className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
        >
          <TerminalSquare className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

        <ToolbarButton onClick={setLink} isActive={editor.isActive("link")}>
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>

        <CldUploadWidget
          onSuccess={onUpload}
          signatureEndpoint="/api/cloudinary/sign"
          options={{
            folder: `${baseFolder}/projects/embedded`,
            resourceType: "image",
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
              className="p-2 flex items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              title="Insert Image"
            >
              <ImagePlus className="w-4 h-4" />
            </button>
          )}
        </CldUploadWidget>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
