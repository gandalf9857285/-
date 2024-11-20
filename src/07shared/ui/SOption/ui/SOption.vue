<template>
  <el-option class="s-option" :value="props.value" v-bind="$attrs">
    <span class="s-option__content">
      {{ props.value }}
    </span>

    <span class="s-option__content-check">
      <s-icon name="interface-check" />
    </span>
  </el-option>
</template>

<script lang="ts" setup>
import { ElOption } from 'element-plus'
import { SIcon } from 'shared/ui'

type Props = {
  value: string | number | object | boolean
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.s-option {
  &__content {
    display: block;
    font-family: $font-primary;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: var(--color-black);
    transition: all 0.15s linear;
    padding: 0;
  }

  &__content-check {
    display: flex;
    align-items: center;
  }
}
</style>
