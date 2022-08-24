import { useState, useEffect } from "react";
import React from "react";

function Pacijenti() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://81.93.66.18:8234/api.cfc?method=gradovi_lista")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.gradovi);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  
  const gradovi = items.DATA;

  if (error) {
    return <div>Greška: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Učitavanje...</div>;
  } else {
    return (
<table className="tabela">
        {gradovi.map(item => (
          <tr className="lista">
           <th>
           {item[1]}
            </th>
          </tr>
        ))}
      </table>
      
      );
  }
}

export default Pacijenti;