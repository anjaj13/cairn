
"use client";

import React from 'react';

// Simple hashing function to get a number from a string
const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

// Generates a color palette from a hash
const getPalette = (hash: number) => {
    const palettes = [
        ['#dbeafe', '#93c5fd', '#3b82f6', '#1e40af'], // Blue
        ['#d1fae5', '#6ee7b7', '#10b981', '#047857'], // Green
        ['#fee2e2', '#fca5a5', '#ef4444', '#991b1b'], // Red
        ['#fef3c7', '#fde047', '#f59e0b', '#b45309'], // Amber
        ['#e0e7ff', '#a5b4fc', '#6366f1', '#4338ca'], // Indigo
        ['#f3e8ff', '#d8b4fe', '#a855f7', '#7e22ce'], // Purple
        ['#fce7f3', '#f9a8d4', '#ec4899', '#be185d'], // Pink
    ];
    return palettes[hash % palettes.length];
};

export const GenerativePlaceholder = ({ projectId, className }: { projectId: string, className?: string }) => {
    const hash = simpleHash(projectId);
    const palette = getPalette(hash);

    const layers = Array.from({ length: 3 }).map((_, i) => {
        const id = `grad-${projectId}-${i}`;
        const cx = 25 + ((hash + i * 20) % 50);
        const cy = 25 + ((hash + i * 35) % 50);
        const r = 50 + ((hash + i * 15) % 25);
        const color1 = palette[(i) % palette.length];
        const color2 = palette[(i + 1) % palette.length];

        return (
            <React.Fragment key={i}>
                <defs>
                    <radialGradient id={id}>
                        <stop offset="0%" stopColor={color1} stopOpacity="0.7" />
                        <stop offset="100%" stopColor={color2} stopOpacity="0" />
                    </radialGradient>
                </defs>
                <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
            </React.Fragment>
        );
    });

    return (
        <div className={`bg-cairn-gray-100 dark:bg-cairn-gray-900 overflow-hidden ${className}`}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect width="100" height="100" fill={palette[3]} />
                <g style={{ mixBlendMode: 'overlay' }} opacity="0.8">
                    {layers}
                </g>
                 <g style={{ mixBlendMode: 'soft-light' }} opacity="0.6">
                     <rect width="100" height="100" fill={`url(#grad-${projectId}-0)`} transform={`rotate(${(hash % 90) - 45} 50 50)`}/>
                </g>
            </svg>
        </div>
    );
};