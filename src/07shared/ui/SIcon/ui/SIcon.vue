<template>
  <svg class="s-icon" :class="iconClass" width="1em" height="1em" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type Props = {
  name: string
  prefix?: string
  reverse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const iconClass = computed(() => {
  return [{ 's-icon--reversed': props.reverse }, `s-icon--${props.name}`]
})
</script>

<style lang="scss" scoped>
.s-icon {
  position: relative;
  display: inline-block;
  flex-shrink: 0;

  &--reversed {
    transform: rotate(180deg);
  }
}
</style>
