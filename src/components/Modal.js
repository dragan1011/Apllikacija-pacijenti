import React from "react"
import './design.css'

function Modal({closeModal}) {
    return (

        <div className="form-container">
            <div className="div-close">
                <span className="close" onClick={()=>closeModal(false)}>X</span></div>
                <span className="title">Dodajte novog pacijenta</span>
            <div class="name">
                <input type="text" required placeholder="Ime" />
                
                

             </div>
             <div class="name">
                 <input type="text" required placeholder="Prezime" />
                  
             </div>
             <div class="name jmbg">
                 <input type="number" required placeholder="JMBG" />
             </div>
             <input type="submit" value="Dodaj" />
             <input type="button" onClick={()=>closeModal(false)} className="exit" value="Odustani" />
           
        </div>

    );
}

export default Modal