import './WhatsApp.css';

function WhatsApp({ producto, selectedShipping, shippingInfo, selectedColor, quantity, handleContinuarClick, precioFinal }) {
    if (!producto) return null;

    const getWhatsAppLink = () => {
        const numeroWhatsApp = "+51917013610";
        const userName = localStorage.getItem('nombre') || '';
        let mensaje = `Hola Kamas, estoy interesad@ en adquirir este/os producto/s:\n` + `*${producto.nombre}*\n` + `https://kamas.pe${producto.ruta}\n`;

        if (selectedColor) {
            mensaje += `Tela: ${selectedColor.tela || 'Sin variación'}\n`;
            mensaje += `Color: ${selectedColor.color || 'Sin variación'}\n`;
        } else {
            mensaje += `Tela: Sin variación\n`;
            mensaje += `Color: Sin variación\n`;
        }

        mensaje += `Precio: S/.${precioFinal}\n\n`;
        mensaje += `Cantidad: ${quantity}\n\n`;

        if (userName.trim()) {
            mensaje += `Cliente: ${userName}\n`;
        }

        const departamento = shippingInfo?.locationData?.departamento || '';
        const provincia = shippingInfo?.locationData?.provincia || '';
        const distrito = shippingInfo?.locationData?.distrito || '';

        if (departamento || provincia || distrito) {
            mensaje += `Departamento: ${departamento}\n`;
            mensaje += `Provincia: ${provincia}\n`;
            mensaje += `Distrito: ${distrito}\n\n`;
        }

        if (shippingInfo?.selectedAgency) {
            mensaje += `Agencia seleccionada: ${shippingInfo.selectedAgency}\n`;
        }
        if (shippingInfo?.selectedSede) {
            mensaje += `Sede de agencia: ${shippingInfo.selectedSede}\n`;
        }

        if (selectedShipping?.tipo) {
            mensaje += `Tipo de envío seleccionado: ${selectedShipping.tipo}\n`;
            mensaje += `Costo de envío: S/.${selectedShipping.precio || 0}`;
        } else {
            mensaje += `Tipo de envío: No seleccionado\n`;
            mensaje += `Costo de envío: Por definir`;
        }

        return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    };

    const buttonClasses = [
        'product-page-whatsapp',
        'active', // Siempre activo
        producto.stock === 0 && 'sin-stock'
    ].filter(Boolean).join(' ');

    return (
        <a href={getWhatsAppLink()} className={buttonClasses} target="_blank"  rel="noopener noreferrer" onClick={handleContinuarClick}>
            <img src="/assets/imagenes/iconos/whatsapp-blanco.svg" alt="WhatsApp | Kamas"/>
            <p>Continuar</p>
        </a>
    );
}

export default WhatsApp;
