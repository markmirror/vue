import {
  h,
  ref,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  PropType,
  nextTick,
} from 'vue'
import { placeholder } from '@codemirror/view'
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
    placeholder: {
      default: '',
      type: String as PropType<string>,
    },
  },

  setup (props, ctx) {
    const { editor, modelValue, placeholder: _ptext } = props
    if (_ptext) {
      editor.use(() => placeholder(_ptext))
    }

    editor.addEventHandler('docChanged', content => {
      ctx.emit('update:modelValue', content)
    })

    const root = ref<HTMLElement | null>(null)
    onMounted(() => {
      // delay render timing
      nextTick(() => {
        editor.render(
          root.value as HTMLElement,
          modelValue
        )
      })
    })

    onBeforeUnmount(() => {
      editor.destroy()
    })

    return () => h('div', { ref: root })
  },
})
