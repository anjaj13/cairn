
"use client";

import React from 'react';
import { useClipboard } from '../../hooks/use-clipboard';
import { CopyIcon, CheckIcon } from './icons';

export const AddressDisplay = ({ address }: { address: string }) => {
    const { copy, copied } = useClipboard();
    const formatAddress = (addr: string) => {
        if (!addr || addr.length < 10) return addr;
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    return (
        <div className="flex items-center space-x-2 font-mono text-sm text-text-secondary dark:text-text-dark-secondary">
            <span title={address}>{formatAddress(address)}</span>
            <button onClick={() => copy(address)} className="p-1 rounded-full hover:bg-cairn-gray-200 dark:hover:bg-cairn-gray-700">
                {copied ? <CheckIcon className="h-4 w-4 text-status-success" /> : <CopyIcon className="h-4 w-4" />}
            </button>
        </div>
    );
};
