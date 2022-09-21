import React from 'react';
import './Pacijenti.css';
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import './Edit.css'
import { AlertModalEdit,
         AlertModalDobarJMBG,
         AlertModalLosJMBG,
         AlertModalImePacijenta,
         AlertModalPrezimePacijenta,
         AlertModalViseOdDvaKaraktera, 
         AlertModalJMBGPacijenta,
         AlertModalJMBGTacnoKaraktera} from './AlertModal.js'


function Edit(props) {


    const imeRef = useRef();
    const prezimeRef = useRef();
    const jmbgRef = useRef();
    const gradRef = useRef();

    const [data, setData] = useState({
        grad:''
    })
    
    const [items, setItems] = useState([]);


    const [openModalEdit,setOpenModalEdit] = useState(false);


    const [openAlertModalDobarJMBG, setOpenAlertModalDobarJMBG] = useState(false);
    const [openAlertModalLosJMBG, setOpenAlertModalLosJMBG] = useState(false);
    const [openAlertModalImePacijenta, setOpenAlertModalImePacijenta] = useState(false);
    const [openAlertModalViseOdDvaKaraktera, setOpenAlertModalViseOdDvaKaraktera] = useState(false);
    const [openAlertModalPrezimePacijenta, setOpenAlertModalPrezimePacijenta] = useState(false);
    const [openAlertModalJMBGPacijenta, setOpenAlertModalJMBGPacijenta] = useState(false);
    const [openAlertModalJMBGTacnoKaraktera, setOpenAlertModalJMBGTacnoKaraktera] = useState(false);


    //Pozivanje liste gradova

    const fetchGradovi = async () => {
        const response = await fetch("http://172.18.1.73:8080/api2.cfc?method=gradovi_lista");
        const data = await response.json();
      
        const transformedData = data.gradovi.DATA.map(item => {
          
          return {
            id_grad: item[0],
            naziv: item[1]
          }
        });
        setItems(transformedData);
      }
      
      useEffect(() => {
       fetchGradovi();
      }, []);


      //Izmijena podataka o pacijentu sa validacijom

 function submit(e) {
     e.preventDefault();
     
    if (imeRef.current.value.trim() === '' || imeRef.current.value.trim() === null) {
        return setOpenAlertModalImePacijenta(true)
    }
    if (imeRef.current.value.trim().length <= 2) {
        return setOpenAlertModalViseOdDvaKaraktera(true)
    }
    if (prezimeRef.current.value.trim() === '' || prezimeRef.current.value.trim() === null) {
        return setOpenAlertModalPrezimePacijenta(true)
    }
    if (prezimeRef.current.value.trim().length <= 2) {
        return setOpenAlertModalViseOdDvaKaraktera(true)
    }
    if (jmbgRef.current.value.trim() === '' || jmbgRef.current.value.trim() === null) {
        return setOpenAlertModalJMBGPacijenta(true)
    }
    if (jmbgRef.current.value.trim().length <= 12 || jmbgRef.current.value.trim().length >= 14) {
        return setOpenAlertModalJMBGTacnoKaraktera(true)
    }
    props.refresh(jmbgRef.current.value);
            const url = `http://172.18.1.73:8080/api2.cfc?method=pacijent_unos&ime=${imeRef.current.value}&prezime=${prezimeRef.current.value}&jmbg=${jmbgRef.current.value}&id_grad=${data.grad ? +data.grad : gradRef.current.dataset.id}&id=${props.podaci.id}`;
      
    axios.post(url, {
        ime: imeRef.current.value,
        prezime: prezimeRef.current.value,
        jmbg: jmbgRef.current.value,
        id_grad: +data.grad
    })
    .then(res=> {      
        setOpenModalEdit(true)
    })  
}


 //Kupljenje unesenih podataka o pacijentu

function handle(e){
    const index = e.target.children[e.target.selectedIndex].dataset.id;
    const newdata={grad: index}
    setData(newdata)
   }



return (

<div className="form-container">
<form onSubmit={(e) => submit(e)} autoComplete="off">
<div className="div-close">
    <span className="close"  onClick={() => props.closeModal(false)}  >✖</span></div>
    <span className="title">Izmjena podataka pacijenta</span>
<div className="name position">
    <label className='label'>Ime</label>
    <input type="text" id="firstName" ref={imeRef} defaultValue={props.podaci.ime.charAt(0).toUpperCase() + props.podaci.ime.slice(1).toLowerCase()}  />
 </div>
 <div className="name position">
 <label className='label'>Prezime</label>
     <input type="text" id="lastName"  ref={prezimeRef} defaultValue={props.podaci.prezime.charAt(0).toUpperCase() + props.podaci.prezime.slice(1).toLowerCase()}  />
      
 </div>
 <div className="name jmbg position">
 <label className='label'>JMBG</label>
     <input type="number" id="jmbg" ref={jmbgRef} defaultValue={props.podaci.jmbg}  />
 </div>
 <div className='position'>
 <label className='label'>Grad</label>
 </div>
 <div className="grad">
 
 <select className="gradovi" onChange={handle}  >
    <option className='listaGradova' data-id={props.podaci.id_grad} ref={gradRef}>{props.podaci.grad}</option>
                    {items.map(item => (
                      <option defaultValue={item.grad} className="listaGradova" data-id={item.id_grad} > 
                        { item.naziv  } 
                        </option> 
                     ))}
                </select>
 </div>
 <input type="submit" className="add width"  value="Sačuvaj" />
 <input type="button" className="exit" onClick={() => props.closeModal(false)}  value="Odustani" />
 {openModalEdit && <AlertModalEdit closeAlertModalEdit={setOpenModalEdit} />}
 {openAlertModalDobarJMBG && <AlertModalDobarJMBG closeAlertModalDobarJMBG={setOpenAlertModalDobarJMBG} />}
 {openAlertModalLosJMBG && <AlertModalLosJMBG closeAlertModalLosJmbg={setOpenAlertModalLosJMBG} />}
 {openAlertModalImePacijenta && <AlertModalImePacijenta closeAlertModalImePacijenta={setOpenAlertModalImePacijenta} />}
 {openAlertModalViseOdDvaKaraktera && <AlertModalViseOdDvaKaraktera closeAlertModalViseOdDvaKaraktera={setOpenAlertModalViseOdDvaKaraktera} />}
 {openAlertModalPrezimePacijenta && <AlertModalPrezimePacijenta closeAlertModalPrezimePacijenta={setOpenAlertModalPrezimePacijenta} />}
 {openAlertModalJMBGPacijenta && <AlertModalJMBGPacijenta closeAlertModaJMBGPacijenta={setOpenAlertModalJMBGPacijenta} />}
 {openAlertModalJMBGTacnoKaraktera && <AlertModalJMBGTacnoKaraktera closeAlertModalJMBGTacnoKaraktera={setOpenAlertModalJMBGTacnoKaraktera} />}
           
 </form>
</div>
)
}

export default Edit;