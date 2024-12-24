import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";

import Toolbar from "./Toolbar";

interface TiptapComponentProps {
  value: string;
  onChange: (value: string) => void;
  maxCharacters?: number;
}
const TiptapComponent = ({
  value,
  onChange,
  maxCharacters = 2000,
}: TiptapComponentProps) => {
  const [characterCount, setCharacterCount] = useState(0);

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
      Placeholder.configure({
        placeholder: "Hey there 👋",
        // showOnlyWhenEditable: true,
        // showOnlyCurrent: false,
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
    onUpdate({ editor }) {
      const text = editor.getText(); // Get plain text
      const count = text.length;

      if (count <= maxCharacters) {
        onChange(editor.getHTML());
        setCharacterCount(count);
      } else {
        setCharacterCount(maxCharacters);
      }
    },
    // content: value,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
      setCharacterCount(editor.getText().length);
    }
  }, [editor, value]);

  return (
    <div className="editor-container outline-none">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <div className="text-sm text-gray-600 mt-2">
        {characterCount}/{maxCharacters} characters
      </div>
    </div>
  );
};

export default TiptapComponent;
