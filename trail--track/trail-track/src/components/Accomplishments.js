import React, { useState, useEffect } from 'react';

function Accomplishments() {
  const [accomplishments, setAccomplishments] = useState([]);

  useEffect(() => {
    // Make an API request to fetch accomplishments
    fetch('/api/accomplishments')
      .then((response) => response.json())
      .then((data) => setAccomplishments(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Accomplishments</h2>
      <ul>
        {accomplishments.map((accomplishment) => (
          <li key={accomplishment._id}>{accomplishment.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Accomplishments;
