import Cookies from 'universal-cookie';

import { login as loginRequest } from '../../../api/login';

export const UseLoginSubmitForm = (navigate) => {
  async function submitForm<T extends { [key: string]: string }>(
    values: T,
    setSubmitting,
  ) {
    setSubmitting(true);

    const cookies = new Cookies();

    const result = await loginRequest(values.email, values.password);

    cookies.set('accessToken', result.accessToken);

    setSubmitting(false);

    navigate('/admin');
  }

  function customValidate<T extends { [key: string]: string }>(
    props: T,
  ): Partial<T> {
    const errors: any = {};

    for (const field in props) {
      if (!field) {
        errors.field = 'Required';
      }
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(errors.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  }

  return { submitForm, customValidate };
};
