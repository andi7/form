# Form

Form component is used to set a easy form and get the values as simply as possible  

* [Form](#form)
* [Field](#field)
* [Types](#types)

## Usage

```usage
import React, { useRef } from "react"
import { string, object, InferType } from "yup"
import { Form, Field, FormApi } from "form"
import Input, { InputProps } from "Input"

const loginFormSchema = object({
  email: string().email("*Email is not valid").required("*Email is required !"),
  password: string().required("*Password is required !"),
})

interface LoginFormValues extends InferType<typeof loginFormSchema> {}

const initialFormValues: LoginFormValues = {
  email: "",
  password: ""
}

const formApi = useRef<FormApi<LoginFormValues>>()

const submit = async () => {
    const isValid = formApi.current.validate()
    if (!isValid) {
      return
    }
    const values = formApi.current.values()
    try {
      await asyncMethod(values)
    } catch (e) {
    }
  }


<Form<LoginFormValues>
   initialValues={initialFormValues}
   schema={loginFormSchema}
   formApi={f => (formApi.current = f)}>
   <Field<LoginFormValues, InputProps>
     name="email"
     type="email"
     placeholder="Email"
     render={Input}
   />

   <Field<LoginFormValues, InputProps>
     name="password"
     type="password"
     placeholder="Password"
     render={Input}
   />
 </Form>
```

## Form

```form
 <Form<LoginFormValues> formApi={(api) => setFormApi(api)} initialValues={initialFormValues} schema={loginFormSchema} > 
    ...
 </Form
```
`formApi` will keep the input values of the form that are set from the `setFormApi`. 
`initialValues` are going to set the initial values of the input inside the form. `schema` is required. It will set the rules for each input like(string, object, array, required and other validation). Package usually used in our projects for input validation is [yup](https://github.com/jquense/yup).
For TS support, define the form values type or include the initial values prop.

### Props


- `initialValues` (Object) - An object containing the initial values of the form.
- **`schema` required** (Yup object) - The yup schema config of the form.
- `formApi` (Function) - The method for getting the form api ref.
  ```
  formApi={f => (formApi.current = f)}
  ```
- `conditions` (Array) - List of conditions to `hide` or `disable` a field based on a value of an other field.
  ```
  conditions={[
     {
       name: "password", // field you want to use as compare value
       target: ["passwordRepeat"], // fields list you want to `hide` or `disable` based on the compared value
       compare: value => { // define the condition to `hide` or `disable` the target fields. 
         return value.length === 0 // return true to activate the action
       },
       action: "hide", // Action type, `hide` or `disable`.
     },
   ]}
  ```
- `onFormChange` (Function) - Method listener for handling field value update.
- **`children` required** (ReactNode) - Form children

### Methods 

| Name  | Params | Output                       |
| ----- | ------------ | ------------------------ |
| storeComponent  | `name` = ' ', `ref` | set field with the given **name** to the **ref** |
| updateComponent | `name` = ' '    | update input with the given **name**     |
| updateAllComponents |     | update all form     |
| isFieldVisible | `name` = ' '    | returns a boolean value which indicates if **name** field is visible  |
| isFieldDisabled | `name` = ' '    | returns a boolean value which indicates if **name** field is disabled  |
| values |   | get values of all the fields  |
| touched |   | get a list of all the fields that are touched  |
| isTouched | `name` = ' '   | returns a boolean value which indicates if **name** field is touched  |
| getField | `name` = ' '   |get value of the **name**    |
| getFields |  `names` = [], `path` = ' '   | get values of multiple fields     |
| setField | `name` = ' ', `value` = ' '    |   set value of the field   |
| setFields | `fields` = {}    | set values to multiple fields   |
| resetField | `name` = ' '   | set field to the initial value  |
| resetFields |    | set all fields to the initial values   |
| validate |    | validate form base on the **schema** (returns boolean value)  |
| validateField |  `name` = ' '  | validate given field based on the **schema** (returns boolean value)  |
| validateListOfFields |  `names` = []   | validate the given fields list and returns a boolean value which indicates if all fields of the list are valid     |
| getError |  name = ' '  | get the error for given field  |
| getErrors |   | get errors of all the fields  |
| setCustomFieldError |  `name` = ' ', `message` = ' '   |   set a custom error message to the field   |
| resetErrors |   | clear all errors   |
| clearFields |   | clear all fields values  |
| resetTouched |   | empty fields that are touched   |
| getTouchedValues |   | get values of the fields that are touched   |

## Field

```field
  <Field<LoginFormValues, InputHTMLAttributes<HTMLInputElement>>
       name="email"
       type="email" // part of native input props
       placeholder="Email" // part of native input props
       render={Input}
 />
```

`name` and `render` are required. `render` takes a component as value. *Field* component will take other attributes same as a usual component that you are rendering would take. For TS support, define the the form values type. Optionally, you can include the component props as well (See the example above).

### Props

- **`name` required** (String) - Field name
- `validate` (Boolean) - Flag to indicate that the current field should be validated during field value update. (True by default)
- `update` (Array) - A list of fields which should be updated when the current field changes.
- `disabled` (Boolean) - Flag to indicate that the current field should be disabled.
- `onChange` (Function) - Event handler method for field value update.
- `normalize` (Function) - Method for formatting the field value.
- **`render` required** (Function) - Method for rendering the field component.
   - Method props:
   - `name` (String) - Field name
   - `value` (Any) - Field value
   - `onChange` (Function) - Event handler method for field value update.
   - `touched` (Boolean) - Flag to indicate if the field has been edited
   - `disabled` (Boolean) - Flag to indicate if the field is disabled
```
<Field
  name={"email"}
  render={({ name, value: email, onChange, error, touched, disabled }) => (
    <>
      <input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
           onChange(e.currentTarget.value)
        }}
      />

      {!!error ? (
        <ErrorMessage>
          {typeof error === "string" ? error : error.message}
        </ErrorMessage>
      ) : (
        <div />
      )}
    </>
  )}
/>
```

## Types
- `FormApi<FormValues>` - Type to define the form api ref. Requires the form values type as param.
- `FormFieldError` - Type to define the form errors.
- `Condition<FormValues>` - Type to define the form conditions prop. Requires the form values type as param.
-  `FormComponentProps<FormValues>` - Type to define the `<Form>` component. Requires the form values type as param.
-  `ComponentProps<FormValues>` - Type to define the props of the `render` method, of the Field component. Requires the form values type as param.
-  `FieldProps<FormValues>` - Type to define the form props of `<Field>` component. Requires the form values type as param.
-  `FieldComponentProps<FormValues, ExtraComponentProps = void>` - Type to define all possible props of the `<Field>` component. It merges the `FieldProps<FormValues>` type with the `ExtraComponentProps` type. It also removes from the `ExtraComponentProps` type the keys that already exist on the `FieldProps` type.Requires the form values type as param.The `ExtraComponentProps` type is optional and includes the components props you may want to add. (See the the field example above).
