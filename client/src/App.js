// File: src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [data, setData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('http://localhost:3000/bmi', { name, weight, height });
    setData(response.data);
    setName('');
    setWeight('');
    setHeight('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Weight in kg" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <input type="number" placeholder="Height in meters" value={height} onChange={(e) => setHeight(e.target.value)} />
        <button type="submit">Calculate BMI</button>
      </form>
      {data && (
        <div>
          <p>Name: {data.name}</p>
          <p>Weight: {data.weight}</p>
          <p>Height: {data.height}</p>
          <p>BMI: {data.bmi.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
