import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../../actions/counter';


const Counter = () => {
    // component state
    const [counter, setCounter] = useState(0);

    // redux states & constants
    const dispatch = useDispatch();
    // way to read the redux data  / store => reducer => state
    
    const increaseCounter = () => {
        setCounter(prev => prev + 1);
        dispatch(increment(counter + 1));
    };

    const dec = () => {
        setCounter(prev => prev - 1);
        dispatch(decrement(counter - 1));
    };

    return (
        <>
            <Typography variant="h5" color="initial">My Counter</Typography>
            <Button onClick={increaseCounter} variant="contained">Inc</Button>
            <Button onClick={dec} variant="contained">Dec</Button>
        </>
    );
};

export default Counter;
