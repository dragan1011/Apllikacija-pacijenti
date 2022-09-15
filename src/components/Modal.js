import axios from "axios";
import React, { useRef } from "react"
import { useState } from "react";
import './Modal.css'
import Gradovi from './Gradovi'
import {AlertModalAdd,AlertModalDobarJMBG,
        AlertModalLosJMBG,
        AlertModalImePacijenta,
        AlertModalPrezimePacijenta,
        AlertModalViseOdDvaKaraktera, 
        AlertModalJMBGPacijenta,
        AlertModalJMBGTacnoKaraktera} from './AlertModal.js'

function Modal(props) {


    const [openModal, setOpenModal] = useState(false);
    const [openAlertModalAdd, setOpenAlertModalAdd] = useState(false);
    const [openAlertModalDobarJMBG, setOpenAlertModalDobarJMBG] = useState(false);
    const [openAlertModalLosJMBG, setOpenAlertModalLosJMBG] = useState(false);
    const [openAlertModalImePacijenta, setOpenAlertModalImePacijenta] = useState(false);
    const [openAlertModalViseOdDvaKaraktera, setOpenAlertModalViseOdDvaKaraktera] = useState(false);
    const [openAlertModalPrezimePacijenta, setOpenAlertModalPrezimePacijenta] = useState(false);
    const [openAlertModalJMBGPacijenta, setOpenAlertModalJMBGPacijenta] = useState(false);
    const [openAlertModalJMBGTacnoKaraktera, setOpenAlertModalJMBGTacnoKaraktera] = useState(false);
 


    const imeRef = useRef();
    const prezimeRef = useRef();
    const jmbgRef = useRef();
    const gradRef = useRef();

    const [data, setData] = useState({
        ime:"",
        prezime:"",
        jmbg:"",
        grad:''
    })
  
    function submit(e) {
        e.preventDefault();
       
        if (imeRef.current.value.trim() === '' || imeRef.current.value.trim() === null) {
            return setOpenAlertModalImePacijenta(true)
        }
        if (imeRef.current.value.trim().length <= 2) {
            return setOpenAlertModalViseOdDvaKaraktera(true)
        }
        if (prezimeRef.current.value.trim() === '' || prezimeRef.current.value.trim() === null) {
            return setOpenAlertModalPrezimePacijenta(true)
        }
        if (prezimeRef.current.value.trim().length <= 2) {
            return setOpenAlertModalViseOdDvaKaraktera(true)
        }
        if (jmbgRef.current.value.trim() === '' || jmbgRef.current.value.trim() === null) {
            return setOpenAlertModalJMBGPacijenta(true)
        }
        if (jmbgRef.current.value.trim().length <= 12 || jmbgRef.current.value.trim().length >= 14) {
            return setOpenAlertModalJMBGTacnoKaraktera(true)
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

        
            const suma = 7*a1 + 6*a2 +5*a3 + 4*a4 + 3*a5 + 2*a6 + 7*a7 + 6*a8 + 5*a9 + 4*a10 + 3*a11 + 2*a12; 
 
            const m = suma % 11;
            const o = 11 - m;
      
        
           if (o == k) {
            setOpenAlertModalDobarJMBG(true)
           }else{
            setOpenAlertModalLosJMBG(true)
           }
        }  
        props.getJmbg(jmbgRef.current.value);
        const url = `http://172.18.1.73:8080/api2.cfc?method=pacijent_unos&ime=${imeRef.current.value}&prezime=${prezimeRef.current.value}&jmbg=${jmbgRef.current.value}&id_grad=${+data.grad}`;

        axios.post(url, {
            ime: imeRef.current.value,
            prezime: prezimeRef.current.value,
            jmbg: jmbgRef.current.value,
            id_grad: +data.grad
        })
        .then(res=> {
            imeRef.current.value = "";
            prezimeRef.current.value = "";
            jmbgRef.current.value = "";
            setOpenAlertModalAdd(true)
        }) 
    }

   function handle(e){
    const index = e.target.children[e.target.selectedIndex].dataset.id;
    const newdata={...data, grad: index}
    setData(newdata)
   }

   
    return (
        <div className="form-container">
            <form onSubmit={(e)=> submit(e)} autocomplete="off">
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
                    <option   className="listaGradova">Izaberite grad</option>
                    {props.gradovi.map(item => (
                                  <option key={item.id_grad} ref={gradRef} className="listaGradova" data-id={item.id_grad} > 
                        { item.naziv }   
                        </option> 
                     ))}
                </select>
                <input type="button" onClick={() => {setOpenModal(true)}} className="add dodaj widthG"  value="Dodaj novi grad" />
             </div>
             <input type="submit" className="add"  value="Dodaj" />
             <input type="button" onClick={()=>props.closeModal(false)} className="exit" value="Odustani" />
             {openAlertModalAdd && <AlertModalAdd closeAlertModal={setOpenAlertModalAdd} />}
             {openAlertModalDobarJMBG && <AlertModalDobarJMBG closeAlertModalDobarJMBG={setOpenAlertModalDobarJMBG} />}
             {openAlertModalLosJMBG && <AlertModalLosJMBG closeAlertModalLosJmbg={setOpenAlertModalLosJMBG} />}
             {openAlertModalImePacijenta && <AlertModalImePacijenta closeAlertModalImePacijenta={setOpenAlertModalImePacijenta} />}
             {openAlertModalViseOdDvaKaraktera && <AlertModalViseOdDvaKaraktera closeAlertModalViseOdDvaKaraktera={setOpenAlertModalViseOdDvaKaraktera} />}
             {openAlertModalPrezimePacijenta && <AlertModalPrezimePacijenta closeAlertModalPrezimePacijenta={setOpenAlertModalPrezimePacijenta} />}
             {openAlertModalJMBGPacijenta && <AlertModalJMBGPacijenta closeAlertModaJMBGPacijenta={setOpenAlertModalJMBGPacijenta} />}
             {openAlertModalJMBGTacnoKaraktera && <AlertModalJMBGTacnoKaraktera closeAlertModalJMBGTacnoKaraktera={setOpenAlertModalJMBGTacnoKaraktera} />}
              </form>
             { openModal && <Gradovi closeModal={setOpenModal} />}
        </div>

    );
}

export default Modal