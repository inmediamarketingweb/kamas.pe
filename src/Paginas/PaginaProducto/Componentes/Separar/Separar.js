import './Separar.css';

function Separar({ producto, selectedShipping, shippingInfo, selectedColor, quantity, handleContinuarClick, precioFinal }) {
    if (!producto) return null;

    const getWhatsAppLink = () => {
        if (!selectedShipping.tipo) return "#";
        
        const numeroWhatsApp = "+51917013610";
        const userName = localStorage.getItem('nombre') || '';

        const mensaje = `¡Hola Kamas! Quiero *SEPARAR CON S/100* este/os producto/s:\n`
            + `*${producto.nombre}*\n`
            + `https://kamas.pe${producto.ruta}\n`
            + `Tela: ${selectedColor ? selectedColor.tela : 'Sin variación'}\n`
            + `Color: ${selectedColor ? selectedColor.color : 'Sin variación'}\n`
            + `Precio Total: S/.${precioFinal}\n`
            + `*Abono por separación: S/100*\n\n`
            + `Cantidad: ${quantity}\n\n`
            + `Cliente: ${userName}\n`
            + `Departamento: ${shippingInfo?.locationData?.departamento || ''}\n`
            + `Provincia: ${shippingInfo?.locationData?.provincia || ''}\n`
            + `Distrito: ${shippingInfo?.locationData?.distrito || ''}\n\n`
            + (shippingInfo?.selectedAgency ? `Agencia seleccionada: ${shippingInfo.selectedAgency}\n` : "")
            + (shippingInfo?.selectedSede ? `Sede de agencia: ${shippingInfo.selectedSede}\n` : "")
            + `Tipo de envío seleccionado: ${selectedShipping.tipo}\n`
            + `Costo de envío: S/.${selectedShipping.precio || 0}`;
    
        return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    };

    const userName = localStorage.getItem('nombre') || '';
    const district = shippingInfo?.locationData?.distrito || '';
    const headquarters = shippingInfo?.selectedAgency || shippingInfo?.selectedSede || '';
    
    const hasRequiredFields = Boolean(
        userName.trim() && 
        (district.trim() || headquarters.trim())
    );

    const isOutOfStock = producto.stock === 0;
    const buttonClasses = [
        'button-link',
        'button-link-6',
        hasRequiredFields && !isOutOfStock ? 'active' : 'disabled',
        isOutOfStock && 'sin-stock'
    ].filter(Boolean).join(' ');

    const handleClick = (e) => {
        if (!hasRequiredFields || isOutOfStock) {
            e.preventDefault();
            alert('Por favor completa todos los campos requeridos antes de continuar');
            return;
        }
        if (handleContinuarClick) handleContinuarClick();
    };

    return(
        <a href={getWhatsAppLink()} title='Separar oferta' className={buttonClasses} onClick={handleClick} target="_blank" rel="noopener noreferrer">
            <p className='button-link-text'>Separar oferta con <b className='font-bold'>S/100</b></p>
        </a>
    );
}

export default Separar;
