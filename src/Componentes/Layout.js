import { Outlet } from 'react-router-dom';

import Header from '../Componentes/Header/Header';
import Footer from '../Componentes/Footer/Footer';

function Layout(){
    return(
        <>
            <Header/>

            <Outlet/>

            <Footer/>
        </>
    );
}

export default Layout;
