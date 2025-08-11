import './WhatsApp.css';

function WhatsApp({producto, selectedShipping, shippingInfo, selectedColor, quantity, handleContinuarClick, precioFinal}) {
    if (!producto) return null;

    const getWhatsAppLink = () => {
        if (!selectedShipping.tipo) return "#";

        const numeroWhatsApp = "+51917013610";
        const userName = localStorage.getItem('nombre') || '';

        const mensaje = `Hola Kamas, estoy interesad@ en adquirir este/os producto/s:\n`
            + `*${producto.nombre}*\n`
            + `https://kamas.pe${producto.ruta}\n`
            + `Tela: ${selectedColor ? selectedColor.tela : 'Sin variación'}\n`
            + `Color: ${selectedColor ? selectedColor.color : 'Sin variación'}\n`
            + `Precio: S/.${precioFinal}\n\n`
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

    const buttonClasses = [
        'product-page-whatsapp',
        hasRequiredFields && 'active',
        producto.stock === 0 && 'sin-stock'
    ].filter(Boolean).join(' ');

    return(
        <a href={getWhatsAppLink()} className={buttonClasses} target="_blank" rel="noopener noreferrer" onClick={handleContinuarClick}>
            <img src="/assets/imagenes/iconos/whatsapp-blanco.svg" alt="WhatsApp | Kamas"/>
            <p>Continuar</p>
        </a>
    )
}

export default WhatsApp;
