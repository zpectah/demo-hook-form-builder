import React from 'react';

import { FormBuilder } from "./FormBuilder";

function App() {
  return (
    <>
      <div>
        <FormBuilder
            name="DemoFormBuilder"
            // defaultValues={{}}
            metadata={{
                "row1": [
                    {
                        name: "text1",
                        type: "text",
                        value: "value text 1",
                        label: "Text label 1",
                        placeholder: "Type text value",
                        required: true,
                        disabled: false,
                    },
                    {
                        name: "text2",
                        type: "text",
                        value: "value text 2",
                        label: "Text label 2",
                        placeholder: "Type text value",
                        required: true,
                        disabled: false,
                    },
                ],
                "row2": [
                    {
                        name: "textarea",
                        type: "textarea",
                        value: "value textarea",
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
                        value: 99,
                        label: "Text label",
                        placeholder: "Type number value",
                        required: true,
                        disabled: false,
                    },
                ],
                "row4": [
                    {
                        name: "select",
                        type: "select",
                        value: "value1",
                        label: "Select label",
                        placeholder: "Select value",
                        required: true,
                        disabled: false,
                        options: [
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
                        ],
                    },
                ],
                "row5": [
                    {
                        name: "multiple-select",
                        type: "multiple-select",
                        value: [ "value1" ],
                        label: "Select label",
                        placeholder: "Select value",
                        required: true,
                        disabled: false,
                        options: [
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
                        ],
                    },
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
        />
      </div>
    </>
  );
}

export default App;
