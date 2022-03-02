import React from "react";

export interface PhoneProps extends React.HTMLProps<HTMLInputElement>, React.HTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Phone = (props: PhoneProps) => {
    const {
        error,
        ...rest
    } = props;

    return (
        <input
            type="tel"
            style={{
                borderColor: error ? "red" : "initial",
            }}
            {...rest}
        />
    );
};

export default Phone;
