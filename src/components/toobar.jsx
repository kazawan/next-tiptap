"use client";
import { List } from "lucide-react";

import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Upload,
} from "lucide-react";
import { ListOrdered } from "lucide-react";

const Toolbar = ({ editor }) => {
    return (
        <div className="flex justify-between items-center bg-gray-200 p-2">
        <div className="flex items-center">
            <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="p-2"
            >
            <Bold />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="p-2"
            >
            <Italic />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className="p-2"
            >
            <Strikethrough />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className="p-2"
            >
            <Heading1 />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className="p-2"
            >
            <Heading2 />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className="p-2"
            >
            <Heading3 />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleAlign("left").run()}
            className="p-2"
            >
            <AlignLeft />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleAlign("center").run()}
            className="p-2"
            >
            <AlignCenter />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleAlign("right").run()}
            className="p-2"
            >
            <AlignRight />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className="p-2"
            >
            <Code />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="p-2"
            >
            <List />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="p-2"
            >
            <ListOrdered />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className="p-2"
            >
            <Highlighter />
            </button>
            <button
            onClick={() => editor.chain().focus().insertImage().run()}
            className="p-2"
            >
            <Upload />
            </button>
        </div>
        </div>
    );
}

export default Toolbar;