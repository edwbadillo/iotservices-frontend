<template>
  <div class="mb-3">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-control"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :value="modelValue"
      :class="{ 'is-invalid': error, 'is-valid': success && !error }"
    />
    <div v-if="error" class="invalid-feedback">
      {{ error }}
    </div>
    <div v-if="success" class="valid-feedback">
      {{ success }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    id: {
      type: String,
      default: () => {
        return Math.random()
          .toString(36)
          .substr(2, 5);
      },
    },
    label: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    error: {
      type: String,
      default: undefined,
    },
    success: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  setup() {
    return {};
  },
});
</script>
