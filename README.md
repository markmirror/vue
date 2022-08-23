# @markmirror/vue

Vue components for MarkMirror Markdown editor.

## Usage

```html
<template>
  <editor-menubar :editor="editor" :menus="['bold', 'italic', '|', 'hr']" />
  <editor-content :editor="editor" v-model="doc">
</template>

<script>
import "@markmirror/menubar/style.css"
import { Editor, EditorContent, Menubar as EditorMenubar } from "@markmirror/vue"

export default {
  components: {
    EditorContent,
    EditorMenubar,
  },
  data () {
    const editor = new Editor()
    return { editor, doc: '' }
  },
}
</script>
```
