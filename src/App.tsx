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
                "r1": [
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
                "r2": [
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
                "r3": [
                    {
                        name: "number",
                        type: "number",
                        defaultValue: 2,
                        label: "Text label",
                        placeholder: "Type number value",
                        required: true,
                        min: 0,
                        max: 12,
                        step: 2,
                        helps: [
                            "First row of helper text ..."
                        ],
                    },
                ],
                "r4": [
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
                        showWhen: (form => form.watch("select") !== "value1" || form.watch("number") >= 4),
                    },
                ],
                "r5": [
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
                "r6": [
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
                "r6b": [
                    {
                        name: "divider1",
                        type: "divider",
                    }
                ],
                "r7": [
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
                "r8": [
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
            onBlur={(form, e) => {
                console.log("on blur", e);
            }}
            renderActions={(props) => {
                const {
                    form: {
                        formState: {
                            isValid,
                            // isDirty,
                        },
                    },
                } = props;

                return (
                    <>
                        <button
                            type="submit"
                            disabled={!isValid}
                        >
                            Submit
                        </button>
                    </>
                );
            }}
            mandatoryMessage
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
                select: "value2",
            }}
            onBlur={(form, e) => {
                console.log("on blur", e);
            }}
            renderActions={(props) => {
                const {
                    form: {
                        formState: {
                            isValid,
                            // isDirty,
                        },
                    },
                } = props;

                return (
                    <>
                        <button
                            type="submit"
                            disabled={!isValid}
                        >
                            Submit
                        </button>
                    </>
                );
            }}
            render={(props) => {
              const {
                  token,
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
                          id={`${token}_text`}
                          required
                          control={control}
                          render={({ field, fieldState }) => {
                              const { ref, ...rest } = field;
                              const { error } = fieldState;

                              return (
                                  <>
                                      <Text
                                          error={!!error}
                                          id={`${token}_text`}
                                          {...rest}
                                      />
                                  </>
                              );
                          }}
                      />
                      <FormRow
                          name="textarea"
                          label="Field textarea label"
                          id={`${token}_textarea`}
                          required
                          control={control}
                          render={({ field, fieldState }) => {
                              const { ref, ...rest } = field;
                              const { error } = fieldState;

                              return (
                                  <>
                                      <Textarea
                                          error={!!error}
                                          id={`${token}_textarea`}
                                          {...rest}
                                      />
                                  </>
                              );
                          }}
                      />
                      <FormRow
                          name="number"
                          label="Field number label"
                          id={`${token}_number`}
                          required
                          control={control}
                          rules={{
                              min: 0,
                              max: 10,
                          }}
                          render={({ field, fieldState }) => {
                              const { ref, ...rest } = field;
                              const { error } = fieldState;

                              return (
                                  <>
                                      <Number
                                          error={!!error}
                                          id={`${token}_number`}
                                          min={0}
                                          max={10}
                                          step={2}
                                          {...rest}
                                      />
                                  </>
                              );
                          }}
                      />
                      <FormRow
                          name="phone"
                          label="Field phone label"
                          id={`${token}_phone`}
                          required
                          control={control}
                          render={({ field, fieldState }) => {
                              const { ref, ...rest } = field;
                              const { error } = fieldState;

                              return (
                                  <>
                                      <Phone
                                          error={!!error}
                                          id={`${token}_phone`}
                                          {...rest}
                                      />
                                  </>
                              );
                          }}
                      />
                      <FormRow
                          name="email"
                          label="Field email label"
                          id={`${token}_email`}
                          required
                          control={control}
                          render={({ field, fieldState }) => {
                              const { ref, ...rest } = field;
                              const { error } = fieldState;

                              return (
                                  <>
                                      <Email
                                          error={!!error}
                                          id={`${token}_email`}
                                          {...rest}
                                      />
                                  </>
                              );
                          }}
                      />
                      <FormRow
                          name="select"
                          label="Field select label"
                          id={`${token}_select`}
                          required
                          control={control}
                          render={({ field, fieldState }) => {
                              const { ref, ...rest } = field;
                              const { error } = fieldState;

                              return (
                                  <>
                                      <Select
                                          error={!!error}
                                          id={`${token}_select`}
                                          options={defaultOptionsList}
                                          {...rest}
                                      />
                                  </>
                              );
                          }}
                      />

                  </>
              );
            }}
            mandatoryMessage
            debugPrint
        />

      </div>
    </>
  );
}

export default App;
