import { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import './ConteoRegresivo.css';

function ConteoRegresivo({ onTerminar, onExpire, onActivate }){
    const activeDuration = 6 * 60 * 60 * 24 * 1000;
    const restingDuration = 8 * 60 * 60 * 1000;
    const totalCycleDuration = activeDuration + restingDuration;
    const globalStartDate = useMemo(() => new Date('2025-08-01T00:00:00'), []);
    const [cyclePhase, setCyclePhase] = useState('active');
    const [targetDate, setTargetDate] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const format = useCallback((num) => String(num).padStart(2, '0'), []);

    const calculateCurrentCycle = useCallback(() => {
        const now = new Date();
        const timeSinceStart = now - globalStartDate;
        const fullCycles = Math.floor(timeSinceStart / totalCycleDuration);
        const timeInCurrentCycle = timeSinceStart % totalCycleDuration;

        if (timeInCurrentCycle < activeDuration) {
            const phaseStart = new Date(
                globalStartDate.getTime() + fullCycles * totalCycleDuration
            );
            return {
                phase: 'active',
                targetDate: new Date(phaseStart.getTime() + activeDuration)
            };
        } else {
            const phaseStart = new Date(
                globalStartDate.getTime() + fullCycles * totalCycleDuration + activeDuration
            );
            return {
                phase: 'resting',
                targetDate: new Date(phaseStart.getTime() + restingDuration)
            };
        }
    }, [globalStartDate, activeDuration, restingDuration, totalCycleDuration]);

    useEffect(() => {
        const currentCycle = calculateCurrentCycle();
        setCyclePhase(currentCycle.phase);
        setTargetDate(currentCycle.targetDate);
    }, [calculateCurrentCycle]);

    const calculateTimeLeft = useCallback(() => {
        if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        
        const now = new Date();
        const diffInMs = Math.max(0, targetDate - now);
        const diffInSec = Math.floor(diffInMs / 1000);
        
        return {
            days: Math.floor(diffInSec / (3600 * 24)),
            hours: Math.floor((diffInSec % (3600 * 24)) / 3600),
            minutes: Math.floor((diffInSec % 3600) / 60),
            seconds: diffInSec % 60,
        };
    }, [targetDate]);

    useEffect(() => {
        if (!targetDate) return;

        const interval = setInterval(() => {
            const now = new Date();
            const diffInMs = targetDate - now;

            if (diffInMs <= 0) {
                onExpire && onExpire();
                onTerminar && onTerminar();

                const newCycle = calculateCurrentCycle();
                setCyclePhase(newCycle.phase);
                setTargetDate(newCycle.targetDate);
                return;
            }

            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate, calculateCurrentCycle, calculateTimeLeft, onTerminar, onExpire]);

    useEffect(() => {
        const currentCycle = calculateCurrentCycle();
        setCyclePhase(currentCycle.phase);
        setTargetDate(currentCycle.targetDate);

        if (currentCycle.phase === 'resting') {
            onExpire && onExpire();
            onTerminar && onTerminar();
        } else {
            onActivate && onActivate();
        }
    }, [calculateCurrentCycle, onTerminar, onExpire, onActivate]);

    return(
        <div className="conteo-container">
            {cyclePhase === 'resting' ? (
                <div className="resting-message">
                    <p className='color-white'>El tiempo se agotó 😢</p>

                    <div className="sale-time">
                        <div className="time-unit">
                            <span>{format(timeLeft.days)}</span>
                            <p>Días</p>
                        </div>
                        <div className="time-unit">
                            <span>{format(timeLeft.hours)}</span>
                            <p>Hor.</p>
                        </div>
                        <div className="time-unit">
                            <span>{format(timeLeft.minutes)}</span>
                            <p>Min.</p>
                        </div>
                        <div className="time-unit">
                            <span>{format(timeLeft.seconds)}</span>
                            <p>Seg.</p>
                        </div>
                    </div>

                    <p className='color-white'>Nuevas ofertas, pronto 🎉</p>
                </div>
            ) : (
                <div className="sale-time">
                    <div className="time-unit">
                        <span>{format(timeLeft.days)}</span>
                        <p>Días</p>
                    </div>
                    <div className="time-unit">
                        <span>{format(timeLeft.hours)}</span>
                        <p>Hor.</p>
                    </div>
                    <div className="time-unit">
                        <span>{format(timeLeft.minutes)}</span>
                        <p>Min.</p>
                    </div>
                    <div className="time-unit">
                        <span>{format(timeLeft.seconds)}</span>
                        <p>Seg.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

ConteoRegresivo.propTypes = {
    onTerminar: PropTypes.func,
    onExpire: PropTypes.func,
    onActivate: PropTypes.func,
};

export default ConteoRegresivo;
