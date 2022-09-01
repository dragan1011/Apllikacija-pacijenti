import React from "react";
import './Pacijenti.css';
import { useRef } from "react";
import axios from "axios";

function Edit(props) {


    const imeRef = useRef();
    const prezimeRef = useRef();
    const jmbgRef = useRef();


 function submit(e) {
     e.preventDefault();
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

    console.log(imeRef.current.value);
    console.log(prezimeRef.current.value);
    console.log(jmbgRef.current.value);
            const url = `http://81.93.66.18:8234/api2.cfc?method=pacijent_unos&ime=${imeRef.current.value}&prezime=${prezimeRef.current.value}&jmbg=${jmbgRef.current.value}&id_grad=2&id=${props.podaci.id}`;

    axios.post(url, {
        ime: imeRef.current.value,
        prezime: prezimeRef.current.value,
        jmbg: jmbgRef.current.value,
    })
    .then(res=> {      
        alert('Uspješno ste napravili izmjene!');
    })  
}

return (

<div className="form-container">
<form onSubmit={(e) => submit(e)}>
<div className="div-close">
    <span className="close"  onClick={() => props.closeModal(false)}  >✖</span></div>
    <span className="title">Izmjena podataka pacijenta</span>
<div className="name">
    <input type="text" id="firstName" ref={imeRef} defaultValue={props.podaci.ime}  />
 </div>
 <div className="name">
     <input type="text" id="lastName"  ref={prezimeRef} defaultValue={props.podaci.prezime}  />
      
 </div>
 <div className="name jmbg">
     <input type="number" id="jmbg" ref={jmbgRef} defaultValue={props.podaci.jmbg}  />
 </div>
 <div className="name jmbg">
 </div>
 <input type="submit" className="add"  value="Sacuvaj" />
 <input type="button" className="exit" onClick={() => props.closeModal(false)}  value="Odustani" />
 </form>
</div>
)
}

export default Edit;