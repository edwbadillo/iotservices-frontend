<template>
  <div class="spinner-container position-absolute top-0 start-0 d-flex align-items-center h-100 w-100 border-0">
    <spinner />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Spinner from './Spinner.vue'

export default defineComponent({
  components: { Spinner }
})
</script>

<style lang="scss" scoped>
.spinner-container {
  background-color: rgb(255 255 255 / 85%) !important;
}
</style>