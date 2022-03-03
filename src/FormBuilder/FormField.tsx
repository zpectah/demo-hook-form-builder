import React from "react";

import {
    Hidden,
    Email,
    Number,
    Phone,
    Text,
    Textarea,
    Datetime,
    Checkbox,
    Radio,
    Select,
    MultipleSelect,
} from "./field";
import FormRow from "./FormRow";
import { FormMetaItemProps, FormRowRenderProps } from "./types";

export interface FormFieldProps {
    field: FormMetaItemProps;
    form: FormRowRenderProps["form"];
}

const FormField = (props: FormFieldProps) => {
    const {
        field: {
            name,
            type,
            defaultValue,
            label,
            placeholder,
            required,
            pattern,
            minLength,
            maxLength,
            min,
            max,
            disabled,
            options = [],
            helps = [],
            transformValue,
            showWhen,
            disabledWhen,
        },
        form: {
            // watch,
            // getValues,
            // setValue,
            // register,
            control,
        },
    } = props;

    return (
        <FormRow
            name={name}
            label={label}
            required
            control={control}
            rules={{
                required,
                pattern,
                minLength,
                maxLength,
                min,
                max,
            }}
            defaultValue={defaultValue}
            helps={helps}
            render={({ field, fieldState }) => {
                const {
                    ref,
                    onChange,
                    ...fieldRest
                } = field;
                const { error } = fieldState;

                const changeControl = (e: any) => {
                    if (transformValue) {
                        onChange(transformValue(e.target.value, e));
                    } else {
                        onChange(e);
                    }
                };
                const disabledControl = () => {
                    if (disabledWhen) {
                        return disabledWhen(props.form);
                    } else {
                        return disabled;
                    }
                };
                const showControl = (Node: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => {
                    let node = Node;
                    if (showWhen) {
                        if (showWhen(props.form)) {
                            node = Node;
                        } else {
                            node = <></>;
                        }
                    }

                    return node;
                };

                switch (type) {

                    case "divider":
                        return (
                            <hr
                                style={{
                                    width: "100%",
                                }}
                            />
                        );

                    case "hidden":
                        return (
                            <Hidden
                                required={required}
                                disabled={disabled}
                                onChange={changeControl}
                                {...fieldRest}
                            />
                        );

                    case "text":
                        return showControl(
                            <Text
                                error={!!error}
                                placeholder={placeholder}
                                required={required}
                                disabled={disabledControl()}
                                onChange={changeControl}
                                {...fieldRest}
                            />
                        );

                    case "textarea":
                        return showControl(
                            <Textarea
                                error={!!error}
                                placeholder={placeholder}
                                required={required}
                                disabled={disabled}
                                onChange={changeControl}
                                {...fieldRest}
                            />
                        );

                    case "number":
                        return showControl(
                            <Number
                                error={!!error}
                                placeholder={placeholder}
                                required={required}
                                disabled={disabled}
                                onChange={changeControl}
                                {...fieldRest}
                            />
                        );

                    case "email":
                        return showControl(
                            <Email
                                error={!!error}
                                placeholder={placeholder}
                                required={required}
                                disabled={disabled}
                                onChange={changeControl}
                                {...fieldRest}
                            />
                        );

                    case "phone":
                        return showControl(
                            <Phone
                                error={!!error}
                                placeholder={placeholder}
                                required={required}
                                disabled={disabled}
                                onChange={changeControl}
                                {...fieldRest}
                            />
                        );

                    case "datetime":
                        return showControl(
                            <Datetime
                                error={!!error}
                                placeholder={placeholder}
                                required={required}
                                disabled={disabled}
                                onChange={changeControl}
                                {...fieldRest}
                            />
                        );

                    case "checkbox":
                        return showControl(
                            <>
                                {options.length > 1 ? (
                                    <>
                                        {options.map((item) => {
                                            const {
                                                name,
                                                value = [],
                                                label,
                                                disabled,
                                                ...rest
                                            } = item;
                                            const isChecked = field?.value?.includes(value);

                                            return (
                                                <Checkbox
                                                    key={name}
                                                    checked={isChecked}
                                                    disabled={disabled}
                                                    label={label}
                                                    onChange={field.onChange}
                                                    {...rest}
                                                />
                                            );
                                        })}
                                    </>
                                ) : (
                                    <Checkbox
                                        checked={field.value}
                                        disabled={disabled}
                                        label={label}
                                        {...fieldRest}
                                    />
                                )}
                            </>
                        );

                    case "radio":
                        return showControl(
                            <>
                                {options.length > 1 ? (
                                    <>
                                        {options.map((item) => {
                                            const {
                                                name,
                                                value,
                                                label,
                                                disabled,
                                                ...rest
                                            } = item;
                                            const isChecked = value === field.value;

                                            return (
                                                <Radio
                                                    key={name}
                                                    checked={isChecked}
                                                    disabled={disabled}
                                                    label={label}
                                                    onChange={field.onChange}
                                                    {...rest}
                                                />
                                            );
                                        })}
                                    </>
                                ) : (
                                    <Radio
                                        checked={field.value}
                                        disabled={disabled}
                                        {...fieldRest}
                                    />
                                )}
                            </>
                        );

                    case "select":
                        return showControl(
                            <Select
                                error={!!error}
                                placeholder={placeholder}
                                required={required}
                                disabled={disabled}
                                options={options}
                                onChange={changeControl}
                                {...fieldRest}
                            />
                        );

                    case "multiple-select":
                        return showControl(
                            <MultipleSelect
                                error={!!error}
                                placeholder={placeholder}
                                required={required}
                                disabled={disabled}
                                options={options}
                                onChange={changeControl}
                                {...fieldRest}
                            />
                        );

                }
            }}
        />
    );
};

export default FormField;
