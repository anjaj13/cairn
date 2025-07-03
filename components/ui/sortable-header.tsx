"use client";

import { ChevronUpIcon, ChevronDownIcon, ChevronUpDownIcon } from './icons';

export type SortableKeys = 'title' | 'status' | 'startDate' | 'reproducibilities' | 'hypercertFraction' | 'evaluated';
type SortDirection = 'asc' | 'desc';

export interface SortConfig {
    key: SortableKeys;
    direction: SortDirection;
}

export const SortableHeader = ({
    children,
    sortKey,
    sortConfig,
    requestSort,
    align = 'left',
}: {
    children: React.ReactNode;
    sortKey: SortableKeys;
    sortConfig: SortConfig;
    requestSort: (key: SortableKeys) => void;
    align?: 'left' | 'center' | 'right';
}) => {
    const isSorted = sortConfig.key === sortKey;
    const icon = isSorted ? (
        sortConfig.direction === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />
    ) : (
        <ChevronUpDownIcon className="h-4 w-4 text-cairn-gray-400 invisible group-hover:visible" />
    );

    return (
        <th scope="col" className={`px-6 py-3 text-${align} text-xs font-semibold text-cairn-gray-600 dark:text-cairn-gray-400 uppercase tracking-wider`}>
            <button onClick={() => requestSort(sortKey)} className="group inline-flex items-center space-x-2 hover:text-cairn-gray-900 dark:hover:text-cairn-gray-100 transition-colors">
                <span>{children}</span>
                <span className="flex-none rounded text-cairn-gray-400 group-hover:text-cairn-gray-600 dark:group-hover:text-cairn-gray-200 transition-colors">
                    {icon}
                </span>
            </button>
        </th>
    );
};