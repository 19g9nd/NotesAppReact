import './P.css';

function P({children}) {
    return (
        <p style={{
            color: 'red',
            backgroundColor: 'pink'
        }}>{children}</p>
    )
}

export default P;