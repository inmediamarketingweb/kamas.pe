import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { construirRutaProducto } from "../../../../Componentes/Plantillas/Producto/Producto";

import "./Complementarios.css";

/* 🔽 REGLAS ACTUALIZADAS (Se agregó "dormitorio") */
const REGLAS_POR_CATEGORIA = {
  colchon: {
    subcategorias: [
      { nombre: "sábanas y cobertores", descuentoCombo: 30, matchMedida: true, categoriaOrigen: "complementos" },
      { nombre: "almohadas", descuentoCombo: 40, matchMedida: false, categoriaOrigen: "complementos" },
    ],
    limitePorSubcategoria: 1,
  },
  cama: {
    subcategorias: [
      { nombre: "almohadas", descuentoCombo: 40, matchMedida: false, categoriaOrigen: "complementos" },
      { nombre: "sábanas y cobertores", descuentoCombo: 30, matchMedida: true, categoriaOrigen: "complementos" },
      { nombre: null, descuentoCombo: 50, matchMedida: true, categoriaOrigen: "colchones" },
    ],
    limitePorSubcategoria: 1,
  },
  dormitorio: {
    subcategorias: [
      { nombre: "sábanas y cobertores", descuentoCombo: 30, matchMedida: true, categoriaOrigen: "complementos" },
      { nombre: "veladores", descuentoCombo: 40, matchMedida: false, categoriaOrigen: "complementos" },
      { nombre: "baúles", descuentoCombo: 50, matchMedida: false, categoriaOrigen: "complementos" },
    ],
    limitePorSubcategoria: 1,
  },
};

const EXTENSIONES_IMAGEN = ["webp", "jpg", "png", "jfif"];

function normalizar(str = "") {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function esSubcategoria(producto, subcategoriaBuscada) {
  if (!subcategoriaBuscada) return true;
  const sub = producto.subcategoría || producto.subcategoria || "";
  return normalizar(sub) === normalizar(subcategoriaBuscada);
}

function esCategoria(producto, categoriaBuscada) {
  const cat = producto.categoría || producto.categoria || "";
  return normalizar(cat).includes(normalizar(categoriaBuscada));
}

function elegirAleatorio(arr) {
  if (!arr.length) return [];
  return [arr[Math.floor(Math.random() * arr.length)]];
}

function formatearPrecio(n) {
  return `s/${Number(n).toFixed(2)}`;
}

/* 🔽 EXTRACCIÓN DE MEDIDA BLINDADA */
function extraerMedida(producto) {
  if (!producto) return null;

  const fuentes = [
    producto.tamaño,
    producto.tamano,
    producto.medida,
    producto["tamaño"],
    producto["tamano"],
    producto.nombre,
  ];

  const arrays = [producto.descripcion, producto["detalles-del-producto"]];
  for (const arr of arrays) {
    if (!Array.isArray(arr)) continue;
    for (const item of arr) {
      if (!item || typeof item !== "object") continue;
      fuentes.push(
        item.tamaño,
        item.tamano,
        item.medida,
        item["tamaño"],
        item["tamano"],
        item.modelo
      );
    }
  }

  for (const f of fuentes) {
    if (typeof f === "string" || typeof f === "number") {
      const n = normalizar(String(f));
      if (!n) continue;

      const mPlazas = n.match(/(\d+(?:\.\d+)?)\s*(?:plazas?|plz)/);
      if (mPlazas) {
        let num = parseFloat(mPlazas[1]);
        if (num === 1) return "1-plaza";
        return `${num}-plazas`;
      }

      if (/^\d+(?:\.\d+)?$/.test(n)) {
        let num = parseFloat(n);
        if (num === 1) return "1-plaza";
        return `${num}-plazas`;
      }

      if (n.includes("king")) return "king";
      if (n.includes("queen")) return "queen";
      if (n.includes("individual") || n.includes("una plaza")) return "1-plaza";
      if (n.includes("matrimonial") || n.includes("doble") || n.includes("dos plazas")) return "2-plazas";
    }
  }
  return null;
}

function mismaMedida(medidaPrincipal, producto) {
  if (!medidaPrincipal) return true;
  const medidaProd = extraerMedida(producto);
  if (!medidaProd) return true; 
  return medidaProd === medidaPrincipal;
}

/* 🔽 CARGADOR SEGURO */
async function cargarProductosCategoria(categoria) {
  try {
    const manifestRes = await fetch(`/assets/json/manifest/${categoria}.json`);
    if (!manifestRes.ok) {
      console.warn(`⚠️ Manifest no encontrado: ${categoria}.json`);
      return [];
    }

    const manifest = await manifestRes.json();
    const rutas = manifest.files || [];

    let todosLosProductos = [];

    for (const ruta of rutas) {
      try {
        const res = await fetch(ruta);
        if (!res.ok) {
          console.warn(`⚠️ [Complementarios] Archivo no encontrado: ${ruta}`);
          continue;
        }
        
        const data = await res.json();
        
        if (Array.isArray(data)) {
          todosLosProductos.push(...data);
        } else if (data.productos && Array.isArray(data.productos)) {
          todosLosProductos.push(...data.productos);
        } else if (typeof data === "object" && data !== null) {
          for (const key in data) {
            if (Array.isArray(data[key])) {
              todosLosProductos.push(...data[key]);
              break;
            }
          }
          if (data.sku) {
             todosLosProductos.push(data);
          }
        }
      } catch (err) {
        console.warn(`⚠️ JSON roto en: ${ruta}`);
      }
    }

    return todosLosProductos;
  } catch (err) {
    console.error(`❌ Error cargando manifest de ${categoria}:`, err);
    return [];
  }
}

function Complementarios({ producto }) {
  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const medidaPrincipal = useMemo(() => extraerMedida(producto), [producto]);

  useEffect(() => {
  }, [producto, medidaPrincipal]);

  const reglas = useMemo(() => {
    const cat = producto?.categoría || producto?.categoria || "";
    const catNorm = normalizar(cat);
    if (!catNorm) return null;
    
    const clave = Object.keys(REGLAS_POR_CATEGORIA).find((k) =>
      catNorm.includes(k)
    );
    return clave ? REGLAS_POR_CATEGORIA[clave] : null;
  }, [producto]);

  useEffect(() => {
    if (!reglas) {
      setCargando(false);
      return;
    }
    let cancelado = false;
    setCargando(true);

    const categoriasACargar = [...new Set(reglas.subcategorias.map(s => s.categoriaOrigen))];
    
    Promise.all(categoriasACargar.map(cat => cargarProductosCategoria(cat))).then((resultados) => {
      if (!cancelado) {
        const productosPlanos = resultados.flat();

        setTodosLosProductos(productosPlanos);
        setCargando(false);
      }
    });

    return () => {
      cancelado = true;
    };
  }, [reglas]);

  const recomendados = useMemo(() => {
    if (!reglas || !todosLosProductos.length) return [];

    return reglas.subcategorias.flatMap(
      ({ nombre, descuentoCombo, matchMedida, categoriaOrigen }) => {
        
        let base = todosLosProductos.filter(
          (p) => esCategoria(p, categoriaOrigen) && p.stock !== 0
        );

        if (nombre) {
          base = base.filter((p) => esSubcategoria(p, nombre));
        }

        base = base.filter(p => p.sku !== producto?.sku);

        let candidatos = base;
        
        if (matchMedida && medidaPrincipal) {
          candidatos = base.filter((p) => {
            const match = mismaMedida(medidaPrincipal, p);
            if (categoriaOrigen === "colchones" || categoriaOrigen === "complementos") {
            }
            return match;
          });
        }

        const elegidos = elegirAleatorio(candidatos).slice(
          0,
          reglas.limitePorSubcategoria
        );

        return elegidos.map((p) => ({
          ...p,
          _precioCombo: Math.max(
            0,
            Math.round(p.precioVenta - descuentoCombo)
          ),
          _ruta: construirRutaProducto(p),
        }));
      }
    );
  }, [todosLosProductos, reglas, medidaPrincipal, producto]);

  const [seleccionados, setSeleccionados] = useState({});
  const toggleSeleccion = (sku) =>
    setSeleccionados((prev) => ({ ...prev, [sku]: !prev[sku] }));

  if (cargando || !recomendados.length) return null;

  return (
    <div className="border-1-component border-r-4 d-flex-column gap-10 padding-20-to-10">
      <p className="text font-13 font-bold uppercase">Complementa tu compra</p>

      <div className="d-flex-column gap-10 pd-comp-container">
        {recomendados.map((prod) => {
          const skuKey = prod.sku || prod._ruta;
          const baseFotos = (prod.fotos || "").replace(/\/$/, "");
          return (
            <div className="pd-comp" key={skuKey}>
              <input
                type="checkbox"
                checked={!!seleccionados[skuKey]}
                onChange={() => toggleSeleccion(skuKey)}
                aria-label={`Seleccionar ${prod.nombre}`}
              />

              <a href={prod._ruta} title="Ver producto" className="pd-comp-link">
                <span className="material-symbols-outlined">open_in_new</span>
              </a>

              <img
                src={`${baseFotos}/1.${EXTENSIONES_IMAGEN[0]}`}
                alt={prod.nombre}
                loading="lazy"
                onError={(e) => {
                  // Obtenemos el índice actual de la extensión desde el dataset
                  const intentoActual = parseInt(e.currentTarget.dataset.intento || "0", 10);
                  const siguienteIntento = intentoActual + 1;

                  // Si aún hay más extensiones por probar
                  if (siguienteIntento < EXTENSIONES_IMAGEN.length) {
                    e.currentTarget.dataset.intento = siguienteIntento;
                    e.currentTarget.src = `${baseFotos}/1.${EXTENSIONES_IMAGEN[siguienteIntento]}`;
                  }
                }}
              />

              <div className="d-flex-column gap-5">
                <p className="text font-bold uppercase">{prod.nombre}</p>

                <div className="pd-comp-prices">
                  <div className="d-flex-center-between">
                    <p className="text">Precio normal</p>
                    <span>{formatearPrecio(prod.precioVenta)}</span>
                  </div>

                  <div className="d-flex-center-between">
                    <p className="text color-crimson font-bold">Precio combo</p>
                    <span className="font-bold color-crimson">
                      {formatearPrecio(prod._precioCombo)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Complementarios.propTypes = {
  producto: PropTypes.shape({
    sku: PropTypes.string,
    categoría: PropTypes.string,
    categoria: PropTypes.string,
    nombre: PropTypes.string,
    tamaño: PropTypes.string,
    tamano: PropTypes.string,
    medida: PropTypes.string,
    descripcion: PropTypes.array,
    "detalles-del-producto": PropTypes.array,
  }),
};

export default Complementarios;
