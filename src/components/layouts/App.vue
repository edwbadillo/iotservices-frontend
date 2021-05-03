<template>
  <app-header />
  <div class="container mt-4">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './Header.vue';

export default defineComponent({
  components: {
    'app-header': Header,
  },
})
</script>
