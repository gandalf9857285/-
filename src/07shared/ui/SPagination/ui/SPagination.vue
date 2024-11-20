<template>
  <div class="s-pagination">
    <el-pagination :prev-icon="customPrevIcon" :next-icon="customNextIcon" layout="prev, pager, next" v-bind="$attrs" />
  </div>
</template>

<script lang="ts" setup>
import { SIcon } from 'shared/ui'
import { h, shallowRef } from 'vue'

const customPrevIcon = shallowRef({
  render() {
    return h(
      SIcon,
      {
        name: 'chevrons-chevron_left',
      },
      undefined
    )
  },
})

const customNextIcon = shallowRef({
  render() {
    return h(
      SIcon,
      {
        name: 'chevrons-chevron_right',
      },
      undefined
    )
  },
})
</script>

<style lang="scss" scoped>
.s-pagination {
  :deep(.el-pagination) {
    display: flex;
    gap: 8px;

    button {
      color: var(--color-white);
      background-color: inherit;

      .el-icon {
        font-size: 24px;
      }
    }

    .el-pager {
      .number {
        width: 24px;
        height: 24px;
        min-width: 24px;
        border-radius: 200px;
        font-family: $font-primary;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: var(--color-white);
        background-color: inherit;
        padding: 0;

        &:hover {
          color: var(--color-primary-white-30);
        }

        &.is-active {
          color: var(--color-white);
          background-color: #42b4ca;
        }
      }

      .more {
        min-width: 24px;
        background-color: inherit;
        padding: 0;

        &::before {
          content: '...';
          width: 24px;
          height: 24px;
          display: flex;
          justify-content: center;
          color: var(--color-white);
        }

        svg {
          display: none;
        }
      }
    }
  }
}
</style>
