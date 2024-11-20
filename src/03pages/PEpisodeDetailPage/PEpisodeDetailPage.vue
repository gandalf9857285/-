<template>
  <div class="container">
    <div class="episode-detail">
      <div v-if="isLoading" class="episode-detail__loading">Loading...</div>
      <div v-else class="episode-detail__content">
        <h2 class="episode-detail__content-title">{{ episode?.name }}</h2>
        <p class="episode-detail__content-info">Air Date: {{ episode?.air_date }}</p>
        <p class="episode-detail__content-info">Episode Code: {{ episode?.episode }}</p>
        <h3 class="episode-detail__content-subtitle">Characters</h3>
        <div class="episode-detail__characters">
          <router-link
            v-for="characterUrl in episode?.characters"
            :key="characterUrl"
            :to="getCharacterPageUrl(characterUrl)"
            class="episode-detail__character-item"
          >
            <img :src="getCharacterImage(characterUrl)" :alt="characterUrl" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { episodeApi, EpisodeType } from 'entities/EEpisodes'
import { characterApi } from 'entities/EСharacters'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const episodeId = parseInt(route.params.id as string, 10)
const isLoading = ref(false)
const episode = ref<EpisodeType | null>(null)
const characterImages = new Map<string, string>()

const fetchEpisode = async (id: number) => {
  isLoading.value = true

  try {
    episode.value = await episodeApi.getEpisode(id)

    for (const characterUrl of episode.value.characters) {
      const characterId = extractCharacterIdFromUrl(characterUrl)
      const character = await characterApi.getCharacter(characterId)

      characterImages.set(characterUrl, character.image)
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const extractCharacterIdFromUrl = (url: string): number => {
  const parts = url.split('/')

  return parseInt(parts[parts.length - 1], 10)
}

const getCharacterImage = (characterUrl: string): string => {
  return characterImages.get(characterUrl) || ''
}

const getCharacterPageUrl = (characterUrl: string): string => {
  const characterId = extractCharacterIdFromUrl(characterUrl)

  return `/character/${characterId}`
}

onMounted(() => {
  fetchEpisode(episodeId)
})
</script>

<style scoped lang="scss">
.episode-detail {
  &__loading {
    font-size: 20px;
    text-align: center;
  }

  &__content {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;

    h2 {
      margin-top: 0;
    }

    ul {
      list-style-type: none;
      padding: 0;

      li {
        margin-bottom: 10px;

        a {
          text-decoration: none;
          color: var(--color-primary);
        }
      }
    }
  }

  &__characters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__character-item {
    width: 60px;
    height: 60px;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
