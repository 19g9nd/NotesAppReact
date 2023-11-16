function Select({onChange, children}) {
    return (
        <select onChange={onChange}>
            <option disabled selected>Choose color</option>
            {children}
        </select>
    )
}

export default Select;