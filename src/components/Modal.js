import React from "react"
import { useState } from "react";
import './Modal.css'

function Modal({closeModal}) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [JMBG, setJMBG] = useState("");
    
   async function addPatient() {
        console.warn(firstName,lastName,JMBG)

       const formData = new FormData();
       formData.append('firstName', firstName)
       formData.append('lastName', lastName)
       formData.append('JMBG', JMBG)

       JSON.stringify(formData)

       let result = await fetch('http://81.93.66.18:8234/api.cfc?method=pacijent_unos',{
           method:'POST',
           body:formData
       });
       alert('Dodali ste novog pacijenta!')
       console.log(typeof result)
    }

    return (
        <div className="form-container">
            <div className="div-close">
                <span className="close" onClick={()=>closeModal(false)}>✖</span></div>
                <span className="title">Dodajte novog pacijenta</span>
            <div className="name">
                <input type="text" required placeholder="Ime" onChange={(e)=>setFirstName(e.target.value)} />
             </div>
             <div className="name">
                 <input type="text" required placeholder="Prezime" onChange={(e)=>setLastName(e.target.value)} />
                  
             </div>
             <div className="name jmbg">
                 <input type="number" required placeholder="JMBG" onChange={(e)=>setJMBG(e.target.value)}/>
             </div>
             <input type="submit" className="add" onClick={addPatient} value="Dodaj" />
             <input type="button" onClick={()=>closeModal(false)} className="exit" value="Odustani" />
           
        </div>

    );
}

export default Modal