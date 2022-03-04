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
    renderActions?: (form: FormRowRenderProps) => React.ReactNode;
    formProps?: React.HTMLProps<HTMLFormElement>;
    onSubmit?: SubmitHandler<TFieldValues>;
    onSubmitError?: SubmitErrorHandler<TFieldValues>;
    onError?: (event: React.SyntheticEvent<HTMLFormElement, Event>) => void;
    onChange?: (form: FormRowRenderProps, event: React.FormEvent<HTMLFormElement>) => void;
    onBlur?: (form: FormRowRenderProps, event: React.FormEvent<HTMLFormElement>) => void;
    onFocus?: (form: FormRowRenderProps, event: React.FormEvent<HTMLFormElement>) => void;
    debugPrint?: boolean;
    mandatoryMessage?: boolean;
}

const Form = (props: FormProps) => {
    const {
        name,
        render,
        renderActions,
        formProps,
        onSubmit,
        onSubmitError,
        onChange,
        onError,
        onBlur,
        onFocus,
        mode = "all",
        debugPrint,
        mandatoryMessage,
        ...rest
    } = props;

    const form: FormRowRenderProps = {
        token: name,
        form: useForm({
            mode,
            ...rest,
        }),
    };

    const submitErrorHandler = (errors: any, event?: React.BaseSyntheticEvent) => {
        if (onSubmitError) onSubmitError(errors, event);
    };
    const onErrorHandler = (event: React.SyntheticEvent<HTMLFormElement, Event>) => {
        if (onError) onError(event);
    };
    const onChangeHandler = (event: React.FormEvent<HTMLFormElement>) => {
        if (onChange) onChange(form, event);
    };
    const onBlurHandler = (event: React.FormEvent<HTMLFormElement>) => {
        if (onBlur) onBlur(form, event);
    };
    const onFocusHandler = (event: React.FormEvent<HTMLFormElement>) => {
        if (onFocus) onFocus(form, event);
    };

    return (
        <form
            noValidate
            autoComplete="off"
            name={name}
            onSubmit={onSubmit && form.form.handleSubmit(onSubmit, submitErrorHandler)}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            onError={onErrorHandler}
            {...formProps}
        >
            <>
                {render(form)}
            </>
            {mandatoryMessage && (
                <div>
                    <small>
                        * This field is mandatory
                    </small>
                </div>
            )}
            {renderActions && (
                <>
                    {renderActions(form)}
                </>
            )}
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
