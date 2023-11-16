import { useContext } from 'react';
import Button from '../../Button/Button';
import { CountContext } from '../../../App';

function IncrementButtonWrapper() {
    const { setCount } = useContext(CountContext);

    return (
        <Button onClick={() => setCount(count => count + 1)}>+</Button>
    )
}

export default IncrementButtonWrapper;