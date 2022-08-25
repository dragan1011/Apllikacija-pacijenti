import React from "react";
import './Modal.css'

function Edit({closeModal}) {
    return (
    <div className="form-container">
    <div className="div-close">
        <span className="close" onClick={()=>closeModal(false)} >✖</span></div>
        <span className="title">Izmijena podataka pacijenta</span>
    <div className="name">
        <input type="text" required placeholder="Ime" />
     </div>
     <div className="name">
         <input type="text" required placeholder="Prezime" />
          
     </div>
     <div className="name jmbg">
         <input type="number" required placeholder="JMBG"/>
     </div>
     <input type="submit" className="add" value="Dodaj" />
     <input type="button"  className="exit" value="Odustani" onClick={()=>closeModal(false)} />
   
</div>
)
}

export default Edit;