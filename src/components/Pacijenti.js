import { useState, useEffect } from "react";
import React from "react";
import './Pacijenti.css'
import Edit from "./Edit";

function Pacijenti() {
  const [items, setItems] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const fetchPacijenti = async () => {
    const response = await fetch("http://81.93.66.18:8234/api2.cfc?method=pacijent_trazi&id=2");
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


/*   const fetchGradovi = async () => {
    const response = await fetch("http://81.93.66.18:8234/api.cfc?method=gradovi_lista");
    const data = await response.json();
  
    console.log(data);
    const transformedData = data.gradovi.DATA.map(item => {
      return {
        id_grad: item[0],
        naziv: item[1]
      }
    });
    setItems(transformedData);
  }
 */


  useEffect(() => {
    fetchPacijenti();
    //fetchGradovi();
 
  }, []);
  
  return (
          <table className="tabela">

<tr className="heading">
  <th>JMBG</th>
  <th>IME</th>
  <th>PREZIME</th>
  <th>GRAD</th>
</tr>
        {items.map(item => (
          <tr key={item.id} className="lista">
           <th>
           {item.jmbg}
            </th>
           <th>
           {item.ime.charAt(0).toUpperCase() + item.ime.slice(1).toLowerCase() }
           </th>
           <th>
           {item.prezime.charAt(0).toUpperCase() + item.prezime.slice(1).toLowerCase()}
           </th>
           <th>
            {item.id_grad}
           </th>
           <th >
           <input type="submit" className="edit" value="Izmjena" onClick={()=>{setOpenModal(true)}}   />
          { openModal && <Edit closeModal={setOpenModal} editPatient={item} />}
                     </th>
           <th>
           <input type="submit" className="delete" value="Izbriši" />
           </th>
          </tr>
        ))}
      </table>
        );

}

export default Pacijenti;