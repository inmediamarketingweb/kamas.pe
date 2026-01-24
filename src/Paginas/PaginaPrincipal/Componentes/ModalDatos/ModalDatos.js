import { useState, useEffect } from 'react';

import './ModalDatos.css';

function ModalDatos() {
    const storedNombre = localStorage.getItem('nombre') || '';
    const storedDepartamento = localStorage.getItem('departamento') || '';
    const storedProvincia = localStorage.getItem('provincia') || '';
    const storedDistrito = localStorage.getItem('distrito') || '';

    const dataIncomplete = !(storedNombre && storedDepartamento && storedProvincia && storedDistrito);

    const [modalVisible, setModalVisible] = useState(false);
    const [shouldRenderModal, setShouldRenderModal] = useState(false);
    const [departamentos, setDepartamentos] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [selectedValues, setSelectedValues] = useState({
        nombre: storedNombre,
        departamento: storedDepartamento,
        provincia: storedProvincia,
        distrito: storedDistrito,
    });

    useEffect(() => {
        if (!dataIncomplete) return;

        const handleScroll = () => {
            if (window.scrollY >= window.innerHeight * 0.8) {
                setShouldRenderModal(true);
                setModalVisible(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dataIncomplete]);

    useEffect(() => {
        if (shouldRenderModal) {
            fetch('/assets/json/costos-de-envio.json')
                .then((response) => response.json())
                .then((data) => setDepartamentos(data.departamentos))
                .catch((error) => console.error('Error al cargar el JSON:', error));
        }
    }, [shouldRenderModal]);

    useEffect(() => {
        if (departamentos.length > 0 && selectedValues.departamento) {
            const departamentoObj = departamentos.find(dep => dep.departamento === selectedValues.departamento);
            if (departamentoObj) {
                setProvincias(departamentoObj.provincias);
                const provinciaObj = departamentoObj.provincias.find(p => p.provincia === selectedValues.provincia);
                if (provinciaObj) {
                    setDistritos(provinciaObj.distritos);
                } else {
                    setDistritos([]);
                }
            }
        }
    }, [departamentos, selectedValues.departamento, selectedValues.provincia]);

    const handleChange = (key, value) => {
        const newValues = { ...selectedValues, [key]: value };

        if (key === 'departamento') {
            newValues.provincia = '';
            newValues.distrito = '';
            localStorage.removeItem('provincia');
            localStorage.removeItem('distrito');
        } else if (key === 'provincia') {
            newValues.distrito = '';
            localStorage.removeItem('distrito');
        }

        setSelectedValues(newValues);
        localStorage.setItem(key, value);
    };

    const handleConfirm = () => {
        const { nombre, departamento, provincia, distrito } = selectedValues;
        if (nombre && departamento && provincia && distrito) {
            setModalVisible(false);
        } else {
            alert('Por favor, completa todos los datos antes de confirmar.');
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div className={`modal-datos-container ${!modalVisible ? 'desactive' : ''}`}>
            {shouldRenderModal && (
                <section className="modal-datos-content">
                    <div className="modal-datos">
                        <div className="d-flex-center-between gap-20">
                            <p className="title">¡Hola 👋! Bienvenido a KAMAS</p>
                            <button type="button" className="modal-datos-close-top" onClick={handleCloseModal}>
                                <span className="material-icons">close</span>
                            </button>
                        </div>

                        <p className="text">Antes de explorar, ayúdanos con tu nombre y tu ubicación.</p>

                        <div className="modal-datos-form">
                            <ul className="d-flex-column gap-10">
                                <li>
                                    <label>Nombres:</label>
                                    <input type="text" placeholder="Juan Perez" onChange={(e) => handleChange('nombre', e.target.value)} value={selectedValues.nombre} />
                                </li>
                                <li>
                                    <label>Departamento:</label>
                                    <select onChange={(e) => handleChange('departamento', e.target.value)} value={selectedValues.departamento}>
                                        <option value="">-- Seleccione --</option>
                                        {departamentos.map((dep, index) => (
                                            <option key={index} value={dep.departamento}>{dep.departamento}</option>
                                        ))}
                                    </select>
                                </li>
                                <li>
                                    <label>Provincia:</label>
                                    <select onChange={(e) => handleChange('provincia', e.target.value)} value={selectedValues.provincia}>
                                        <option value="">-- Seleccione --</option>
                                        {provincias.map((prov, index) => (
                                            <option key={index} value={prov.provincia}>{prov.provincia}</option>
                                        ))}
                                    </select>
                                </li>
                                <li>
                                    <label>Distrito:</label>
                                    <select onChange={(e) => handleChange('distrito', e.target.value)} value={selectedValues.distrito}>
                                        <option value="">-- Seleccione --</option>
                                        {distritos.map((dist, index) => (
                                            <option key={index} value={dist.distrito}>{dist.distrito}</option>
                                        ))}
                                    </select>
                                </li>
                                <div className="d-flex-center-center gap-10 modal-datos-buttons">
                                    <button type="button" className="modal-datos-close" onClick={handleCloseModal}>
                                        <span className="material-icons">close</span>
                                        <p>Cancelar</p>
                                    </button>
                                    <button type="button" className="modal-datos-confirm" onClick={handleConfirm}>
                                        <span className="material-icons">check</span>
                                        <p>Confirmar</p>
                                    </button>
                                </div>
                            </ul>
                        </div>

                        <p className="text">¿Qué hacemos con estos datos? <a href="/" title="">políticas de privacidad</a></p>
                    </div>
                </section>
            )}
        </div>
    );
}

export default ModalDatos;
