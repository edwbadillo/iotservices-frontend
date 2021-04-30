import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'Invalid field value',
    required: 'Required field'
  },
  string: {
    email: 'Must be a valid email',
    min: 'Must be at least ${min} characters'
  }
});