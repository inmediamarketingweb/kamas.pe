import { useState } from 'react';

import './Descripcion.css';

function Descripcion({ producto }) {
    const [activeTab, setActiveTab] = useState('detalles');
    const formatKey = (key) => key.replace(/-/g, ' ');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    if (producto?.descripcion) {
        return(
            <div className='bg-white padding-10 border-r-6'>
                <div className='d-flex-column gap-10'>
                    <p className='block-title w-auto'>Sobre el producto</p>

                    <div className='product-page-about-container'>
                        <div className='product-page-about-content d-flex-column'>
                            <div className='product-page-about-buttons w-100 d-flex'>
                                <button type='button' className={`product-page-about-button product-page-about-button-1 ${activeTab === 'detalles' ? 'active' : ''}`} onClick={() => handleTabChange('detalles')}>
                                    <p className='text'>Detalles</p>
                                </button>
                                <button type='button' className={`product-page-about-button product-page-about-button-2 ${activeTab === 'especificaciones' ? 'active' : ''}`} onClick={() => handleTabChange('especificaciones')}>
                                    <p className='text'>Especificaciones</p>
                                </button>
                            </div>

                            <div className='product-page-about-lists'>
                                {activeTab === 'detalles' && (
                                    <div className='product-page-about-list product-page-about-list-1'>
                                        <ul>
                                            <li className='d-flex-center-left gap-5'>
                                                <span className="material-icons">check</span>
                                                <div>
                                                    <strong>SKU:</strong>
                                                    <p className='text'>{producto.sku}</p>
                                                </div>
                                            </li>
                                            {producto['detalles-del-producto'] && producto['detalles-del-producto'].map(
                                                (detalle, index) => Object.entries(detalle).map(([key, value]) => (
                                                    <li key={`${index}-${key}`} className='d-flex-center-left gap-5'>
                                                        <span className="material-icons">check</span>
                                                        <div>
                                                            <strong>{formatKey(key)}:</strong>
                                                            <p className='text'>{value}</p>
                                                        </div>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                )}

                                {activeTab === 'especificaciones' && (
                                    <div className='product-page-about-list product-page-about-list-2'>
                                        <ul>
                                            <p className='title'>Descripción</p>
                                            {producto.descripcion.map(
                                                (item, index) => Object.entries(item).map(([key, value]) => (
                                                    <li key={`${index}-${key}`} className='d-flex-center-left gap-5'>
                                                        <span className="material-icons">check</span>
                                                        <div>
                                                            <strong>{formatKey(key)}:</strong>
                                                            <p className='text'>{value}</p>
                                                        </div>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    else if (producto?.descripciones) {
        return (
            <div className='bg-white padding-10 border-r-6'>
                <div className='d-flex-column gap-10'>
                    <p className='block-title w-auto'>Sobre el producto</p>

                    <div className='product-page-about-container'>
                        <div className='product-page-about-content d-flex-column'>
                            <div className='product-page-about-buttons w-100 d-flex'>
                                <button type='button' className={`product-page-about-button product-page-about-button-1 ${activeTab === 'detalles' ? 'active' : ''}`} onClick={() => handleTabChange('detalles')}>
                                    <p className='text'>Detalles</p>
                                </button>
                                <button type='button' className={`product-page-about-button product-page-about-button-2 ${activeTab === 'especificaciones' ? 'active' : ''}`} onClick={() => handleTabChange('especificaciones')}>
                                    <p className='text'>Especificaciones</p>
                                </button>
                            </div>

                            <div className='product-page-about-lists'>
                                {activeTab === 'detalles' && (
                                    <div className='product-page-about-list product-page-about-list-1'>
                                        <ul>
                                            <li className='d-flex-center-left gap-5'>
                                                <span className="material-icons">check</span>
                                                <div>
                                                    <strong>SKU:</strong>
                                                    <p className='text'>{producto.sku}</p>
                                                </div>
                                            </li>
                                            {producto['detalles-del-producto'] && producto['detalles-del-producto'].map(
                                                (detalle, index) => Object.entries(detalle).map(([key, value]) => (
                                                    <li key={`${index}-${key}`} className='d-flex-center-left gap-5'>
                                                        <span className="material-icons">check</span>
                                                        <div>
                                                            <strong>{formatKey(key)}:</strong>
                                                            <p className='text'>{value}</p>
                                                        </div>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                )}

                                {activeTab === 'especificaciones' && (
                                    <div className='product-page-about-list product-page-about-list-2'>
                                        {producto.descripciones.map((grupo, index) => (
                                            <ul key={index}>
                                                <p className='title'>{grupo.titulo}</p>
                                                {grupo.descripcion.map(
                                                    (item, idx) => Object.entries(item).map(([key, value]) => (
                                                        <li key={`${idx}-${key}`} className='d-flex-center-left gap-5'>
                                                            <span className="material-icons">check</span>
                                                            <div>
                                                                <strong>{formatKey(key)}:</strong>
                                                                <p className='text'>{value}</p>
                                                            </div>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default Descripcion;
