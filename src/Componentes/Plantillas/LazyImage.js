import { useEffect, useRef, useState } from "react";

function LazyImage({ src, alt, width, height, className }) {
    const imgRef = useRef();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, []);

    return(
        <img ref={imgRef} src={isVisible ? src : undefined} alt={alt} width={width} height={height} loading="lazy" style={{ backgroundColor: "#FFFFFF"}} className={className}/>
    );
}

export default LazyImage;
