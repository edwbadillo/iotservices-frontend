<template>
  <div id="particles"></div>
  <div class="d-flex vh-100 justify-content-center align-items-center">
    <div class="card auth shadow px-3 py-4 border-0">
      <div class="card-body">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import loadParticles from '@/plugins/particles-js/particles'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      loadParticles()
    })
  },
})
</script>

<style lang="scss" scoped>
.card.auth {
  width: 28rem;
  border-radius: .75rem;
}
</style>
