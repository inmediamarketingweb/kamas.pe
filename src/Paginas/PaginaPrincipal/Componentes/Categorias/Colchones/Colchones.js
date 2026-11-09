function Colchones(){
    return(
        <div className="block-container">
            <section className="block-content">
                <div className="block-title-container">
                    <h2 className="block-title">Colchones</h2>
                    <p className="text">Encuentra el ideal para un descanso confortante</p>
                </div>

                <ul className="pg-index-cat-prds">
                    <li>
                        <a href="/productos/colchones/?línea-de-colchón=semi-ortopédicos" title="Colchones semiortopédicos | Kamas">
                            <img src="/assets/imagenes/pag-principal/colchones/semi-ortopedicos.jpg" alt=""/>
                            <p className="text">Línea semi ortopédicos</p>
                        </a>
                    </li>
                    <li>
                        <a href="/productos/colchones/?línea-de-colchón=ortopédicos" title="Ortopédicos | Kamas">
                            <img src="/assets/imagenes/pag-principal/colchones/ortopedicos.jpg" alt=""/>
                            <p className="text">Línea ortopédicos</p>
                        </a>
                    </li>
                    <li>
                        <a href="/productos/colchones/?resortes=pocket" title="Colchones pocket | Kamas">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfP33lI1T7YGRycbrkS9L5I63mnCJ6P31lvqE6bC8NjxalzIWjDgHi72Mp&s=10" alt=""/>
                            <p className="text">Colchones pocket</p>
                        </a>
                    </li>
                    <li>
                        <a href="/productos/colchones/?formato=circulares" title="Colchones circulares | Kamas">
                            <img src="/assets/imagenes/pag-principal/colchones/circulares.jpg" alt=""/>
                            <p className="text">Circulares</p>
                        </a>
                    </li>
                    <li>
                        <a href="/productos/colchones/medida-personalizada/" title="Colchones medida personalizada | Kamas">
                            <img src="https://homesleep.pe/assets/imagenes/productos/colchones/1.webp" alt="Colchones | Kamas"/>
                            <p className="text">Medida personalizada</p>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default Colchones;
