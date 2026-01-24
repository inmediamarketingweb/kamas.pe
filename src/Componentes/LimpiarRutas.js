import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LimpiarRutas(){
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.has('srsltid')) {
            navigate(location.pathname, { replace: true });
        }
    }, [location, navigate]);

    return null;
}

export default LimpiarRutas;
