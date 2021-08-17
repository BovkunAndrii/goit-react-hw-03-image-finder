import { createPortal } from "react-dom";
import { Component } from "react";
import S from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  }
  handleKeydown = (e) => {
    if (e.code === "Escape") {
      this.props.showModal();
    }
  };
  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.showModal();
    }
  };

  render() {
    return createPortal(
      <div className={S.Overlay} onClick={this.handleBackdropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
