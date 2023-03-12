import { markRaw } from "vue"
import { Extension } from "@codemirror/state"
import { MarkMirror } from "@markmirror/core"


export class Editor extends MarkMirror {
  constructor (extensions: Extension[]) {
    super(extensions)
    // MUST use `markRaw` to avoid Vue's proxy behavior
    markRaw(this)
  }
}
