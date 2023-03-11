import { onSelectionSet, buildMarkdownActions, markdownNodeMenus } from "@markmirror/commands"
import { h, ref, defineComponent } from "vue"
import type { PropType } from "vue"
import { Editor } from "./Editor"

interface MenuOption {
  name: string;
  title: string;
}

export const Menubar = defineComponent({
  name: 'Menubar',
  props: {
    editor: {
      required: true,
      type: Object as PropType<Editor>,
    },
    menus: {
      required: true,
      default: () => ([]),
      type: Array as PropType<string[] | MenuOption[]>,
    },
  },

  setup (props, { slots }) {
    const { editor, menus } = props
    const actives = ref<string[]>([])

    const updateState = onSelectionSet(nodes => {
      actives.value = nodes.map(node => markdownNodeMenus[node.name] || "").filter(Boolean)
    })
    editor.use(() => updateState)

    // TODO: collab history replacement
    const markdownActionMap = buildMarkdownActions(true)

    return () => {
      let children = menus.map(menu => {
        if (menu === '|') {
          return h('span', { class: 'divider' })
        } else {
          let name: string, title: string
          if (typeof menu === 'string') {
            name = menu
            title = menu
          } else {
            name = menu.name
            title = menu.title
          }
          const icon = h('i', { class: `i-menu-${name}` })
          return h('button', {
            'title': title,
            'aria-label': title,
            'data-menu': name,
            'class': {
              active: actives.value.indexOf(name) !== -1,
            },
            type: 'button',
            onClick: () => {
              const fn = markdownActionMap[name]
              if (fn && editor.view) {
                editor.view.focus()
                fn(editor.view)
              }
            },
          }, [icon])
        }
      })
      if (slots.default) {
        children = [...children, ...slots.default()]
      }
      return h('div', { class: 'mm-menubar' }, [...children])
    }
  },
})
