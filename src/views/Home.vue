<template>
  <app-header />
  <div class="container">
    <h1 class="text-center mt-4">You're in home page.</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/layouts/Header.vue';

export default defineComponent({
  components: {
    'app-header': Header
  },
  setup() {
    return { }
  },
})
</script>
