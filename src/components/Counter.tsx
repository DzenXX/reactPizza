import {useDispatch, useSelector} from "react-redux";
import {decrement, increment, incrementByAmount, selectCount} from "../redux/slices/countSlice";
import React from "react";

let Counter: React.FC = () => {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()
    const [incrementValue, setIncrementValue] = React.useState('')

    return <>
        <div>
            <div>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
                <span>{count}</span>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <div><input value={incrementValue} onChange={(e) => setIncrementValue(e.currentTarget.value)} type="text"/>
                    <button onClick={() => {
                        dispatch(incrementByAmount(Number(incrementValue)))
                        console.log(Number(incrementValue))
                        console.log(incrementValue)
                    }}>Increment value</button>
                </div>
            </div>
        </div>
    </>
}

export default Counter