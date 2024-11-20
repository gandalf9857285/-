<template>
  <div class="header">
    <div class="container">
      <div class="header-wrapper">
        <router-link to="/">
          <s-icon class="header-icon" name="interface-rick_and_morty" />
        </router-link>
        <nav class="header-navigation">
          <router-link class="header-navigation__item" to="/">All characters</router-link>
          <router-link class="header-navigation__item" to="/episodes">Episodes</router-link>
          <router-link class="header-navigation__item" to="/locations">Locations</router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SIcon } from 'shared/ui'
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  background-color: var(--color-black-white-10);
}

.header-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  @include responsive(md) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.header-icon {
  width: 110px;
  height: 30px;

  @include responsive(md) {
    width: 220px;
    height: 60px;
  }

  @include responsive(lg) {
    width: 320px;
    height: 120px;
  }
}

.header-navigation {
  display: flex;
  column-gap: 25px;
  margin: 5px 0;

  &__item {
    font-size: 14px;
    line-height: 120%;
    color: var(--color-black-white-98);
    text-underline-offset: 3px;

    @include responsive(md) {
      font-size: 21px;
      line-height: 140%;
    }
  }

  @include responsive(md) {
    margin: 0;
  }
}
</style>
