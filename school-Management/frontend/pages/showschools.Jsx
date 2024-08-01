import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/schools');
        setSchools(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Schools</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {schools.map(school => (
          <div key={school.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', width: 'calc(33% - 20px)' }}>
            <h2>{school.name}</h2>
            <p>{school.address}</p>
            <p>{school.city}</p>
            {school.image && (
              <img src={`/schoolImages/${school.image}`} alt={school.name} style={{ width: '100%', borderRadius: '8px' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
