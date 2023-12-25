import React from 'react'
import '../App.css'
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, reset } from '../redux/counterSlice';

const Home = () => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '20px'  }}>
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>{count}</h2>
        <button 
          className='button-increment'
          aria-label="Increment value" 
          onClick={() => dispatch(increment())}>
            Button Increment
        </button>
        
        <button  
          className='button-decrement'
          aria-label="Decrement value" 
          onClick={() => dispatch(decrement())}>
            Button Decrement
        </button>
        
        <button 
          className='button-reset'
          aria-label='Reset value'
          onClick={() => dispatch(reset())}>
            Button Reset
        </button>
      </div>
    </div>
  );
};

export default Home