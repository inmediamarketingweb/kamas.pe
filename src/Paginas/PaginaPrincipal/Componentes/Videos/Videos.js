import { useState, useRef, useEffect } from "react";

import './Videos.css';

const Videos = () => {
    const [activeIndex, setActiveIndex] = useState(1);
    const videoRefs = [useRef(null), useRef(null), useRef(null)];

    const videos = [
        { id: 1, src: "/assets/imagenes/paginas/pagina-principal/video-hero-1.mp4" },
        { id: 2, src: "/assets/imagenes/paginas/pagina-principal/video-hero-2.mp4" },
        { id: 3, src: "/assets/imagenes/paginas/pagina-principal/video-hero-3.mp4" },
    ];

    useEffect(() => {
        videoRefs.forEach((ref, index) => {
            if (ref.current) {
                if (index === activeIndex) {
                    ref.current.play();
                } else {
                    ref.current.pause();
                    ref.current.currentTime = 0;
                }
            }
        });
    }, [activeIndex]);

    const handleVideoChange = (index) => {
        setActiveIndex(index);
    };

    return(
        <div className="main-hero-content-target main-hero-content-target-2">
            <div className="video-slider-container">
                {videos.map((video, index) => (
                    <div key={video.id} className={`video-wrapper ${ index === activeIndex ? "active" : "inactive" }`}
                        style={{
                            left: index === 0 ? "calc(50% - 260px)" : index === 2 ? "auto"
                            : "50%", right: index === 2 ? "calc(50% - 260px)" : "auto",
                            zIndex: index === activeIndex ? 2 : 1,
                        }}
                    >
                        <video ref={videoRefs[index]} src={video.src} muted playsInline onClick={() => handleVideoChange(index)}/>
                    </div>
                ))}
            </div>

            <div className="hero-video-buttons">
                {videos.map((_, index) => (
                    <div key={index} className={ `hero-video-button ${ index === activeIndex ? "active" : "" }`} onClick={() => handleVideoChange(index)}></div>
                ))}
            </div>
        </div>
    );
};

export default Videos;
