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
    axios.post(`http://81.93.66.18:8234/api2.cfc?method=pacijent_obrisi&id=${id}`)
    .then(res=> {
       alert('Pacijent je obrisan!')
    })
}
}

function editPatient(id,ime, prezime,jmbg, grad, id_grad) {
  const data = {
    id: id,
    ime: ime,
    prezime: prezime,
    jmbg: jmbg,
    grad: grad,
    id_grad: id_grad
  }
  setFormData(data);
  setOpenModal(true);
}



  return (




    

  
    <table className="tabela--tabela_pacijenti">

<thead>
<tr className="tr--header_tr">
  <th>JMBG</th>
  <th>IME</th>
  <th>PREZIME</th>
  <th>GRAD</th>
  <th></th>
  <th></th>
</tr>
</thead>


<tbody>


        {props.pacijenti.map(item => (
          <div  key={item.id}>
          <tr className="tr--main_dio_tabele">
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
           <input type="button" className="th--button_1" value="Izmjena"   onClick={() => editPatient(item.id,item.ime, item.prezime,item.jmbg, item.grad,item.grad_id)}  />
                     </th>
           <th>
           <input type="submit" onClick={(e) => deletePatient(item.id, e)} className="th--button_2" value="Izbriši" />
           </th>
           
          </tr>

          </div>
        ))}
        {openModal && <Edit refresh={props.getJmbg} closeModal={setOpenModal} podaci={formData}></Edit>}
        </tbody>
       
      </table>



   
        );

}

export default Pacijenti;