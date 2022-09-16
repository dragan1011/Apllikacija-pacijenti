import React, { useRef, useState } from "react";
import './Pacijenti.css'
import axios from "axios";
import Edit from './Edit.js'
import { AlertModalDelete, AlertModalDeleteConfirmation } from "./AlertModal";

function Pacijenti(props) {
  const [formData,setFormData] = useState([]);
  const [openModal,setOpenModal] = useState(false);
  const [openModalDelete,setOpenModalDelete] = useState(false);
  const [dialog, setDialog] = useState({
    message: '',
    isLoading: false
  })
  
  const idProductRef = useRef()

  const [brisanje,setBrisanje] = useState([]);

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading
    })
  }

  //Brisanje pacijenata

  function deletePatient(id, e) {
    e.preventDefault();
    handleDialog('Da li ste sigurni da želite obrisati pacijenta?', true)
    setBrisanje(e.target.parentElement.parentElement);
    idProductRef.current = id;
  }

  //Potvrda za brisanje pacijenata
  const areUSureDelete = (choose) => {
    
    if (choose) {
    handleDialog('',false)
    brisanje.remove();
        axios.post(`http://172.18.1.73:8080/api2.cfc?method=pacijent_obrisi&id=${idProductRef.current}`)
    .then(res=> {
      setOpenModalDelete(true)
    }) 
    }else{
      handleDialog('',false)
    }

  }


  //Izmijena podataka o pacijentima
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

//Prikaz pacijenata
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
           <input type="button" className="th--button_1" value="Izmijena"   onClick={() => editPatient(item.id,item.ime, item.prezime,item.jmbg, item.grad,item.grad_id)}  />
                     </th>
           <th>
           <input type="submit" onClick={(e) => deletePatient(item.id, e)} className="th--button_2" value="Izbriši" />
           </th>
           
          </tr>

          </div>
        ))}
        {openModalDelete && <AlertModalDelete closeAlertModalDelete={setOpenModalDelete} />}
        { dialog.isLoading && <AlertModalDeleteConfirmation onDialog={areUSureDelete} message={dialog.message} />}
        {openModal && <Edit refresh={props.getJmbg} closeModal={setOpenModal} podaci={formData}></Edit>}
        
        </tbody>
       
      </table>
      );

}

export default Pacijenti;