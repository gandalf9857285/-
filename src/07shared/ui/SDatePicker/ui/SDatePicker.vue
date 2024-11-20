<template>
  <div ref="datePickerRef" :class="classes">
    <div class="s-date-picker__item">
      <label v-if="props.label" :class="labelClasses">
        {{ props.label }}
      </label>
      <el-date-picker
        v-model="dateValue"
        format="DD.MM.YYYY"
        data-slots="_"
        :value-format="props.valueFormat"
        :prefix-icon="customIcon"
        :disabled="props.disabled"
        v-bind="$attrs"
        :placeholder="props.placeholder"
        :disabled-date="props.disabledDate ?? firstDisableDateChecker"
        type="date"
        clearable
        @change="focusSecondInputHandler"
      />
    </div>
    <div v-if="props.type === 'range'" class="s-date-picker__separator" />
    <div v-if="props.type === 'range'" class="s-date-picker__item">
      <label v-if="props.label" :class="labelClasses">
        {{ props.label }}
      </label>
      <el-date-picker
        ref="secondDatePickerRef"
        v-model="secondDateValue"
        :prefix-icon="customIcon"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        :disabled-date="props.disabledDate ?? secondDisableDateChecker"
        type="date"
        clearable
        :value-format="props.valueFormat"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CANON_DATE_FORMAT_DATE } from 'shared/constants'
import { SIcon } from 'shared/ui'
import { dateToNewDate } from 'shared/utils'
import { ref, computed, shallowRef, h, onMounted } from 'vue'

//TODO: обработать работу дата пикера с выбором дня рождения и переводом в ISO формат
type Props = {
  modelValue: string | string[] | undefined
  label?: string
  type?: 'date' | 'range'
  size?: 'sm' | 'lg'
  valueFormat?: string
  disabled?: boolean
  labelPosition?: 'inside' | 'outside'
  placeholder?: string
  disabledDate?: (date: Date) => boolean
  disableNextDates?: boolean
  firstLessSecond?: boolean
}

type Emits = {
  (event: 'update:modelValue', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'date',
  size: 'lg',
  valueFormat: CANON_DATE_FORMAT_DATE,
  labelPosition: 'outside',
  disabled: false,
  firstLessSecond: false, //description: первый первый пикер не может быть больше второго
})

const emits = defineEmits<Emits>()

const datePickerRef = ref()
const secondDatePickerRef = ref()

const customIcon = shallowRef({
  render() {
    return h(SIcon, {
      name: 'interface-calendar_today',
    })
  },
})

const dateValue = computed<any>({
  get() {
    if (props.type === 'range' && Array.isArray(props.modelValue)) {
      return props.modelValue[0]
    }

    return props.modelValue
  },
  set(newValue: Props['modelValue']) {
    if (Array.isArray(props.modelValue)) {
      if (props.modelValue[1]) {
        emits('update:modelValue', [newValue?.toString() ?? '', secondDateValue.value])
      } else {
        emits('update:modelValue', [newValue?.toString() ?? '', ''])
      }

      return
    }

    emits('update:modelValue', newValue)
  },
})

const secondDateValue = computed<any>({
  get() {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue[1]
    }

    return ''
  },
  set(newValue: Props['modelValue']) {
    if (Array.isArray(props.modelValue)) {
      if (props.modelValue[0]) {
        emits('update:modelValue', [dateValue.value, newValue?.toString() ?? ''])
      } else {
        emits('update:modelValue', ['', newValue?.toString() ?? ''])
      }

      return
    }

    emits('update:modelValue', newValue)
  },
})

const labelClasses = computed(() => ['s-date-picker__label', `s-date-picker__label-${props.labelPosition}`])

const classes = computed(() => [
  's-date-picker',
  `s-date-picker--${props.size}`,
  { 's-date-picker--disabled': props.disabled },
])

onMounted(() => {
  if (typeof props.modelValue === 'undefined') {
    if (props.type === 'range') {
      emits('update:modelValue', [])
    } else {
      emits('update:modelValue', '')
    }
  }
})

const focusSecondInputHandler = () => {
  secondDatePickerRef.value?.focus()
}

const firstDisableDateChecker = (date: Date) => {
  if (props.firstLessSecond && secondDateValue.value) {
    const secondDate = new Date(secondDateValue.value)

    return date > new Date(secondDate.setDate(secondDate.getDate() - 1))
  }

  if (props.disableNextDates) {
    return date > new Date()
  }

  return false
}

const secondDisableDateChecker = (date: Date) => {
  if (props.firstLessSecond && dateValue.value) {
    const firstDate = new Date(dateValue.value)

    if (props.disableNextDates) {
      return date < new Date(firstDate.setDate(firstDate.getDate() + 1)) || date > new Date()
    }

    return date < new Date(firstDate.setDate(firstDate.getDate() + 1))
  }

  if (props.disableNextDates) {
    return date > new Date()
  }

  return false
}
</script>

<style lang="scss" scoped>
.s-date-picker {
  --s-input-text-color: var(--color-black);
  --s-input-border: var(--color-black-white-80);
  --s-input-hover-border: 1px solid var(--color-primary-white-50);
  --s-input-focus-border: 1px solid var(--color-primary);
  --s-input-transparent-border: 0 0 0 1px transparent inset;
  --s-input-border-color: var(--color-black-white-80);
  --s-input-border-radius: 8px;
  --s-input-bg-color: var(--color-black-white-98);
  --s-input-icon-color: var(--el-text-color-placeholder);
  --s-input-placeholder-color: var(--color-black-white-40);
  --s-input-hover-border-color: var(--color-primary-white-50);
  --s-input-clear-hover-color: none;
  --s-input-focus-border-color: var(--color-primary);
  --s-input-width: 100%;
  --s-input-height: 56px;

  width: fit-content;
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;

  &__item {
    max-width: 136px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__separator {
    width: 12px;
    height: 2px;
    display: flex;
    background-color: var(--color-black-white-70);
  }

  &:has(.s-date-picker__label-outside) {
    .s-date-picker__separator {
      margin-top: 20px;
    }
  }

  &__label {
    font-family: $font-primary;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: var(--s-input-text-color);

    &-inside {
      top: 7px;
      left: 12px;
      position: absolute;
      color: var(--s-input-placeholder-color);
      z-index: 2;
    }
  }

  &--sm {
    --s-input-height: 40px;

    :deep(.el-input) {
      .el-input__wrapper {
        padding: 8px 12px;
      }
    }
  }
}

:deep(.el-input) {
  --el-input-text-color: var(--s-input-text-color);
  --el-input-border: var(--s-input-border);
  --el-input-hover-border: var(--s-input-hover-border);
  --el-input-focus-border: var(--s-input-focus-border);
  --el-input-transparent-border: var(--s-input-transparent-border);
  --el-input-border-color: var(--s-input-border-color);
  --el-input-border-radius: var(--s-input-border-radius);
  --el-input-bg-color: var(--s-input-bg-color);
  --el-input-icon-color: var(--s-input-icon-color);
  --el-input-placeholder-color: var(--s-input-placeholder-color);
  --el-input-hover-border-color: var(--s-input-hover-border-color);
  --el-input-clear-hover-color: var(--s-input-clear-hover-color);
  --el-input-focus-border-color: var(--s-input-focus-border-color);
  --el-input-width: var(--s-input-width);
  --el-input-height: var(--s-input-height);

  max-width: 136px;

  .el-input__wrapper {
    max-width: 136px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: start;
    padding: 16px 12px;
    gap: 4px;
  }

  .el-input__clear {
    display: none;
  }

  .el-input__prefix-inner {
    max-width: 24px;

    i {
      margin: 0;
    }
  }

  .el-input__suffix {
    display: none;
  }

  &.is-disabled {
    .el-input__wrapper {
      background-color: var(--color-black-white-95);
    }
  }
}

.s-date-picker:has(.s-date-picker__label-inside) {
  :deep(.el-input__wrapper) {
    padding: 7px 12px;
  }

  :deep(.el-input__inner) {
    padding-top: 18px;
  }
}

:deep(.el-input__clear) {
  margin: 0;
}
</style>
