import React from "react";

import Form, { FormProps } from "./Form";
import FormField from "./FormField";
import { FormMetaItemProps, FormRowRenderProps } from "./types";

export interface FormBuilderProps extends Partial<FormProps> {
    name: string;
    metadata?: {
        [k: string]: FormMetaItemProps[];
    };
    render?: (form: FormRowRenderProps) => React.ReactNode;
}

const FormBuilder = (props: FormBuilderProps) => {
    const {
        name,
        metadata,
        render,
        ...rest
    } = props;

    const renderRows = ({
        token,
        form,
    }: FormRowRenderProps) => {
        if (metadata) {
            const keys = Object.keys(metadata);

            return keys.map((key, index) => (
                <div
                    key={`${token}_${key}`}
                    id={`${token}_${key}`}
                    className="form-row"
                    style={{
                        width: "100%",
                        marginBottom: "1rem",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    {metadata[key].map((field) => (
                        <FormField
                            key={field.name}
                            form={form}
                            field={field}
                        />
                    ))}
                </div>
            ));
        }
    };

    return (
        <Form
            name={name}
            render={render ? render : (props) => (
                <>
                    {renderRows(props)}
                </>
            )}
            {...rest}
        />
    );
};

export default FormBuilder;
