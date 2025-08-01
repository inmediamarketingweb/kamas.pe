import './Distribuidores.css';

function Distribuidores(){
    const distribuidores = [
        { href: 'https://vitai.pe', title: "Vitai | Kamas", imgSrc: "https://vitai.pe/img/logo-1707251334.jpg", alt: "Vitai distribuidor autorizado de Kamas" },
        { href: 'https://dormihogar.pe', title: "Dormihogar | Kamas", imgSrc: "https://www.dormihogar.pe/assets/imagenes/SEO/logo-principal.jpg", alt: "Dormihogar distribuidor autorizado de Kamas" },
        { href: 'https://homesleep.pe', title: "Homesleep | Kamas", imgSrc: "https://homesleep.pe/assets/imagenes/SEO/logo-principal.jpg", alt: "Homesleep distribuidor autorizado de Kamas" },
        { href: 'https://www.falabella.com.pe/falabella-pe/seller/Kamas', title: "Falabella | Kamas", imgSrc: "https://images.falabella.com/v3/assets/bltf4ed0b9a176c126e/blt4e807fded7f65ec5/65e8532d01f38e23f712bf3f/falabella.com_green_icon.svg", alt: "Falabella distribuidor autorizado de Kamas" },
        { href: '/', title: "Ireos | Kamas", imgSrc: "/assets/imagenes/componentes/distribuidores/ireos.webp", alt: "Ireos distribuidor autorizado de Kamas" },
        { href: '/', title: "Oasis | Kamas", imgSrc: "/assets/imagenes/componentes/distribuidores/oasis.webp", alt: "Oasis distribuidor autorizado de Kamas" },
        { href: 'https://simple.ripley.com.pe/tienda/kamas-6051854?srsltid=AfmBOooCtt98wRy05Brl6k494KihBJYbCZ4SmN9Cu3L9_lm4Z7Ms-sA1', title: "Ripley | Kamas", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logo_Ripley.svg", alt: "Ripley distribuidor autorizado de Kamas" },
        { href: 'https://listado.mercadolibre.com.pe/hogar-muebles-jardin/nuevo/_BRAND_56945354', title: "Mercado libre | Kamas", imgSrc: "/assets/imagenes/componentes/distribuidores/mercado-libre.jpeg", alt: "Mercado libre distribuidor autorizado de Kamas" },
        { href: '/', title: "Juntoz | Kamas", imgSrc: "/assets/imagenes/componentes/distribuidores/juntoz-2.jpg", alt: "Juntoz distribuidor autorizado de Kamas" }
    ];

    const duplicatedDistribuidores = [...distribuidores, ...distribuidores];

    return(
        <div className='block-container'>
            <div className='block-content distribuidores-block-content'>
                <div className='block-title-container d-flex-column'>
                    <h2 className='block-title text-left w-100'>Distribuidores autorizados</h2>
                    <p className="text w-100">Como alianza estratégica hemos diversificado nuestra distribución con el fin de generar más confíanza en nuestros clientes.</p>
                </div>

                <div className='distribuidores-container'>
                    <div className='distribuidores-content'>
                        <div className='infinite-carousel'>
                            <ul className='distribuidores gap-10'>
                                {duplicatedDistribuidores.map((dist, index) => (
                                    <li key={`${dist.title}-${index}`}>
                                        <a href={dist.href} title={dist.title} target="_blank" rel='noopener noreferrer'>
                                            <img src={dist.imgSrc} alt={dist.alt} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Distribuidores;
