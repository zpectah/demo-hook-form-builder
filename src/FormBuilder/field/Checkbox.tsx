import React from "react";

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement>, React.HTMLAttributes<HTMLInputElement> {
    error?: boolean;
    label?: string;
}

const Checkbox = (props: CheckboxProps) => {
    const {
        error,
        label,
        ...rest
    } = props;

    return (
        <label
            style={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            <input
                type="checkbox"
                style={{
                    borderColor: error ? "red" : "initial",
                }}
                {...rest}
            />
            {label && (
                <span>
                    {label}
                </span>
            )}
        </label>
    );
};

export default Checkbox;
