import './RegisterForm.css';

function RegisterForm({onSubmit}) {
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <form className='register-form' onSubmit={handleSubmit}>
            <label>
                <span>Email:</span>
                <input type="mail" />
            </label>
            <label>
                <span>Password:</span>
                <input type="password" />
            </label>
            <label>
                <span>Confirm password:</span>
                <input type="password" />
            </label>

            <button type="submit">Submit</button>
        </form>
    )
}

export default RegisterForm;