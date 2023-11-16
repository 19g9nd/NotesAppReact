import { createElement } from "react";

function JSComponent({name}) {
    return createElement(
        'div',
        {
            id: 'com_2',
            className: `com ${name}`
        },
        'JSComponent ',
        name
    );
}

export default JSComponent;