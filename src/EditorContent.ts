import {
  h,
  ref,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  PropType,
  nextTick,
} from 'vue'
import { Editor } from './Editor'


export const EditorContent = defineComponent({
  name: 'EditorContent',
  emits: ['update:modelValue'],
  props: {
    editor: {
      required: true,
      type: Object as PropType<Editor>,
    },
    modelValue: {
      default: '',
      type: String as PropType<string>,
    },
  },

  setup (props, ctx) {
    const { editor, modelValue } = props
    editor.on('docChanged', content => {
      ctx.emit('update:modelValue', content)
    })

    const root = ref<HTMLElement | null>(null)
    onMounted(() => {
      // delay render timing
      nextTick(() => {
        editor.render(
          root.value as HTMLElement,
          { content: modelValue }
        )
      })
    })

    onBeforeUnmount(() => {
      editor.destroy()
    })

    return () => h('div', { ref: root })
  },
})
