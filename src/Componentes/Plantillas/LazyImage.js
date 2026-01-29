// import { useEffect, useRef, useState } from "react";

// function LazyImage({ src, alt, width, height, className }) {
//     const imgRef = useRef();
//     const [isVisible, setIsVisible] = useState(false);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         setIsVisible(true);
//                         observer.disconnect();
//                     }
//                 });
//             },
//             { threshold: 0.1 }
//         );

//         if (imgRef.current) observer.observe(imgRef.current);

//         return () => observer.disconnect();
//     }, []);

//     return(
//         <img ref={imgRef} src={isVisible ? src : undefined} alt={alt} width={width} height={height} loading="lazy" style={{ backgroundColor: "#FFFFFF"}} className={className}/>
//     );
// }

// export default LazyImage;

// LazyImage.jsx - Versión optimizada
import { useEffect, useRef, useState } from "react";

function LazyImage({ src, alt, width, height, className, fetchPriority = "low" }) {
    const imgRef = useRef();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    
    // Observer optimizado con debounce
    useEffect(() => {
        if (!imgRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { 
                rootMargin: '50px', // Carga antes de entrar en viewport
                threshold: 0.01 
            }
        );
        
        observer.observe(imgRef.current);
        return () => observer.disconnect();
    }, []);
    
    // Precargar en segundo plano
    useEffect(() => {
        if (isVisible && src) {
            const img = new Image();
            img.src = src;
            img.onload = () => setIsLoaded(true);
        }
    }, [isVisible, src]);

    return (
        <img
            ref={imgRef}
            src={isLoaded ? src : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'%3E%3Crect width='100%' height='100%' fill='%23f5f5f5'/%3E%3C/svg%3E"}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            fetchPriority={fetchPriority}
            className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
            style={{ 
                backgroundColor: '#FFFFFF',
                transition: 'opacity 0.3s',
                opacity: isLoaded ? 1 : 0.5
            }}
        />
    );
}

export default LazyImage;
