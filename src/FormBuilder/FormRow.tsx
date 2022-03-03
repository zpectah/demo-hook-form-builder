import React from "react";
import {
    Controller,
    ControllerProps,
} from "react-hook-form";

export interface FormRowProps extends ControllerProps {
    label?: string;
    required?: boolean;
    id?: string,
    helps?: string[];
    errors?: string[];
}

const FormRow = (props: FormRowProps) => {
    const {
        rules,
        render,
        label,
        required,
        id,
        helps = [],
        errors = [],
        ...rest
    } = props;

    return (
        <div
            className="form-row-field"
        >
            <Controller
                rules={{
                    required: required,
                    ...rules
                }}
                render={({ field, fieldState, formState  }) => {
                    const { error, isTouched } = fieldState;
                    const errors = [];

                    if (isTouched && error) errors.push(error.type);

                    return (
                        <div
                            className="form-row-field-wrapper"
                        >
                            {label && (
                                <div
                                    className="form-row-field-wrapper-column column--label"
                                >
                                    <label
                                        htmlFor={id}
                                        aria-required={required}
                                    >
                                        {label}{required && " *"}
                                    </label>
                                </div>
                            )}
                            <div
                                className="form-row-field-wrapper-column column--input"
                            >
                                <div>
                                    {render({ field, fieldState, formState })}
                                </div>
                                <div>
                                    {helps.length > 0 && (
                                        <div>
                                            {helps.map((msg) => (
                                                <small
                                                    key={msg}
                                                >
                                                    {msg}
                                                </small>
                                            ))}
                                        </div>
                                    )}
                                    {errors.length > 0 && (
                                        <div>
                                            {errors.map((err) => (
                                                <small
                                                    key={err}
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    error msg...{err}
                                                </small>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                }}
                {...rest}
            />
        </div>
    );
};

export default FormRow;
