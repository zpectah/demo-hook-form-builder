import React from "react";

export interface MultipleSelectProps extends React.HTMLProps<HTMLSelectElement>, React.HTMLAttributes<HTMLSelectElement> {
    error?: boolean;
    options?: {
        key: string | number,
        value: string | number,
        label: string,
        disabled?: boolean,
        selected?: boolean,
    }[];
}

const MultipleSelect = (props: MultipleSelectProps) => {
    const {
        error,
        options = [],
        ...rest
    } = props;

    return (
        <select
            multiple={true}
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

export default MultipleSelect;
