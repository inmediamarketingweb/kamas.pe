// import { useState, useEffect } from 'react';

// import './Video.css';

// function Video({ producto }) {
//     const [videoSources, setVideoSources] = useState([]);
//     const videos = Array.isArray(producto?.video) ? producto.video : [];

//     useEffect(() => {
//         const checkVideos = async () => {
//             const sourceChecks = await Promise.all(
//                 videos.map(async (video) => {
//                     try {
//                         const cacheBuster = `?ts=${Date.now()}`;
//                         const response = await fetch(video.ruta + cacheBuster);
//                         return response.ok ? video.ruta : null;
//                     } catch (error) {
//                         return null;
//                     }
//                 })
//             );
//             setVideoSources(sourceChecks);
//         };

//         if (videos.length > 0) {
//             checkVideos();
//         }
//     }, [videos]);

//     return (
//         <div className="d-flex-column gap-10 product-video-container">
//             {videos.map((video, index) => (
//                 <div key={index} className='w-100 d-flex-column'>
//                     {videoSources[index] ? (
//                         <>
//                             <video width="auto" height="auto" autoPlay controls className='product-video'>
//                                 <source src={videoSources[index]} type="video/mp4" />
//                             </video>
//                             <a href={video.url} title='Ver en TikTok' target='_blank' rel="noopener noreferrer">
//                                 <p>Ver en TikTok</p>
//                                 <span className="material-icons">arrow_outward</span>
//                             </a>
//                         </>
//                     ) : (
//                         videos.length > 0 && (
//                             <div className="video-error d-flex-center-center d-flex-column gap-10">
//                                 <p className='text'>Video no disponible</p>
//                             </div>
//                         )
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Video;

import { useState, useEffect, useMemo } from 'react'; // Añade useMemo al import

import './Video.css';

function Video({ producto }) {
    const [videoSources, setVideoSources] = useState([]);
    
    // Usa useMemo para memoizar el cálculo de videos
    const videos = useMemo(() => 
        Array.isArray(producto?.video) ? producto.video : [], 
        [producto] // Solo se recalcula cuando producto cambie
    );

    useEffect(() => {
        const checkVideos = async () => {
            const sourceChecks = await Promise.all(
                videos.map(async (video) => {
                    try {
                        const cacheBuster = `?ts=${Date.now()}`;
                        const response = await fetch(video.ruta + cacheBuster);
                        return response.ok ? video.ruta : null;
                    } catch (error) {
                        return null;
                    }
                })
            );
            setVideoSources(sourceChecks);
        };

        if (videos.length > 0) {
            checkVideos();
        }
    }, [videos]); // Ahora videos es una dependencia estable

    return (
        <div className="d-flex-column gap-10 product-video-container">
            {videos.map((video, index) => (
                <div key={index} className='w-100 d-flex-column'>
                    {videoSources[index] ? (
                        <>
                            <video width="auto" height="auto" autoPlay controls className='product-video'>
                                <source src={videoSources[index]} type="video/mp4" />
                            </video>
                            <a href={video.url} title='Ver en TikTok' target='_blank' rel="noopener noreferrer">
                                <p>Ver en TikTok</p>
                                <span className="material-icons">arrow_outward</span>
                            </a>
                        </>
                    ) : (
                        videos.length > 0 && (
                            <div className="video-error d-flex-center-center d-flex-column gap-10">
                                <p className='text'>Video no disponible</p>
                            </div>
                        )
                    )}
                </div>
            ))}
        </div>
    );
}

export default Video;
