import { Ref } from 'vue'

export type SInputExposeType = {
  focus: () => void
  blur: () => void
  clear: () => void
  inputElement: Ref<HTMLInputElement | undefined>
}
