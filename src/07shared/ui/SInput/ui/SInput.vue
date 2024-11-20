<template>
  <div :class="classes">
    <span v-if="props.label" :class="labelClasses">
      {{ props.label }}
    </span>
    <span v-if="slots.textareaIcon" class="s-input--textarea-icon">
      <slot name="textareaIcon" />
    </span>
    <el-input
      v-bind="$attrs"
      v-model="inputValue"
      :type="inputType"
      :show-password="isPasswordVisible"
      :readonly="props.readonly"
      :maxlength="props.maxSymbolLength"
      :autosize="props.autoSize"
      :show-word-limit="props.type === 'textarea'"
    >
      <template #prefix>
        <slot name="prefix" />
      </template>
      <template #suffix>
        <button v-if="props.clearable && inputValue?.length" class="s-input__icon" @click="clearInput">
          <s-icon name="interface-close" class="text-xl" />
        </button>
        <button v-if="props.type === 'password'" type="button" class="s-input__icon" @click="handlePasswordShow">
          <s-icon :name="passwordIcon" class="s-input__close-icon text-xl" />
        </button>
      </template>
    </el-input>
    <div v-if="props.type === 'textarea'">
      <button v-if="props.clearable && inputValue?.length" class="s-input--textarea-close-icon" @click="clearInput">
        <s-icon name="interface-close" class="text-xl" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElInput } from 'element-plus'
import { SIcon } from 'shared/ui'
import { computed, ref } from 'vue'

type Props = {
  type?: 'text' | 'textarea' | 'password' | 'tel' | 'email'
  label?: string
  labelPosition?: 'inside' | 'outside'
  size?: 'sm' | 'lg'
  autoSize?:
    | {
        minRows?: number
        maxRows?: number
      }
    | boolean
  readonly?: boolean
  maxSymbolLength?: number
  clearable?: boolean
}

type Slots = {
  textareaIcon?: () => HTMLElement
  prefix?: () => HTMLElement
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'lg',
  labelPosition: 'outside',
  autoSize: () => ({ minRows: 6 }),
  maxSymbolLength: 100,
  clearable: false,
})

const slots = defineSlots<Slots>()

const inputValue = defineModel<string>()

const isPasswordVisible = ref(false)

const classes = computed(() => ['s-input', `s-input--${props.size}`, `s-input--${props.type}`])

const labelClasses = computed(() => ['s-input__label', `s-input__label-${props.labelPosition}`])

const passwordIcon = computed(() => (isPasswordVisible.value ? 'interface-visibility' : 'interface-visibility_off'))

const inputType = computed<Props['type']>(() => {
  if (props.type === 'password' && !isPasswordVisible.value) return 'password'
  if (props.type === 'password' && isPasswordVisible.value) return 'text'

  return props.type
})

const clearInput = () => {
  inputValue.value = ''
}

const handlePasswordShow = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<style lang="scss" scoped>
.s-input {
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

  width: var(--s-input-width);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__icon {
    display: flex;
    align-items: center;
    border: none;
    color: var(--s-input-placeholder-color);
    background-color: inherit;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }

  &__label {
    font-family: $font-primary;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: var(--s-input-text-color);
  }

  &__label-inside {
    color: var(--s-input-placeholder-color);
  }

  &--sm {
    --s-input-height: 40px;
  }

  &--password {
    :deep(.el-input__password) {
      display: none;
    }
  }

  &--textarea {
    margin-bottom: 14px;
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

  .el-input__wrapper {
    display: flex;
    padding: 0 12px;
    gap: 4px;
  }

  .el-input__clear {
    display: none;
  }

  .el-input__prefix-inner {
    max-width: 20px;

    svg {
      margin: 0;
    }
  }

  .el-input__suffix-inner {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &.is-disabled {
    .el-input__wrapper {
      background-color: var(--color-black-white-95);
    }
  }
}

:deep(.el-textarea) {
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

  .el-input--prefix {
    display: flex;
  }

  .el-input--suffix {
    display: flex;
    visibility: visible;
  }

  .el-textarea__inner {
    display: flex;
    padding: 12px 32px 12px 12px;
    gap: 4px;
  }

  .el-input__count {
    right: 0;
    bottom: -20px;
    position: absolute;
    background-color: inherit;
  }

  &.is-disabled {
    .el-textarea__wrapper {
      background-color: var(--color-black-white-95);
    }
  }
}

.s-input--textarea-close-icon {
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  position: absolute;
  border: none;
  color: var(--s-input-placeholder-color);
  background-color: inherit;
  padding: 0;
}

.s-input:has(.s-input__label-inside, .s-input__label-outside) {
  .s-input--textarea-close-icon {
    top: 32px;
  }

  .s-input--textarea-icon {
    top: 32px;
  }
}

.s-input--textarea-icon {
  top: 12px;
  left: 12px;
  width: 20px;
  height: 20px;
  position: absolute;
  border: none;
  color: var(--s-input-placeholder-color);
  z-index: 2;
}

.s-input:has(.s-input--textarea-icon) {
  :deep(.el-textarea__inner) {
    padding: 12px 32px 12px 36px;
  }
}

:deep(.el-input__clear) {
  margin: 0;
}
</style>
