import './SobreNosotros.css';

function SobreNosotros(){
    return(
        <section className='block-container sobre-nosotros-block-container'>
            <div className='block-content sobre-nosotros-block-content gap-10'>
                <div className='d-flex-column gap-10'>
                    <img src='/assets/imagenes/paginas/nosotros/sobre-nosotros.webp' alt='Kamas | Sobre nosotros' className='page-banner-img'/>
                    <img src='/assets/imagenes/paginas/nosotros/sobre-nosotros.webp' alt='Kamas | Sobre nosotros' className='page-banner-img'/>
                </div>

                <div className='d-flex-column'>
                    <h3 className='block-title text-left margin-bottom-10'>¿Quiénes somos?</h3>
                    <p className='text'>En KAMAS creamos más que productos: diseñamos experiencias de descanso que transforman hogares. Con más de 15 años de trayectoria, nos hemos convertido en un referente en innovación, calidad y diseño, ofreciendo camas, colchones y muebles de dormitorio que garantizan confort y bienestar a miles de familias.</p>
                    <a href='/nosotros/' title='Nosotros | Kamas' className='button-link button-link-2 margin-left margin-top-10'>
                        <p className='button-link-text'>Conocer más</p>
                        <span className="material-icons">keyboard_arrow_right</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default SobreNosotros;
