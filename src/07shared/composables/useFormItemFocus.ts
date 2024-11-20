import { computed, ref, readonly, Ref } from 'vue'

const useFormItemFocus = (inputValue: Ref<string | string[] | number | undefined>) => {
  const isFocused = ref(false)
  const classes = computed(() => {
    return {
      'is-focused': isFocused.value,
      'is-not-empty': inputValue.value || inputValue.value === 0,
    }
  })

  const handleInputFocus = () => {
    isFocused.value = !isFocused.value
  }

  return {
    isInputFocused: readonly(isFocused),
    formItemFocusClasses: readonly(classes),
    handleInputFocus: handleInputFocus,
  }
}

export { useFormItemFocus }
