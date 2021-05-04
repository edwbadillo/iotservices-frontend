<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light py-3 border-bottom">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'Home'}">
        IOT FRONTEND
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" :to="{name: 'Home'}">
              Home
            </router-link>
          </li>
        </ul>
        
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{username}}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" :to="{name: 'Profile'}">Profile</router-link></li>
              <li><router-link class="dropdown-item" :to="{name: 'Change Password'}">Change password</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { getStore } from '@/store'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const store = getStore();
    const username = computed(() => store.getters.firstName )
    return {
      username
    }
  },
})
</script>
