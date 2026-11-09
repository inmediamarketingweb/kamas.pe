function Dormitorios(){
    return(
        <div className="block-container">
            <section className="block-content">
                <div className="block-title-container">
                    <h2 className="block-title">Dormitorios</h2>
                    <p className="text">Más de 2000 modelos y colores disponibles</p>
                </div>

                <div className="d-flex-column gap-10 w-100">
                    <a href="/" title="" className="d-flex w-100">
                        <img src="/assets/imagenes/componentes/slider/7.jpg" alt="" className="d-flex w-100"/>
                    </a>

                    <div className="d-grid-4-2 gap-10">
                        <a href="/" title="" className="d-flex w-100">
                            <img src="https://images.falabella.com/v3/assets/bltf4ed0b9a176c126e/blt67cc384da6e3f8f9/6aedfbd45b22ed60c85e24ca/061126-25-deco-terrazas.png?auto=webp&disable=upscale&quality=70&width=1280" alt="" className="d-flex w-100"/>
                        </a>

                        <a href="/productos/dormitorios/?línea=clásicos-de-madera" title="Dormitorios clásicos de madera | Kamas" className="d-flex w-100">
                            <img src="/assets/imagenes/pag-principal/dormitorios/clasicos-de-madera.png" alt="" className="d-flex w-100 object-cover"/>
                        </a>

                        <a href="/" title="" className="d-flex w-100">
                            <img src="/assets/imagenes/componentes/slider/6.jpg" alt="" className="d-flex w-100 object-cover"/>
                        </a>

                        <a href="/productos/dormitorios/?línea=infantiles" title="Dormitorios infantiles | Kamas" className="d-flex w-100">
                            <img src="/assets/imagenes/pag-principal/dormitorios/infantiles.png" alt="" className="d-flex w-100 object-cover"/>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dormitorios;
