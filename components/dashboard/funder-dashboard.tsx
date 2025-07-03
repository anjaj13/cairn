
"use client";

import React, { useState, useMemo } from 'react';
import { Project, ProjectStatus, FundingEvent, PoRStatus } from '../../lib/types';
import { CheckIcon, ScaleIcon, UsersGroupIcon, GavelIcon, BeakerIcon, ChartBarIcon, SearchIcon, ChevronRightIcon, CopyIcon, FlagIcon, ClockIcon, CheckCircleIcon, FileTextIcon } from '../ui/icons';
import { GenerativePlaceholder } from '../ui/generative-placeholder';
import { useAppContext } from '../../context/app-provider';
import { useClipboard } from '../../hooks/use-clipboard';
import { ImpactLevelBadge } from '../ui/impact-level-badge';

const StatCard = ({ icon: Icon, title, value }: { icon: React.FC<any>, title: string, value: string | number}) => (
    <div className="bg-background-light dark:bg-background-dark-light p-6 rounded-xl flex items-start space-x-4 border border-border dark:border-border-dark h-full">
        <div className="bg-primary-light dark:bg-primary/20 p-3 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary dark:text-primary-light" />
        </div>
        <div>
            <p className="text-sm font-medium text-text-secondary dark:text-text-dark-secondary">{title}</p>
            <p className="text-3xl font-bold text-text dark:text-text-dark">{value}</p>
        </div>
    </div>
);

const getImpactLevel = (fraction: number): 'High' | 'Medium' | 'Low' => {
    if (fraction >= 0.75) return 'High';
    if (fraction >= 0.3) return 'Medium';
    return 'Low';
};

const FundingHistoryWidget = ({ history, projects, onSelectProject }: { history: FundingEvent[], projects: Project[], onSelectProject: (p: Project) => void }) => {
    const TxHash = ({ hash }: { hash: string }) => {
        const { copy, copied } = useClipboard();
        return (
            <div className="flex items-center space-x-2">
                <a href="#" onClick={(e) => e.stopPropagation()} className="font-mono text-xs text-primary hover:underline" title={hash}>
                    {hash.substring(0, 8)}...{hash.substring(hash.length - 6)}
                </a>
                <button onClick={(e) => { e.stopPropagation(); copy(hash); }} className="p-1 rounded-full text-text-secondary hover:bg-cairn-gray-200 dark:hover:bg-cairn-gray-700">
                    {copied ? <CheckIcon className="h-3 w-3 text-status-success" /> : <CopyIcon className="h-3 w-3" />}
                </button>
            </div>
        );
    };

    return (
        <div className="bg-background-light dark:bg-background-dark-light rounded-xl p-5 border border-border dark:border-border-dark shadow-sm h-full">
            <h4 className="font-semibold mb-4 text-text dark:text-text-dark">Funding History</h4>
            <div className="max-h-[30rem] overflow-y-auto -mr-3 pr-3">
                {history.length > 0 ? (
                    <table className="w-full text-sm">
                        <thead className="text-left">
                            <tr className="text-xs text-text-secondary dark:text-text-dark-secondary uppercase">
                                <th className="p-2 font-semibold">Project</th>
                                <th className="p-2 font-semibold">Asset Impact</th>
                                <th className="p-2 font-semibold">TX Hash</th>
                                <th className="p-2 font-semibold text-right">Amount</th>
                                <th className="p-2 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border dark:divide-border-dark">
                            {history.map(event => {
                                const project = projects.find(p => p.id === event.projectId);
                                if (!project) return null;
                                const impactLevel = getImpactLevel(project.hypercertFraction);

                                return (
                                    <tr key={event.id} className="hover:bg-cairn-gray-100 dark:hover:bg-cairn-gray-800/80 transition-colors">
                                        <td className="p-3">
                                            <p className="font-semibold text-text dark:text-text-dark truncate">{event.projectTitle}</p>
                                            <p className="text-xs text-text-secondary dark:text-text-dark-secondary">{new Date(event.timestamp).toLocaleDateString()}</p>
                                        </td>
                                        <td className="p-3">
                                            <ImpactLevelBadge level={impactLevel} />
                                        </td>
                                        <td className="p-3">
                                            <TxHash hash={event.txHash} />
                                        </td>
                                        <td className="p-3 font-semibold text-right text-status-success">
                                            ${event.amount.toLocaleString()}
                                        </td>
                                        <td className="p-3 text-right">
                                            <button
                                                onClick={() => project && onSelectProject(project)}
                                                disabled={!project}
                                                className="text-xs bg-primary-light text-primary font-semibold py-1 px-3 rounded-full hover:bg-blue-200/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-sm text-text-secondary text-center py-4">No funding contributions yet.</p>
                )}
            </div>
        </div>
    );
};


const FunderProjectCard = ({ project, onSelectProject }: { project: Project, onSelectProject: (p: Project) => void }) => {
    const { handleInstantFund } = useAppContext();
    const [fundAmount, setFundAmount] = useState('');
    
    const onFund = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const amount = parseInt(fundAmount, 10);
        if(!isNaN(amount) && amount > 0) {
            handleInstantFund(project.id, amount);
            setFundAmount('');
        }
    };
    
    const impactAssets = useMemo(() => {
        const porCounts = project.reproducibilities.reduce((acc, r) => {
            acc[r.status] = (acc[r.status] || 0) + 1;
            return acc;
        }, {} as Record<PoRStatus, number>);
        return {
            high: porCounts[PoRStatus.Success] || 0,
            medium: porCounts[PoRStatus.Waiting] || 0,
            low: porCounts[PoRStatus.Disputed] || 0,
        };
    }, [project.reproducibilities]);

     return (
        <div className="bg-background-light dark:bg-background-dark-light rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border dark:border-border-dark hover:border-primary/30 dark:hover:border-primary/70 overflow-hidden flex flex-col">
            <div onClick={() => onSelectProject(project)} className="cursor-pointer group/card flex-grow">
                <GenerativePlaceholder projectId={project.id} className="w-full h-40" />
                <div className="p-5">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="text-lg font-semibold text-text dark:text-text-dark group-hover/card:text-primary dark:group-hover/card:text-primary-light transition-colors">{project.title}</h3>
                        <div className="flex-shrink-0 mt-0.5">
                            <ImpactLevelBadge level={getImpactLevel(project.hypercertFraction)} />
                        </div>
                    </div>
                    <p className="text-sm text-text-secondary dark:text-text-dark-secondary mt-1">{project.domain}</p>
                     <p className="text-sm text-text-secondary dark:text-text-dark-secondary mt-2 line-clamp-2">{project.description}</p>
                </div>
            </div>
            <div className="px-5 py-3 bg-cairn-gray-50 dark:bg-cairn-gray-800/50 border-t border-border dark:border-border-dark mt-auto">
                <div className="flex justify-around items-center text-sm text-center">
                    <div title="High-Impact: Successful Reproductions">
                        <CheckCircleIcon className="w-5 h-5 text-status-success mx-auto" />
                        <span className="font-bold text-text dark:text-text-dark">{impactAssets.high}</span>
                        <span className="text-xs block text-text-secondary dark:text-text-dark-secondary">High</span>
                    </div>
                    <div title="Medium-Impact: Awaiting Verification">
                        <ClockIcon className="w-5 h-5 text-status-warning mx-auto" />
                        <span className="font-bold text-text dark:text-text-dark">{impactAssets.medium}</span>
                        <span className="text-xs block text-text-secondary dark:text-text-dark-secondary">Medium</span>
                    </div>
                    <div title="Low-Impact: Disputed Submissions">
                        <FlagIcon className="w-5 h-5 text-status-danger mx-auto" />
                        <span className="font-bold text-text dark:text-text-dark">{impactAssets.low}</span>
                        <span className="text-xs block text-text-secondary dark:text-text-dark-secondary">Low</span>
                    </div>
                </div>
            </div>
             <div className="p-4 bg-cairn-gray-100 dark:bg-cairn-gray-900/70 border-t border-border dark:border-border-dark space-y-2">
                 <label className="text-xs font-semibold text-text-secondary dark:text-text-dark-secondary">Amount (USD)</label>
                 <div className="flex space-x-2">
                    <input 
                        type="number"
                        value={fundAmount}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setFundAmount(e.target.value)}
                        placeholder="e.g., 500"
                        className="flex-grow w-full p-2 border border-border dark:border-border-dark rounded-md bg-background-light dark:bg-background-dark-light font-mono text-sm focus:ring-primary focus:border-primary"
                    />
                    <button
                        onClick={onFund}
                        disabled={!fundAmount || parseInt(fundAmount, 10) <= 0 || project.status === ProjectStatus.Archived}
                        className="bg-primary text-primary-text font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors disabled:bg-cairn-gray-400 dark:disabled:bg-cairn-gray-600 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                        Fund
                    </button>
                 </div>
            </div>
        </div>
    );
};

const PageHeader = ({ title, subtitle }: { title: string; subtitle: string;}) => (
    <div>
        <h1 className="text-3xl font-bold text-text dark:text-text-dark">{title}</h1>
        <p className="mt-1 text-text-secondary dark:text-text-dark-secondary">{subtitle}</p>
    </div>
);

export const FunderDashboard = ({ projects, onSelectProject, activePage, onNavigate }: { projects: Project[], onSelectProject: (p: Project) => void, activePage: string, onNavigate: (page: string) => void }) => {
    const [activeFundMode, setActiveFundMode] = useState<'instant' | 'dao'>('instant');
    const { fundingHistory, currentUser } = useAppContext();

    const myFundingHistory = useMemo(() => {
        if (!currentUser) return [];
        return fundingHistory.filter(event => event.funderWallet === currentUser.walletAddress);
    }, [fundingHistory, currentUser]);

    const totalFundingDeployed = useMemo(() => myFundingHistory.reduce((sum, e) => sum + e.amount, 0), [myFundingHistory]);
    const totalProjectsFunded = useMemo(() => new Set(myFundingHistory.map(f => f.projectId)).size, [myFundingHistory]);

    const sharedFundingProjectsCount = useMemo(() => {
        if (!currentUser) return 0;
        const myFundedProjectIds = new Set(myFundingHistory.map(f => f.projectId));

        const sharedProjects = Array.from(myFundedProjectIds).filter(projectId => {
            const fundersForProject = new Set(
                fundingHistory
                    .filter(event => event.projectId === projectId)
                    .map(event => event.funderWallet)
            );
            return fundersForProject.size > 1;
        });

        return sharedProjects.length;
    }, [myFundingHistory, fundingHistory, currentUser]);
    
    let content;

    if (activePage === 'discover') {
        content = (
            <>
                <PageHeader title="Discover & Fund Projects" subtitle="Find and support promising research initiatives." />
                <div className="border-b border-border dark:border-border-dark mb-6">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                         <button
                            onClick={() => setActiveFundMode('instant')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm transition-colors ${activeFundMode === 'instant' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text hover:border-cairn-gray-300 dark:hover:text-text-dark dark:hover:border-cairn-gray-600'}`}
                        >
                            Instant Retrospective Funding
                        </button>
                        <div className="relative group">
                            <button
                                disabled
                                className="whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm border-transparent text-cairn-gray-400 dark:text-cairn-gray-600 cursor-not-allowed"
                            >
                                DAO Voted Funding
                            </button>
                             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-text text-background-light dark:bg-text-dark dark:text-background-dark text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Coming Soon
                            </div>
                        </div>
                    </nav>
                </div>

                {activeFundMode === 'instant' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {projects.filter(p => p.status === ProjectStatus.Active || p.status === ProjectStatus.Funded).map(p => <FunderProjectCard key={p.id} project={p} onSelectProject={onSelectProject} />)}
                    </div>
                )}
                 {activeFundMode === 'dao' && (
                    <div className="text-center py-16 px-6 border-2 border-dashed border-border dark:border-border-dark rounded-xl bg-cairn-gray-100 dark:bg-cairn-gray-800/50">
                        <GavelIcon className="mx-auto h-12 w-12 text-text-secondary" />
                        <h3 className="mt-4 text-xl font-semibold text-text dark:text-text-dark">DAO Voting is Coming Soon</h3>
                        <p className="mt-2 text-md text-text-secondary dark:text-text-dark-secondary">
                            This feature will allow CAIRN token holders to collectively decide on funding allocations.
                        </p>
                    </div>
                )}
            </>
        );
    } else { // 'portfolio' and default
        content = (
            <>
                <PageHeader title="Funding Portfolio" subtitle="An overview of your funding activity and impact." />
                <div className="bg-background-light dark:bg-background-dark-light p-6 rounded-xl border border-border dark:border-border-dark">
                    <h2 className="text-xl font-semibold mb-6 text-text dark:text-text-dark">Portfolio Metrics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard icon={ScaleIcon} title="Total Funding Deployed" value={`$${totalFundingDeployed.toLocaleString()}`} />
                        <StatCard icon={FileTextIcon} title="Total Projects Funded" value={totalProjectsFunded} />
                        <StatCard icon={UsersGroupIcon} title="Shared Funding Projects" value={sharedFundingProjectsCount} />
                    </div>
                </div>
                <FundingHistoryWidget history={myFundingHistory} projects={projects} onSelectProject={onSelectProject} />
            </>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {content}
        </div>
    );
};