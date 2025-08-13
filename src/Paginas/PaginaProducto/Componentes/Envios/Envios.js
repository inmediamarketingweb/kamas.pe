import { useState, useEffect } from 'react';

import './Envios.css';

const initialSelection = {
    departamento: localStorage.getItem('departamento') || '',
    provincia: localStorage.getItem('provincia') || '',
    distrito: localStorage.getItem('distrito') || '',
    agencia: localStorage.getItem('agencia') || '',
    sede: localStorage.getItem('sede') || ''
};

const Dropdown = ({ label, value, options, onSelect, isOpen, toggle }) => (
    <div className="envios-select">
        <div className="envios-select-top" onClick={toggle}>
            <p>{value || `-- Selecciona ${label} --`}</p>
            <span className="material-icons">keyboard_arrow_down</span>
        </div>
        <div className={`envios-select-options-container${isOpen ? ' active' : ''}`}>
            {options.map((item, idx) => (
                <div key={idx} className="envios-select-options-content" onClick={() => onSelect(item)}>
                    <p>{item}</p>
                </div>
            ))}
        </div>
    </div>
);

const ModalSection = ({ title, children }) => (
    <div className="envios-content d-flex-column gap-10">
        <div className="d-flex-center-between">
            <p className="title">{title}</p>
        </div>
        {children}
    </div>
);

function Envios({ producto, onConfirm }){
    const [costosEnvioData, setCostosEnvioData] = useState(null);
    const [selected, setSelected] = useState(initialSelection);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const departamentoData = costosEnvioData?.departamentos.find(d => d.departamento === selected.departamento);
    const provinciaData = departamentoData?.provincias.find(p => p.provincia === selected.provincia);
    const distritoData = provinciaData?.distritos.find(d => d.distrito === selected.distrito);
    const agencies = distritoData?.['agencias-recomendadas'] || [];
    const selectedAgency = agencies.find(a => a.agencia === selected.agencia);
    const provinciaSinAgencia = ['Lima metropolitana', 'Provincia constitucional del Callao'].includes(selected.provincia);
    const noAgencias = agencies.length === 0;
    const isComplete = selected.departamento && selected.provincia && selected.distrito &&  (provinciaSinAgencia || noAgencias || (selected.agencia && selected.sede));

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('/assets/json/costos-de-envio.json');
                setCostosEnvioData(await response.json());
            } catch (error) {
                console.error('Error al cargar JSON de costos de envío:', error);
            }
        };
        fetchData();
    }, []);

    const handleSelection = (key, value) => {
        const resetMap = {
            departamento: ['provincia', 'distrito', 'agencia', 'sede'],
            provincia: ['distrito', 'agencia', 'sede'],
            distrito: ['agencia', 'sede'],
            agencia: ['sede'],
            sede: []
        };

        setSelected(prev => {
            const newSel = { ...prev, [key]: value };
            resetMap[key].forEach(field => {
                newSel[field] = '';
                localStorage.removeItem(field);
            });
            localStorage.setItem(key, value);
            return newSel;
        });
        setOpenDropdown(null);
    };

    const getLocationText = () => {
        if (!isComplete) return 'Selecciona lugar de envío';
        const base = `Para ${selected.departamento}, ${selected.provincia}, ${selected.distrito}`;
        return selected.agencia && selected.sede ? `${base} - ${selected.agencia} (${selected.sede})` : base;
    };

    const getOptions = (dataType) => {
        switch(dataType){
            case 'departamento': return costosEnvioData?.departamentos.map(d => d.departamento) || [];
            case 'provincia': return departamentoData?.provincias.map(p => p.provincia) || [];
            case 'distrito': return provinciaData?.distritos.map(d => d.distrito) || [];
            case 'agencia': return agencies.map(a => a.agencia);
            case 'sede': return selectedAgency?.sedes.map(s => s.sede) || [];
            default: return [];
        }
    };

    const calculateShippingOptions = () => {
        let productShippingCost = null;
        const tieneAgencias = agencies.length > 0;

        if (distritoData) {
            if (tieneAgencias && selected.agencia && selected.sede) {
                const agenciaSeleccionada = agencies.find(a => a.agencia === selected.agencia);
                const sedeSeleccionada = agenciaSeleccionada?.sedes.find(s => s.sede === selected.sede);
                const matchTipoEnvio = sedeSeleccionada?.['tipos-de-envio']?.find(t => t['tipo-de-envio'] === producto['tipo-de-envio']);
                productShippingCost = matchTipoEnvio ? (matchTipoEnvio.precio || matchTipoEnvio.costos || 0) : 0;
            } else if (!tieneAgencias) {
                const tipoCorrespondiente = distritoData['tipos-de-envio']?.find(t => t['tipo-de-envio'] === producto['tipo-de-envio']);
                productShippingCost = tipoCorrespondiente 
                    ? (tipoCorrespondiente.precio || tipoCorrespondiente.costos || 0)
                    : producto['tipo-de-envio'] === "Envío preferente" ? 35 
                    : producto['tipo-de-envio'] === "Envío aplicado" ? 70 
                    : 0;
            }
        }

        const envioDirectoObj = distritoData?.['tipos-de-envio']?.find(t => t['tipo-de-envio'] === "Envío directo");
        const envioExpressObj = producto['tipo-de-envio'] !== "Gratis" 
            ? distritoData?.['tipos-de-envio']?.find(t => t['tipo-de-envio'] === "Envío express")
            : null;

        const shippingOptions = [];

        if (productShippingCost !== null) {
            shippingOptions.push({ 
                tipo: producto['tipo-de-envio'], 
                precio: productShippingCost 
            });
        }

        if (envioDirectoObj) {
            shippingOptions.push({ 
                tipo: envioDirectoObj['tipo-de-envio'], 
                precio: envioDirectoObj.precio || envioDirectoObj.costos || 0 
            });
        }

        if (envioExpressObj) {
            shippingOptions.push({ 
                tipo: envioExpressObj['tipo-de-envio'], 
                precio: envioExpressObj.precio || envioExpressObj.costos || 0 
            });
        }

        return shippingOptions;
    };

    const handleConfirm = () => {
        const shippingOptions = calculateShippingOptions();
        setIsModalOpen(false);
        onConfirm?.({
            distritoData,
            hasAgency: !!selected.agencia,
            shippingOptions,
            selectedAgency: selected.agencia,
            selectedSede: selected.sede,
            locationData: {
                departamento: selected.departamento,
                provincia: selected.provincia,
                distrito: selected.distrito
            }    
        });
    };

    return(
        <>
            <div className="d-flex-column gap-10">
                <div className="d-flex-center-left gap-5">
                    <span className="material-icons color-color-1">local_shipping</span>
                    <p className="title color-color-1">Lugar y tipo de envío</p>
                </div>

                <button type="button" className={`envios-button-open${producto.stock === 0 ? ' sin-stock' : ''}`} onClick={() => setIsModalOpen(true)}>
                    <div className="d-flex-center-left gap-5">
                        <span className="material-icons">location_on</span>
                        <p>{getLocationText()}</p>
                    </div>
                    <span className="material-icons margin-left">keyboard_arrow_down</span>
                </button>
            </div>

            {isModalOpen && (
                <>
                    <div className="envios-container gap-10 active">
                        <div className="d-flex-center-between">
                            <p className="title">Lugar de envío</p>
                            <button type="button" className="envios-button-close" onClick={() => setIsModalOpen(false)}>
                                <span className="material-icons">close</span>
                            </button>
                        </div>

                        <Dropdown label="departamento" value={selected.departamento} options={getOptions('departamento')} 
                            onSelect={(value) => handleSelection('departamento', value)} 
                            isOpen={openDropdown === 'departamento'} 
                            toggle={() => setOpenDropdown(prev => prev === 'departamento' ? null : 'departamento')} 
                        />

                        {selected.departamento && (
                            <Dropdown label="provincia" value={selected.provincia} options={getOptions('provincia')} 
                                onSelect={(value) => handleSelection('provincia', value)} 
                                isOpen={openDropdown === 'provincia'} 
                                toggle={() => setOpenDropdown(prev => prev === 'provincia' ? null : 'provincia')} 
                            />
                        )}

                        {selected.provincia && (
                            <Dropdown label="distrito" value={selected.distrito} options={getOptions('distrito')} 
                                onSelect={(value) => handleSelection('distrito', value)} 
                                isOpen={openDropdown === 'distrito'} 
                                toggle={() => setOpenDropdown(prev => prev === 'distrito' ? null : 'distrito')} 
                            />
                        )}

                        {selected.distrito && !provinciaSinAgencia && (
                            <ModalSection title="Agencias recomendadas">
                                {(noAgencias || selected.distrito === 'Santa Rosa de Quivez') ? (
                                    <div className="message message-warning">
                                        <span className="material-icons">warning</span>
                                        <p>No contamos con agencias recomendadas para el distrito seleccionado.</p>
                                        <p>El precio mostrado es referencial.</p>
                                    </div>
                                ) : (
                                    <Dropdown label="agencia" value={selected.agencia} options={getOptions('agencia')} onSelect={(value) => handleSelection('agencia', value)} isOpen={openDropdown === 'agencia'} toggle={() => setOpenDropdown(prev => prev === 'agencia' ? null : 'agencia')} />
                                )}

                                {selected.agencia && (
                                    <Dropdown label="sede" value={selected.sede} options={getOptions('sede')} onSelect={(value) => handleSelection('sede', value)} isOpen={openDropdown === 'sede'} toggle={() => setOpenDropdown(prev => prev === 'sede' ? null : 'sede')} />
                                )}
                            </ModalSection>
                        )}

                        <div className="d-flex-center-right gap-5">
                            <button type="button" className="button-link button-link-3" onClick={() => setIsModalOpen(false)}>
                                <p className="button-link-text">Cancelar</p>
                            </button>

                            <button type="button" className="button-link button-link-2" disabled={!isComplete} onClick={handleConfirm}>
                                <span className="material-icons">check</span>
                                <p className="button-link-text">Confirmar</p>
                            </button>
                        </div>
                    </div>

                    <div className="envios-layer active" onClick={() => setIsModalOpen(false)}></div>
                </>
            )}
        </>
    );
}

export default Envios;
