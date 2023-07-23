# Form

Form component is used to set a easy form and get the values as simply as possible  

* [Form](#form)
* [Field](#field)

## Usage

```usage
import { Form, Field } from 'form';

const [ formApi, setFormApi ] = useState();
```

## Form

```form
 <Form formApi={(api) => setFormApi(api)} initialValues={initial} schema={schema} > 
    ...
 </Form
```
`formApi` will keep the input values of the form that are set from the `setFormApi`. 
`initialValues` are going to set the initial values of the input inside the form. `schema` is required. It will set the rules for each input like(string, object, array, required and other validation). Package usually used in our projects for input validation is [yup](https://github.com/jquense/yup).

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
  <Field
       name="foo"
       render={Input}
 />
```

`name` and `render` are required. `render` takes a component as value. *Field* component will take other attributes same as a usual component that you are rendering would take
