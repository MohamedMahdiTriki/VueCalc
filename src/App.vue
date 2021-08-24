<template>
  <body class="text-gray-600">
    <h1 class="text-5xl p-9">VueCalc</h1>
    <div class="operation">
      <operation></operation>
    </div>
    <div class="fav-list">
      <favorite-list></favorite-list>
    </div>
  </body>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Operation from "./components/Operation.vue";
import FavoriteList from "./components/FavoriteList.vue";

export default defineComponent({
  name: "App",
  components: {
    Operation,
    FavoriteList
  },
});
</script>

<style>
</style>
