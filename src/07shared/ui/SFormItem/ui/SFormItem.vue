<template>
  <el-form-item class="s-form-item" v-bind="$attrs">
    <template #default>
      <slot name="default" />
    </template>
    <template #error="{ error }">
      <slot name="error" :error="error">
        <span class="s-form-item__error-msg">{{ error }}</span>
      </slot>
    </template>
  </el-form-item>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.s-form-item {
  width: 100%;

  &__error-msg {
    font-family: $font-primary;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: var(--color-error);
    margin-top: 4px;
  }

  :deep(.el-form-item__content) {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  :deep(.el-input__validateIcon) {
    display: none;
  }

  &.is-error {
    :deep(.s-input) {
      border-color: var(--color-error);
    }

    :deep(.el-input__wrapper) {
      border-color: var(--color-error);
    }

    :deep(.el-select__wrapper) {
      --s-select-border-color: var(--color-error);

      &:hover {
        --s-select-border-color-hover: var(--color-error);
      }
    }
  }

  &.is-required {
    :deep(.s-input__label),
    :deep(.s-select__label),
    :deep(.s-date-picker__label) {
      &::before {
        content: '*';
        color: var(--color-error);
        margin-right: 2px;
      }
    }
  }
}

.el-form-item {
  margin: 0;
}
</style>
