 function UserCard({ name, age, city }) {
  return (
    <div style={{
      border: '2px solid #4CAF50',
      borderRadius: '10px',
      padding: '20px',
      margin: '10px',
      width: '250px',
      display: 'inline-block',
      textAlign: 'center'
    }}>
      <h3>👤 {name}</h3>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>City:</strong> {city}</p>
    </div>
  );
}

export default UserCard;
