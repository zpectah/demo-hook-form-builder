import React from "react";

export interface DatetimeProps extends React.HTMLProps<HTMLInputElement>, React.HTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Datetime = (props: DatetimeProps) => {
    const {
        error,
        ...rest
    } = props;

    return (
        <input
            type="datetime-local"
            style={{
                borderColor: error ? "red" : "initial",
            }}
            {...rest}
        />
    );
};

export default Datetime;
