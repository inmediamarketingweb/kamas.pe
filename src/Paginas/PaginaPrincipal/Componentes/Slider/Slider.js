import { useState, useRef, useEffect } from 'react';

import './Slider.css';

function Slider() {
    const totalSlides = 6;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const sliderRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 5000);
        return () => clearInterval(interval);
    }, [totalSlides]);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    };

    const visibleIndexes = [
        (currentIndex - 1 + totalSlides) % totalSlides, currentIndex, (currentIndex + 1) % totalSlides
    ];

    return (
        <div className="slider-general-container d-flex-column">
            <div className="hero-container">
                <section className="hero">
                    <div className="slider-container">
                        <ul className="slider" ref={sliderRef} style={{ marginLeft: `-${currentIndex * 100}%` }}>
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <li key={index}>
                                    {visibleIndexes.includes(index) && (
                                        <a href='' alt=''>
                                            <img width={isSmallScreen ? 400 : 2000} height={isSmallScreen ? 180 : 600} {...(index !== 0 ? { loading: "lazy" } : {})} src={`/assets/imagenes/paginas/pagina-principal/slider/${isSmallScreen ? 'thumb/' : ''}slider-${index + 1}.webp`} alt="Kamas | Fabricantes de colchones, camas y dormitorios." />
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <button type="button" className="hero-slider-button hero-slider-button-1" onClick={goToPrevSlide}>
                    <span className="material-icons">chevron_left</span>
                </button>

                <button type="button" className="hero-slider-button hero-slider-button-2" onClick={goToNextSlide}>
                    <span className="material-icons">chevron_right</span>
                </button>
            </div>

            <img width={isSmallScreen ? 425 : 1200} height={isSmallScreen ? 20 : 56} src="https://kamas.pe/assets/imagenes/paginas/pagina-principal/slider/banner-2.jpg" alt="Kamas | Fabricantes de colchones, camas y dormitorios." />
        </div>
    );
}

export default Slider;
