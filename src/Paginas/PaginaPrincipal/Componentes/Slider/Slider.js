import { useState, useRef, useEffect, useCallback } from 'react';

import './Slider.css';

import LazyImage from '../../../../Componentes/Plantillas/LazyImage';

function Slider(){
    const [sliderItems, setSliderItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const sliderRef = useRef(null);
    const isTransitioningRef = useRef(false);
    const [initialDelayPassed, setInitialDelayPassed] = useState(false);

    useEffect(() => {
        fetch('/assets/json/paginas/principal/slider.json')
            .then((res) => res.json())
            .then((data) => {
                setSliderItems(data.slider || []);
            })
            .catch((err) => {
                console.error('Error al cargar el slider:', err);
            });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const customSlide = {
        type: 'custom',
        id: 'custom-main-slide'
    };

    const allSlides = [customSlide, ...sliderItems];
    
    const extendedItems = allSlides.length > 0 ? [
        allSlides[allSlides.length - 1],
        ...allSlides,
        allSlides[0]
    ] : [];

    const totalSlides = extendedItems.length;

    const goToSlide = useCallback((newIndex) => {
        if (isTransitioningRef.current || allSlides.length <= 1) return;
        isTransitioningRef.current = true;
        setIsTransitionEnabled(true);
        setCurrentIndex(newIndex);
    }, [allSlides.length]);

    const goToNextSlide = useCallback(() => {
        if (allSlides.length <= 1) return;

        const newIndex = currentIndex + 1;
        if (newIndex === totalSlides - 1) {
            goToSlide(newIndex);
        } else {
            goToSlide(newIndex);
        }
    }, [currentIndex, allSlides.length, goToSlide, totalSlides]);

    const goToPrevSlide = useCallback(() => {
        if (allSlides.length <= 1) return;

        const newIndex = currentIndex - 1;
        if (newIndex === 0) {
            goToSlide(newIndex);
        } else {
            goToSlide(newIndex);
        }
    }, [currentIndex, allSlides.length, goToSlide]);

    useEffect(() => {
        if (allSlides.length <= 1) return;

        const initialDelayTimer = setTimeout(() => {
            setInitialDelayPassed(true);
        }, 10000);

        return () => clearTimeout(initialDelayTimer);
    }, [allSlides.length]);

    useEffect(() => {
        if (allSlides.length <= 1 || !initialDelayPassed) return;

        const interval = setInterval(() => {
            goToNextSlide();
        }, 10000);

        return () => clearInterval(interval);
    }, [allSlides.length, goToNextSlide, initialDelayPassed]);

    useEffect(() => {
        const handleTransitionEnd = () => {
            isTransitioningRef.current = false;

            if (currentIndex === totalSlides - 1) {
                setIsTransitionEnabled(false);
                setCurrentIndex(1);
            }
            else if (currentIndex === 0) {
                setIsTransitionEnabled(false);
                setCurrentIndex(totalSlides - 2);
            }
        };

        const sliderElement = sliderRef.current;
        if (sliderElement) {
            sliderElement.addEventListener('transitionend', handleTransitionEnd);
            return () => {
                sliderElement.removeEventListener('transitionend', handleTransitionEnd);
            };
        }
    }, [currentIndex, totalSlides]);

    useEffect(() => {
        if (sliderRef.current && totalSlides > 0) {
            sliderRef.current.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;
            sliderRef.current.style.transition = isTransitionEnabled ? 'transform 500ms ease-in-out' : 'none';

            if (!isTransitionEnabled) {
                requestAnimationFrame(() => {
                    setIsTransitionEnabled(true);
                });
            }
        }
    }, [currentIndex, isTransitionEnabled, totalSlides]);

    if (allSlides.length === 0) return null;

    return(
        <div className="slider-general-container d-flex-column">
            <div className="hero-container">
                <section className="hero">
                    <div className="slider-container">
                        <ul className="slider" ref={sliderRef} style={{
                                width: `${totalSlides * 100}%`,
                                transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
                                transition: isTransitionEnabled 
                                    ? 'transform 500ms ease-in-out' 
                                    : 'none'
                            }}
                        >
                            {extendedItems.map((slide, index) => (
                                <li key={`slide-${index}`} style={{ width: `${100 / totalSlides}%` }}>
                                    {slide.type === 'custom' ? (
                                        <div className="custom-slide-container">
                                            <div className='custom-slide-content d-grid-2-1fr gap-20'>
                                                <div className='custom-slide-target custom-slide-target-1 gap-5'>
                                                    <p>Kamas | Diseñamos tus sueños</p>
                                                    <h1>Juegos de dormitorios</h1>
                                                    <p className='text'>Llevamos más de 15 años ofreciendo calidad en nuestros productos. Somos fabricantes de colchones, camas box tarimas, juegos de dormitorios y de más productos para el hogar.</p>
                                                    <p className='text'>Realizamos envíos inmediatos a cada ciudad del Perú y de manera gratuita a todo Lima y Callao.</p>
                                                </div>
                                                <div className='custom-slide-target custom-slide-target-2'>
                                                    <img src='' alt=''/>
                                                    <video src=''></video>
                                                    
                                                    <a href='/productos/' title='' className='button-link button-link-2'>
                                                        <p className='button-link-text'>Ver productos</p>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <a href={slide.link} aria-label={slide.alt}>
                                            <LazyImage width={isSmallScreen ? 425 : 2000} height={isSmallScreen ? 180 : 600} 
                                                src={isSmallScreen ? slide["foto-mobile"] : slide["foto-desktop"]} 
                                                title={slide.alt}
                                                alt={slide.alt}
                                                loading={
                                                    (index >= currentIndex - 1 && index <= currentIndex + 1) ? "eager" : "lazy"
                                                }
                                            />
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <button type="button" className="hero-slider-button hero-slider-button-1" onClick={goToPrevSlide} aria-label="Slide anterior">
                    <span className="material-icons">chevron_left</span>
                </button>

                <button type="button" className="hero-slider-button hero-slider-button-2" onClick={goToNextSlide} aria-label="Slide siguiente">
                    <span className="material-icons">chevron_right</span>
                </button>
            </div>
        </div>
    );
}

export default Slider;
