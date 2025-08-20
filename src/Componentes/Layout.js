import { Outlet } from 'react-router-dom';

import Layer from './Layer/Layer';
import Header from '../Componentes/Header/Header';
import Footer from '../Componentes/Footer/Footer';

function Layout(){
    return(
        <>
            <Layer/>

            <Header/>

            <Outlet/>

            <Footer/>
        </>
    );
}

export default Layout;

// Esta es la plantilal general del proyecto, cada una de las páginas del proyecto consume
// esta plantilla
