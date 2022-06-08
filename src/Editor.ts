import { markRaw } from "vue"
import { MarkMirror, MarkMirrorOptions } from "@markmirror/core"


export class Editor extends MarkMirror {
  constructor (options: MarkMirrorOptions = {}) {
    super(options)
    // MUST use `markRaw` to avoid Vue's proxy behavior
    markRaw(this)
  }
}
