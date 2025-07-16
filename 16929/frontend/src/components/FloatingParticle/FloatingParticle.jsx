import React from 'react';

const FloatingParticle = ({ count = 40 }) => {
    const particles = Array.from({ length: count }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 2 + 2, // Duration between 2s and 4s for a faster effect
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
                    style={{ top: `${p.top}%`, left: `${p.left}%`, animation: `float ${p.duration}s infinite` }}
                />
            ))}
        </div>
    );
};

export default FloatingParticle;
