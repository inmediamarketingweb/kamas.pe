import './ModalOffers.css';

import { useState, useEffect } from 'react';

function ModalOffers() {
    const [isActive, setIsActive] = useState(false);
    const [permanentlyDisabled, setPermanentlyDisabled] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const savedPreference = localStorage.getItem('modalOffersPermanentlyDisabled');
        if (savedPreference === 'true') {
            setPermanentlyDisabled(true);
        }
    }, []);

    useEffect(() => {
        if (!permanentlyDisabled) {
            const timer = setTimeout(() => {
                setIsActive(true);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [permanentlyDisabled]);

    const closeModal = (shouldDisablePermanently) => {
        if (shouldDisablePermanently) {
            localStorage.setItem('modalOffersPermanentlyDisabled', 'true');
            setPermanentlyDisabled(true);
        }
        setIsActive(false);
    };

    const handleClose = () => {
        closeModal(isChecked);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    if (permanentlyDisabled) {
        return null;
    }

    return (
        <>
            <div className={`modal-offer-layer ${!isActive ? 'desactive' : ''}`} onClick={handleClose}></div>

            <button className={`modal-offer-close ${!isActive ? 'desactive' : ''}`} onClick={handleClose}>
                <span className="material-symbols-outlined">close</span>
            </button>

            <div className={`modal-offer-container ${!isActive ? 'desactive' : ''}`}>
                <a href='https://kamas.pe/productos/dormitorios/?tama%C3%B1o=king&l%C3%ADnea=americana&modelo-de-colch%C3%B3n=sarki&cajones=no&base-encajonada=no&tipo-de-cabecera=a%C3%A9rea-con-patas&brazos-de-cabecera=sin-brazos' title='Cyber Mom en Kamas, desde el 01 al 15 de mayo encuentra las mejores ofertas en dormitorios king.'>
                    <img src="/assets/imagenes/kamas/flyer-papa.webp" alt="Feliz día papá, regalale el dormitorio ideal."/>
                </a>

                <label className="modal-checkbox-label">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="modal-checkbox"/>
                    <p>No volver a mostrar</p>
                </label>
            </div>
        </>
    )
}

export default ModalOffers;
