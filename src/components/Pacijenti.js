import { useState, useEffect } from "react";
import React from "react";
import './Pacijenti.css'
import Edit from "./Edit";
import axios from "axios";

function Pacijenti(props) {
  const [openModal, setOpenModal] = useState(false);
  const [pacijenti, setPacijenti] =  useState([]);
  const [ispis, setIspis] =  useState(false);



  useEffect(() => {

    const transformedData = props.pacijenti.map(item => {
      let pomocnaVarijabla = '';
      props.gradovi.map(grad => {
        grad.id_grad === item[4] ? pomocnaVarijabla = grad.naziv : pomocnaVarijabla = 'Grad';
        console.log(grad.id_grad === item[4] ? pomocnaVarijabla = grad.naziv : pomocnaVarijabla = 'Grad')
      })
      return {
        id: item[0],
        prezime: item[1],
        ime: item[2],
        jmbg: item[3],
        grad: pomocnaVarijabla
      }
    });
    setPacijenti(transformedData);
    setIspis(true);
  }, []);

  function deletePatient(id, e) {
    e.preventDefault();
    console.log(id)
    axios.post(`http://81.93.66.18:8234/api2.cfc?method=pacijent_obrisi&id=${id}`)
    .then(res=> {
        console.log('Pacijent je obrisan!',res.data);
       
    })
}

  return (
    <>
    {ispis && <table className="tabela">

<tr className="heading">
  <th>JMBG</th>
  <th>IME</th>
  <th>PREZIME</th>
  <th>GRAD</th>
</tr>
        {pacijenti.map(item => (
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
            {item.grad}
           </th>
           <th >
           <input type="submit" className="edit" value="Izmjena" onClick={()=>{setOpenModal(true)}}   />
          { openModal && <Edit closeModal={setOpenModal} editPatient={item} />}
                     </th>
           <th>
           <input type="submit" onClick={(e) => deletePatient(item.id, e)} className="delete" value="Izbriši" />
           </th>
          </tr>
        ))}
      </table>}
    </>
          
        );

}

export default Pacijenti;