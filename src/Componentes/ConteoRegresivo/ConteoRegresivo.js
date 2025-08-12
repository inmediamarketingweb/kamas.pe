import { useEffect, useState, useMemo, useCallback } from 'react';
import './ConteoRegresivo.css';

function ConteoRegresivo({ onExpire }) {
    const globalStartDate = useMemo(() => new Date('2025-08-01T00:00:00'), []);
    
    const activeDuration = 5 * 24 * 60 * 60 * 1000;
    const restingDuration = 3 * 60 * 60 * 1000;
    const totalCycleDuration = activeDuration + restingDuration;
    
    const [cyclePhase, setCyclePhase] = useState('active');
    const [targetDate, setTargetDate] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ 
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0 
    });

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
                const newCycle = calculateCurrentCycle();
                setCyclePhase(newCycle.phase);
                setTargetDate(newCycle.targetDate);
                
                if (cyclePhase === 'active') {
                    onExpire && onExpire();
                }
                return;
            }

            setTimeLeft(calculateTimeLeft());
        }, 1000);
        
        return () => clearInterval(interval);
    }, [targetDate, cyclePhase, onExpire, calculateCurrentCycle, calculateTimeLeft]);

    return(
        <div className="conteo-container">
            {cyclePhase === 'resting' ? (
                <div className="resting-message">
                    <h2>¡Las ofertas terminaron</h2>
                    <p>Pronto, nuevas ofertas</p>
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

export default ConteoRegresivo;
