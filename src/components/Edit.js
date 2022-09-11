import React from 'react';
import './Pacijenti.css';
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import './Edit.css'

function Edit(props) {


    const imeRef = useRef();
    const prezimeRef = useRef();
    const jmbgRef = useRef();
    const gradRef = useRef();

    const [data, setData] = useState({
        grad:''
    })
    
    const [items, setItems] = useState([]);


    const fetchGradovi = async () => {
        const response = await fetch("http://81.93.66.18:8234/api2.cfc?method=gradovi_lista");
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


 function submit(e) {
     e.preventDefault();
     props.refresh(jmbgRef.current.value);
    if (imeRef.current.value.trim() === '' || imeRef.current.value.trim() === null) {
        return alert('Morate unijeti ime pacijenta! ')
    }
    if (imeRef.current.value.trim().length <= 2) {
        return alert ('Morate unijeti više od dva karaktera!')
    }
    if (prezimeRef.current.value.trim() === '' || prezimeRef.current.value.trim() === null) {
        return alert('Morate unijeti prezime pacijenta!')
    }
    if (prezimeRef.current.value.trim().length <= 2) {
        return alert ('Morate unijeti više od dva karaktera!')
    }
    if (jmbgRef.current.value.trim() === '' || jmbgRef.current.value.trim() === null) {
        return alert ('Morate unijeti matični broj pacijenta!')
    }
    if (jmbgRef.current.value.trim().length <= 12 || jmbgRef.current.value.trim().length >= 14) {
        return alert ('Morate unijeti tačno 13 karaktera!')
    }
            const url = `http://81.93.66.18:8234/api2.cfc?method=pacijent_unos&ime=${imeRef.current.value}&prezime=${prezimeRef.current.value}&jmbg=${jmbgRef.current.value}&id_grad=${data.grad ? +data.grad : gradRef.current.dataset.id}&id=${props.podaci.id}`;
      
    axios.post(url, {
        ime: imeRef.current.value,
        prezime: prezimeRef.current.value,
        jmbg: jmbgRef.current.value,
        id_grad: +data.grad
    })
    .then(res=> {      
        alert('Uspješno ste napravili izmjene!');
        props.closeModal(false);
    })  
}


function handle(e){
    const index = e.target.children[e.target.selectedIndex].dataset.id;
    const newdata={grad: index}
    setData(newdata)
   }



return (

<div className="form-container">
<form onSubmit={(e) => submit(e)}>
<div className="div-close">
    <span className="close"  onClick={() => props.closeModal(false)}  >✖</span></div>
    <span className="title">Izmjena podataka pacijenta</span>
<div className="name">
    <input type="text" id="firstName" ref={imeRef} defaultValue={props.podaci.ime.charAt(0).toUpperCase() + props.podaci.ime.slice(1).toLowerCase()}  />
 </div>
 <div className="name">
     <input type="text" id="lastName"  ref={prezimeRef} defaultValue={props.podaci.prezime.charAt(0).toUpperCase() + props.podaci.prezime.slice(1).toLowerCase()}  />
      
 </div>
 <div className="name jmbg">
     <input type="number" id="jmbg" ref={jmbgRef} defaultValue={props.podaci.jmbg}  />
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
 <input type="submit" className="add"  value="Sacuvaj" />
 <input type="button" className="exit" onClick={() => props.closeModal(false)}  value="Odustani" />
 </form>
</div>
)
}

export default Edit;