<template>
  <router-link :to="props.to" :class="linkClass">
    <span class="s-link__icon">
      <slot name="icon" />
    </span>
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type Props = {
  to: string
  underline: boolean
}

const props = withDefaults(defineProps<Props>(), {
  to: '/',
  underline: false,
})

const linkClass = computed(() => {
  return ['s-link', { 's-link--underline': props.underline }]
})
</script>

<style lang="scss" scoped>
.s-link {
  display: inline-flex;
  align-items: center;
  font-family: $font-primary;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  text-decoration: none;
  color: var(--color-primary);
  gap: 4px;

  &__icon {
    font-size: 20px;
  }

  &:hover {
    color: var(--color-primary-white-30);
  }

  &:active {
    color: var(--color-primary-black-70);
  }

  &--underline {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
}
</style>
