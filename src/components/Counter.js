 import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      border: '2px solid #FF6B6B',
      borderRadius: '10px',
      padding: '30px',
      margin: '20px',
      textAlign: 'center',
      maxWidth: '300px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <h2>Counter: {count}</h2>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          margin: '5px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ➕ Increase
      </button>
      <button 
        onClick={() => setCount(count - 1)}
        style={{
          padding: '10px 20px',
          margin: '5px',
          backgroundColor: '#FF6B6B',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ➖ Decrease
      </button>
      <button 
        onClick={() => setCount(0)}
        style={{
          padding: '10px 20px',
          margin: '5px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        🔄 Reset
      </button>
    </div>
  );
}

export default Counter;
