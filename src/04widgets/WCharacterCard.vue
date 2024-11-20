<template>
  <div class="character-card">
    <img :src="props.character.image" :alt="props.character.image" class="character-card__image" />
    <div class="character-card__name">
      {{ props.character.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { CharacterType } from 'entities/EСharacters'

type Props = {
  character: CharacterType
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.character-card {
  height: 100%;
  min-height: 323px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: var(--color-black-white-95);
  padding: 9px;

  &__image {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }

  &__name {
    display: block;
    font-weight: 400;
    font-size: 24px;
    line-height: 120%;
    text-decoration: none;
    color: var(--color-black);
    margin-top: 8px;
  }
}
</style>
