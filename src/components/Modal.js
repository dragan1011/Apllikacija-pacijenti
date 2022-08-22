import React from "react"
import './design.css'

function Modal() {
    return (

        <div className="form-container">
            <div class="name">
                <input type="text" required />
                <span></span>
                 <label>Ime</label>
             </div>
             <div class="name">
                 <input type="text" required />
                 <span></span>
                  <label>Prezime</label>
             </div>
             <div class="name">
                 <input type="text" required />
                 <span></span>
                  <label>JMBG</label>
             </div>
             <input type="submit" value="Dodaj" />
           
        </div>

    );
}

export default Modal