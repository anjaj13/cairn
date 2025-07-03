"use client";

import React from 'react';

type ImpactLevel = 'High' | 'Medium' | 'Low';

export const ImpactLevelBadge = ({ level }: { level: ImpactLevel }) => {
    const config: Record<ImpactLevel, string> = {
        High: 'bg-status-success-bg text-status-success dark:bg-status-success-bg-dark',
        Medium: 'bg-status-warning-bg text-status-warning dark:bg-status-warning-bg-dark',
        Low: 'bg-status-danger-bg text-status-danger dark:bg-status-danger-bg-dark',
    };
    
    return (
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${config[level]}`}>
            {level} Impact
        </span>
    );
};
