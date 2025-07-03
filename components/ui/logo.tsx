
import React from 'react';

const BaseLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
     <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
         <defs>
             <linearGradient id="grad-new" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className="text-blue-400" stopColor="currentColor" />
                <stop offset="100%" className="text-primary" stopColor="currentColor" />
            </linearGradient>
        </defs>
        <g fill="url(#grad-new)">
            {/* Body - trapezoid shape */}
            <path d="M25,85 h50 l10,-40 h-70 Z" />
            {/* Head - circle */}
            <circle cx="50" cy="30" r="18" />
        </g>
    </svg>
);

export const LandingHeaderLogo = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div className="flex items-center space-x-3" {...props}>
        <BaseLogoIcon className="w-8 h-8 text-primary" />
        <span className="text-2xl font-extrabold text-white">CAIRN</span>
    </div>
);

export const HowItWorksHeaderLogo = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div className="flex items-center space-x-3" {...props}>
        <BaseLogoIcon className="w-8 h-8 text-primary" />
        <span className="text-2xl font-bold text-text dark:text-text-dark">CAIRN / How It Works</span>
    </div>
);

export const AppLogo = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div className="flex items-center space-x-3" {...props}>
        <BaseLogoIcon className="w-8 h-8 text-primary" />
        <span className="text-2xl font-extrabold text-text dark:text-text-dark">CAIRN</span>
    </div>
);
