
import React from "react"
import './Gradovi.css'
import axios from "axios";
import { useState, useRef } from "react";
import { AlertModalAddGrad,
        AlertModalImeGrada,
        AlertModalLong,
        AlertModalLat,
        AlertModalViseOdDvaKaraktera } from "./AlertModal";

function Gradovi({closeModal}) {

  const gradRef = useRef();
  const longitRef = useRef();
  const latRef = useRef();

  const [openAlertModalAddGrad, setopenAlertModalAddGrad] = useState(false);
  const [openAlertModalImeGrada, setopenAlertModalImeGrada] = useState(false);
  const [openAlertModalLong, setopenAlertModalLong] = useState(false);
  const [openAlertModalLat, setopenAlertModalLat] = useState(false);
  const [openAlertModalViseOdDvaKaraktera, setopenAlertModalViseOdDvaKaraktera] = useState(false);

  const [data, setData] = useState({
      grad:""
  })


   //Dodavanje grada sa validacijom

  function submit(e) {
    e.preventDefault();

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

   const url = `http://172.18.1.73:8080/api2.cfc?method=gradovi_unos&naziv=${gradRef.current.value}&longit=${longitRef.current.value}&lat=${latRef.current.value}`;
    
    axios.post(url, {
      grad: gradRef.current.value,
      longit: longitRef.current.value,
      lat: latRef.current.value
    })
    .then(res=> {
        console.log(res.data);
        window.location.reload(false)  
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
                <span className="close" onClick={()=>closeModal(false)} >✖</span></div>
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
             <input type="button" onClick={()=>closeModal(false)} className="exit" value="Odustani" />
             {openAlertModalAddGrad && <AlertModalAddGrad closeAlertModalAddGrad={setopenAlertModalAddGrad}/>}
             {openAlertModalImeGrada && <AlertModalImeGrada closeAlertModalImeGrada={setopenAlertModalImeGrada}/>}
             {openAlertModalLong && <AlertModalLong closeAlertModalLong={setopenAlertModalLong}/>}
             {openAlertModalLat && <AlertModalLat closeAlertModalLat={setopenAlertModalLat}/>}
             {openAlertModalViseOdDvaKaraktera && <AlertModalViseOdDvaKaraktera closeAlertModalViseOdDvaKaraktera={setopenAlertModalViseOdDvaKaraktera}/>}
             </form>
        </div>

    );
}

export default Gradovi;