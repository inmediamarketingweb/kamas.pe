import './Promocion.css';

function Promocion(){
    return(
        <section className='block-container featured-product-container'>
            <div className='block-content featured-product-content'>
                <div className='d-flex-column gap-10'>
                    <p className='block-title text-left'>DORMITORIO KAMAS AMERICANO KING CON PIECERA + COLCHÓN SUPER ORTOPÉDICO KAMAS DER PRINZ + CABECERA PEDESTAL CORONA - CHAMPAGNE</p>
                    <p className='title'>Duerme como un bebé y olvidate de los dolores de espalda al despertar con este elegante dormitorio y su colchón super ortopédico Der Prinz el cuál cuenta con refuerzos centrales para un mejor confort y durabilidad.</p>
                    <p className='text'>Elegante dormitorio color champagne con detalles en dorado para un mayor atractivo. Cabecera tipo pedestal con corte corona con brazos rectos para un mejor encaje del colchón, estructura de madera, laminas de MDF y espuma zebra, cubierta con tela piel de potro acompoñada de una piecera con el mismo corte para brindar una opción de reposo.</p>
                    <a href='/productos/dormitorios/americanos/king/der-prinz/194/' className='button-link button-link-2 margin-right'>
                        <p className='button-link-text'>Ver producto</p>
                        <span className="material-icons">chevron_right</span>
                    </a>
                </div>
                <div>
                    <img src="https://www.kamas.pe/assets/imagenes/productos/dormitorios/americanos/king/der-prinz/pedestales/coronas/brazos-rectos/otros-modelos/1/1.jpg" alt='' />
                </div>
            </div>
        </section>
    )
}

export default Promocion;
