import './Sku.css';

function Sku({producto}){
    const handleCopy = () => {
        const skuElement = document.querySelector('.sku');
        if (!skuElement) return;
        const skuText = skuElement.textContent.trim();
        navigator.clipboard.writeText(skuText)
        .then(() => {
            const copiedElement = document.querySelector('.copied');
                if (copiedElement){
                copiedElement.classList.add('active');
                setTimeout(() => {
                    copiedElement.classList.remove('active');
                }, 3000);
            }
        })
        .catch(err => {
            console.error("Error al copiar el SKU: ", err);
        });
    };

    return(
        <button type='button' className='product-page-sku' onClick={handleCopy}>
            <p>SKU:</p>
            <p className='sku'>{producto.sku}</p>
            <span className="material-symbols-outlined">content_copy</span>

            <span className='copied'>¡SKU copiado al portapapeles!</span>
        </button>
    )
}

export default Sku;
