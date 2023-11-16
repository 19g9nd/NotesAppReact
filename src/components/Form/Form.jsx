import { useState } from 'react';
import './Form.css';
import FormInput from './FormInput/FormInput';

function Form({onSubmit, inputs}) {
    const [invalidInputsCount, setInvalidInputsCount] = useState(inputs.length);

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const data = new FormData(form);

        onSubmit(data);
    }

    return (
        <form
            style={{
                backgroundColor: invalidInputsCount === 0 ? 'green' : 'red',
            }}
            onSubmit={handleSubmit}
        >
            {inputs.map(
                (input, i) => <FormInput
                    key={i}
                    labelText = {input.labelText}
                    inputType = {input.inputType}
                    inputName = {input.inputName}
                    regexp = {input.regexp}
                    setInvalidInputsCount = {setInvalidInputsCount}
                />
            )}

            <button type="submit">Submit</button>
        </form>
    )
}

export default Form;