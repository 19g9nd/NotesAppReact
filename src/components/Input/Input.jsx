import { forwardRef } from "react";

const Input = forwardRef(function({type}, ref) {
    return (
        <input type={type} ref={ref}/>
    )
});

export default Input;