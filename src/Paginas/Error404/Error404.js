import { Helmet } from "react-helmet";

import './Error404.css';

const Error404 = () => {
    return(
        <>
            <Helmet>
                <title>Página no encontrada | Kamas</title>
            </Helmet>
            
            <main>
                <div className="block-container">
                    <section className="block-content d-flex-center-center d-flex-column gap-20 not-found-content">
                        <h1 className="block-title">Página no encontrada</h1>
                        <p className="text">Este sitio web sigue en estapa de desarrollo por lo que puede que algunos productos cuenten con información errorea o algunas página no existan todavía por favor consulte con nuestro soporte cualquier inconvenientes.</p>
                        <p className="text">Lo sentimos esta página está en mantenimiento o ya no existe, cualquier consulta escribenos a <a href="mailto: soporte@kamas.pe" className="text color-color-1">soporte@kamas.pe</a></p>
                    </section>
                </div>
            </main>
        </>
    );
};

export default Error404;
