
import React from "react"
import './Gradovi.css'
import axios from "axios";
import { useState, useRef } from "react";
import {AlertModalImeGrada,
        AlertModalLong,
        AlertModalLat,
        AlertModalViseOdDvaKaraktera,
        AlertModalMess } from "./AlertModal";

function Gradovi(props) {

  const gradRef = useRef();
  const longitRef = useRef();
  const latRef = useRef();

  const [openAlertModalImeGrada, setopenAlertModalImeGrada] = useState(false);
  const [openAlertModalLong, setopenAlertModalLong] = useState(false);
  const [openAlertModalLat, setopenAlertModalLat] = useState(false);
  const [openAlertModalViseOdDvaKaraktera, setopenAlertModalViseOdDvaKaraktera] = useState(false);
  const [openAlertModalMess, setopenAlertModalMess] = useState(false);
  const [message, setMessage] = useState([])

  const [data, setData] = useState({
      grad:""
  })



   //Dodavanje grada sa validacijom

  function submit(e) {
    e.preventDefault();
    props.pozoviGradove()
    console.log(gradRef.current.value);
    if (gradRef.current.value.trim() === '' || gradRef.current.value.trim() === null) {
        return setopenAlertModalImeGrada(true)
    }
    if (gradRef.current.value.trim().length <= 2) {
        return setopenAlertModalViseOdDvaKaraktera(true)
    }
    if (longitRef.current.value.trim() ==='' || longitRef.current.value.trim() === null) {
        return setopenAlertModalLong(true)   
    }
    if (longitRef.current.value.trim().length <= 2) {
        return setopenAlertModalViseOdDvaKaraktera(true)      
    }
    if (latRef.current.value.trim() ==='' || latRef.current.value.trim() === null) {
        return setopenAlertModalLat(true)     
    }
    if (latRef.current.value.trim().length <= 2) {
        return setopenAlertModalViseOdDvaKaraktera(true)     
    }

    console.log(longitRef.current.value)
    console.log(latRef.current.value)

   const url = `http://81.93.66.18:8234/api2.cfc?method=gradovi_unos&naziv=${gradRef.current.value}&longit=${longitRef.current.value}&lat=${latRef.current.value}`;
   
   console.log(props.closeModal)

    axios.post(url, {
      grad: gradRef.current.value,
      longit: longitRef.current.value,
      lat: latRef.current.value
    })
    .then(res=> {
        
        console.log(res.data.error)
        console.log(res.data.message)

            if (res.data.error === 0) {
            setMessage(res.data.message)
            setopenAlertModalMess(true)
            props.refresh();
              setTimeout(() => {
                props.closeModal(false)
              }, "1000")
              
            } else{
                setMessage(res.data.message)
                setopenAlertModalMess(true)
            }
   
        
    })  
}



    //Kupljenje unesenih podataka

  function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
   }

    return (
        <div className="form-container">
            <form  onSubmit={(e)=> submit(e)} autoComplete="off">
            <div className="div-close">
                <span className="close" onClick={()=>props.closeModal(false)} >???</span></div>
                <span className="title">Dodajte naziv grada</span>
            <div className="cityName position">
                <label className="label">Grad</label>
                <input type="text" id="grad" className="cityName-input" onChange={(e)=>handle(e)} ref={gradRef}  placeholder="Naziv grada" />
             </div>
            <div className="cityName position">
            <label className="label">Longituda</label>
                <input type="number" step="0.0000001" id="long" className="cityName-input" onChange={(e)=>handle(e)} ref={longitRef}  placeholder="Longituda" />
             </div>
            <div className="cityName position">
            <label className="label">Latituda</label>
                <input type="number" step="0.0000001" id="lat" className="cityName-input" onChange={(e)=>handle(e)} ref={latRef}  placeholder="Latituda" />
             </div>
             <input type="submit" className="add"  value="Dodaj" />
             <input type="button" onClick={()=>props.closeModal(false)} className="exit" value="Odustani" />
    
             {openAlertModalImeGrada && <AlertModalImeGrada closeAlertModalImeGrada={setopenAlertModalImeGrada}/>}
             {openAlertModalLong && <AlertModalLong closeAlertModalLong={setopenAlertModalLong}/>}
             {openAlertModalLat && <AlertModalLat closeAlertModalLat={setopenAlertModalLat}/>}
             {openAlertModalViseOdDvaKaraktera && <AlertModalViseOdDvaKaraktera closeAlertModalViseOdDvaKaraktera={setopenAlertModalViseOdDvaKaraktera}/>}
              {openAlertModalMess && <AlertModalMess provideMessage={message} closeAlertModalMess={ setopenAlertModalMess } /> }
             </form>
        </div>

    );
}

export default Gradovi;