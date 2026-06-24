import './WspButton.css';

function WspButton(){
    return(
        <>
            <a href='https://wa.link/b7ml1d' target='_blank' rel="noopener noreferrer" className='whatsapp-button'>
                <div className='wsp-button'>
                    <img src="/assets/imagenes/iconos/whatsapp-blanco.svg" width={36} height={36} alt="icono de whatsapp"/>
                </div>
            </a>
        </>
    )
}

export default WspButton;
