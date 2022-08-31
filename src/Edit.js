import React from "react";
import './Pacijenti.css'
import axios from "axios";

function Edit(props) {

  function deletePatient(id, e) {
    e.preventDefault();
    console.log(id)
    axios.post(`http://81.93.66.18:8234/api2.cfc?method=pacijent_obrisi&id=${id}`)
    .then(res=> {
        console.log(res.data);
       alert('Pacijent je obrisan!')
    })
}


  return (
    <>
    <table className="tabela">

<tr className="heading">
  <th>JMBG</th>
  <th>IME</th>
  <th>PREZIME</th>
  <th>GRAD</th>
</tr>
        {props.pacijenti.map(item => (
          <tr key={item.id} className="lista">
           <th>
           {item.jmbg}
            </th>
           <th>
           {item.ime.charAt(0).toUpperCase() + item.ime.slice(1).toLowerCase() }
           </th>
           <th>
           {item.prezime.charAt(0).toUpperCase() + item.prezime.slice(1).toLowerCase()}
           </th>
           <th>
            {item.grad}
           </th>
           <th >
           <input type="submit" className="edit" value="Izmjena"    />
                     </th>
           <th>
           <input type="submit" onClick={(e) => deletePatient(item.id, e)} className="delete" value="Izbriši" />
           </th>
          </tr>
        ))}
      </table>
    </>
          
        );

}

export default Edit;