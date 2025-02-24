"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "./toobar";

import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Document from "@tiptap/extension-document";
import Code from "@tiptap/extension-code";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import python from 'highlight.js/lib/languages/python'
import { all, createLowlight } from 'lowlight'

const lowlight = createLowlight(all)

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('c', c)
lowlight.register('cpp', cpp)
lowlight.register('python', python)

const extensions = [
  StarterKit,
  Bold,
  Italic,
  Blockquote.configure({
    HTMLAttributes:{
        class: "border-l-4 border-slate-400 bg-gray-200 pl-2"
    }
  }),
  Heading.configure({ levels: [1, 2, 3] }),
  BulletList.configure({
    HTMLAttributes: {
      class: "list-disc ml-4",
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: "list-decimal ml-4",
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Typography,
  Document,
  Code.configure({
    HTMLAttributes: {
      class:
        "bg-slate-400 text-white px-[0.25em] py-[0.3em] rounded-[0.4rem] text-sm",
    },
  }),
  CodeBlockLowlight.configure({
    lowlight,
    languageClassPrefix: 'language-js',
    HTMLAttributes:{
        class:"bg-slate-500 "
    }
  }),
];

const Editor = (props) => {
    const {content,onChange} = props;

  const editor = useEditor({
    extensions: extensions,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 ",
      },
    },
    content: content,
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
  });

  return (
    <>
        <EditorContent editor={editor} />
    </>
  )
};

export default Editor;
