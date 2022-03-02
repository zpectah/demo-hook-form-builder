import React from "react";

export interface EmailProps extends React.HTMLProps<HTMLInputElement>, React.HTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Email = (props: EmailProps) => {
    const {
        error,
        ...rest
    } = props;

    return (
        <input
            type="email"
            style={{
                borderColor: error ? "red" : "initial",
            }}
            {...rest}
        />
    );
};

export default Email;
