import { RefObject } from 'react';
import { ObjectSchema } from 'yup';

export type FormFieldError =
  | string
  | {
      key: string;
      index: number;
      message: string;
    };

export interface FormApi<FormValues> {
  _internal: {
    storeComponent: (fieldName: keyof FormValues, ref: RefObject<HTMLInputElement>) => void;
    updateComponent: (fieldName: keyof FormValues) => void;
    schema: ObjectSchema<Record<keyof FormValues, FormFieldError>>;
    isFieldVisible: (fieldName: keyof FormValues) => boolean;
    isFieldDisabled: (fieldName: keyof FormValues) => boolean;
  };
  values: () => FormValues;
  touched: () => Array<keyof FormValues>;
  isTouched: (fieldName: keyof FormValues) => boolean;
  getField: (fieldName: keyof FormValues) => FormValues[keyof FormValues];
  getFields: (fieldNames: Array<keyof FormValues>, path: string) => Partial<FormValues>;
  setField: (fieldName: keyof FormValues, fieldValue: FormValues[keyof FormValues]) => void;
  setFields: (values: Partial<FormValues>) => void;
  resetField: (fieldName: keyof FormValues) => void;
  resetFields: () => void;
  validate: () => boolean;
  validateField: (fieldName: keyof FormValues) => boolean;
  validateListOfFields: (listOfFields: Array<keyof FormValues>) => boolean;
  getError: (fieldName: keyof FormValues) => FormFieldError;
  getErrors: () => Record<keyof FormValues, FormFieldError>;
  resetTouched: () => void;
  clearFields: () => void;
  getTouchedValues: () => Partial<FormValues>;
  setCustomFieldError: (fieldName: keyof FormValues, message: string) => void;
  resetErrors: () => void;
}

export type Condition<FormValues> = {
  name: keyof FormValues;
  target: keyof FormValues | Array<keyof FormValues>;
  action: 'hide' | 'disable';
  compare: (fieldValue: FormValues[keyof FormValues], values?: FormValues) => boolean;
};

export interface FormComponentProps<FormValues> {
  initialValues?: FormValues;
  schema: ObjectSchema<Record<keyof FormValues, FormValues[keyof FormValues]>>;
  formApi?: (formApi: FormApi<FormValues>) => void;
  conditions?: Array<Condition<FormValues>>;
  onFormChange?: (fieldName: keyof FormValues, fieldValue: FormValues[keyof FormValues]) => void;
  children: ReactNode;
}

export interface ComponentProps<FormValues> {
  error?: FormFieldError;
  name: keyof FormValues;
  value: FormValues[keyof FormValues];
  touched?: boolean;
  onChange: (value: FormValues[keyof FormValues]) => void;
  disabled?: boolean;
}

export interface FieldProps<FormValues> {
  name: keyof FormValues;
  validate?: boolean;
  update?: Array<keyof FormValues>;
  disabled?: boolean;
  onChange?: (fieldValue: FormValues[keyof FormValues], formApi: FormApi<FormValues>) => void;
  normalize?: (fieldValue: FormValues[keyof FormValues]) => FormValues[keyof FormValues];
  render: (props: ComponentProps<FormValues>) => ReactNode | React.JSX.Element;
}

export type FieldComponentProps<FormValues, ExtraComponentProps = void> = FieldProps<FormValues> &
  //remove from the second type the keys that already exist on the first type
  Omit<ExtraComponentProps, keyof FieldProps<FormValues>>;
