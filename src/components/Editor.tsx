import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Undo, Redo } from 'lucide-react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your blog post...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor.isActive('bold') ? 'bg-gray-100' : ''
            }`}
          >
            <Bold className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor.isActive('italic') ? 'bg-gray-100' : ''
            }`}
          >
            <Italic className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor.isActive('bulletList') ? 'bg-gray-100' : ''
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor.isActive('orderedList') ? 'bg-gray-100' : ''
            }`}
          >
            <ListOrdered className="w-5 h-5" />
          </button>
          <div className="border-l border-gray-200 mx-2" />
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Undo className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Redo className="w-5 h-5" />
          </button>
        </div>
      </div>
      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  );
}