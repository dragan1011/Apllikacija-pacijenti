import React from "react";
import './Pacijenti.css';

function Edit(props) {
console.log(props.podaci)


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
            const url = `http://172.18.1.73:8080/api2.cfc?method=pacijent_unos&ime=${imeRef.current.value}&prezime=${prezimeRef.current.value}&jmbg=${jmbgRef.current.value}&id_grad=${+data.grad}`;

    axios.post(url, {
        ime: imeRef.current.value,
        prezime: prezimeRef.current.value,
        jmbg: jmbgRef.current.value,
        id_grad: +data.grad
    })
    .then(res=> {
        console.log(res.data);
        imeRef.current.value = "";
        prezimeRef.current.value = "";
        jmbgRef.current.value = "";
        
        alert('Dodali ste novog pacijenta!');
    })
}

return (
<div className="form-container">
<form>
<div className="div-close">
    <span className="close" >✖</span></div>
    <span className="title">Izmjena podataka pacijenta</span>
<div className="name">
    <input type="text"  id="firstName" defaultValue={props.podaci.ime}  />
    <></>
 </div>
 <div className="name">
     <input type="text" id="lastName"  defaultValue={props.podaci.prezime}  />
      
 </div>
 <div className="name jmbg">
     <input type="number" id="jmbg" defaultValue={props.podaci.jmbg}  />
 </div>
 <div className="name jmbg">
    <input defaultValue={props.podaci.grad} />
 </div>
 <input type="button" className="add"  value="Sacuvaj" />
 <input type="button" className="exit" value="Odustani" />
 </form>
</div>
)
}

export default Edit;