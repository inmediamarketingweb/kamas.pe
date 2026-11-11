function Colchones(){
    return(
        <div className="block-container">
            <section className="block-content">
                <div className="block-title-container">
                    <h2 className="block-title">Descanso a tu medida</h2>
                    <p className="text">Encuentra tu colchón ideal en diferentes niveles de firmeza, tecnología pocket y diseños en la medida y forma que necesitas.</p>
                </div>

                <ul className="pg-index-cat-prds">
                    <li>
                        <a href="/productos/colchones/?línea-de-colchón=semi-ortopédicos" title="Colchones semiortopédicos | Kamas">
                            <img src="/assets/imagenes/pag-principal/colchones/semi-ortopedicos.jpg" alt="colchones semiortopédicos kamas"/>
                            <p className="text">Línea semi ortopédicos</p>
                        </a>
                    </li>
                    <li>
                        <a href="/productos/colchones/?línea-de-colchón=ortopédicos" title="Ortopédicos | Kamas">
                            <img src="/assets/imagenes/pag-principal/colchones/ortopedicos.jpg" alt="colchones ortopédicos kamas"/>
                            <p className="text">Línea ortopédicos</p>
                        </a>
                    </li>
                    <li>
                        <a href="/productos/colchones/?resortes=pocket" title="Colchones pocket | Kamas">
                            <img src="/assets/imagenes/pag-principal/colchones/pocket.jpg" alt="colchones de resortes pocket kamas"/>
                            <p className="text">Colchones pocket</p>
                        </a>
                    </li>
                    <li>
                        <a href="/productos/colchones/?formato=circulares" title="Colchones circulares | Kamas">
                            <img src="/assets/imagenes/pag-principal/colchones/circulares-2.png" alt="colchones circulares kamas"/>
                            <p className="text">Circulares</p>
                        </a>
                    </li>
                    <li>
                        <a href="/productos/colchones/medida-personalizada/" title="Colchones medida personalizada | Kamas">
                            <img src="/assets/imagenes/pag-principal/colchones/a-medida-2.png" alt="colchones a medida kamas"/>
                            <p className="text">Medida personalizada</p>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default Colchones;
