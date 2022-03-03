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
                            <div
                                className="form-row-field-wrapper-column column--label"
                            >
                                {label && (
                                    <div>
                                        <label
                                            htmlFor={id}
                                        >
                                            {label}{required && " *"}
                                        </label>
                                    </div>
                                )}
                                <div>
                                    {render({ field, fieldState, formState })}
                                </div>
                            </div>
                            <div
                                className="form-row-field-wrapper-column column--input"
                            >
                                {helps.length > 0 && (
                                    <div>
                                        {helps.map((msg) => (
                                            <div
                                                key={msg}
                                            >
                                                {msg}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {errors.length > 0 && (
                                    <div>
                                        {errors.map((err) => (
                                            <div
                                                key={err}
                                            >
                                                error key "{err}"
                                            </div>
                                        ))}
                                    </div>
                                )}
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
