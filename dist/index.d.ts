type ReactNode = import('react').ReactNode;

declare module 'form' {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  export const Form = <FormValues>(
    props: import('../src/types/formApi').FormComponentProps<FormValues>
  ): ReactNode => {
    return props.children;
  };

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  export const Field = <FormValues, ExtraComponentProps = void>(
    props: import('../src/types/formApi').FieldComponentProps<FormValues, ExtraComponentProps>
  ): ReactNode => {
    return props.children;
  };

  export type FormApi<FormValues> = import('../src/types/formApi').FormApi<FormValues>;

  export type FormFieldError = import('../src/types/formApi').FormFieldError;

  export type Condition<FormValues> = import('../src/types/formApi').Condition<FormValues>;

  export type FormComponentProps<FormValues> =
    import('../src/types/formApi').FormComponentProps<FormValues>;

  export type ComponentProps<FormValues> =
    import('../src/types/formApi').ComponentProps<FormValues>;

  export type FieldProps<FormValues> = import('../src/types/formApi').FieldProps<FormValues>;

  export type FieldComponentProps<FormValues> =
    import('../src/types/formApi').FieldComponentProps<FormValues>;
}
