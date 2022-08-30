import axios from "axios";
import React, { useRef } from "react"
import { useState } from "react";
import './Modal.css'

function Modal({closeModal}) {

    const imeRef = useRef();
    const prezimeRef = useRef();
    const jmbgRef = useRef();

    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        jmbg:""
    })

   
    function submit(e) {
        e.preventDefault();
        const url = `http://81.93.66.18:8234/api2.cfc?method=pacijent_unos&ime=${imeRef.current.value}&prezime=${prezimeRef.current.value}&jmbg=${jmbgRef.current.value}&id_grad=2`;
        
        axios.post(url, {
            firstName: imeRef.current.value,
            lastName: prezimeRef.current.value,
            jmbg: jmbgRef.current.value
        })
        .then(res=> {
            console.log(res.data);
            imeRef.current.value = "";
            prezimeRef.current.value = "";
            jmbgRef.current.value = "";
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
            <form onSubmit={(e)=> submit(e)}>
            <div className="div-close">
                <span className="close" onClick={()=>closeModal(false)}>✖</span></div>
                <span className="title">Dodajte novog pacijenta</span>
            <div className="name">
                <input type="text" id="firstName" onChange={(e)=>handle(e)} ref={imeRef} required placeholder="Ime" />
             </div>
             <div className="name">
                 <input type="text" id="lastName" onChange={(e)=>handle(e)} ref={prezimeRef} required placeholder="Prezime" />
                  
             </div>
             <div className="name jmbg">
                 <input type="number" id="jmbg" onChange={(e)=>handle(e)} ref={jmbgRef} required placeholder="JMBG"/>
             </div>
             <input type="submit" className="add"  value="Dodaj" />
             <input type="button" onClick={()=>closeModal(false)} className="exit" value="Odustani" />
             </form>
        </div>

    );
}

export default Modal