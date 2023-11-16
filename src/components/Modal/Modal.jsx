import './Modal.css';
import { createPortal } from "react-dom";

function Modal({ showModal, children }) {
    return (
        showModal && createPortal(
            <div className='modal-window'>
                {children}
            </div>
            , document.querySelector('#modal')
        )
    )
}

export default Modal;