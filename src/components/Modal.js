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
        AlertModalJMBGTacnoKaraktera,
        AlertModalOdabirGrada} from './AlertModal.js'

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
    const [openAlertModalOdabirGrada, setOpenAlertModalJOdabirGrada] = useState(false);
 


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
  
    //Dodavanje pacijenta sa validacijom

    function submit(e) {
        e.preventDefault();
        console.log(props.pozoviGradove)
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
        if (gradRef.current.value === 'Izaberite grad') {
            return setOpenAlertModalJOdabirGrada(true)
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
        console.log(gradRef.current.value)


        props.getJmbg(jmbgRef.current.value);
       
         const url = `http://81.93.66.18:8234/api2.cfc?method=pacijent_unos&ime=${imeRef.current.value}&prezime=${prezimeRef.current.value}&jmbg=${jmbgRef.current.value}&id_grad=${+data.grad}`;

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
            gradRef.current.value = "Izraberite grad"
            setOpenAlertModalAdd(true)
        })  
    }

   function handle(e){
    const index = e.target.children[e.target.selectedIndex].dataset.id;
    console.log(e.target.children[e.target.selectedIndex].dataset.id)
    const newdata={...data, grad: index}
    setData(newdata)
   }

   
    return (
        <div className="form-container">
            <form onSubmit={(e)=> submit(e)} autoComplete="off">
            <div className="div-close">
                <span className="close" onClick={()=>props.closeModal(false)}>???</span></div>
                <span className="title">Dodajte novog pacijenta</span>
            <div className="name position">
                <label className="label">Ime</label>
                <input type="text" id="firstName" ref={imeRef} placeholder="Ime" />
             </div>
             <div className="name position">
             <label className="label">Prezime</label>
                 <input type="text" id="lastName" ref={prezimeRef} placeholder="Prezime" />
                  
             </div>
             <div className="name jmbg position">
             <label className="label">JMBG</label>
                 <input type="number" id="jmbg" ref={jmbgRef} placeholder="JMBG"/>
             </div>
             <div className="position">
                <label className="label">Grad</label>
             </div>
             <div className="grad">             
                  <select ref={gradRef} className="gradovi" onChange={handle}>
                    <option className="listaGradova">Izaberite grad</option>
                    {props.gradovi.map(item => (
                                  <option key={item.id_grad} className="listaGradova" data-id={item.id_grad} > 
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
             {openAlertModalOdabirGrada && <AlertModalOdabirGrada closeAlertModalOdabirGrada={setOpenAlertModalJOdabirGrada} />}
              </form>
             { openModal && <Gradovi refresh={props.refresh} pozoviGradove={props.pozoviGradove} closeModal={setOpenModal} />}
        </div>

    );
}

export default Modal