import React from "react";
import {
    useForm,
    UseFormReturn,
    UseFormProps,
    SubmitHandler,
    SubmitErrorHandler,
} from "react-hook-form";

export declare type FieldValueProps = Record<string, any>;
export interface FormRowRenderProps {
    token: string;
    form: UseFormReturn;
}
export interface FormProps<TFieldValues extends FieldValueProps = FieldValueProps> extends UseFormProps {
    name: string;
    render: (form: FormRowRenderProps) => React.ReactNode;
    formProps?: React.HTMLProps<HTMLFormElement>;
    onSubmit?: SubmitHandler<TFieldValues>;
    onError?: SubmitErrorHandler<TFieldValues>;
    onChange?: React.FormEventHandler<HTMLFormElement> | undefined;
}

const Form = (props: FormProps) => {
    const {
        name,
        render,
        formProps,
        onSubmit,
        onChange,
        onError,
        mode = "all",
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
            {...formProps}
        >
            <>
                {render(form)}
            </>
        </form>
    );
};

export default Form;
