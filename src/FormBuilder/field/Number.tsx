import React from "react";

export interface NumberProps extends React.HTMLProps<HTMLInputElement>, React.HTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Number = (props: NumberProps) => {
    const {
        error,
        ...rest
    } = props;

    return (
        <input
            type="number"
            style={{
                borderColor: error ? "red" : "initial",
            }}
            {...rest}
        />
    );
};

export default Number;
