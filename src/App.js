import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

import LimpiarRutas from "./Componentes/LimpiarRutas";

//
import Layout from "./Componentes/Layout";

//Página principal
import PaginaPrincipal from "./Paginas/PaginaPrincipal/PaginaPrincipal";

//Páginas para los productos
import Productos from './Paginas/Productos/Productos';
import PaginaDeCategoria from "./Paginas/Categorias/PaginaDeCategoria";
import PaginaProducto from './Paginas/PaginaProducto/PaginaProducto';
import Ofertas from "./Paginas/Ofertas/Ofertas";

//Página para productos favoritos en localstorage
import Favoritos from "./Paginas/Favoritos/Favoritos";

//Páginas de nosotros y contenido adicional
import Nosotros from "./Paginas/Nosotros/Nosotros";
import ProyectosYAlianzas from "./Paginas/ProyectosYAlianzas/ProyectosYAlianzas";
import PropiedadIntelectual from "./Paginas/Nosotros/Paginas/PropiedadIntelectual";
import RazonesParaComprar from "./Paginas/Nosotros/Paginas/RazonesParaComprar";
import MediosDePago from './Paginas/ServicioAlCliente/MediosDePago';
import GarantiaDeProductos from "./Paginas/ServicioAlCliente/GarantiaDeProductos/GarantiaDeProductos";
import GarantiaColchones from "./Paginas/ServicioAlCliente/GarantiaDeProductos/Paginas/Colchones";
import GarantiaTarimas from "./Paginas/ServicioAlCliente/GarantiaDeProductos/Paginas/Tarimas";
import GarantiaCabeceras from "./Paginas/ServicioAlCliente/GarantiaDeProductos/Paginas/Cabeceras";
import RecomendacionesDeUso from "./Paginas/ServicioAlCliente/RecomendacionesDeUso/RecomendacionesDeUso";
import RecomendacionesColchones from "./Paginas/ServicioAlCliente/RecomendacionesDeUso/Paginas/Colchones";
import RecomendacionesTarimas from "./Paginas/ServicioAlCliente/RecomendacionesDeUso/Paginas/Tarimas";
import RecomendacionesCabeceras from "./Paginas/ServicioAlCliente/RecomendacionesDeUso/Paginas/Cabeceras";
import PoliticaDeCambiosYDevoluciones from "./Paginas/ServicioAlCliente/PoliticaDeCambiosYDevoluciones";
import PrivacidadYSeguridad from './Paginas/ServicioAlCliente/PrivacidadYSeguridad';
import TerminosYCondiciones from './Paginas/ServicioAlCliente/TerminosYCondiciones';
import HorariosDeEntrega from './Paginas/ServicioAlCliente/HorariosDeEntrega';
import ProgramaDeInfluencers from './Paginas/Novedades/ProgramaDeInfluencers';
import ProgramaDeReferencias from './Paginas/Novedades/ProgramaDeReferencias';

//Páginas de envios
import EnviosALimaYCallao from "./Paginas/Nosotros/Paginas/Envios/EnviosALimaYCallao/EnviosALimaYCallao";
import EnviosAProvincia from './Paginas/Nosotros/Paginas/Envios/EnviosAProvincia/EnviosAProvincia';

import CostosDeEnvioPorZonas from "./Paginas/Nosotros/Paginas/CostosDeEnvioPorZonas/CostosDeEnvioPorZonas";

//Páginas de contacto
import Contacto from "./Paginas/Contacto/Contacto";
import LibroDeReclamaciones from "./Paginas/Contacto/LibroDeReclamaciones/LibroDeReclamaciones";

//Página para resultado de búsquedas
import Busqueda from "./Paginas/Busqueda/Busqueda";

//Página para control de error 404
import Error404 from "./Paginas/Error404/Error404";

//Páginas para los vendedores
import Colores from './Paginas/Vendedores/Colores/Colores';
import Agencias from './Paginas/Vendedores/Agencias/Agencias';
import Cotizador from './Paginas/Vendedores/Cotizador/Cotizador';

//*Servicio al cliente*
import Citas from './Paginas/ServicioAlCliente/Citas/Citas';

import './App.css';

function App(){
    return(
        <HelmetProvider>
            <Router>
                <LimpiarRutas/>

                <Routes>
                    <Route element={<Layout/>}>
                        <Route index element={<PaginaPrincipal/>} />

                        <Route path="/productos/" element={<Productos/>} />
                        <Route path="/productos/:categoria/" element={<PaginaDeCategoria/>} />
                        <Route path="/productos/:categoria/:subcategoria/" element={<PaginaDeCategoria/>} />
                        <Route path="/productos/:categoria/:subcategoria/:subsubcategoria/" element={<PaginaDeCategoria/>} />

                        <Route path="/productos/:categoria/:subcategoria/:subsubcategoria/:producto/" element={<PaginaProducto/>} />
                        <Route path="/productos/:categoria/:subcategoria/:producto/" element={<PaginaProducto/>} />
                        <Route path="/productos/:categoria/:producto/" element={<PaginaProducto/>} />

                        <Route path="/ofertas/" element={<Ofertas/>} />

                        <Route path="/productos/*" element={<PaginaProducto/>} />

                        <Route path="/mis-favoritos/" element={<Favoritos/>} />

                        <Route path="/nosotros/" element={<Nosotros/>} />

                        <Route path="/proyectos-y-alianzas/" element={<ProyectosYAlianzas/>} />

                        <Route path="/nosotros/razones-para-comprar/" element={<RazonesParaComprar/>}/>
                        <Route path="/nosotros/propiedad-intelectual/" element={<PropiedadIntelectual/>}/>
                        <Route path="/paleta-de-colores/" element={<Colores/>} />
                        <Route path="/vendedores/cotizador/" element={<Cotizador/>}/>
                        <Route path="/agencias-recomendadas/" element={<Agencias/>} />
                        <Route path="/envios/envios-a-lima-y-callao/" element={<EnviosALimaYCallao/>}/>
                        <Route path="/envios/envios-a-provincia/" element={<EnviosAProvincia/>}/>

                        <Route path="/agendar-visita/" element={<Citas/>}/>
                        <Route path="/servicio-al-cliente/medios-de-pago/" element={<MediosDePago/>}/>
                        <Route path="/servicio-al-cliente/costos-de-envio-por-zona/" element={<CostosDeEnvioPorZonas/>}/>
                        <Route path="/servicio-al-cliente/garantia-de-productos/" element={<GarantiaDeProductos/>}/>
                        <Route path="/servicio-al-cliente/garantia-de-productos/colchones/" element={<GarantiaColchones/>}/>
                        <Route path="/servicio-al-cliente/garantia-de-productos/box-tarimas/" element={<GarantiaTarimas/>}/>
                        <Route path="/servicio-al-cliente/garantia-de-productos/cabeceras/" element={<GarantiaCabeceras/>}/>
                        
                        <Route path="/servicio-al-cliente/recomendaciones-de-uso/" element={<RecomendacionesDeUso/>}/>
                        <Route path="/servicio-al-cliente/recomendaciones-de-uso/colchones/" element={<RecomendacionesColchones/>}/>
                        <Route path="/servicio-al-cliente/recomendaciones-de-uso/box-tarimas/" element={<RecomendacionesTarimas/>}/>
                        <Route path="/servicio-al-cliente/recomendaciones-de-uso/cabeceras/" element={<RecomendacionesCabeceras/>}/>

                        <Route path="/servicio-al-cliente/politica-de-cambios-y-devoluciones/" element={<PoliticaDeCambiosYDevoluciones/>}/>

                        <Route path="/servicio-al-cliente/privacidad-y-seguridad/" element={<PrivacidadYSeguridad/>}/>

                        <Route path="/servicio-al-cliente/terminos-y-condiciones/" element={<TerminosYCondiciones/>}/>

                        <Route path="/servicio-al-cliente/horarios-de-entrega-y-envios/" element={<HorariosDeEntrega/>}/>

                        <Route path="/novedades/programa-de-influencers/" element={<ProgramaDeInfluencers/>}/>
                        <Route path="/novedades/programa-de-referencias/" element={<ProgramaDeReferencias/>}/>

                        <Route path="/contacto/" element={<Contacto/>} />
                        <Route path="/contacto/libro-de-reclamaciones/" element={<LibroDeReclamaciones/>} />

                        <Route path="/busqueda/" element={<Busqueda/>} />

                        <Route path="*" element={<Error404/>}/>
                    </Route>
                </Routes>
            </Router>
        </HelmetProvider>
    );
}

export default App;
