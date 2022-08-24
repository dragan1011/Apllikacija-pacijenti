import { useState, useEffect } from "react";
import React from "react";
import './Pacijenti.css'

function Component() {
  const [items, setItems] = useState([]);



  const fetchData = async () => {
    const response = await fetch("http://81.93.66.18:8234/api.cfc?method=pacijent_trazi&id=2");
    const data = await response.json();
    console.log(data);
    const transformedData = data.lista_pacijenata.DATA.map(item => {
      return {
        id: item[0],
        prezime: item[1],
        ime: item[2],
        jmbg: item[3],
        id_grad: item[4]
      }
    });
    setItems(transformedData);
  }

  useEffect(() => {
    fetchData();
 
  }, []);
  
  return (
          <table className="tabela">
<tr className="heading">
  <th>JMBG</th>
  <th>Ime</th>
  <th>Prezime</th>
  <th>Grad</th>
</tr>
        {items.map(item => (
          <tr key={item.id} className="lista">
           <th>
           {item.jmbg}
            </th>
           <th>
           {item.ime}
           </th>
           <th>
           {item.prezime}
           </th>
           <th>
            {item.id_grad}
           </th>
          </tr>
        ))}
      </table>
        );
}

export default Component;