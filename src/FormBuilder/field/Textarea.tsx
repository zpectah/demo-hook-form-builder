import React from "react";

export interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement>, React.HTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
}

const Textarea = (props: TextareaProps) => {
    const {
        error,
        ...rest
    } = props;

    return (
        <textarea
            style={{
                borderColor: error ? "red" : "initial",
            }}
            {...rest}
        />
    );
};

export default Textarea;
