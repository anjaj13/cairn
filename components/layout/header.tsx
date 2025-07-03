
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { UserRole } from '../../lib/types';
import { SunIcon, MoonIcon, WalletIcon, SearchIcon, BellIcon, ChevronDownIcon, UserCircleIcon, CheckIcon } from '../ui/icons';
import { useAppContext } from '../../context/app-provider';
import { AppLogo } from '../ui/logo';


const IconButton = ({ onClick, children, className = '' }: { onClick?: () => void, children: React.ReactNode, className?: string }) => (
    <button onClick={onClick} className={`p-2 rounded-full text-text-secondary dark:text-text-dark-secondary hover:bg-cairn-gray-100 dark:hover:bg-cairn-gray-800 transition-colors ${className}`}>
        {children}
    </button>
);

const UserMenu = () => {
    const { userRole, setUserRole, currentUser, disconnectWallet } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const setRole = (role: UserRole) => {
        setUserRole(role);
        setIsOpen(false);
    };

    if (!currentUser) {
        return null;
    }

    const formatAddress = (address: string) => {
        if (!address || address.length < 10) return address;
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 p-2 rounded-full hover:bg-cairn-gray-100 dark:hover:bg-cairn-gray-800">
                <UserCircleIcon className="w-8 h-8 text-text-secondary dark:text-text-dark-secondary" />
                <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-semibold text-text dark:text-text-dark font-mono">{formatAddress(currentUser.walletAddress)}</span>
                    <span className="text-xs text-text-secondary dark:text-text-dark-secondary">{userRole}</span>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-background-light dark:bg-background-dark-light rounded-xl shadow-2xl border border-border dark:border-border-dark z-50 py-2 animate-modal-scale-in origin-top-right">
                    <div className="px-4 py-2 border-b border-border dark:border-border-dark mb-2">
                         <p className="text-sm text-text-secondary dark:text-text-dark-secondary truncate" title={currentUser.walletAddress}><WalletIcon className="inline w-3 h-3 mr-1" />{currentUser.walletAddress}</p>
                    </div>
                    <p className="text-xs font-semibold text-text-secondary dark:text-text-dark-secondary px-4 mt-2 mb-1">Switch Role</p>
                    <button onClick={() => setRole(UserRole.Scientist)} className="w-full text-left px-4 py-2 text-sm flex justify-between items-center text-text dark:text-text-dark hover:bg-cairn-gray-100 dark:hover:bg-cairn-gray-800">
                        <span>👩‍🔬 Scientist</span>
                        {userRole === UserRole.Scientist && <CheckIcon className="w-4 h-4 text-primary" />}
                    </button>
                     <button onClick={() => setRole(UserRole.Funder)} className="w-full text-left px-4 py-2 text-sm flex justify-between items-center text-text dark:text-text-dark hover:bg-cairn-gray-100 dark:hover:bg-cairn-gray-800">
                        <span>💰 Funder</span>
                        {userRole === UserRole.Funder && <CheckIcon className="w-4 h-4 text-primary" />}
                    </button>
                    <div className="border-t border-border dark:border-border-dark my-2"></div>
                    <button onClick={disconnectWallet} className="w-full text-left px-4 py-2 text-sm text-text dark:text-text-dark hover:bg-cairn-gray-100 dark:hover:bg-cairn-gray-800">
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
}

export default function Header({ onNavigate }: { onNavigate: (page: string) => void }) {
    const { isDarkMode, setIsDarkMode } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <header className="relative z-30 h-20 flex-shrink-0 bg-background-light/80 dark:bg-background-dark-light/80 backdrop-blur-lg border-b border-border dark:border-border-dark flex items-center justify-between px-6 lg:px-8">
            {/* On mobile, show AppLogo. On larger screens, show search bar */}
            <div className="flex items-center">
                <div className="lg:hidden">
                    <AppLogo />
                </div>
                <div className="relative hidden lg:block">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary dark:text-text-dark-secondary" />
                    <input 
                        type="text" 
                        placeholder="Search projects, researchers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full min-w-[300px] bg-cairn-gray-100 dark:bg-cairn-gray-800/50 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg h-11 pl-11 pr-4 text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
                <IconButton onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                </IconButton>
                <IconButton>
                    <div className="relative">
                        <BellIcon className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-status-danger rounded-full"></span>
                    </div>
                </IconButton>
                <div className="h-8 w-px bg-border dark:border-border-dark"></div>
                <UserMenu />
            </div>
        </header>
    );
};