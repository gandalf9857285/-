<template>
  <div class="container">
    <div class="location-detail">
      <div v-if="isLoading" class="location-detail__loading">Loading...</div>
      <div v-else class="location-detail__content">
        <h2 class="location-detail__content-title">{{ location?.name }}</h2>
        <p class="location-detail__content-info">Type: {{ location?.type }}</p>
        <p class="location-detail__content-info">Dimension: {{ location?.dimension }}</p>
        <h3 class="location-detail__content-subtitle">Residents</h3>
        <div class="location-detail__residents">
          <router-link
            v-for="resident in location?.residents"
            :key="resident"
            :to="`/character/${parseCharacterId(resident)}`"
          >
            <img :src="getCharacterImageUrl(resident)" class="location-detail__resident-image" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { locationApi, LocationType } from 'entities/ELocations'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const locationId = parseInt(route.params.id as string, 10)
const isLoading = ref(false)
const location = ref<LocationType | null>(null)

const parseCharacterId = (url: string) => {
  const parts = url.split('/')

  return parts[parts.length - 1]
}

const getCharacterImageUrl = (characterUrl: string) => {
  const id = parseCharacterId(characterUrl)

  return `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`
}

const fetchLocation = async (id: number) => {
  isLoading.value = true

  try {
    location.value = await locationApi.getLocation(id)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchLocation(locationId)
})
</script>

<style scoped lang="scss">
.location-detail {
  &__loading {
    font-size: 20px;
    text-align: center;
  }

  &__content {
    padding: 20px;
  }

  &__content-title {
    margin-top: 0;
  }

  &__content-info {
    margin-bottom: 10px;
  }

  &__content-subtitle {
    margin-top: 20px;
  }

  &__residents {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__resident-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
