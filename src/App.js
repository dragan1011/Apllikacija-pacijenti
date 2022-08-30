import axios from "axios";
import { useEffect, useState } from "react"; 
import './App.css';
import Modal from './components/Modal.js'
import Pacijenti from "./components/Pacijenti";

function App() {
  const [items, setItems] = useState([]);
  const [isSearching, setIsSearching] =useState(false);


const [openModal, setOpenModal] = useState(false)

const [data, setData] = useState([]);
const [nameValue, setNameValue] = useState([])
const [jmbgValue, setJMBGValue] = useState([])

const fetchGradovi = async () => {
  const response = await fetch("http://81.93.66.18:8234/api.cfc?method=gradovi_lista");
  const data = await response.json();

  const transformedData = data.gradovi.DATA.map(item => {
    return {
      id_grad: item[0],
      naziv: item[1]
    }
  });
  setItems(transformedData);
}
useEffect(() => {
 fetchGradovi();
 handleNameSearch();
 handleJMBGSearch();
}, []);

const handleNameSearch = async (e) =>{
  e.preventDefault();
  return await axios
  .get(`http://81.93.66.18:8234/api2.cfc?method=pacijent_trazi&ime=${nameValue}`)
  .then((response)=> {
    console.log(response.data.lista_pacijenata.DATA);
    setData(response.data.lista_pacijenata.DATA);
    setNameValue("");
    setIsSearching(true);
  })
  .catch((err) => console.log(err))
}

const handleJMBGSearch = async (e) =>{
  e.preventDefault();
  return await axios
  .get(`http://81.93.66.18:8234/api2.cfc?method=pacijent_trazi&jmbg=${jmbgValue}`)
  .then((response)=> {
    console.log(response.data.lista_pacijenata.DATA);
    setData(response.data.lista_pacijenata.DATA);
    setJMBGValue("");
    setIsSearching(true);
  })
  .catch((err) => console.log(err))
}


  return (
    <div className="App">
      <header className="App-header">
      <div className="search-container">
        <div className="patients">Evidencija pacijenata</div>
        <form onSubmit={handleNameSearch || handleJMBGSearch}>
        <input type="number" onChange={(e) => setJMBGValue(e.target.value)} className="search" placeholder="JMBG..." />
        <input type="text" onChange={(e) => setNameValue(e.target.value)} className="search" placeholder="Ime ili prezime..." />
          <button type="submit" className="search-trazi" >Traži</button>
          <button className="dodaj" type="button" onClick={()=>{setOpenModal(true)} }>Dodaj pacijenta</button> 
          </form>
               { openModal && <Modal closeModal={setOpenModal} />}
          </div>
          {isSearching && <Pacijenti pacijenti={data} gradovi={items} />}
               </header>
      
    </div>
  );
}

export default App;