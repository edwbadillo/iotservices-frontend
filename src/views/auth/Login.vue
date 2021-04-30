<template>
  <h2>Login</h2>
  <p class="fw-light">Please enter your account credentials.</p>

  <form @submit="onSubmit">
    <v-input
      placeholder="Username or email"
      required
      v-model="username"
      :error="errors.username"
    />
    <v-input
      type="password"
      placeholder="Password"
      required
      v-model="password"
      :error="errors.password"
    />

    <button
      :disabled="isSubmitting"
      class="mt-3 btn btn-primary w-100"
      type="submit"
    >
      Sign In
    </button>
  </form>

  <p class="text-center mt-3 mb-0">
    Don't have an account?
    <router-link :to="{ name: 'Register' }">Sign Up</router-link>
  </p>

  <spinner v-if="isSubmitting" style="border-radius: .75em" />
</template>

<script lang="ts">
import {
  getFormErrors,
  MSG_INVALID_CREDENTIALS,
  MSG_LOGIN_USERNAME_REQUIRED,
  MSG_PASSWORD_REQUIRED,
} from '@/utils/msg';
import { defineComponent } from 'vue';
import { useField, useForm } from 'vee-validate';
import { string } from 'yup';
import { LoginCredentials } from '@/types/auth';
import { getStore } from '@/store';
import { ActionTypes } from '@/store/actions';
import VInput from '@/components/forms/VInput.vue';
import Spinner from '@/components/spinners/OverlayComponentSpinner.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { VInput, Spinner },
  setup() {
    const store = getStore();
    const router = useRouter();

    const { errors, handleSubmit, setErrors, isSubmitting } = useForm<LoginCredentials>({
      validationSchema: {
        username: string().required(MSG_LOGIN_USERNAME_REQUIRED),
        password: string().required(MSG_PASSWORD_REQUIRED),
      },
    });

    const { value: username } = useField('username');
    const { value: password } = useField('password');

    const onSubmit = handleSubmit((formData) => {
      setErrors({});
      return store
        .dispatch(ActionTypes.LOGIN, formData)
        .then(() => router.push({ name: 'Home' }))
        .catch((error) => {
          if (error.response?.status == 401) {
            setErrors({
              'username': MSG_INVALID_CREDENTIALS,
              'password': MSG_INVALID_CREDENTIALS,
            });
          } else {
            setErrors(getFormErrors(error).errors);
          }
        });
    });

    return {
      username,
      password,
      errors,
      onSubmit,
      isSubmitting,
    };
  },
});
</script>
