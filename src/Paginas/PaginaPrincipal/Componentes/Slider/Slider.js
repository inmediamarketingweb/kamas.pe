import { useState, useRef, useEffect } from 'react';
import './Slider.css';

function Slider() {
    const [sliderItems, setSliderItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const sliderRef = useRef(null);

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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [sliderItems.length]);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderItems.length) % sliderItems.length);
    };

    const visibleIndexes = [
        (currentIndex - 1 + sliderItems.length) % sliderItems.length,
        currentIndex,
        (currentIndex + 1) % sliderItems.length
    ];

    if (sliderItems.length === 0) return null;

    return (
        <div className="slider-general-container d-flex-column">
            <div className="hero-container">
                <section className="hero">
                    <div className="slider-container">
                        <ul className="slider" ref={sliderRef} style={{ marginLeft: `-${currentIndex * 100}%` }}>
                            {sliderItems.map((slide, index) => (
                                <li key={index}>
                                    {visibleIndexes.includes(index) && (
                                        <a href={slide.link} aria-label={slide.alt}>
                                            <img
                                                width={isSmallScreen ? 400 : 2000}
                                                height={isSmallScreen ? 180 : 600}
                                                src={isSmallScreen ? slide["foto-mobile"] : slide["foto-desktop"]}
                                                alt={slide.alt}
                                                {...(index !== 0 ? { loading: "lazy" } : {})}
                                            />
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
        </div>
    );
}

export default Slider;

