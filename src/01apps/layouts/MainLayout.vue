<template>
  <w-header v-if="$route.meta.showHeader" class="header" />

  <div class="content">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive>
            <Suspense>
              <component :is="Component" />
              <template #fallback> Loading... </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import WHeader from 'widgets/WHeader.vue'
</script>

<style scoped lang="scss">
.header {
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  border-bottom: 1px solid #ccc;
  background-color: var(--color-black-white-10);
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.content {
  margin-top: 80px;

  @include responsive(md) {
    margin-top: 150px;
  }
}
</style>
