import { MarkMirror, onDocChange } from '@markmirror/core'
import {
  h,
  ref,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  PropType,
} from 'vue'


export const EditorContent = defineComponent({
  name: 'EditorContent',
  emits: ['update:modelValue'],
  props: {
    editor: {
      default: null,
      type: Object as PropType<MarkMirror>,
    },
    modelValue: {
      default: '',
      type: String as PropType<string>,
    },
  },

  setup (props, ctx) {
    const root = ref<HTMLElement | null>(null)

    const emitContent = onDocChange(content => {
      console.log('content changed', content)
      ctx.emit('update:modelValue', content)
    })

    onMounted(() => {
      props.editor.render(
        root.value as HTMLElement,
        {
          extensions: [ emitContent ],
          content: props.modelValue,
        }
      )
    })

    onBeforeUnmount(() => {
      props.editor.destroy()
    })

    return () => h('div', { ref: root })
  },
})
