import React from "react";
import { UseFormWatch, UseWatchProps } from "react-hook-form";

import Form, { FormProps, FormRowRenderProps } from "./Form";
import FormRow from "./FormRow";
import {
    Email,
    Number,
    Phone,
    Text,
    Textarea,
    Checkbox,
    Radio,
    Select,
    MultipleSelect,
} from "./field";
import { FieldValueProps } from "./Form";

export declare type FormMetaItemType = "text" | "textarea" | "number" | "email" | "phone" | "checkbox" | "radio" | "select" | "multiple-select";
export declare type FormMetaItemProps<TFieldValues extends FieldValueProps = FieldValueProps> = {
    name: string,
    type: FormMetaItemType,
    value?: string | number | (string | number)[],
    label?: string,
    placeholder?: string,
    required?: boolean,
    disabled?: boolean,
    options?: any[];
    transformValue?: (value: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => string | number | (string | number)[];
    showWhen?: (watch: UseFormWatch<TFieldValues>) => boolean,
    disabledWhen?: (watch: UseFormWatch<TFieldValues>) => boolean,
};
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

    const renderField = (field: FormMetaItemProps, control: UseWatchProps["control"]) => {
        const {
            name,
            type,
            value,
            label,
            placeholder,
            required,
            disabled,
            options = [],
            transformValue,
            showWhen,
            disabledWhen,
        } = field;

        return (
            <FormRow
                key={name}
                name={name}
                label={label}
                required
                control={control}
                rules={{
                    required: required,
                    // TODO another ... by props
                }}
                defaultValue={value}
                render={({ field, fieldState }) => {
                    const { ref, ...rest } = field;
                    const { error } = fieldState;

                    switch (type) {

                        case "text":
                            return (
                                <Text
                                    error={!!error}
                                    placeholder={placeholder}
                                    required={required}
                                    disabled={disabled}
                                    {...rest}
                                />
                            );

                        case "textarea":
                            return (
                                <Textarea
                                    error={!!error}
                                    placeholder={placeholder}
                                    required={required}
                                    disabled={disabled}
                                    {...rest}
                                />
                            );

                        case "number":
                            return (
                                <Number
                                    error={!!error}
                                    placeholder={placeholder}
                                    required={required}
                                    disabled={disabled}
                                    {...rest}
                                />
                            );

                        case "email":
                            return (
                                <Email
                                    error={!!error}
                                    placeholder={placeholder}
                                    required={required}
                                    disabled={disabled}
                                    {...rest}
                                />
                            );

                        case "phone":
                            return (
                                <Phone
                                    error={!!error}
                                    placeholder={placeholder}
                                    required={required}
                                    disabled={disabled}
                                    {...rest}
                                />
                            );

                        case "checkbox":
                            return (
                                <></>
                            );

                        case "radio":
                            return (
                                <></>
                            );

                        case "select":
                            return (
                                <Select
                                    error={!!error}
                                    placeholder={placeholder}
                                    required={required}
                                    disabled={disabled}
                                    options={options}
                                    {...rest}
                                />
                            );

                        case "multiple-select":
                            return (
                                <MultipleSelect
                                    error={!!error}
                                    placeholder={placeholder}
                                    required={required}
                                    disabled={disabled}
                                    options={options}
                                    {...rest}
                                />
                            );

                    }
                }}
            />
        );
    };
    const renderRows = (control: UseWatchProps["control"]) => {
        if (metadata) {
            const keys = Object.keys(metadata);
            return keys.map((key, index) => {
                return metadata[key].map((field) => renderField(field, control));
            });
        }
    };

    return (
        <Form
            name={name}
            onSubmit={(fields) => { console.log("on submit", fields) }}
            onError={(fields) => { console.log("on error", fields) }}
            onChange={(e) => { console.log("on change", e) }}
            defaultValues={{
                text: "text value",
                textarea: "textarea value",
                number: 2,
                email: "email@email.email",
                phone: "+420111555999",
            }}
            render={render ? render : (props) => {
                const {
                    token,
                    form: {
                        control,
                        // formState,
                        // setValue,
                        // watch,
                    },
                } = props;

                // console.log("token", token);
                // console.log("form", form);

                return (
                    <>

                        {renderRows(control)}











                        {/* Static examples
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
                        */}

                    </>
                );
            }}
            {...rest}
        />
    );
};

export default FormBuilder;
