// import { useState, useRef, useEffect } from "react";

// import './Videos.css';

// const Videos = () => {
//     const [activeIndex, setActiveIndex] = useState(1);
//     const videoRefs = [useRef(null), useRef(null), useRef(null)];

//     const videos = [
//         { id: 1, src: "/assets/imagenes/paginas/pagina-principal/video-hero-1.mp4" },
//         { id: 2, src: "/assets/imagenes/paginas/pagina-principal/video-hero-3.mp4" },
//         { id: 3, src: "/assets/imagenes/paginas/pagina-principal/video-hero-2.mp4" }
//     ];

//     useEffect(() => {
//         videoRefs.forEach((ref, index) => {
//             if (ref.current) {
//                 if (index === activeIndex) {
//                     ref.current.play();
//                 } else {
//                     ref.current.pause();
//                     ref.current.currentTime = 0;
//                 }
//             }
//         });
//     }, [activeIndex]);

//     const handleVideoChange = (index) => {
//         setActiveIndex(index);
//     };

//     return(
//         <div className="main-hero-content-target main-hero-content-target-2">
//             <div className="video-slider-container">
//                 {videos.map((video, index) => (
//                     <div key={video.id} className={`video-wrapper ${ index === activeIndex ? "active" : "inactive" }`}>
//                         <video ref={videoRefs[index]} src={video.src} muted={index !== activeIndex} loop controls={index === activeIndex} playsInline onClick={() => handleVideoChange(index)}/>
//                     </div>
//                 ))}
//             </div>

//             <div className="hero-video-buttons w-100">
//                 {videos.map((_, index) => (
//                     <div key={index} className={ `hero-video-button ${ index === activeIndex ? "active" : "" }`} onClick={() => handleVideoChange(index)}></div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Videos;

import { useState, useRef, useEffect } from "react";
import './Videos.css';

const Videos = () => {
    const [activeIndex, setActiveIndex] = useState(1);
    const [userInteracted, setUserInteracted] = useState(false);
    const videoRefs = [useRef(null), useRef(null), useRef(null)];

    const videos = [
        { id: 1, src: "/assets/imagenes/paginas/pagina-principal/video-hero-1.mp4" },
        { id: 2, src: "/assets/imagenes/paginas/pagina-principal/video-hero-3.mp4" },
        { id: 3, src: "/assets/imagenes/paginas/pagina-principal/video-hero-2.mp4" }
    ];

    useEffect(() => {
        videoRefs.forEach((ref, index) => {
            if (ref.current) {
                if (index === activeIndex && userInteracted) {
                    // Solo reproducir si el usuario ha interactuado
                    ref.current.play().catch(error => {
                        console.log("Error al reproducir:", error);
                    });
                } else {
                    ref.current.pause();
                    ref.current.currentTime = 0;
                }
            }
        });
    }, [activeIndex, userInteracted]);

    const handleVideoChange = (index) => {
        if (!userInteracted) {
            setUserInteracted(true);
        }
        setActiveIndex(index);
    };

    return(
        <div className="main-hero-content-target main-hero-content-target-2">
            <div className="video-slider-container">
                {videos.map((video, index) => (
                    <div key={video.id} className={`video-wrapper ${ index === activeIndex ? "active" : "inactive" }`}>
                        <video
                            ref={videoRefs[index]}
                            src={video.src}
                            muted={index !== activeIndex || !userInteracted}
                            loop
                            controls={index === activeIndex && userInteracted}
                            playsInline
                            onClick={() => handleVideoChange(index)}
                        />
                    </div>
                ))}
            </div>

            <div className="hero-video-buttons w-100">
                {videos.map((_, index) => (
                    <div key={index} className={ `hero-video-button ${ index === activeIndex ? "active" : "" }`} onClick={() => handleVideoChange(index)}></div>
                ))}
            </div>
        </div>
    );
};

export default Videos;
