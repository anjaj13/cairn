
import React from 'react';
import { PoRStatus } from '../../lib/types';
import { CheckCircleIcon, ClockIcon, FlagIcon } from './icons';

type PoRStatusBadgeProps = {
    status: PoRStatus;
    size?: 'sm' | 'md';
    className?: string;
};

export const PoRStatusBadge = ({ status, size = 'sm', className = '' }: PoRStatusBadgeProps) => {
    const statusConfig = {
        [PoRStatus.Success]: { icon: CheckCircleIcon, color: 'text-status-success', bg: 'bg-status-success-bg dark:bg-status-success-bg-dark', text: 'Success' },
        [PoRStatus.Waiting]: { icon: ClockIcon, color: 'text-status-warning', bg: 'bg-status-warning-bg dark:bg-status-warning-bg-dark', text: 'Waiting' },
        [PoRStatus.Disputed]: { icon: FlagIcon, color: 'text-status-danger', bg: 'bg-status-danger-bg dark:bg-status-danger-bg-dark', text: 'Disputed' },
    };
    
    const sizeConfig = {
        sm: {
            container: 'space-x-1.5 px-2.5 py-1 text-xs',
            icon: 'w-3.5 h-3.5',
        },
        md: {
            container: 'space-x-2 px-3 py-1.5 text-sm',
            icon: 'w-5 h-5',
        }
    };

    const config = statusConfig[status];
    const sizeConf = sizeConfig[size];
    const Icon = config.icon;

    return (
        <div className={`flex items-center font-medium rounded-full ${sizeConf.container} ${config.bg} ${config.color} ${className}`}>
            <Icon className={`${sizeConf.icon}`} />
            <span className="font-semibold">{config.text}</span>
        </div>
    );
};
