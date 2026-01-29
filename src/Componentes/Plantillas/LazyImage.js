import { useEffect, useRef, useState } from "react";

function LazyImage({ src, alt, width, height, className, fetchPriority = "low", ...props }) {
    const imgRef = useRef();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

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
                rootMargin: '50px',
                threshold: 0.01 
            }
        );

        observer.observe(imgRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible && src) {
            const img = new Image();
            img.src = src;
            img.onload = () => setIsLoaded(true);
        }
    }, [isVisible, src]);

    const getLoadingValue = () => {
        if (fetchPriority === 'high') {
            return 'eager';
        }
        return 'lazy';
    };

    return (
        <img ref={imgRef}
            src={isLoaded ? src : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'%3E%3Crect width='100%' height='100%' fill='%23f5f5f5'/%3E%3C/svg%3E"}
            alt={alt}
            width={width}
            height={height}
            loading={getLoadingValue()}
            decoding="async"
            className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
            style={{ 
                backgroundColor: '#FFFFFF',
                transition: 'opacity 0.3s',
                opacity: isLoaded ? 1 : 0.5
            }}
            {...props}
        />
    );
}

export default LazyImage;
