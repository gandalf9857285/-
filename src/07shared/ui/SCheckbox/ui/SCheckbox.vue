<template>
  <el-checkbox ref="checkboxRef" class="s-checkbox" v-bind="$attrs"><slot /></el-checkbox>
  <teleport :to="teleportInnerTarget">
    <s-icon class="s-checkbox__icon" name="interface-check" />
  </teleport>
</template>

<script lang="ts" setup>
import { CheckboxInstance } from 'element-plus'
import { SIcon } from 'shared/ui'
import { ref, computed } from 'vue'

const checkboxRef = ref<CheckboxInstance>()

const teleportInnerTarget = computed(() => {
  return checkboxRef.value?.$el.querySelector('.el-checkbox__inner') ?? document.body
})
</script>

<style lang="scss" scoped>
.s-checkbox {
  --el-checkbox-input-border: 1px solid var(--color-primary-white-50);
  --el-checkbox-input-width: 24px;
  --el-checkbox-input-height: 24px;
  --el-checkbox-font-size: 16px;
  --el-checkbox-input-border-color-hover: var(--color-primary);
  --el-checkbox-text-color: var(--color-black);
  --el-checkbox-font-weight: 400;
  --el-checkbox-border-radius: 4px;
  --el-checkbox-checked-input-border-color: var(--color-primary);
  --el-checkbox-checked-bg-color: var(--color-primary);

  width: 100%;
  height: auto;
  margin-right: 0;

  :deep(.el-checkbox__inner) {
    display: flex;

    &::after {
      display: none;
    }
  }

  :deep(.el-checkbox__input) {
    &.is-focus {
      outline: 2px solid var(--color-primary-white-80);
      border-radius: 4px;
    }

    &.is-checked + .el-checkbox__label {
      color: var(--color-black);
    }

    &.is-disabled + span {
      &.el-checkbox__label {
        color: var(--color-black-white-80);
      }
    }

    &.is-disabled {
      .el-checkbox__inner {
        border: none;
        background-color: var(--color-black-white-80);
      }
    }
  }

  :deep(.el-checkbox__label) {
    display: flex;
    flex-direction: column;
    font-family: $font-primary;
    line-height: var(--line-height--primary);
    white-space: normal;
    text-align: start;
    padding-left: 10px;

    span {
      font-size: 12px;
      line-height: 18px;
      color: var(--color-black-white-40);
    }
  }

  &__icon {
    top: 50%;
    left: 50%;
    position: absolute;
    color: var(--color-white);
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  &.is-checked {
    .s-checkbox {
      &__icon {
        opacity: 1;
      }
    }
  }

  &.is-disabled {
    .s-checkbox {
      &__icon {
        color: var(--color-white);
      }
    }
  }
}
</style>
