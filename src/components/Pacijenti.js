import React, { useState } from "react";
import './Pacijenti.css'
import axios from "axios";
import Edit from './Edit.js'

function Pacijenti(props) {
  const [formData,setFormData] = useState([]);
  const [openModal,setOpenModal] = useState(false);

  

  function deletePatient(id, e) {
    e.preventDefault();
    
    if (window.confirm('Da li ste sigurni da želite obrisati pacijenta?')) {
     
    e.target.parentElement.parentElement.remove();
    console.log(id)
    axios.post(`http://172.18.1.73:8080/api2.cfc?method=pacijent_obrisi&id=${id}`)
    .then(res=> {
        console.log(res.data);
       alert('Pacijent je obrisan!')
       console.log(props.pacijenti)
    })
}
}

function editPatient(id,ime, prezime,jmbg, grad) {
  const data = {
    id: id,
    ime: ime,
    prezime: prezime,
    jmbg: jmbg,
    grad: grad
  }
  setFormData(data);
  setOpenModal(true);
}


  return (
    <table className="tabela">

<tr className="heading">
  <th>JMBG</th>
  <th>IME</th>
  <th>PREZIME</th>
  <th>GRAD</th>
</tr>

        {props.pacijenti.map(item => (
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
           <input type="button" className="edit" value="Izmjena"   onClick={() => editPatient(item.id,item.ime, item.prezime,item.jmbg, item.grad)}  />
                     </th>
           <th>
           <input type="submit" onClick={(e) => deletePatient(item.id, e)} className="delete" value="Izbriši" />
           </th>
          </tr>
        ))}
        {openModal && <Edit closeModal={setOpenModal} podaci={formData}></Edit>}
      </table>
  
         
        );

}

export default Pacijenti;