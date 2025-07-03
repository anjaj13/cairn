import React from 'react';

export const Tooltip = ({ children, text }: { children: React.ReactNode; text: string }) => (
    <div className="relative group">
        {children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs text-center px-3 py-1.5 bg-text text-background-light dark:bg-text-dark dark:text-background-dark text-xs font-sans rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            {text}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-text dark:border-t-text-dark"></div>
        </div>
    </div>
);
