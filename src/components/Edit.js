import React from "react";

function Edit(props) {

    const [openModal, setOpenModal] = useState(false);

    const imeRef = useRef();
    const prezimeRef = useRef();
    const jmbgRef = useRef();

    const [data, setData] = useState({
        firstName:"",
        lastName:"",
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
        <input type="text" id="firstName" onChange={(e)=>handle(e)} ref={imeRef} placeholder="Ime" />
     </div>
     <div className="name">
         <input type="text" id="lastName" onChange={(e)=>handle(e)} ref={prezimeRef} placeholder="Prezime" />
          
     </div>
     <div className="name jmbg">
         <input type="number" id="jmbg" onChange={(e)=>handle(e)} ref={jmbgRef} placeholder="JMBG"/>
     </div>
     <div className="grad">             
          <select onChange={handle}>
            {props.gradovi.map(item => (
              <option data-id={item.id_grad} className="lista"> 
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
</div>)

}

export default Edit