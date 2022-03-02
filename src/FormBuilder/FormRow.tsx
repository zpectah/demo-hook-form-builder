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
        <>
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
                        <>
                            <div>
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
                            <div>
                                {helps.length > 0 && (
                                    <div>
                                        helpers ... {JSON.stringify(helps)}
                                    </div>
                                )}
                                {errors.length > 0 && (
                                    <div>
                                        errors ... {JSON.stringify(errors)}
                                    </div>
                                )}
                            </div>
                        </>
                    );
                }}
                {...rest}
            />
        </>
    );
};

export default FormRow;
