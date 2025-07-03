

import React from "react";
import { Project, Reproducibility, ProjectStatus, PoRStatus } from "../../lib/types";
import { EyeIcon, FlagIcon, ClockIcon, CheckCircleIcon } from "../ui/icons";
import { MOCK_USERS } from "../../lib/constants";

const PoRStatusBadge = ({ status }: { status: PoRStatus }) => {
    const statusConfig = {
        [PoRStatus.Success]: {
            icon: CheckCircleIcon,
            color: 'text-status-success',
            text: 'Success: This submission has been successfully verified.',
        },
        [PoRStatus.Waiting]: {
            icon: ClockIcon,
            color: 'text-status-warning',
            text: 'Waiting: This submission is in a 7-day dispute window.',
        },
        [PoRStatus.Disputed]: {
            icon: FlagIcon,
            color: 'text-status-danger',
            text: 'Disputed: This submission has been flagged and is under review.',
        },
    };
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <div className="relative group flex items-center justify-center">
            <Icon className={`w-5 h-5 ${config.color}`} />
            <span className="absolute bottom-full mb-2 w-max max-w-xs px-2 py-1 bg-text text-background-light text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {config.text}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-text"></div>
            </span>
        </div>
    );
};


export default function PoRModule({
    project,
    isOwner,
    onPorSubmitClick,
    onViewReproducibility,
    className,
}: {
    project: Project;
    isOwner: boolean;
    onPorSubmitClick: () => void;
    onViewReproducibility: (rep: Reproducibility) => void;
    className?: string;
}) {
    return (
        <div className={`space-y-6 ${className || ''}`}>
            <h3 className="text-xl font-semibold text-text dark:text-text-dark">Reproducibility</h3>
            
            {!isOwner && project.status === ProjectStatus.Active && (
                 <button onClick={onPorSubmitClick} className="w-full bg-primary text-primary-text font-semibold py-2.5 px-4 rounded-lg hover:bg-primary-hover transition-colors shadow-md hover:shadow-lg">
                    Submit for Reproducibility
                </button>
            )}
            <div>
                <h4 className="font-semibold mb-2 text-text dark:text-text-dark">Submissions ({project.reproducibilities.length})</h4>
                 <div className="border border-border dark:border-border-dark rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-cairn-gray-50 dark:bg-cairn-gray-800/50 text-left text-xs text-text-secondary dark:text-text-dark-secondary uppercase">
                            <tr>
                                <th className="p-3 font-semibold text-center">Status</th>
                                <th className="p-3 font-semibold">Author</th>
                                <th className="p-3 font-semibold">Date</th>
                                <th className="p-3 font-semibold text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border dark:divide-border-dark">
                        {project.reproducibilities.map((rep) => {
                            return (
                                <tr key={rep.id} className="hover:bg-cairn-gray-50 dark:hover:bg-cairn-gray-800/50 transition-colors">
                                    <td className="p-3 text-center"><PoRStatusBadge status={rep.status} /></td>
                                    <td className="p-3" title={rep.verifier}>
                                        <span className="font-semibold text-text dark:text-text-dark font-mono">
                                            {rep.verifier}
                                        </span>
                                    </td>
                                    <td className="p-3 text-text-secondary dark:text-text-dark-secondary whitespace-nowrap">{rep.timestamp}</td>
                                    <td className="p-3">
                                        <div className="flex justify-end items-center space-x-2">
                                            <button 
                                                onClick={() => onViewReproducibility(rep)} 
                                                className="bg-cairn-gray-200 dark:bg-cairn-gray-700 text-text-secondary dark:text-text-dark-secondary text-xs font-semibold py-1 px-2.5 rounded-md hover:bg-cairn-gray-300 dark:hover:bg-cairn-gray-600 transition-colors"
                                                title="View Details"
                                            >
                                                View
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                         {project.reproducibilities.length === 0 && (
                            <tr><td colSpan={4} className="p-4 text-center text-text-secondary">No submissions yet.</td></tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};