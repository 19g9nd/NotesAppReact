import { useContext } from "react";
import { CountContext } from "../../../App";

function DisplayWrapper() {
    const { count } = useContext(CountContext);

    return (
        <div>{count}</div>
    )
}

export default DisplayWrapper;