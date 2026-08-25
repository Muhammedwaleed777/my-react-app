import { useState, useEffect } from 'react';
import axios from 'axios';

function UsersAxios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  function addUser() {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => {
        console.log('User added:', response.data);
        alert('User added successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  if (loading) return <h3>Loading users...</h3>;
  if (error) return <h3 style={{ color: 'red' }}>Error: {error}</h3>;

  return (
    <div>
      <h1>👥 Users List (Axios)</h1>

      <button
        onClick={addUser}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ➕ Add User
      </button>

      <ul style={{ listStyle: 'none', padding: '0' }}>
        {users.map(user => (
          <li key={user.id} style={{
            padding: '10px',
            marginBottom: '8px',
            backgroundColor: '#f5f5f5',
            borderRadius: '5px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersAxios;