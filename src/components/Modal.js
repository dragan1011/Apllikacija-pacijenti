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
       if (jmbgRef.current.value.trim().length === 13 ) {
            const jmbg = jmbgRef.current.value.trim();
            const a1 = jmbg[0];
            const a2 = jmbg[1];
            const a3 = jmbg[2];
            const a4 = jmbg[3];
            const a5 = jmbg[4];
            const a6 = jmbg[5];
            const a7 = jmbg[6];
            const a8 = jmbg[7];
            const a9 = jmbg[8];
            const a10 = jmbg[9];
            const a11 = jmbg[10];
            const a12 = jmbg[11];
            const k = jmbg[12];

            console.log(k)
            const suma = 7*a1 + 6*a2 +5*a3 + 4*a4 + 3*a5 + 2*a6 + 7*a7 + 6*a8 + 5*a9 + 4*a10 + 3*a11 + 2*a12; 
 
            const m = suma % 11;
            const o = 11 - m;
      
        
           if (o == k) {
            alert ('Matični broj je ispravan po algoritmu!')
           }else{
            alert('JMBG nije ispravan po algoritmu!');
           }
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

