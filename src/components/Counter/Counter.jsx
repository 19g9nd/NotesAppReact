import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    const text = 'Value is: ';

    return (
        <>
            <div>
                <button onClick={() => {
                    setCount(count - 1);
                }}>-</button>

                {text} {count}
                
                <button onClick={() => {
                    setCount(count + 1);
                }}>+</button>
            </div>
        </>
    )
}

export default Counter;