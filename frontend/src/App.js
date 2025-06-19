import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !hobbies.trim()) return alert("Please fill in all fields.");

    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, hobbies })
    });

    setName('');
    setHobbies('');
    fetchUsers();
  };

  return (
    <div>
      <h1>👤 User Info Collector</h1>
      <input
        type="text"
        placeholder="Enter your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        rows="4"
        placeholder="Enter your hobbies (e.g. reading, dancing)..."
        value={hobbies}
        onChange={(e) => setHobbies(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {users.map((user, idx) => (
        <div key={idx} className="card">
          <strong>Name:</strong> {user.name} <br />
          <strong>Hobbies:</strong> {user.hobbies}
        </div>
      ))}
    </div>
  );
}

export default App;
