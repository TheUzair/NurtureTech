import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    axios.get('/api/predictions')
      .then(response => setPredictions(response.data))
      .catch(error => console.error('Error fetching predictions:', error));
  }, []);

  return (
    <div>
      <h2>Predicted Enrollments</h2>
      <ul>
        {predictions.map((prediction, index) => (
          <li key={index}>{prediction}</li>
        ))}
      </ul>
    </div>
  );
};

export default Predictions;
