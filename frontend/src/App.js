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
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text })
    }).then(() => window.location.reload());
  };
  return (
    <div>
      <h1>Items</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <ul>{items.map((i, idx) => <li key={idx}>{i.text}</li>)}</ul>
    </div>
  );
}
export default App;
