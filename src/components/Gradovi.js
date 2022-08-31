
import React from "react"
import './Gradovi.css'
import axios from "axios";
import { useState, useRef } from "react";

function Gradovi({closeModal}) {

  
  const gradRef = useRef();

  const [data, setData] = useState({
      grad:""
  })
  function submit(e) {
    e.preventDefault();

    console.log(gradRef.current.value);
    if (gradRef.current.value.trim() === '' || gradRef.current.value.trim() === null) {
        return alert('Morate nazziv grada! ')
    }
    if (gradRef.current.value.trim().length <= 2) {
        return alert ('Morate unijeti više od dva karaktera!')
    }
  
    const url = `http://81.93.66.18:8234/api.cfc?method=gradovi_unos&naziv=${gradRef.current.value}`;
    
    axios.post(url, {
      grad: gradRef.current.value,
    })
    .then(res=> {
        console.log(res.data);
        closeModal(false)
        alert('Dodali ste novi grad!');
    })
}

  function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
   }

    return (
        <div className="form-container">
            <form  onSubmit={(e)=> submit(e)}>
            <div className="div-close">
                <span className="close" onClick={()=>closeModal(false)} >✖</span></div>
                <span className="title">Dodajte naziv grada</span>
            <div className="cityName">
                <input type="text" id="grad" className="cityName-input" onChange={(e)=>handle(e)} ref={gradRef}  placeholder="Naziv grada" />
             </div>
             <input type="submit" className="add"  value="Dodaj" />
             <input type="button" onClick={()=>closeModal(false)} className="exit" value="Odustani" />
             </form>
        </div>

    );
}

export default Gradovi;