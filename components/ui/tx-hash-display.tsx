"use client";

import React from 'react';
import { useClipboard } from '../../hooks/use-clipboard';
import { CopyIcon, CheckIcon } from './icons';

export const TxHashDisplay = ({ hash }: { hash: string }) => {
    const { copy, copied } = useClipboard();
    const formatHash = (h: string) => {
        if (!h || h.length < 14) return h;
        return `${h.substring(0, 8)}...${h.substring(h.length - 6)}`;
    };

    return (
        <div className="flex items-center space-x-2 font-mono text-sm text-text-secondary dark:text-text-dark-secondary">
            <span title={hash}>{formatHash(hash)}</span>
            <button onClick={() => copy(hash)} className="p-1 rounded-full hover:bg-cairn-gray-200 dark:hover:bg-cairn-gray-700">
                {copied ? <CheckIcon className="h-4 w-4 text-status-success" /> : <CopyIcon className="h-4 w-4" />}
            </button>
        </div>
    );
};
