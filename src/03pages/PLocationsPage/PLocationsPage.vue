<template>
  <div class="container">
    <div class="locations-page">
      <h1 class="locations-page__title">Rick and Morty Locations</h1>
      <div v-if="isLoading" class="locations-page__loading">Loading...</div>
      <div v-else>
        <table class="locations-page__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Dimension</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="location in locations" :key="location.id">
              <td>{{ location.id }}</td>
              <td>
                <router-link :to="`/location/${location.id}`">
                  {{ location.name }}
                  <s-icon name="chevrons-chevron_right" />
                </router-link>
              </td>
              <td>{{ location.type }}</td>
              <td>{{ location.dimension }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <s-pagination
        v-if="locationInfo"
        class="locations-page__pagination"
        :page-count="locationInfo.info.pages || 0"
        @current-change="fetchLocations"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { locationApi, LocationType, LocationApiResponseType } from 'entities/ELocations'
import { SPagination } from 'shared/ui'
import SIcon from 'shared/ui/SIcon/ui/SIcon.vue'
import { onMounted, ref } from 'vue'

const isLoading = ref(false)
const locations = ref<LocationType[]>([])
const locationInfo = ref<LocationApiResponseType | null>(null)
const currentPage = ref(1)

const fetchLocations = async (page = currentPage.value) => {
  isLoading.value = true

  try {
    const response = await locationApi.getAllLocations(page)

    locations.value = response.results

    locationInfo.value = response
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchLocations()
})
</script>

<style scoped lang="scss">
.locations-page {
  &__title {
    text-align: center;
    margin-bottom: 20px;
  }

  &__loading {
    font-size: 24px;
    text-align: center;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #ddd;
      font-size: 12px;
      text-decoration: none;
      padding: 3px;

      @include responsive(md) {
        font-size: 16px;
        padding: 8px;
      }
    }

    th {
      text-align: left;
      color: var(--color-black);
      background-color: #f2f2f2;
    }

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #f2f2f2;
      gap: 4px;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }
  }

  &__pagination {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    margin-top: 40px;
  }
}
</style>
