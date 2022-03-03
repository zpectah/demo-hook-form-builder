import React from "react";
import { UseFormReturn, UseFormWatch } from "react-hook-form";

export type DefaultValueProps = string | number | (string | number)[] | null | true | false;

export type FieldValueProps = Record<string, any>;

export type FormMetaItemType =
    | "hidden"
    | "text"
    | "textarea"
    | "number"
    | "email"
    | "phone"
    | "datetime"
    | "checkbox"
    | "radio"
    | "select"
    | "multiple-select"
    | "divider";

export type FormMetaItemProps<TFieldValues extends FieldValueProps = FieldValueProps> = {
    name: string,
    type: FormMetaItemType,
    defaultValue?: DefaultValueProps,
    label?: string,
    placeholder?: string,
    required?: boolean,
    pattern?: RegExp,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number,
    disabled?: boolean,
    options?: any[];
    helps?: string[];
    transformValue?: (value: string, e?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => DefaultValueProps;
    showWhen?: (form: UseFormReturn) => boolean,
    disabledWhen?: (form: UseFormReturn) => boolean,
};

export interface FormRowRenderProps {
    token: string;
    form: UseFormReturn;
}
