# Demo React hook form builder

## Motivation

Idea is to create form 'wrapper' as element with current props and render field from meta or create static fields.
Wrapper is using React Hook Form and includes all his props and distributing to each field.

## Dependencies

- React: https://reactjs.org/
- ReactHookForm: https://react-hook-form.com/

## Development

- ``yarn install`` will install dependencies
- ``yarn start`` will starts development server on http://localhost:3000/

## Structure

FormBuilder => Form => FormRow => FormField => $field

## Setup & Usage
It could be used two ways. One way is using metadata object with defined fields or other ways is to
simple build static fields using FormRow with your field. Both variants may use in once, but it is not tested yet.

### 1. with metadata
``
<FormField
    name="FormExample"
    defaultValues={{
        ... form default (initial) values
    }}
    metadata={{
        'row_1': [
            ... row 1 fields ...
        ],
        'row_2': [
            ... row 2 fields ...     
        ],
    }}
/>
``

### 2. with custom FormRow
``
<FormField
    name="FormExample"
    defaultValues={{
        ... form default (initial) values ... 
    }}
    render={(props) => {
        ... render static form rows ...
    }}
/>
``

## Props and Options

### FormBuilder

Key | Type | Default | Description
--- | --- | --- | ---
name | string |  | form name
metadata? | { [k: string]: FormMetaItemProps[]; } |  | object with field definition
render? | (form: FormRowRenderProps) => React.ReactNode |  | fields render with form control object
...rest | Partial\<FormProps> | | rest of inherited props

### Form

Key | Type | Default | Description
--- | --- | --- | ---
name | string |  | form name
render | (form: FormRowRenderProps) => React.ReactNode |  | fields render with form control object
renderActions? | (form: FormRowRenderProps) => React.ReactNode |  | custom row for form action buttons
formProps? | React.HTMLProps\<HTMLFormElement> | | form element props
onSubmit? | SubmitHandler\<TFieldValues> | | submit controlled handler
onSubmitError? | SubmitErrorHandler\<TFieldValues> | | on submit error from controller
onError? | (event: React.SyntheticEvent\<HTMLFormElement, Event>) => void | | error form event
onChange? | (form: FormRowRenderProps, event: React.FormEvent\<HTMLFormElement>) => void | | on change form event
onBlur? | (form: FormRowRenderProps, event: React.FormEvent\<HTMLFormElement>) => void | | on blur form event
onFocus? | (form: FormRowRenderProps, event: React.FormEvent\<HTMLFormElement>) => void | | on focus form event
debugPrint? | boolean | false | prints form model for debugging
mandatoryMessage? | boolean | false | displays message for information about mandatory fields
... rest of form props should be found here: https://react-hook-form.com/api/useform

### FormRow

Key | Type | Default | Description
--- | --- | --- | ---
label? | string | | row label
required? | boolean | false | required field
id? | string | | row & field id
helps? | string[] | | help text list
errors? | string[] | | error text list
... rest of row props should be found here: https://react-hook-form.com/api/usecontroller/controller 

### FormField

Key | Type | | Default | Description
--- | --- | --- | --- | ---
field | FormMetaItemProps | ... | | fow field props
| | | id?: string | | field id
| | | type: * | | field name
| | | defaultValue: 2* | | field default value
| | | label?:string | | row label
| | | placeholder?: string | | field placeholder
| | | required?: boolean | | field required
| | | pattern?: RegExp | | field value validation pattern
| | | minLength?: number | | field value validation min length
| | | maxLength?: number | | field value validation max length
| | | min?: number | | field value validation min number
| | | max?: number | | field value validation max number
| | | step?: number | | field value number step
| | | disabled?: boolean | | field disabled
| | | readonly?: boolean | | field read only
| | | options?: any[] | | options list for select, multiple-select or checkbox and radio
| | | helps?: string[] | | row field help text list
| | | transformValue?: 3* | | value transformation before return
| | | showWhen?: 4* | | condition for display field
| | | disabledWhen?: 4* | | condition for disable field
form | FormRowRenderProps["form"] | ... | | form render props
 | | | token: string | | form id prefix
 | | | form: FormRowRenderProps | | form controller object

#### FormField props
- type *: 
  - hidden
  - text
  - textarea
  - number
  - email
  - phone
  - datetime
  - checkbox
  - radio
  - select
  - multiple-select
  - divider
- default value type 2*:
  - string | number | (string | number)[] | null | true | false
- transformValue 3*:
  - (value: string, e?: React.ChangeEvent\<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => DefaultValueProps
- condition props 4*:
  - (form: UseFormReturn) => boolean
