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
            id,
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
            control,
            // register,
        },
    } = props;

    const fieldId = id ? id : name;

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
            id={fieldId}
            render={({ field, fieldState }) => {
                const {
                    ref,
                    value,
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

                const checkboxToggle = (e: any) => {
                    const val: string | number = e.target.value;
                    const arr = [ ...value ];
                    const index = arr.indexOf(val);
                    if (index > -1) {
                        arr.splice(index, 1);
                    } else {
                        arr.push(val);
                    }
                    onChange(arr);
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
                                value={value}
                                id={fieldId}
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
                                value={value}
                                id={fieldId}
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
                                value={value}
                                id={fieldId}
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
                                value={value}
                                id={fieldId}
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
                                value={value}
                                id={fieldId}
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
                                value={value}
                                id={fieldId}
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
                                value={value}
                                id={fieldId}
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
                                                label,
                                                disabled,
                                                ...rest
                                            } = item;

                                            const isChecked = value.includes(item.value);

                                            return (
                                                <Checkbox
                                                    key={label}
                                                    checked={isChecked}
                                                    disabled={disabled}
                                                    label={label}
                                                    onChange={checkboxToggle}
                                                    {...rest}
                                                />
                                            );
                                        })}
                                    </>
                                ) : (
                                    <Checkbox
                                        checked={!!value}
                                        disabled={disabled}
                                        label={label}
                                        onChange={onChange}
                                        value={value}
                                        id={fieldId}
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
                                                label,
                                                disabled,
                                                ...rest
                                            } = item;

                                            const isChecked = value === item.value;

                                            return (
                                                <Radio
                                                    key={label}
                                                    name={name}
                                                    checked={isChecked}
                                                    disabled={disabled}
                                                    label={label}
                                                    onChange={onChange}
                                                    {...rest}
                                                />
                                            );
                                        })}
                                    </>
                                ) : (
                                    <Radio
                                        checked={value}
                                        disabled={disabled}
                                        onChange={onChange}
                                        value={value}
                                        id={fieldId}
                                        label={label}
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
                                value={value}
                                id={fieldId}
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
                                value={value}
                                id={fieldId}
                                {...fieldRest}
                            />
                        );

                }
            }}
        />
    );
};

export default FormField;
