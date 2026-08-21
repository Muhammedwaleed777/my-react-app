import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  function addTodo() {
    if (input.trim() === '') {
      alert('Please enter a task!');
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setInput('');
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function toggleComplete(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>✅ Todo List</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task..."
          style={{
            flex: 1,
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '12px 25px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          ➕ Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: '0' }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            marginBottom: '8px',
            backgroundColor: todo.completed ? '#d4edda' : 'white',
            borderRadius: '5px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textDecoration: todo.completed ? 'line-through' : 'none',
            opacity: todo.completed ? 0.7 : 1
          }}>
            <span
              onClick={() => toggleComplete(todo.id)}
              style={{
                cursor: 'pointer',
                fontSize: '16px',
                flex: 1,
                textAlign: 'left'
              }}
            >
              {todo.completed ? '✅ ' : '⬜ '} {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                padding: '5px 15px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>

      <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
        Total Tasks: {todos.length}
      </p>
    </div>
  );
}

export default TodoList;