export const customValidate = <T extends { [key: string]: string }>(
  props: T,
): Partial<T> => {
  const errors: any = {};

  for (const field in props) {
    if (!field) {
      errors.field = 'Required';
    }
  }

  return errors;
};
