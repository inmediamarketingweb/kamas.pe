import { useEffect, useState } from 'react';

import './ConteoRegresivo.css';

function ConteoRegresivo({ onExpire }){
    const defaultTargetDate = new Date('2025-08-31T00:00:00');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const format = (num) => String(num).padStart(2, '0');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diffInSec = Math.max(0, Math.floor((defaultTargetDate - now) / 1000));

            if (diffInSec === 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                if (onExpire) onExpire();
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(diffInSec / (3600 * 24)),
                hours: Math.floor((diffInSec % (3600 * 24)) / 3600),
                minutes: Math.floor((diffInSec % 3600) / 60),
                seconds: diffInSec % 60,
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [onExpire]);

    return(
        <div className="sale-time">
            <div className="sale-time-days">
                <span>{format(timeLeft.days)}</span>
                <p>Días</p>
            </div>
            <div className="sale-time-hours">
                <span>{format(timeLeft.hours)}</span>
                <p>Hor.</p>
            </div>
            <div className="sale-time-minutes">
                <span>{format(timeLeft.minutes)}</span>
                <p>Min.</p>
            </div>
            <div className="sale-time-seconds">
                <span>{format(timeLeft.seconds)}</span>
                <p>Seg.</p>
            </div>
        </div>
    );
}

export default ConteoRegresivo;
