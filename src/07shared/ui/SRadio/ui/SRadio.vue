<template>
  <el-radio ref="radioRef" class="s-radio" v-bind="$attrs"><slot /></el-radio>
</template>

<script lang="ts" setup>
import { RadioInstance } from 'element-plus'
import { ref } from 'vue'

const radioRef = ref<RadioInstance>()
</script>

<style lang="scss" scoped>
.s-radio {
  --el-radio-font-size: 16px;
  --el-radio-text-color: var(--color-black);
  --el-radio-font-weight: 400;
  --el-radio-input-height: 24px;
  --el-radio-input-width: 24px;
  --el-radio-input-border-radius: var(--el-border-radius-circle);
  --el-radio-input-bg-color: var(--color-white);
  --el-radio-input-border: var(--color-primary);
  --el-radio-input-border-color: var(--color-primary-white-50);
  --el-radio-input-border-color-hover: var(--color-primary);

  width: 100%;
  height: auto;
  margin-right: 0;

  :deep(.el-radio__inner) {
    display: flex;
    border: 1px solid var(--el-radio-input-border-color);
    background: var(--el-radio-input-bg-color);

    &::after {
      width: 10px;
      height: 10px;
      background: var(--el-radio-input-border);
    }

    &:hover {
      border: 1px solid var(--el-radio-input-border-color-hover);
    }
  }

  :deep(.el-radio__input) {
    &.is-checked {
      .el-radio__inner {
        border: 1px solid var(--el-radio-input-border-color-hover);
      }
    }

    &.is-disabled {
      .el-radio__inner {
        border: 1px solid var(--el-text-color-placeholder);
      }
    }
  }

  :deep(.el-radio__label) {
    display: flex;
    flex-direction: column;
    font-family: $font-primary;
    line-height: var(--line-height--primary);
    white-space: normal;
    text-align: start;
    color: var(--el-radio-input-label-color);
    padding-left: 10px;

    span {
      font-size: 12px;
      line-height: 18px;
      color: var(--color-primary-white-40);
    }
  }

  &.is-focus {
    :deep(.el-radio__inner) {
      outline: 2px solid var(--color-primary-white-80);
    }
  }
}
</style>
