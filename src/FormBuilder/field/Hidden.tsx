import React from "react";

export interface HiddenProps extends React.HTMLProps<HTMLInputElement>, React.HTMLAttributes<HTMLInputElement> {}

const Hidden = (props: HiddenProps) => {
    const {
        ...rest
    } = props;

    return (
        <input
            type="hidden"
            {...rest}
        />
    );
};

export default Hidden;
