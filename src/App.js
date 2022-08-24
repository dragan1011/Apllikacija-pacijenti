import { useState } from "react"; 
import './App.css';
import Modal from './components/Modal.js'
import Pacijenti from "./components/Pacijenti";

function App() {

  const [openModal, setOpenModal] = useState(false)

  return (
    
    <div className="App">
      <header className="App-header">
      <div className="search-container">
        <div className="patients">Evidencija pacijenata</div>
          <input type="number" className="search-jmbg" placeholder="JMBG..."/>
          <input type="text" className="search-firstname" placeholder="Ime..."/>
          <input type="text" className="search-lastname" placeholder="Prezime..."/>
          <button className="search-trazi">Traži</button>
          <button className="dodaj" onClick={()=>{setOpenModal(true)} }>Dodaj pacijenta</button> 
               { openModal && <Modal closeModal={setOpenModal} />}
          </div>
         <Pacijenti />
      </header>
      
    </div>
  );
}

export default App;
