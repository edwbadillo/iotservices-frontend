<template>
  <h2>Sign Up</h2>
  <p class="fw-light">
    Please fill the following form to register your account.
  </p>

  <form @submit="onSubmit">
    <v-input
      placeholder="Username"
      v-model="username"
      :error="errors.username"
    />
    <v-input
      placeholder="First name"
      v-model="firstName"
      :error="errors.firstName"
    />
    <v-input
      placeholder="Last name"
      v-model="lastName"
      :error="errors.lastName"
    />
    <v-input
      type="email"
      placeholder="Email"
      v-model="email"
      :error="errors.email"
    />
    <v-input
      type="password"
      placeholder="Password"
      v-model="password"
      :error="errors.password"
    />
    <v-input
      type="password"
      placeholder="Confirm password"
      v-model="confirmPassword"
      :error="errors.confirmPassword || confirmPasswordError"
    />

    <button class="mt-4 btn btn-primary w-100" type="submit">
      Sign Up
    </button>
  </form>

  <p class="text-center mt-3 mb-0">
    Do you have an account?
    <router-link :to="{ name: 'Login' }">Sign In</router-link>
  </p>

  <spinner v-if="isSubmitting" style="border-radius: .75em" />
</template>

<script lang="ts">
import Spinner from '@/components/spinners/OverlayComponentSpinner.vue';
import VInput from '@/components/forms/VInput.vue';
import { defineComponent, ref, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import { UserRegistration } from '@/types/auth';
import { getStore } from '@/store';
import { useRouter } from 'vue-router';
import { string } from 'yup';
import { getFormErrors, MSG_PASSWORD_CONFIRMATION } from '@/utils/msg';
import { ActionTypes } from '@/store/actions';

export default defineComponent({
  components: { VInput, Spinner },
  setup() {
    const store = getStore();
    const router = useRouter();

    const schema = {
      username: string().required(),
      firstName: string().required(),
      lastName: string().required(),
      email: string()
        .required()
        .email(),
      password: string()
        .required()
        .min(8),
      confirmPassword: string().required() 
    };

    const { errors, handleSubmit, setErrors, isSubmitting } = useForm<UserRegistration>({
      validationSchema: schema,
    });

    const { value: username } = useField('username');
    const { value: firstName } = useField('firstName');
    const { value: lastName } = useField('lastName');
    const { value: email } = useField('email');
    const { value: password } = useField('password');
    const { value: confirmPassword } = useField('confirmPassword');

    const confirmPasswordError = ref('');
    watch([password, confirmPassword], (values) => {
      const currentPassword = values[0];
      const currentConfirmPassword = values[1];
      if (currentConfirmPassword && currentConfirmPassword !== currentPassword) {
        confirmPasswordError.value = MSG_PASSWORD_CONFIRMATION;
      } else {
        confirmPasswordError.value = '';
      }
    });

    const onSubmit = handleSubmit((formData) => {
      setErrors({});
      confirmPasswordError.value = '';
      return store
        .dispatch(ActionTypes.REGISTER_USER, formData)
        .then(() => router.push({ name: 'Home' }))
        .catch((error) => setErrors(getFormErrors(error).errors));
    });

    return {
      errors,
      onSubmit,
      isSubmitting,
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      confirmPasswordError,
    };
  },
});
</script>
