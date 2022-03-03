import React from 'react';

import { FormBuilder } from "./FormBuilder";
import { FormRow } from "./FormBuilder";
import {
    Email,
    Number,
    Phone,
    Text,
    Textarea,
    Select,
} from "./FormBuilder/field";

const defaultOptionsList = [
    {
        key: "a",
        value: "value1",
        label: "Value 1",
    },
    {
        key: "b",
        value: "value2",
        label: "Value 2",
    },
    {
        key: "c",
        value: "value3",
        label: "Value 3",
        disabled: true,
    },
    {
        key: "d",
        value: "value4",
        label: "Value 4",
    },
];

function App() {
  return (
    <>
      <div>

        <FormBuilder
            name="FormBuilderDefault"
            defaultValues={{
                "select": "value1",
            }}
            metadata={{
                "row1": [
                    {
                        name: "text1",
                        type: "text",
                        defaultValue: "value text 1",
                        label: "Text label 1",
                        placeholder: "Type text value",
                        required: true,
                        disabled: false,
                    },
                    {
                        name: "text2",
                        type: "text",
                        defaultValue: "field disabled when another field have some value ...",
                        label: "Text label 2",
                        placeholder: "Type text value",
                        required: true,
                        disabled: false,
                        disabledWhen: (form => form.watch("select") === "value1"),
                    },
                ],
                "row2": [
                    {
                        name: "textarea",
                        type: "textarea",
                        defaultValue: "value textarea",
                        label: "Textarea label",
                        placeholder: "Type textarea value",
                        required: true,
                        disabled: false,
                    },
                ],
                "row3": [
                    {
                        name: "number",
                        type: "number",
                        defaultValue: 99,
                        label: "Text label",
                        placeholder: "Type number value",
                        required: true,
                        disabled: true,
                        helps: [
                            "First row of helper text ..."
                        ],
                    },
                ],
                "row4": [
                    {
                        name: "datetime",
                        type: "datetime",
                        defaultValue: "",
                        label: "Datetime label",
                        placeholder: "Type datetime value",
                        required: true,
                        disabled: false,
                        helps: [
                            "First row of helper text ..."
                        ],
                        showWhen: (form => form.watch("select") !== "value1"),
                    },
                ],
                "row5": [
                    {
                        name: "select",
                        type: "select",
                        // defaultValue: "value1",
                        label: "Select label",
                        placeholder: "Select value",
                        required: true,
                        disabled: false,
                        options: defaultOptionsList,
                    },
                ],
                "row6": [
                    {
                        name: "multiple-select",
                        type: "multiple-select",
                        defaultValue: [ "value1" ],
                        label: "Select label",
                        placeholder: "Select value",
                        required: true,
                        disabled: false,
                        options: defaultOptionsList,
                    },
                ],
                "row6b": [
                    {
                        name: "divider1",
                        type: "divider",
                    }
                ],
                "row7": [
                    {
                        name: "checkbox",
                        type: "checkbox",
                        defaultValue: [ "value1" ],
                        label: "Checkbox label",
                        required: false,
                        disabled: false,
                        options: defaultOptionsList,
                    },
                    {
                        name: "radio",
                        type: "radio",
                        defaultValue: "value1",
                        label: "Radio label",
                        required: false,
                        disabled: false,
                        options: defaultOptionsList,
                    },
                ],
                "row8": [
                    {
                        name: "textTransformed",
                        type: "text",
                        defaultValue: "value text 1",
                        label: "Text transformed label 1",
                        placeholder: "Type text value",
                        transformValue: (value => value?.split(" ").join("")),
                    }
                ],
            }}
            onSubmit={(fields) => {
                console.log("on submit", fields);
            }}
            onError={(fields) => {
                console.log("on error", fields);
            }}
            onChange={(e) => {
                console.log("on change", e);
            }}
            onBlur={(e) => {
                console.log("on blur", e);
            }}
            onFocus={(e) => {
                console.log("on focus", e);
            }}
        />

          <br />
          <br />
          <hr />
          <br />
          <br />

        <FormBuilder
            name="FormBuilderStatic"
            defaultValues={{
              text: "text value",
              textarea: "textarea value",
              number: 2,
              email: "email@email.email",
              phone: "+420111555999",
            }}
            onSubmit={(fields) => {
              console.log("on submit", fields);
            }}
            onError={(fields) => {
              console.log("on error", fields);
            }}
            onChange={(e) => {
              console.log("on change", e);
            }}
            onBlur={(e) => {
                console.log("on blur", e);
            }}
            onFocus={(e) => {
                console.log("on focus", e);
            }}
            render={(props) => {
              const {
                  // token,
                  form: {
                      control,
                      // formState,
                      // setValue,
                      // watch,
                  },
              } = props;

              return (
                  <>

                      <FormRow
                          name="text"
                          label="Field text label"
                          required
                          control={control}
                          render={({ field, fieldState }) => {
                              const { ref, ...rest } = field;
                              const { error } = fieldState;

                              return (
                                  <>
                                      <Text
                                          error={!!error}
                                          {...rest}
                                      />
                                  </>
                              );
                          }}
                      />
                      <FormRow
                          name="textarea"
                          label="Field textarea label"
                          required
                          control={control}
                          render={({ field, fieldState }) => {
                              const { ref, ...rest } = field;
                              const { error } = fieldState;

                              return (
                                  <>
                                      <Textarea
                                          error={!!error}
                                          {...rest}
                                      />
                                  </>
                              );
                          }}
                      />
                      <FormRow
                          name="number"
                          label="Field number label"
                          required
                          control={control}
                          render={({ field, fieldState }) => {
                              const { ref, ...rest } = field;
                              const { error } = fieldState;

                              return (
                                  <>
                                      <Number
                                          error={!!error}
                                          {...rest}
                                      />
                                  </>
                              );
                          }}
                      />
                      <FormRow
                          name="phone"
                          label="Field phone label"
                          required
                          control={control}
                          render={({ field, fieldState }) => {
                              const { ref, ...rest } = field;
                              const { error } = fieldState;

                              return (
                                  <>
                                      <Phone
                                          error={!!error}
                                          {...rest}
                                      />
                                  </>
                              );
                          }}
                      />
                      <FormRow
                          name="email"
                          label="Field email label"
                          required
                          control={control}
                          render={({ field, fieldState }) => {
                              const { ref, ...rest } = field;
                              const { error } = fieldState;

                              return (
                                  <>
                                      <Email
                                          error={!!error}
                                          {...rest}
                                      />
                                  </>
                              );
                          }}
                      />

                  </>
              );
            }}
        />

      </div>
    </>
  );
}

export default App;
