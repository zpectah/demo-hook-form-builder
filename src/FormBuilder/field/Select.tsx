import React from "react";

export interface SelectProps extends React.HTMLProps<HTMLSelectElement>, React.HTMLAttributes<HTMLSelectElement> {
    error?: boolean;
    options?: {
        key: string | number,
        value: string | number,
        label: string,
        disabled?: boolean,
        selected?: boolean,
    }[];
}

const Select = (props: SelectProps) => {
    const {
        error,
        options = [],
        ...rest
    } = props;

    return (
        <select
            {...rest}
        >
            {options.map((option) => (
                <option
                    key={option.key}
                    value={option.value}
                    disabled={option.disabled}
                    selected={option.selected}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
