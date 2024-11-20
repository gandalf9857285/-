<template>
  <component :is="props.as" v-bind="$attrs" v-loading="props.isLoading" :class="SButton" @click="clickHandler">
    <div v-if="!props.isLoading">
      <slot v-if="$slots.suffix" name="suffix" />
      <slot />
      <slot v-if="$slots.postfix" name="postfix" />
    </div>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type Props = {
  as?: 'button' | 'router-link'
  appearance?: 'primary' | 'secondary' | 'tertiary' | 'link'
  size?: 'lg' | 'md' | 'sm'
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  appearance: 'primary',
  size: 'lg',
  isLoading: false,
})

const clickHandler = () => {
  if (props.isLoading) {
    console.log('click!')
  }
}

const SButton = computed(() => {
  return ['s-button', `s-button--${props.appearance}`, `s-button--${props.size}`]
})
</script>

<style lang="scss" scoped>
.s-button {
  --s-button--color: var(--color-white);
  --s-button--background-color: var(--color-primary);
  --s-button--color-border: var(--color-white);
  --s-button--color-border-disabled: var(--color-white);
  --s-button--color-hover: var(--color-white);
  --s-button--color-background-hover: var(--color-primary-black-40);
  --s-button--color-focus: var(--color-primary-white-30);
  --s-button--color-active-background: var(--color-primary-white-50);
  --s-button--disabled-text: var(--color-white);
  --s-button--color-disabled: var(--color-black-white-90);

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--s-button--color-border);
  border-radius: 8px;
  font-family: $font-primary;
  font-weight: 400;
  color: var(--s-button--color);
  background-color: var(--s-button--background-color);
  gap: 8px;

  .el-loading-parent--relative {
    background-color: var(--s-button--background-color);
  }

  :deep(.el-loading-mask) {
    border-radius: 8px;
    background-color: var(--s-button--background-color);
  }

  :deep(.el-loading-spinner) {
    .path {
      --el-color-primary: var(--s-button--color);

      stroke-width: 4px;
    }
  }

  &:hover {
    background-color: var(--s-button--color-background-hover);
  }

  &:focus {
    border-color: var(--s-button--color-focus);
  }

  &:active {
    color: var(--s-button--color);
    background-color: var(--s-button--color-active-background);
  }

  &:disabled {
    border-color: var(--s-button--color-border-disabled);
    color: var(--s-button--disabled-text);
    background-color: var(--s-button--color-disabled);
    cursor: not-allowed;

    &:focus {
      outline: 2px solid var(--s-button--color-disabled);
    }
  }

  &--lg {
    height: 56px;
  }

  &--md {
    height: 44px;
  }

  &--sm {
    height: 32px;
  }

  &--secondary {
    --s-button--color: var(--color-primary);
    --s-button--background-color: var(--color-white);
    --s-button--color-border: var(--color-primary);
    --s-button--color-border-disabled: var(--color-black-white-90);
    --s-button--color-hover: var(--color-white);
    --s-button--color-background-hover: var(--color-black-white-95);
    --s-button--color-focus: var(--color-primary-white-50);
    --s-button--color-active: var(--color-primary-white-30);
    --s-button--color-active-background: var(--color-primary-white-80);
    --s-button--disabled-text: var(--color-black-white-60);
    --s-button--color-disabled: var(--color-black-white-90);

    &:focus {
      outline: 1px solid var(--s-button--color-focus);
      border-color: 1px solid var(--s-button--color);
    }
  }

  &--tertiary {
    --s-button--color: var(--color-primary);
    --s-button--background-color: var(--color-primary-white-95);
    --s-button--color-hover: var(--color-white);
    --s-button--color-background-hover: var(--color-primary-white-80);
    --s-button--color-focus: var(--color-primary-white-30);
    --s-button--color-active: var(--color-primary);
    --s-button--color-active-background: var(--color-primary-white-50);
    --s-button--disabled-text: var(--color-black-white-60);
    --s-button--color-disabled: var(--color-black-white-90);
  }

  &--link {
    --s-button--color: var(--color-primary);
    --s-button--background-color: inherit;
    --s-button--color-hover: var(--color-white);
    --s-button--color-background-hover: var(--color-primary-white-95);
    --s-button--color-focus: var(--color-primary-white-30);
    --s-button--color-active: var(--color-primary);
    --s-button--color-active-background: var(--color-primary-white-80);
    --s-button--disabled-text: var(--color-black-white-60);
    --s-button--color-disabled: var(--color-black-white-90);
  }
}
</style>
