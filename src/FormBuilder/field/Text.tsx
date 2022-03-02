import React from "react";

export interface TextProps extends React.HTMLProps<HTMLInputElement>, React.HTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Text = (props: TextProps) => {
    const {
        error,
        ...rest
    } = props;

    return (
        <input
            type="text"
            style={{
                borderColor: error ? "red" : "initial",
            }}
            {...rest}
        />
    );
};

export default Text;
