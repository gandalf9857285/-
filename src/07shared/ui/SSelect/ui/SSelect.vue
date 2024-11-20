<template>
  <div :class="classes">
    <label v-if="props.label" :class="labelClasses">
      {{ props.label }}
    </label>

    <el-select
      v-model="selectValue"
      v-bind="$attrs"
      :suffix-icon="selectIcon"
      :disabled="disabled"
      :teleported="false"
      popper-class="s-select-popper"
      filterable
      :multiple="props.multiple"
      @blur="handleInputFocus"
      @focus="handleInputFocus"
    >
      <slot />
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { useFormItemFocus } from 'shared/composables'
import { SIcon } from 'shared/ui'
import { computed, h, shallowRef } from 'vue'

type Props = {
  modelValue?: string | string[] | number | undefined
  label?: string
  labelPosition?: 'inside' | 'outside'
  disabled?: boolean
  size?: 'sm' | 'lg'
  readonly?: boolean
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelPosition: 'outside',
  size: 'lg',
})

const selectIcon = shallowRef({
  render() {
    return h(
      SIcon,
      {
        name: 'chevrons-expand_more',
      },
      undefined
    )
  },
})

const selectValue = defineModel<string | number | string[] | undefined>()

const { formItemFocusClasses, handleInputFocus } = useFormItemFocus(selectValue)

const labelClasses = computed(() => {
  return ['s-select__label', `s-select__label-${props.labelPosition}`, formItemFocusClasses.value]
})

const classes = computed(() => [
  's-select',
  `s-select--${props.size}`,
  { 's-select--readonly': props.readonly },
  { 's-select--multiple': props.multiple },
])
</script>

<style lang="scss" scoped>
.s-select {
  --s-select-background-color: var(--color-black-white-98);
  --s-select-border-color: var(--color-black-white-80);
  --s-select-border-color-hover: var(--color-primary-white-50);
  --s-select-disabled-color: var(--el-disabled-text-color);
  --s-select-disabled-border: var(--el-disabled-border-color);
  --s-select-font-size: var(--el-font-size-base);
  --s-select-close-hover-color: var(--el-text-color-secondary);
  --s-select-placeholder-color: var(--color-black-white-40);
  --s-select-input-color: var(--color-black);
  --s-select-multiple-input-color: var(--el-text-color-regular);
  --s-select-input-focus-border-color: var(--color-primary);
  --s-select-input-font-size: 16px;
  --s-select-input-line-height: 24px;
  --s-select-width: 100%;

  width: var(--s-select-width);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;

  :deep(.el-select) {
    .el-select__wrapper {
      width: var(--s-select-width);
      border: 1px solid var(--s-select-border-color);
      border-radius: 8px;
      box-shadow: none;
      box-sizing: border-box;
      background: var(--s-select-background-color);
      padding: 15px 11px;

      &:hover {
        border-color: var(--s-select-border-color-hover);
      }

      &.is-disabled {
        --s-select-border-color: var(--color-black-white-95);
        --s-select-border-color-hover: var(--s-select-border-color);
        --s-select-placeholder-color: var(--color-black-white-80);
      }

      &.is-focused {
        border-color: var(--s-select-input-focus-border-color);
      }
    }
  }

  :deep(.el-select__placeholder) {
    color: var(--s-select-placeholder-color);
  }

  :deep(.el-select__input) {
    width: fit-content;
    font-weight: 400;
    font-size: var(--s-select-input-font-size);
    line-height: var(--s-select-input-line-height);
    color: var(--s-select-input-color);
  }

  :deep(.el-select__selected-item) {
    font-family: $font-primary;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  &:has(.is-not-empty) {
    &:not(.s-select--multiple) {
      --s-select-placeholder-color: var(--s-select-input-color);
    }
  }

  &:has(.s-select__label-inside) {
    .s-select__label-inside {
      top: 7px;
      left: 12px;
      position: absolute;
      z-index: 2;
    }

    :deep(.el-select__wrapper) {
      padding: 7px 12px;
    }

    :deep(.el-select__selected-item) {
      padding-top: 18px;
    }
  }

  &:has(.el-select__prefix) {
    .s-select__label-inside {
      left: 40px;
    }
  }

  &__label {
    font-family: $font-primary;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
  }

  &--readonly {
    --s-select-border-color: var(--color-black-white-90);
    --s-select-background-color: var(--color-white);
    --s-select-border-color-hover: var(--color-black-white-90);
    --s-select-input-focus-border-color: var(--color-black-white-90);

    pointer-events: none;
    user-select: all;
  }

  &--sm {
    :deep(.el-select) {
      .el-select__wrapper {
        padding: 8px 12px;
      }
    }
  }

  &--multiple {
    :deep(.el-select__selected-item) {
      background-color: inherit;

      .el-tag {
        display: flex;
        border: 1px solid var(--color-primary-white-30);
        border-radius: 8px;
        color: var(--color-primary-white-30);
        background-color: inherit;
        padding: 3px 5px;
        gap: 2px;

        .el-tag__close {
          font-size: 16px;
          color: var(--color-primary-white-30);
          margin: 0;

          &:hover {
            background-color: inherit;
          }
        }
      }
    }
  }
}

:deep(.el-popper) {
  border-radius: 20px;

  .el-select-dropdown__list {
    padding: 0;
  }

  .el-select-dropdown__item {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;

    .s-icon {
      visibility: hidden;
    }

    &.is-selected {
      &::after {
        display: none;
      }

      .s-icon {
        font-size: 24px;
        color: var(--color-primary);
        visibility: visible;
      }

      .s-option__content {
        font-weight: 800;
        font-size: 17px;
        color: var(--color-primary);
        transition: font-size 0.15s ease-in-out;
      }
    }
  }

  .el-scrollbar {
    &__bar {
      top: 16px;
      right: 4px;
      margin-bottom: 16px;
    }

    &__wrap {
      border-radius: 20px;
    }
  }
}

:deep(.el-select__selection) {
  &.is-near {
    margin: 0;
  }
}
</style>
