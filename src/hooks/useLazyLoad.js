import { useEffect, useRef, useState } from 'react';

export function useLazyLoad(options = {}) {
    const ref = useRef();
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { 
                root: options.root || null,
                rootMargin: options.rootMargin || '100px 0px',
                threshold: options.threshold || 0
            }
        );
        
        if (ref.current) {
            observer.observe(ref.current);
        }
        
        return () => observer.disconnect();
    }, [options.root, options.rootMargin, options.threshold]);
    
    return [ref, isVisible];
}
