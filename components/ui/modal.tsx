"use client";

import { CloseIcon } from './icons';

const IconButton = ({ onClick, children, className = '' }: { onClick: () => void, children: React.ReactNode, className?: string }) => (
    <button onClick={onClick} className={`p-2 rounded-full text-text-secondary hover:bg-cairn-gray-200 dark:hover:bg-cairn-gray-700 transition-colors ${className}`}>
        {children}
    </button>
);

export const Modal = ({ children, onClose, title, footer }: { children: React.ReactNode, onClose: () => void, title: string, footer?: React.ReactNode }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-8 pt-20 animate-fade-in" onClick={onClose}>
        <div className="bg-background-light dark:bg-background-dark-light rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col animate-modal-scale-in border border-border dark:border-border-dark" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-border dark:border-border-dark flex-shrink-0">
                <h2 className="text-xl font-semibold text-text dark:text-text-dark">{title}</h2>
                <IconButton onClick={onClose}><CloseIcon className="w-6 h-6" /></IconButton>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">{children}</div>
            {footer && (
                <div className="p-6 border-t border-border dark:border-border-dark flex-shrink-0 bg-cairn-gray-50 dark:bg-cairn-gray-900/50 rounded-b-2xl">
                    {footer}
                </div>
            )}
        </div>
    </div>
);