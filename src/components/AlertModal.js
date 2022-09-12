import React from "react";
import "./AlertModal.css";

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
export function AlertModalDeleteConfirmation(props) {
  return (
    <div className="form-alert-container">
      <form>
        <div className="div-alert-close">
          <span
            className="alert-close"
                      >
            ✖
          </span>
        </div>
        <span className="alert-title">{props.message}</span>
        <input
          type="button"
          className="alert-exit"
          value="Obriši"
          onClick={()=> props.onDialog(true)}
        />
        <input
          type="button"
          className="alert-exit"
          value="Odustani"
          onClick={()=> props.onDialog(false)}
        />
      </form>
    </div>
  );
}
