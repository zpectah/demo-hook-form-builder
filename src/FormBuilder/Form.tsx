import React from "react";
import {
    useForm,
    UseFormProps,
    SubmitHandler,
    SubmitErrorHandler,
} from "react-hook-form";

import { FieldValueProps, FormRowRenderProps } from "./types";

export interface FormProps<TFieldValues extends FieldValueProps = FieldValueProps> extends UseFormProps {
    name: string;
    render: (form: FormRowRenderProps) => React.ReactNode;
    formProps?: React.HTMLProps<HTMLFormElement>;
    onSubmit?: SubmitHandler<TFieldValues>;
    onError?: SubmitErrorHandler<TFieldValues>;
    onChange?: React.FormEventHandler<HTMLFormElement> | undefined;
    onBlur?: React.FormEventHandler<HTMLFormElement> | undefined;
    onFocus?: React.FormEventHandler<HTMLFormElement> | undefined;
    debugPrint?: boolean;
}

const Form = (props: FormProps) => {
    const {
        name,
        render,
        formProps,
        onSubmit,
        onChange,
        onError,
        onBlur,
        onFocus,
        mode = "all",
        debugPrint,
        ...rest
    } = props;

    const form: FormRowRenderProps = {
        token: name,
        form: useForm({
            mode,
            ...rest,
        }),
    };

    return (
        <form
            noValidate
            autoComplete="off"
            name={name}
            onSubmit={onSubmit && form.form.handleSubmit(onSubmit, onError)}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            {...formProps}
        >
            <>
                {render(form)}
            </>
            {debugPrint && (
                <pre>
                    <code>
                        {JSON.stringify(form.form.watch(), null, 2)}
                    </code>
                </pre>
            )}
        </form>
    );
};

export default Form;
