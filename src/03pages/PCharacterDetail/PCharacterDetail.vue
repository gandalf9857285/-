<template>
  <div class="container">
    <div class="character-detail">
      <div v-if="isLoading" class="character-detail__loading">Loading...</div>
      <div v-else class="character-detail__content">
        <h2 class="character-detail__content-title">{{ character?.name }}</h2>
        <img class="character-detail__content-image" :src="character?.image" :alt="character?.name" />
        <p class="character-detail__content-info">Status: {{ character?.status }}</p>
        <p class="character-detail__content-info">Species: {{ character?.species }}</p>
        <p class="character-detail__content-info">Gender: {{ character?.gender }}</p>
        <p class="character-detail__content-info">Origin: {{ character?.origin.name }}</p>
        <p class="character-detail__content-info">Location: {{ character?.location.name }}</p>
      </div>
      <div class="character-detail__episodes">
        <h4 class="character-detail__episodes-title">Episodes:</h4>
        <div class="character-detail__episodes-list">
          <router-link
            v-for="(episode, index) in character?.episode"
            :key="index"
            class="character-detail__episodes-list-item"
            :to="{ name: ROUTE_NAMES.episode, params: { id: parseEpisodeNumber(episode) } }"
          >
            Episode {{ parseEpisodeNumber(episode) }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { characterApi, CharacterType } from 'entities/EСharacters'
import { ROUTE_NAMES } from 'shared/constants'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoading = ref(false)
const character = ref<CharacterType | null>(null)

const characterId = computed(() => {
  return parseInt(route.params.id as string, 10)
})

watch(route, () => fetchCharacter(characterId.value))

const parseEpisodeNumber = (url: string) => {
  const parts = url.split('/')
  const lastPart = parts[parts.length - 1]

  return parseInt(lastPart, 10)
}

const fetchCharacter = async (id: number) => {
  isLoading.value = true

  try {
    character.value = await characterApi.getCharacter(id)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  console.log('Сработал скрипт')

  fetchCharacter(characterId.value)
})
</script>

<style scoped lang="scss">
.character-detail {
  display: block;
  column-gap: 48px;

  &__loading {
    display: block;
    font-family: 'JetBrains', sans-serif;
    font-size: 64px;
    text-align: center;
  }

  &__content {
    @include responsive(md) {
      border-right: 1px solid var(--color-black-white-90);
      padding-right: 48px;
    }
  }

  &__content-image {
    width: 100%;
  }

  &__episodes-title {
    margin-bottom: 14px;
  }

  &__episodes-list {
    display: grid;
    align-items: start;
    justify-content: center;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(2, auto);
    gap: 24px;

    @include responsive(md) {
      grid-template-columns: repeat(6, auto);
      gap: 12px;
    }
  }

  &__episodes-list-item {
    display: block;
    text-decoration: none;
    color: var(--color-black-white-90);
  }

  @include responsive(md) {
    display: flex;
  }
}
</style>
