import React from "react";
import './Modal.css'





function Edit({closeModal}, {data}) {
    return (
    <div className="form-container">
    <div className="div-close">
        <span className="close" onClick={()=>closeModal(false)} >✖</span></div>
        <span className="title">Izmjena podataka pacijenta</span>
    <div className="name">
        <input type="text" placeholder="Ime" />
     </div>
     <div className="name">
         <input type="text" placeholder="Prezime" />
          
     </div>
     <div className="name jmbg">
         <input type="number" className="editJmbg" placeholder="JMBG"/>
     </div>
    
     {/* <select className="options">
  <option className="part" value="">Banja Luka</option>
  <option value="">Gradiška</option>
  <option value="">Laktaši</option>
  <option value="">Bijeljina</option>
</select> */}
     <input type="submit" className="add" value="Izmjeni" />
     <input type="button"  className="exit" value="Odustani" onClick={()=>closeModal(false)} />
   
</div>
)
}

export default Edit;