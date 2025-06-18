import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/api/items').then(res => res.json()).then(setItems);
  }, []);

  const handleAdd = () => {
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    }).then(() => window.location.reload());
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
      padding: '30px',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>📝 Item Tracker</h1>
      <input
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '250px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginRight: '10px'
        }}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter item..."
      />
      <button
        onClick={handleAdd}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Add
      </button>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '30px' }}>
        {items.map((i, idx) => (
          <li
            key={idx}
            style={{
              backgroundColor: '#fff',
              margin: '10px auto',
              padding: '10px 15px',
              maxWidth: '400px',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              textAlign: 'left'
            }}
          >
            {i.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
