import axios from "axios";
import { useState } from "react"; 
import './App.css';
import Modal from './components/Modal.js'
import Pacijenti from "./components/Pacijenti";

function App() {

const [openModal, setOpenModal] = useState(false)

const [data, setData] = useState([]);
const [value, setValue] = useState([])

const handleSearch = async (e) =>{
  e.preventDefault();
  return await axios
  .get(`http://81.93.66.18:8234/api2.cfc?method=pacijent_trazi&ime=${value}`)
  .then((response)=> {
    setData(response.data);
    setValue("");
  })
  .catch((err) => console.log(err))
}



  return (
    <div className="App">
      <header className="App-header">
      <div className="search-container">
        <div className="patients">Evidencija pacijenata</div>
        <form onSubmit={handleSearch}>
        <input type="number" className="search" placeholder="JMBG..." />
        <input type="text" onChange={(e) => setValue(e.target.value)} className="search" placeholder="Ime ili prezime..." />
          <button type="submit" className="search-trazi" >Traži</button>
          <button className="dodaj" onClick={()=>{setOpenModal(true)} }>Dodaj pacijenta</button> 
          </form>
               { openModal && <Modal closeModal={setOpenModal} />}
          </div>
         { <Pacijenti/>}
               </header>
      
    </div>
  );
}

export default App;