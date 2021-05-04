<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { setErrorResponseListener } from './plugins/axios';
import { getStore } from './store';
import { ActionTypes } from './store/actions';
import { AppErrorListener } from './types/listeners'

export default defineComponent({
  setup() {
    const store = getStore();
    const router = useRouter();

    const appErrorListener: AppErrorListener = {
      onNetworkError() {
        console.error("APP ERROR NETWORK HERE");
      },
      onUnauthorized() {
        router.push({ name: 'Login' });
      },
      refreshToken(): Promise<any> {
        const refreshToken = store.state.token.refreshToken;
        return store.dispatch(ActionTypes.REFRESH_TOKEN, refreshToken)
      },
      onError(statusCode) {
        console.error("APP ERROR HERE " + statusCode);
      }
    }

    onMounted(() => {
      setErrorResponseListener(appErrorListener);
    })
  },
})
</script>


<style lang="scss">
@import './assets/scss/app.scss'
</style>
