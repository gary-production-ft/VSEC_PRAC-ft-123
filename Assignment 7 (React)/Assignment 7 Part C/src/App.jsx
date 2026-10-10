import { useState } from 'react';
import './App.css';

function App() {
  // Form input states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  // State to hold submitted data
  const [submittedData, setSubmittedData] = useState(null);

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !age || !bloodGroup) {
      alert('Please fill in all the details.');
      return;
    }

    setSubmittedData({
      name: name,
      age: age,
      bloodGroup: bloodGroup,
    });
  };

  // Reset handler
  const handleReset = () => {
    setName('');
    setAge('');
    setBloodGroup('');
    setSubmittedData(null);
  };

  return (
    <div className="container">
      <h1>Student Registration Form</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form-box">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Blood Group:</label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">-- Select Blood Group --</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {/* Submitted Details Output */}
      {submittedData && (
        <div className="output-box">
          <h2>Submitted Details</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          <p><strong>Blood Group:</strong> {submittedData.bloodGroup}</p>
        </div>
      )}
    </div>
  );
}

export default App;
