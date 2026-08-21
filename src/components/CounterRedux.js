import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, reset } from '../redux/counterSlice';
import { useState } from 'react';

function CounterRedux() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(5);

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '30px',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center' }}>🔢 Redux Counter</h1>
      
      <div style={{ textAlign: 'center', fontSize: '48px', margin: '20px 0' }}>
        {count}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => dispatch(increment())}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ➕ Increment
        </button>
        
        <button
          onClick={() => dispatch(decrement())}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ➖ Decrement
        </button>
        
        <button
          onClick={() => dispatch(reset())}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🔄 Reset
        </button>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{
            padding: '10px',
            border: '2px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
            width: '100px',
            textAlign: 'center'
          }}
        />
        <button
          onClick={() => dispatch(incrementByAmount(amount))}
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Add {amount}
        </button>
      </div>
    </div>
  );
}

export default CounterRedux;