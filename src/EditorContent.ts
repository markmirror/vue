import { MarkMirror, onDocChange } from '@markmirror/core'
import {
  h,
  ref,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  PropType,
  nextTick,
} from 'vue'


export const EditorContent = defineComponent({
  name: 'EditorContent',
  emits: ['update:modelValue'],
  props: {
    editor: {
      required: true,
      type: Object as PropType<MarkMirror>,
    },
    modelValue: {
      default: '',
      type: String as PropType<string>,
    },
  },

  setup (props, ctx) {
    const { editor, modelValue } = props
    const root = ref<HTMLElement | null>(null)

    const emitContent = onDocChange(content => {
      ctx.emit('update:modelValue', content)
    })

    onMounted(() => {
      nextTick(() => {
        editor.render(
          root.value as HTMLElement,
          {
            extensions: [ emitContent ],
            content: modelValue,
          }
        )
      })
    })

    onBeforeUnmount(() => {
      editor.destroy()
    })

    return () => h('div', { ref: root })
  },
})
