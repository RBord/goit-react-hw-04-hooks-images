import {useEffect} from 'react';
import s from '../Modal/Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

function Modal({fullImg, onClick}) {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClick();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClick]);
   
    const handleOverlayClick = e => {
        if (e.target === e.currentTarget) {
            onClick();
        }
    }
    
    return createPortal(
        <div className={s.Overlay} onClick={handleOverlayClick} >
            <div className={s.Modal} onClick={onClick}>
                <img src={fullImg} alt="" />
            </div>
        </div>,
        modalRoot,
    )
    
}

export default Modal;