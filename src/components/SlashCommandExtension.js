import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import Suggestion from '@tiptap/suggestion'

const suggestionPluginKey = new PluginKey('slash-commands')

export const SlashCommandExtension = Extension.create({
  name: 'slash-command',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        pluginKey: suggestionPluginKey,
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})
