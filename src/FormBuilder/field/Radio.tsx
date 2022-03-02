import React from "react";

export interface RadioProps extends React.HTMLProps<HTMLInputElement>, React.HTMLAttributes<HTMLInputElement> {
    error?: boolean;
    label?: string;
}

const Radio = (props: RadioProps) => {
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
                type="radio"
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

export default Radio;
