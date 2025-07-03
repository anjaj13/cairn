
"use client";

import React from 'react';
import { FileTextIcon, SearchIcon, ChartBarIcon } from '../ui/icons';
import { useAppContext } from '../../context/app-provider';
import { UserRole } from '../../lib/types';

const NavItem = ({ icon: Icon, label, isActive, onClick }: { icon: React.FC<any>, label: string, isActive: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center flex-1 py-1 space-y-1 transition-colors duration-200 h-full ${
            isActive ? 'text-primary dark:text-primary-light' : 'text-text-secondary dark:text-text-dark-secondary'
        }`}
        aria-current={isActive ? 'page' : undefined}
    >
        <Icon className="w-6 h-6" />
        <span className="text-[11px] font-semibold tracking-wide">{label}</span>
    </button>
);

export const BottomNavBar = ({ activePage, onNavigate }: { activePage: string; onNavigate: (page: string) => void; }) => {
    const { userRole } = useAppContext();

    const scientistNavItems = [
        { id: 'projects', label: 'My Projects', icon: FileTextIcon },
        { id: 'discover', label: 'Discover & PoR', icon: SearchIcon },
        { id: 'funding', label: 'Funding', icon: ChartBarIcon },
    ];

    const funderNavItems = [
        { id: 'portfolio', label: 'Portfolio', icon: ChartBarIcon },
        { id: 'discover', label: 'Discover', icon: SearchIcon },
    ];

    const navItems = userRole === UserRole.Scientist ? scientistNavItems : funderNavItems;

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-cairn-gray-100/95 dark:bg-cairn-gray-950/95 backdrop-blur-lg border-t border-border dark:border-border-dark z-40">
            <nav className="flex justify-around items-stretch h-full">
                {navItems.map(item => (
                    <NavItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        isActive={activePage === item.id}
                        onClick={() => onNavigate(item.id)}
                    />
                ))}
            </nav>
        </div>
    );
};