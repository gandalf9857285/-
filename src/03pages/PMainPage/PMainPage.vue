<template>
  <div class="container">
    <div class="main-page">
      <h1 class="main-page__title">All character</h1>
      <div class="main-page__content">
        <div v-if="isLoading" class="main-page__content-loading">Loading...</div>
        <div v-else>
          <ul class="main-page__content-list">
            <router-link
              v-for="character in characterData"
              :key="character.id"
              class="main-page__content-list-item"
              :to="`${ROUTE_NAMES.character}/${character.id}`"
            >
              <w-character-card :character="character" />
            </router-link>
          </ul>
        </div>
      </div>
      <s-pagination
        v-model:current-page="currentPage"
        class="main-page__pagination"
        :page-count="characterInfo?.info.pages || 0"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { characterApi, CharacterApiResponseType, CharacterType } from 'entities/EСharacters'
import { ROUTE_NAMES } from 'shared/constants'
import { SPagination } from 'shared/ui'
import { onMounted, ref } from 'vue'
import WCharacterCard from 'widgets/WCharacterCard.vue'

const isLoading = ref(false)
const characterData = ref<CharacterType[]>([])
const characterInfo = ref<CharacterApiResponseType | null>(null)
const currentPage = ref(1)

const fetchAll = async (page: number) => {
  isLoading.value = true

  try {
    const response = await characterApi.getAllCharacters(page)

    characterData.value = response.results

    characterInfo.value = response
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const handlePageChange = async () => {
  await fetchAll(currentPage.value)
}

onMounted(async () => {
  await fetchAll(currentPage.value)
})
</script>

<style lang="scss" scoped>
.main-page {
  &__title {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 24px;
  }

  &__content-loading {
    font-family: 'JetBrains', sans-serif;
    font-weight: 600;
    font-size: 64px;
    text-align: center;
    margin-top: 90px;

    @include responsive(md) {
      margin-top: 120px;
    }
  }

  &__content-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;

    @include responsive(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include responsive(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__content-list-item {
    text-decoration: none;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    margin-top: 40px;
  }
}
</style>
