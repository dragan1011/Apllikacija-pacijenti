import axios from "axios";
import React, { useRef } from "react"
import { useState } from "react";
import './Modal.css'
import Gradovi from './Gradovi'

function Modal(props) {

    console.log(props.gradovi);
    const [openModal, setOpenModal] = useState(false);

    const imeRef = useRef();
    const prezimeRef = useRef();
    const jmbgRef = useRef();


    const [data, setData] = useState({
        ime:"",
        prezime:"",
        jmbg:"",
        grad:''
    })

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

   function handle(e){
    const index = e.target.children[e.target.selectedIndex].dataset.id;
    const newdata={...data, grad: index}
    console.log(newdata)
    setData(newdata)
   }

   
    return (
        <div className="form-container">
            <form onSubmit={(e)=> submit(e)}>
            <div className="div-close">
                <span className="close" onClick={()=>props.closeModal(false)}>✖</span></div>
                <span className="title">Dodajte novog pacijenta</span>
            <div className="name">
                <input type="text" id="firstName" ref={imeRef} placeholder="Ime" />
             </div>
             <div className="name">
                 <input type="text" id="lastName" ref={prezimeRef} placeholder="Prezime" />
                  
             </div>
             <div className="name jmbg">
                 <input type="number" id="jmbg" ref={jmbgRef} placeholder="JMBG"/>
             </div>
             <div className="grad">             
                  <select className="gradovi" onChange={handle}>
                    {props.gradovi.map(item => (
                      <option className="listaGradova" data-id={item.id_grad} > 
                        { item.naziv }   
                        </option> 
                     ))}
                </select>
                <input type="button" onClick={() => {setOpenModal(true)}} className="add dodaj"  value="Dodaj novi grad" />
             </div>
             <input type="submit" className="add"  value="Dodaj" />
             <input type="button" onClick={()=>props.closeModal(false)} className="exit" value="Odustani" />
             </form>
             { openModal && <Gradovi closeModal={setOpenModal} />}
        </div>

    );
}

export default Modal

