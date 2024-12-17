import { type Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo,
} from "lucide-react";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const activeButtonClass = "bg-blue-600 text-white border-blue-600";
  const inactiveButtonClass = "bg-gray-100 border border-gray-300";

  return (
    <div className="toolbar flex gap-2 mb-2 w-full overflow-y-auto remove-scrollbar">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`toolbar-button flex items-center justify-center p-2 rounded cursor-pointer border ${
          editor.isActive("bold") ? activeButtonClass : inactiveButtonClass
        }`}
      >
        <Bold className="icon w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`toolbar-button flex items-center justify-center p-2 rounded cursor-pointer border ${
          editor.isActive("italic") ? activeButtonClass : inactiveButtonClass
        }`}
      >
        <Italic className="icon w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`toolbar-button flex items-center justify-center p-2 rounded cursor-pointer border ${
          editor.isActive("underline") ? activeButtonClass : inactiveButtonClass
        }`}
      >
        <UnderlineIcon className="icon w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`toolbar-button flex items-center justify-center p-2 rounded cursor-pointer border ${
          editor.isActive("strike") ? activeButtonClass : inactiveButtonClass
        }`}
      >
        <Strikethrough className="h-3 md:h-5 w-3 md:w-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`toolbar-button flex items-center justify-center p-2 rounded cursor-pointer border ${
          editor.isActive("heading", { level: 2 })
            ? activeButtonClass
            : inactiveButtonClass
        }`}
      >
        <Heading2 className="h-3 md:h-5 w-3 md:w-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`toolbar-button flex items-center justify-center p-2 rounded cursor-pointer border ${
          editor.isActive("bulletList")
            ? activeButtonClass
            : inactiveButtonClass
        }`}
      >
        <List className="h-3 md:h-5 w-3 md:w-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`toolbar-button flex items-center justify-center p-2 rounded cursor-pointer border ${
          editor.isActive("orderedList")
            ? activeButtonClass
            : inactiveButtonClass
        }`}
      >
        <ListOrdered className="h-3 md:h-5 w-3 md:w-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`toolbar-button flex items-center justify-center p-2 rounded cursor-pointer border ${
          editor.isActive("blockquote")
            ? activeButtonClass
            : inactiveButtonClass
        }`}
      >
        <Quote className="h-3 md:h-5 w-3 md:w-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`toolbar-button flex items-center justify-center p-2 rounded cursor-pointer border ${
          editor.isActive("code") ? activeButtonClass : inactiveButtonClass
        }`}
      >
        <Code className="h-3 md:h-5 w-3 md:w-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className={`toolbar-button flex items-center justify-center p-2 rounded cursor-pointer border ${
          editor.can().undo() ? activeButtonClass : inactiveButtonClass
        }`}
      >
        <Undo className="h-3 md:h-5 w-3 md:w-5" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className={`toolbar-button flex items-center justify-center p-2 rounded cursor-pointer border ${
          editor.can().redo() ? activeButtonClass : inactiveButtonClass
        }`}
      >
        <Redo className="h-3 md:h-5 w-3 md:w-5" />
      </button>
    </div>
  );
};

export default Toolbar;
