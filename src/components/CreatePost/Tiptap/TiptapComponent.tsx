import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";

import Toolbar from "./Toolbar";

interface TiptapComponentProps {
  value: string;
  onChange: (value: string) => void;
}
const TiptapComponent = ({ value, onChange }: TiptapComponentProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-6", // You can adjust the class based on your styling needs
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-6 auto-focus", // Similar styling for ordered list
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 border-gray-300 pl-4 italic text-gray-600", // Custom styling for blockquote
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [2],
        },
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    content: value,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  return (
    <div className="editor-container outline-none">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapComponent;
