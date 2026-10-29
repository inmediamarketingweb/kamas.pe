import './Paginacion.css';

function Paginacion({ paginaActual, totalPaginas, onChange }) {
    if (totalPaginas <= 1) return null;

    const generarPaginas = () => {
        const paginas = [];
        const maxVisibles = 3;

        let inicio = Math.max(1, paginaActual - Math.floor(maxVisibles / 2));
        let fin = Math.min(totalPaginas, inicio + maxVisibles - 1);

        if (fin - inicio + 1 < maxVisibles) {
            inicio = Math.max(1, fin - maxVisibles + 1);
        }

        if (inicio > 1) {
            paginas.push(1);
            if (inicio > 2) paginas.push('...');
        }

        for (let i = inicio; i <= fin; i++) paginas.push(i);

        if (fin < totalPaginas) {
            if (fin < totalPaginas - 1) paginas.push('...');
            paginas.push(totalPaginas);
        }

        return paginas;
    };

    return (
        <div className="pdt-paginacion-container">
            <div className="pdt-paginacion">
                <button
                    type="button"
                    onClick={() => onChange(paginaActual - 1)}
                    disabled={paginaActual === 1}
                    aria-label="Página anterior"
                >
                    <p>Anterior</p>
                </button>

                <ul className="d-flex-center-center">
                    {generarPaginas().map((p, i) =>
                        p === '...' ? (
                            <div className='margin-l-r-7' key={`dots-${i}`}>
                                <span className="dots">...</span>
                            </div>
                        ) : (
                            <li key={p}>
                                <span
                                    className={p === paginaActual ? 'active' : ''}
                                    onClick={() => onChange(p)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            onChange(p);
                                        }
                                    }}
                                >
                                    {p}
                                </span>
                            </li>
                        )
                    )}
                </ul>

                <button
                    type="button"
                    onClick={() => onChange(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                    aria-label="Página siguiente"
                >
                    <p>Siguiente</p>
                </button>
            </div>
        </div>
    );
}

export default Paginacion;
