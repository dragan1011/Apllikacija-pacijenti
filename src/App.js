import { useState } from "react"; 
import './App.css';
import Modal from './components/Modal.js'

function App() {

  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
      <div className="search-container">
          <input type="text" className="search-jmbg" placeholder="JMBG..."/>
          <input type="text" className="search-firstname" placeholder="Ime..."/>
          <input type="text" className="search-lastname" placeholder="Prezime..."/>
          <button className="search-trazi">Trazi</button>
          <button className="dodaj" onClick={()=>{setOpenModal(true)}}>Dodaj pacijenta</button> 
               { openModal && <Modal />}
          </div>
      </header>
    </div>
  );
}

export default App;
