import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import Suggestion from '@tiptap/suggestion'

const emojiPluginKey = new PluginKey('emoji-commands')

export const EmojiExtension = Extension.create({
  name: 'emoji-command',

  addOptions() {
    return {
      suggestion: {
        char: '::',
        startOfLine: false,
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
        // 只有当用户输入两个冒号时才触发
        checkTrigger: (char, text, position) => {
          const prev = text.charAt(position - 1)
          return char === ':' && prev === ':'
        }
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        pluginKey: emojiPluginKey,
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})