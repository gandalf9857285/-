<template>
  <div class="s-autocomplete">
    <el-autocomplete v-bind="$attrs" popper-class="s-autocomplete__popper" clearable />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.s-autocomplete {
  width: 100%;
  position: relative;
  display: block;
}
</style>
