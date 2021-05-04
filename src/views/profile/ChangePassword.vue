<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">Change Password | {{ username }}</h4>
    </div>
    <div class="card-body">

      <div v-if="passwordSaved" class="alert alert-success alert-dismissible fade show" role="alert">
        The password has been successfully updated.
        <button @click="passwordSaved = false" type="button" class="btn-close" aria-label="Close"></button>
      </div>

      <form @submit="onSubmit">
        <div class="row">
          <div class="col-12 col-md-4">
            <v-input
              label="Current password"
              type="password"
              v-model="currentPassword"
              :disabled="isSubmitting"
              :error="errors.currentPassword"
            />
          </div>
          <div class="col-12 col-md-4">
            <v-input
              label="New password"
              type="password"
              v-model="newPassword"
              :disabled="isSubmitting"
              :error="errors.newPassword"
            />
          </div>
          <div class="col-12 col-md-4">
            <v-input
              label="Confirm password"
              type="password"
              v-model="confirmPassword"
              :disabled="isSubmitting"
              :error="errors.confirmPassword || confirmPasswordError"
            />
          </div>
        </div>

        <hr />

        <button type="submit" class="btn btn-success" :disabled="isSubmitting">
          {{ isSubmitting ? 'Changing password' : 'Change password'}}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { getStore } from '@/store';
import { defineComponent, ref, watch } from 'vue';
import { string } from 'yup';
import VInput from '@/components/forms/VInput.vue';
import { ChangePasswordForm } from '@/types/auth';
import { useField, useForm } from 'vee-validate';
import { getFormErrors, MSG_PASSWORD_CONFIRMATION } from '@/utils/msg';
import { changePassword } from '@/services/auth';

export default defineComponent({
  components: {
    VInput,
  },
  setup() {
    const store = getStore();
    const username = store.state.user.username;

    const passwordSaved = ref(false);

    const schema = {
      currentPassword: string().required(),
      newPassword: string()
        .required()
        .min(8),
      confirmPassword: string().required(),
    };

    const { errors, handleSubmit, setErrors, isSubmitting } = useForm<ChangePasswordForm>({
      validationSchema: schema,
    });

    const { value: currentPassword } = useField('currentPassword');
    const { value: newPassword } = useField('newPassword');
    const { value: confirmPassword } = useField('confirmPassword');

    const confirmPasswordError = ref('');
    watch([newPassword, confirmPassword], (values) => {
      const currentNewPassword = values[0];
      const currentConfirmPassword = values[1];
      if (currentConfirmPassword && currentConfirmPassword !== currentNewPassword) {
        confirmPasswordError.value = MSG_PASSWORD_CONFIRMATION;
      } else {
        confirmPasswordError.value = '';
      }
    });

    const onSubmit = handleSubmit((formData, { resetForm }) => {
      setErrors({});
      passwordSaved.value = false;
      return changePassword(formData)
        .then(() => {
          passwordSaved.value = true;
          resetForm();
        })
        .catch((error) => setErrors(getFormErrors(error).errors));
    });

    return {
      passwordSaved,
      username,
      errors,
      isSubmitting,
      currentPassword,
      newPassword,
      confirmPassword,
      onSubmit,
      confirmPasswordError,
    };
  },
});
</script>
