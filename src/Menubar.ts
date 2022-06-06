import { MarkMirror, onSelectionSet, markdownActionMap, markdownNodeMenus } from "@markmirror/core"
import { h, ref, defineComponent, PropType } from 'vue'

export const Menubar = defineComponent({
  name: 'Menubar',
  props: {
    editor: {
      default: null,
      type: Object as PropType<MarkMirror>,
    },
    menus: {
      required: true,
      type: Array as PropType<string[]>,
    },
  },

  setup (props, { slots }) {
    const { editor, menus } = props
    const actives = ref<string[]>([])

    const updateState = onSelectionSet(nodes => {
      actives.value = nodes.map(node => markdownNodeMenus[node.name] || "").filter(Boolean)
    })
    editor.addExtension(updateState)

    return () => {
      let children = menus.map(k => {
        if (k === '|') {
          return h('span', { class: 'divider' })
        } else {
          const icon = h('i', { class: `i-menu-${k}` })
          return h('button', {
            'data-menu': k,
            'class': {
              active: actives.value.indexOf(k) !== -1,
            },
            type: 'button',
            onClick: () => {
              const fn = markdownActionMap[k]
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
