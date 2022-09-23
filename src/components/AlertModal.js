import React from "react";
import "./AlertModal.css";


//Potvrdni modal za dodavanje pacijenta
export function AlertModalAdd(props) {
  return (
    <div className="form-alert-container">
      <form>
        <div className="div-alert-close">
          <span
            className="alert-close"
            onClick={() => props.closeAlertModal(false)}
          >
            ✖
          </span>
        </div>
        <span className="alert-title">Uspješno ste dodali novog pacijenta</span>
        <input
          type="button"
          className="alert-exit"
          onClick={() => props.closeAlertModal(false)}
          value="OK"
        />
      </form>
    </div>
  );
}

//Potvrdni modal za JMBG po algoritmu

export function AlertModalDobarJMBG(props) {
  return (
    <div className="form-alert-container">
      <form>
        <div className="div-alert-close">
          <span
            className="alert-close"
            onClick={() => props.closeAlertModalDobarJMBG(false)}
          >
            ✖
          </span>
        </div>
        <span className="alert-title">
          Matični broj je ispravan po algoritmu!
        </span>
        <input
          type="button"
          className="alert-exit"
          onClick={() => props.closeAlertModalDobarJMBG(false)}
          value="OK"
        />
      </form>
    </div>
  );
}


//Modal za JMBG koji nije ispravan po algoritmu

export function AlertModalLosJMBG(props) {
  return (
    <div className="form-alert-container">
      <form>
        <div className="div-alert-close">
          <span
            className="alert-close"
            onClick={() => props.closeAlertModalLosJmbg(false)}
          >
            ✖
          </span>
        </div>
        <span className="alert-title">
          Matični broj nije ispravan po algoritmu!
        </span>
        <input
          type="button"
          className="alert-exit"
          onClick={() => props.closeAlertModalLosJmbg(false)}
          value="OK"
        />
      </form>
    </div>
  );
}


//Potvrdni modal da je obrisan pacijent

export function AlertModalDelete(props) {
  return (
    <div className="form-alert-container">
      <form>
        <div className="div-alert-close">
          <span
            className="alert-close"
            onClick={() => props.closeAlertModalDelete(false)}
          >
            ✖
          </span>
        </div>
        <span className="alert-title">Uspješno ste obrisali pacijenta!</span>
        <input
          type="button"
          className="alert-exit"
          onClick={() => props.closeAlertModalDelete(false)}
          value="OK"
        />
      </form>
    </div>
  );
}

//Potvrdni modal za izvršene izmijene

export function AlertModalEdit(props) {
  return (
    <div className="form-alert-container">
      <form>
        <div className="div-alert-close">
          <span
            className="alert-close"
            onClick={() => props.closeAlertModalEdit(false)}
          >
            ✖
          </span>
        </div>
        <span className="alert-title">Uspješno ste napravili izmijene!</span>
        <input
          type="button"
          className="alert-exit"
          onClick={() => props.closeAlertModalEdit(false)}
          value="OK"
        />
      </form>
    </div>
  );
}

//Potvrdni modal za dodavanje grada

export function AlertModalAddGrad(props) {
  return (
    <div className="form-alert-container">
      <form>
        <div className="div-alert-close">
          <span
            className="alert-close"
            onClick={() => props.closeAlertModalAddGrad(false)}
          >
            ✖
          </span>
        </div>
        <span className="alert-title">Dodali ste novi grad!</span>
        <input
          type="button"
          className="alert-exit"
          onClick={() => props.closeAlertModalAddGrad(false)}
          value="OK"
        />
      </form>
    </div>
  );
}

//Modal potvrde za brisanje pacijenta

export function AlertModalDeleteConfirmation(props) {
  return (
    <div className="form-alert-container">
      <form>
        <div className="div-alert-close">
          <span
            className="alert-close"
            onClick={() => props.onDialog(false)} 
              >
            ✖
          </span>
        </div>
        <span className="alert-title">{props.message}</span>
        <input
          type="button"
          className="alert-delete"
          value="Obriši"
            onClick={() => props.onDialog(true)}      />
        <input
          type="button"
          className="alert-exit"
          value="Odustani"
          onClick={() => props.onDialog(false)} 
        />
      </form>
    </div>
  );
}

//Modal za obavezan unos imena pacijenta

export function AlertModalImePacijenta(props) {
      return (
            <div className="form-alert-container">
              <form>
                <div className="div-alert-close">
                  <span
                    className="alert-close"
                    onClick={() => props.closeAlertModalImePacijenta(false)}
                  >
                    ✖
                  </span>
                </div>
                <span className="alert-title">Morate unijeti ime pacijenta!</span>
                <input
                  type="button"
                  className="alert-exit"
                  onClick={() => props.closeAlertModalImePacijenta(false)}
                  value="OK"
                />
              </form>
            </div>
          );
}

//Modal  za obavezan unos više od dva karaktera

export function AlertModalViseOdDvaKaraktera(props) {
      return (
            <div className="form-alert-container">
              <form>
                <div className="div-alert-close">
                  <span
                    className="alert-close"
                    onClick={() => props.closeAlertModalViseOdDvaKaraktera(false)}
                  >
                    ✖
                  </span>
                </div>
                <span className="alert-title">Morate unijeti više od dva karaktera!</span>
                <input
                  type="button"
                  className="alert-exit"
                  onClick={() => props.closeAlertModalViseOdDvaKaraktera(false)}
                  value="OK"
                />
              </form>
            </div>
          );
}


//Modal za obavezan unos prezimena pacijenta

export function AlertModalPrezimePacijenta(props) {
      return (
            <div className="form-alert-container">
              <form>
                <div className="div-alert-close">
                  <span
                    className="alert-close"
                    onClick={() => props.closeAlertModalPrezimePacijenta(false)}
                  >
                    ✖
                  </span>
                </div>
                <span className="alert-title">Morate unijeti prezime pacijenta!</span>
                <input
                  type="button"
                  className="alert-exit"
                  onClick={() => props.closeAlertModalPrezimePacijenta(false)}
                  value="OK"
                />
              </form>
            </div>
          );
}

//Modal za obavezan unos JMBG pacijenta

export function AlertModalJMBGPacijenta(props) {
      return (
            <div className="form-alert-container">
              <form>
                <div className="div-alert-close">
                  <span
                    className="alert-close"
                    onClick={() => props.closeAlertModaJMBGPacijenta(false)}
                  >
                    ✖
                  </span>
                </div>
                <span className="alert-title">Morate unijeti matični broj pacijenta!</span>
                <input
                  type="button"
                  className="alert-exit"
                  onClick={() => props.closeAlertModaJMBGPacijenta(false)}
                  value="OK"
                />
              </form>
            </div>
          );
}


//Modal za tačan broj karaktera kod obaveznog unosa JMBG pacijenta



export function AlertModalJMBGTacnoKaraktera(props) {
      return (
            <div className="form-alert-container">
              <form>
                <div className="div-alert-close">
                  <span
                    className="alert-close"
                    onClick={() => props.closeAlertModalJMBGTacnoKaraktera(false)}
                  >
                    ✖
                  </span>
                </div>
                <span className="alert-title">Morate unijeti tačno 13 karaktera!</span>
                <input
                  type="button"
                  className="alert-exit"
                  onClick={() => props.closeAlertModalJMBGTacnoKaraktera(false)}
                  value="OK"
                />
              </form>
            </div>
          );
}


//Modal za obavezan unos više od tri karaktera za pretragu

export function AlertModalViseOdTriKaraktera(props) {
      return (
            <div className="form-alert-container">
              <form>
                <div className="div-alert-close">
                  <span
                    className="alert-close"
                    onClick={() => props.closeAlertModalViseOdTriKaraktera(false)}
                  >
                    ✖
                  </span>
                </div>
                <span className="alert-title">Morate unijeti više od tri karaktera!</span>
                <input
                  type="button"
                  className="alert-exit"
                  onClick={() => props.closeAlertModalViseOdTriKaraktera(false)}
                  value="OK"
                />
              </form>
            </div>
          );
}


//Modal za obavezan unos karaktera za pretragu


export function AlertModalKarakteriZaPretragu(props) {
      return (
            <div className="form-alert-container">
              <form>
                <div className="div-alert-close">
                  <span
                    className="alert-close"
                    onClick={() => props.closeAlertModalKarakteriZaPretragu(false)}
                  >
                    ✖
                  </span>
                </div>
                <span className="alert-title">Morate unijeti karaktere za pretragu!</span>
                <input
                  type="button"
                  className="alert-exit"
                  onClick={() => props.closeAlertModalKarakteriZaPretragu(false)}
                  value="OK"
                />
              </form>
            </div>
          );
}


//Modal za obavezno dodavanje grada kod unosa pacijenta
export function AlertModalOdabirGrada(props) {
  return (
        <div className="form-alert-container">
          <form>
            <div className="div-alert-close">
              <span
                className="alert-close"
                onClick={() => props.closeAlertModalOdabirGrada(false)}
              >
                ✖
              </span>
            </div>
            <span className="alert-title">Morate izabrati grad za pacijenta!</span>
            <input
              type="button"
              className="alert-exit"
              onClick={() => props.closeAlertModalOdabirGrada(false)}
              value="OK"
            />
          </form>
        </div>
      );
}
//Modal za obavezan unos imena grada
export function AlertModalImeGrada(props) {
  return (
        <div className="form-alert-container">
          <form>
            <div className="div-alert-close">
              <span
                className="alert-close"
                onClick={() => props.closeAlertModalImeGrada(false)}
              >
                ✖
              </span>
            </div>
            <span className="alert-title">Morate unijeti ime grada!</span>
            <br/>
            <input
              type="button"
              className="alert-exit"
              onClick={() => props.closeAlertModalImeGrada(false)}
              value="OK"
            />
          </form>
        </div>
      );
}

//Modal za obavezan unos longitude
export function AlertModalLong(props) {
  return (
        <div className="form-alert-container">
          <form>
            <div className="div-alert-close">
              <span
                className="alert-close"
                onClick={() => props.closeAlertModalLong(false)}
              >
                ✖
              </span>
            </div>
            <span className="alert-title">Morate unijeti longitudu grada!</span>
            <br/>
            <input
              type="button"
              className="alert-exit"
              onClick={() => props.closeAlertModalLong(false)}
              value="OK"
            />
          </form>
        </div>
      );
}


//Modal za obavezan unos latituda
export function AlertModalLat(props) {
  return (
        <div className="form-alert-container">
          <form>
            <div className="div-alert-close">
              <span
                className="alert-close"
                onClick={() => props.closeAlertModalLat(false)}
              >
                ✖
              </span>
            </div>
            <span className="alert-title">Morate unijeti latitudu grada!</span>
            <br/>
            <input
              type="button"
              className="alert-exit"
              onClick={() => props.closeAlertModalLat(false)}
              value="OK"
            />
          </form>
        </div>
      );
}