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
                    <p className='text'>Fabricantes de colchones, dormitorios y muebles para el descanso, con más de 15 años de experiencia innovando en diseños, modelos y sobre todo en brindarte comodidad.</p>
                    <p className='text'>Creamos experiencias que inician desde el primer contacto y culminan con la satisfacción de recibir tu dormitorio completo, personalizado y en tiempo récord.</p>
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
