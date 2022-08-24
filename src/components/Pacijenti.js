import { useState, useEffect } from "react";
import React from "react";
import Gradovi from './Gradovi'
import './Pacijenti.css'

function Pacijenti() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://81.93.66.18:8234/api.cfc?method=pacijent_trazi&id=2")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.lista_pacijenata);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  
  const pacijenti = items.DATA;

  if (error) {
    return <div className="error">Greška: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loading">Učitavanje...</div>;
  } else {
    return (
<table className="tabela">
<tr className="heading">
  <th>JMBG</th>
  <th>Ime</th>
  <th>Prezime</th>
  <th>Grad</th>
</tr>
        {pacijenti.map(item => (
          <tr className="lista">
           <th>
           {item[3]}
            </th>
           <th>
           {item[2]}
           </th>
           <th>
           {item[1]}
           </th>
           <th>
            <Gradovi />
           </th>
          </tr>
        ))}
      </table>
      
      );
  }
}

export default Pacijenti;