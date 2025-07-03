
import { useMemo } from 'react';
import { ProjectStatus } from '../../lib/types';

export const StatusBadge = ({ status }: { status: ProjectStatus }) => {
    const colorClasses = useMemo(() => {
        switch (status) {
            case ProjectStatus.Active: return 'bg-status-info-bg text-status-info dark:bg-status-info-bg-dark';
            case ProjectStatus.Funded: return 'bg-status-success-bg text-status-success dark:bg-status-success-bg-dark';
            case ProjectStatus.Draft: return 'bg-cairn-gray-200 text-cairn-gray-700 dark:bg-cairn-gray-700 dark:text-cairn-gray-200';
            case ProjectStatus.Archived: return 'bg-status-danger-bg text-status-danger dark:bg-status-danger-bg-dark';
            default: return 'bg-cairn-gray-200 text-cairn-gray-700 dark:bg-cairn-gray-700 dark:text-cairn-gray-200';
        }
    }, [status]);
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClasses}`}>{status}</span>;
};
