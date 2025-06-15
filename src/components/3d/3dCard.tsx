import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { trackEvent } from '../../lib/firebase';

interface Card3DProps {
    title?: string;
    children: React.ReactNode;
    depth?: number;
    id: string;
    className?: string;
}

const Card3D: React.FC<Card3DProps> = ({
                                           title,
                                           children,
                                           depth = 1,
                                           id,
                                           className = ''
                                       }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    // Track hover events
    useEffect(() => {
        if (isHovered) {
            trackEvent('3d_card_hover', {
                card_id: id
            });
        }
    }, [isHovered, id]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Transform x and y to be between -1 and 1, with the center being 0
        const rotateY = (x - 0.5) * 2 * 3; // Max 10 degrees rotation
        const rotateX = ((y - 0.5) * 2 * 3) * -1; // Invert Y axis

        setRotation({ x: rotateX, y: rotateY });
    };

    const resetRotation = () => {
        setRotation({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <div
            ref={cardRef}
            className={`transition-transform duration-300 ease-out ${className}`}
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetRotation}
        >
            <div
                style={{
                    transform: isHovered
                        ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.05, 1.05, 1.05)`
                        : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.3s ease-out'
                }}
            >
                <Card className="overflow-hidden shadow-xl">
                    {title && (
                        <CardHeader>
                            <CardTitle style={{ transform: `translateZ(${depth/2}px)` }}>
                                {title}
                            </CardTitle>
                        </CardHeader>
                    )}
                    <CardContent style={{ transform: `translateZ(${depth}px)` }}>
                        {children}
                    </CardContent>

                    {/* Reflective bottom edge */}
                    {isHovered && (
                        <div
                            className="absolute inset-x-0 bottom-0 h-1"
                            style={{
                                background: 'linear-gradient(to right, rgba(100, 100, 255, 0.3), rgba(200, 200, 255, 0.6), rgba(100, 100, 255, 0.3))',
                                transform: `translateY(${depth/10}px) rotateX(90deg)`,
                                transformOrigin: 'bottom'
                            }}
                        />
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Card3D;