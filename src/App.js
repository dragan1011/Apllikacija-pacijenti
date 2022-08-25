import { useState } from "react"; 
import './App.css';
import Modal from './components/Modal.js'
import Pacijenti from "./components/Pacijenti";

function App() {
  const [inputName, setInputName] = useState("");
  const [inputJMBG, setInputJMBG] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [openModal, setOpenModal] = useState(false)

  function inputNameHandler(ev) {
    setInputName(ev.target.value)
  }
  function inputJMBGHandler(ev) {
    setInputJMBG(ev.target.value)
  }
  function searchHandler(ev){
    ev.preventDefault();
    if (inputName.trim().length >= 3) {
      isSearching(true)
    }else if(inputJMBG.trim().length >= 3){
      isSearching(true)
    }else{
      return <div>Parametri za pretragu nisu dobro unešeni</div>
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <div className="search-container">
        <div className="patients">Evidencija pacijenata</div>
        <form onSubmit={searchHandler}>
        <input type="number" onChange={inputNameHandler} className="search" placeholder="JMBG..." />
        <input type="text" onChange={inputJMBGHandler} className="search" placeholder="Ime ili prezime..." />
          <button className="search-trazi" >Traži</button>
          <button className="dodaj" onClick={()=>{setOpenModal(true)} }>Dodaj pacijenta</button> 
          </form>
               { openModal && <Modal closeModal={setOpenModal} />}
          </div>
         { <Pacijenti searchTerm={inputName} />}
      </header>
      
    </div>
  );
}

export default App;
