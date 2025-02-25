"use client";
import { useState, useCallback } from "react";
import { BubbleMenu, FloatingMenu, useEditor, EditorContent, Extension, ReactRenderer } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
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
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import ImageDialog from './ImageDialog';
import LinkDialog from './LinkDialog';

import { Markdown } from "tiptap-markdown";

import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { SlashCommandExtension } from './SlashCommandExtension'
import { SlashCommandList } from './SlashCommandList'
import { EmojiExtension } from './EmojiExtension'
import { EmojiList } from './EmojiList'

const lowlight = createLowlight(all)

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('c', c)
lowlight.register('cpp', cpp)
lowlight.register('python', python)

const getSuggestionItems = (query, imageDialogCallback, linkDialogCallback) => {
  const queryText = String(query || '');
  return [
    {
      title: '# Heading 1',
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 1 })
          .run()
      },
    },
    {
      title: '## Heading 2',
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 2 })
          .run()
      },
    },
    {
      title: '### Heading 3',
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 3 })
          .run()
      },
    },
    {
      title: '<\/> Code Block',
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setCodeBlock()
          .run()
      },
    },
    {
      title: '> Blockquote',
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setBlockquote()
          .run()
      },
    },
    {
      title:'<img> Image',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run()
        imageDialogCallback(editor)
      }
    },
    {
      title:'[Link](https://)',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run()
        linkDialogCallback(editor)
      }
    }
  ].filter(item => item.title.toLowerCase().includes(queryText.toLowerCase()))
}

const getEmojiSuggestionItems = (query) => {
  // 这里直接返回一个空数组，实际的emoji列表和过滤会在EmojiList组件中处理
  return [{ query }]
}

const extensions = [
  StarterKit,
  Bold,
  Italic,
  Blockquote.configure({
    HTMLAttributes: {
      class: "border-l-4 border-slate-400 bg-gray-200 pl-2"
    }
  }),
  Heading.configure({ levels: [1, 2, 3] }),
  BulletList.configure({
    HTMLAttributes: {
      class: "list-disc ml-4 mb-2",
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: "list-decimal ml-4 mb-2",
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
    HTMLAttributes: {
      class: "bg-slate-500 "
    }
  }),
  Markdown.configure({
    html: true,
    tightLists: false,
    tightListClass: 'tight',
    bulletListMarker: '-',
    linkify: true,
    breaks: true,
    transformPastedText: false,
    transformCopiedText: false,
  }),
  Placeholder.configure({
    placeholder: "输入'/'获取更多命令，输入'::'插入表情",
  }),
  Link.configure({
    protocols: ["http", "https", "www"],
    HTMLAttributes: {
      class: "text-blue-500 cursor-pointer hover:underline hover:text-blue-700 after:content-['link'] after:relative after:top-[-0.2em] after:ml-1 after:text-[0.8em] after:text-blue-500 after:font-bold after:leading-[0.8em] after:opacity-50 after:transition-all after:duration-300 after:ease-in-out after:group-hover:opacity-100 after:group-hover:text-blue-700 after:group-hover:top-[-0.1em]",
    },
  }),
  Image.configure({
    allowBase64: true,
  }),
]

const Editor = (props) => {
  const { content, onChange } = props;
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [currentEditor, setCurrentEditor] = useState(null);

  const handleImageDialogOpen = useCallback((editor) => {
    setCurrentEditor(editor);
    setShowImageDialog(true);
  }, []);

  const handleImageDialogClose = useCallback(() => {
    setShowImageDialog(false);
    setCurrentEditor(null);
  }, []);

  const handleLinkDialogOpen = useCallback((editor) => {
    setCurrentEditor(editor);
    setShowLinkDialog(true);
  }, []);

  const handleLinkDialogClose = useCallback(() => {
    setShowLinkDialog(false);
    setCurrentEditor(null);
  }, []);

  const handleLinkConfirm = useCallback((url) => {
    if (currentEditor) {
      const pos = currentEditor.state.selection.from;
      currentEditor
        .chain()
        .focus()
        .insertContent({
          type: 'paragraph',
          content: [{
            type: 'text',
            marks: [{
              type: 'link',
              attrs: { href: url }
            }],
            text: url
          }]
        })
        .run();
    }
  }, [currentEditor]);

  const handleImageConfirm = useCallback((url) => {
    if (currentEditor) {
      currentEditor
        .chain()
        .focus()
        .setImage({ src: url, alt: 'image' })
        .run();
    }
  }, [currentEditor]);

  const editor = useEditor({
    extensions: [
      ...extensions,
      SlashCommandExtension.configure({
        suggestion: {
          items: ({ query }) => getSuggestionItems(query, handleImageDialogOpen, handleLinkDialogOpen),
          render: () => {
            let reactRenderer
            let popup

            return {
              onStart: (props) => {
                reactRenderer = new ReactRenderer(SlashCommandList, {
                  props,
                  editor: props.editor,
                })

                if (!props.clientRect) {
                  return
                }

                popup = tippy('body', {
                  getReferenceClientRect: () => props.clientRect(),
                  appendTo: () => document.body,
                  content: reactRenderer.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start',
                  arrow: false,
                  theme: 'light-border',
                  offset: [0, 12],
                  
                })[0]
              },
              onUpdate: (props) => {
                reactRenderer.updateProps(props)
                
                if (!props.clientRect) {
                  return
                }

                popup?.setProps({
                  getReferenceClientRect: () => props.clientRect(),
                })
              },
              onKeyDown: (props) => {
                if (props.event.key === 'Escape') {
                  popup?.hide()
                  return true
                }
                return reactRenderer?.ref?.onKeyDown(props)
              },
              onExit: () => {
                popup?.destroy()
                reactRenderer?.destroy()
              },
            }
          },
        },
      }),
      EmojiExtension.configure({
        suggestion: {
          items: ({ query }) => getEmojiSuggestionItems(query),
          render: () => {
            let reactRenderer
            let popup

            return {
              onStart: (props) => {
                reactRenderer = new ReactRenderer(EmojiList, {
                  props,
                  editor: props.editor,
                })

                if (!props.clientRect) {
                  return
                }

                popup = tippy('body', {
                  getReferenceClientRect: () => props.clientRect(),
                  appendTo: () => document.body,
                  content: reactRenderer.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start',
                  arrow: false,
                  theme: 'light-border',
                  offset: [0, 12],
                })[0]
              },
              onUpdate: (props) => {
                reactRenderer.updateProps(props)
                
                if (!props.clientRect) {
                  return
                }

                popup?.setProps({
                  getReferenceClientRect: () => props.clientRect(),
                })
              },
              onKeyDown: (props) => {
                if (props.event.key === 'Escape') {
                  popup?.hide()
                  return true
                }
                return reactRenderer?.ref?.onKeyDown(props)
              },
              onExit: () => {
                popup?.destroy()
                reactRenderer?.destroy()
              },
            }
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "w-[600px] min-h-[90vh] rounded-md bg-slate-50 py-2 px-3 outline-none",
      },
    },
    content: content,
    onUpdate({ editor }) {
      onChange(editor.storage.markdown.getMarkdown());
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
      {showImageDialog && (
        <ImageDialog
          onConfirm={handleImageConfirm}
          onClose={handleImageDialogClose}
        />
      )}
      {showLinkDialog && (
        <LinkDialog
          onConfirm={handleLinkConfirm}
          onClose={handleLinkDialogClose}
        />
      )}
    </>
  )
};

export default Editor;
