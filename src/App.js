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
const [nameValue, setNameValue] = useState('')
const [jmbgValue, setJMBGValue] = useState('')

const fetchGradovi = async () => {
  const response = await fetch("http://81.93.66.18:8234//api.cfc?method=gradovi_lista");
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
}, []);


 function search(e) {
e.preventDefault();
if (nameValue.length >= 1 ) {
 
  e.preventDefault();

  if (nameValue.trim() ===  '' || nameValue.trim() === null) {
    return alert('Morate unijeti karaktere za pretragu!');
  }
  if (nameValue.trim().length >= 1 && nameValue.trim().length <= 3) {
    return alert('Morate unijeti više od tri karaktera za pretragu!')
  }
  
  return axios
  .get(`http://81.93.66.18:8234//api2.cfc?method=pacijent_trazi&ime=${nameValue}`)
  .then((response)=> {
    console.log(response.data.lista_pacijenata.DATA);
    const transformedData = response.data.lista_pacijenata.DATA.map(item => {
      let pomocnaVarijabla = '';
      pomocnaVarijabla = items.findIndex(grad => {return grad.id_grad === item[4]});
      return {
        id: item[0],
        prezime: item[1],
        ime: item[2],
        jmbg: item[3],
        grad: items[pomocnaVarijabla].naziv
      }
    });
    setData(transformedData);
    setIsSearching(true);
  })
  .catch((err) => console.log(err))
}else{
  e.preventDefault();

  if (jmbgValue.trim() ===  '' || jmbgValue.trim() === null) {
    return alert('Morate unijeti karaktere za pretragu!');
  }
  if (jmbgValue.trim().length >= 1 && jmbgValue.trim().length <= 3) {
    return alert('Morate unijeti više od tri karaktera za pretragu!')
  }
  
  return axios
  .get(`http://81.93.66.18:8234//api2.cfc?method=pacijent_trazi&jmbg=${jmbgValue}`)
  .then((response)=> {
    console.log(response.data.lista_pacijenata.DATA);
    const transformedData = response.data.lista_pacijenata.DATA.map(item => {
      let pomocnaVarijabla = '';
      pomocnaVarijabla = items.findIndex(grad => {return grad.id_grad === item[4]});
      return {
        id: item[0],
        prezime: item[1],
        ime: item[2],
        jmbg: item[3],
        grad: pomocnaVarijabla !== -1 ? items[pomocnaVarijabla].naziv : ""
      }
    });
    setData(transformedData);
    setIsSearching(true);
  })
  .catch((err) => console.log(err))
}
}  
  return (
    
    <div className="App">
      <header className="App-header">
      <div className="search-container">
        <div className="patients">Evidencija pacijenata</div>
        <form onSubmit={search}>
        <input  type="number" onChange={(e) => setJMBGValue(e.target.value)} className="search" placeholder="JMBG..." />
        <input value={nameValue} type="text" onChange={(e) => setNameValue(e.target.value)} className="search" placeholder="Ime ili prezime..." />
          <button type="submit" className="search-trazi" >Traži</button>
          <button className="dodaj" type="button" onClick={()=>{setOpenModal(true)} }>Dodaj pacijenta</button> 
          </form>
               { openModal && <Modal gradovi={items} mbroj={data} closeModal={setOpenModal} />}
          </div>
          {isSearching && <Pacijenti pacijenti={data}/>}
               </header>
               
    </div>

 
  );
}

export default App;