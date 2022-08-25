import React from "react";
import './Modal.css'

function Edit() {
    <div className="form-container">
    <div className="div-close">
        <span className="close" >✖</span></div>
        <span className="title">Dodajte novog pacijenta</span>
    <div className="name">
        <input type="text" required placeholder="Ime"  />
     </div>
     <div className="name">
         <input type="text" required placeholder="Prezime" />
          
     </div>
     <div className="name jmbg">
         <input type="number" required placeholder="JMBG"/>
     </div>
     <input type="submit" className="add" value="Dodaj" />
     <input type="button"  className="exit" value="Odustani" />
   
</div>
}

export default Edit;