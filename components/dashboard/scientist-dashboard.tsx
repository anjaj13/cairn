
"use client";

import React, { useMemo, useState } from 'react';
import { Project, ProjectStatus, UserProfile, Reproducibility, PoRStatus } from '../../lib/types';
import { PlusIcon, FileTextIcon, UploadCloudIcon, BeakerIcon, CheckCircleIcon, ArrowRightIcon, CheckIcon, SearchIcon, FlagIcon, LightbulbIcon, ChevronRightIcon, ChevronDownIcon, InfoIcon, DownloadIcon } from '../ui/icons';
import { StatusBadge } from '../ui/status-badge';
import { GenerativePlaceholder } from '../ui/generative-placeholder';
import { useAppContext } from '../../context/app-provider';
import { PoRStatusBadge } from '../ui/por-status-badge';
import { Tooltip } from '../ui/tooltip';
import { ImpactLevelBadge } from '../ui/impact-level-badge';

const getImpactLevel = (fraction: number): 'High' | 'Medium' | 'Low' => {
    if (fraction >= 0.75) return 'High';
    if (fraction >= 0.3) return 'Medium';
    return 'Low';
};

const StatCard = ({ icon: Icon, title, value }: { icon: React.FC<any>, title: string, value: string | number }) => (
    <div className="bg-background-light dark:bg-background-dark-light p-5 rounded-xl border border-border/70 dark:border-border-dark/70 shadow-sm">
        <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 dark:bg-primary/10 rounded-lg">
                <Icon className="w-5 h-5 text-blue-700 dark:text-blue-400" />
            </div>
            <p className="text-sm text-text-secondary dark:text-text-dark-secondary">{title}</p>
        </div>
        <p className="mt-2 text-3xl font-bold text-text dark:text-text-dark">{value}</p>
    </div>
);

const DiscoverProjectCard = ({ project, onSelectProject }: { project: Project, onSelectProject: (p: Project) => void }) => (
    <div onClick={() => onSelectProject(project)} className="bg-background-light dark:bg-background-dark-light rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-border dark:border-border-dark hover:border-primary/30 dark:hover:border-primary/70 overflow-hidden flex flex-col justify-between group">
        <GenerativePlaceholder projectId={project.id} className="w-full h-40" />
        <div className="p-5 flex-grow">
            <h3 className="text-lg font-semibold text-text dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{project.title}</h3>
            <p className="text-sm text-text-secondary dark:text-text-dark-secondary mt-1">{project.domain}</p>
            <p className="text-xs text-text-secondary dark:text-text-dark-secondary mt-2 font-mono truncate" title={project.ownerId}>by: {project.ownerId}</p>
        </div>
        <div className="px-5 py-3 bg-cairn-gray-50 dark:bg-cairn-gray-800/50 border-t border-border dark:border-border-dark flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2 text-status-success font-medium">
                <CheckCircleIcon className="w-5 h-5"/>
                <span>{project.reproducibilities.filter(r => r.status === PoRStatus.Success).length} Verified PoRs</span>
            </div>
            <span className="font-semibold text-primary dark:text-primary-light flex items-center">
                Review <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </span>
        </div>
    </div>
);

const MyProjectCard = ({ project, onSelectProject }: { project: Project, onSelectProject: (p: Project) => void }) => (
    <div className="bg-background-light dark:bg-background-dark-light rounded-xl shadow-md border border-border dark:border-border-dark overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 dark:hover:border-primary/70">
        <div className="p-5 flex-grow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-text dark:text-text-dark pr-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{project.title}</h3>
                <StatusBadge status={project.status} />
            </div>
            <p className="text-sm text-text-secondary dark:text-text-dark-secondary">{project.domain}</p>
            
            <div className="mt-4 flex items-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                    <UploadCloudIcon className="w-5 h-5 text-text-secondary dark:text-text-dark-secondary"/>
                    <span className="font-semibold text-text dark:text-text-dark">{project.outputs.length}</span>
                    <span className="text-sm text-text-secondary dark:text-text-dark-secondary">Outputs</span>
                </div>
                <div className="flex items-center space-x-2">
                    <CheckIcon className="w-5 h-5 text-status-success"/>
                    <span className="font-semibold text-text dark:text-text-dark">{project.reproducibilities.length}</span>
                    <span className="text-sm text-text-secondary dark:text-text-dark-secondary"> PoR Submissions</span>
                </div>
            </div>
        </div>
        <div className="border-t border-border dark:border-border-dark mt-auto p-4">
            <button onClick={() => onSelectProject(project)} className="w-full bg-primary text-primary-text font-semibold py-2.5 rounded-lg hover:bg-primary-hover transition-all duration-300 text-sm shadow-md hover:shadow-lg">
                {project.status === ProjectStatus.Draft ? 'Manage' : 'View Project'}
            </button>
        </div>
    </div>
);

const NewProjectCard = ({ onNewProject, isEligible, porRequirement, porContributedCount }: { onNewProject: () => void, isEligible: boolean, porRequirement: number, porContributedCount: number }) => (
    <div className="relative group h-full">
        <button
            onClick={onNewProject}
            disabled={!isEligible}
            className="w-full h-full bg-background-light dark:bg-background-dark-light rounded-xl border-2 border-dashed border-border dark:border-border-dark flex flex-col items-center justify-center p-5 text-text-secondary hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary-light transition-all duration-300 disabled:cursor-not-allowed disabled:hover:border-border dark:disabled:hover:border-border-dark disabled:hover:text-text-secondary min-h-[220px]"
        >
            <PlusIcon className="w-10 h-10 mb-3" />
            <span className="font-semibold text-lg">New Project</span>
        </button>
        {!isEligible && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs text-center px-3 py-1.5 bg-text text-background-light dark:bg-text-dark dark:text-background-dark text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {`Need ${porRequirement - porContributedCount} more PoRs to create a project (${porRequirement} total).`}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-text dark:border-t-text-dark"></div>
            </div>
        )}
    </div>
);

const ActionRequiredWidget = ({ projects, onSelectProject }: { projects: Project[], onSelectProject: (p: Project) => void }) => {
    const projectsNeedingOutputs = useMemo(() => 
        projects.filter(p => p.status === ProjectStatus.Draft), 
        [projects]
    );

    const actionItems = useMemo(() => {
        return projectsNeedingOutputs.sort((a, b) => a.title.localeCompare(b.title));
    }, [projectsNeedingOutputs]);
    
    const ActionStatCard = ({ icon: Icon, iconClass, count, label, tooltipText }: {
        icon: React.FC<any>,
        iconClass: string,
        count: number,
        label: string,
        tooltipText: string,
    }) => (
        <div className="bg-cairn-gray-100 dark:bg-cairn-gray-900 p-4 rounded-xl flex items-center space-x-4 transition-colors hover:bg-cairn-gray-200 dark:hover:bg-cairn-gray-800">
            <Icon className={`w-8 h-8 flex-shrink-0 ${iconClass}`} />
            <div>
                <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-text dark:text-text-dark">{count}</p>
                    <span className="text-base font-medium text-text-secondary dark:text-text-dark-secondary">
                        {count === 1 ? 'Project' : 'Projects'}
                    </span>
                </div>
                <div className="flex items-center space-x-1.5 mt-0.5">
                    <p className="text-sm text-text-secondary dark:text-text-dark-secondary">{label}</p>
                    <Tooltip text={tooltipText}>
                        <InfoIcon className="w-4 h-4 text-text-secondary/70 dark:text-text-dark-secondary/70 cursor-help" />
                    </Tooltip>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-background-light dark:bg-background-dark-light rounded-xl p-5 border border-border dark:border-border-dark shadow-sm flex flex-col h-80">
            <h4 className="font-semibold mb-4 text-text dark:text-text-dark shrink-0">Action Required</h4>
            
            <div className="grid grid-cols-1 gap-4 shrink-0">
                <ActionStatCard
                    icon={UploadCloudIcon}
                    iconClass="text-primary"
                    count={projectsNeedingOutputs.length}
                    label="Need Outputs"
                    tooltipText="Research outputs are the core assets of your project. Upload anything that others can build on or verify—like code, datasets, simulations, or experimental results."
                />
            </div>

            {actionItems.length > 0 ? (
                <>
                    <div className="my-4 border-t border-border dark:border-border-dark -mx-5 px-5 shrink-0"></div>
                    <div className="flex-grow min-h-0 overflow-y-auto -mr-2 pr-2">
                        <ul className="space-y-2">
                            {actionItems.map(p => {
                                const reason = 'Add research outputs to activate';

                                return (
                                    <li key={p.id} className="flex justify-between items-center p-3 rounded-lg transition-colors bg-primary-light/70 dark:bg-primary/10">
                                        <div>
                                            <p className="font-semibold text-sm text-text dark:text-text-dark">{p.title}</p>
                                            <p className="text-xs text-text-secondary dark:text-text-dark-secondary">{reason}</p>
                                        </div>
                                        <button onClick={() => onSelectProject(p)} className="text-xs font-semibold py-1 px-3 rounded-full transition-colors hover:opacity-80 bg-primary-light text-primary">
                                            Manage
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center flex-grow text-center py-4">
                    <CheckCircleIcon className="mx-auto h-10 w-10 text-status-success" />
                    <p className="mt-3 text-sm font-medium text-text dark:text-text-dark">No immediate actions required.</p>
                    <p className="mt-1 text-xs text-text-secondary dark:text-text-dark-secondary">All your active projects are up-to-date.</p>
                </div>
            )}
        </div>
    );
};

const DisputesWidget = ({ projects, currentUser, onViewContributionDetails }: { 
    projects: Project[], 
    currentUser: UserProfile,
    onViewContributionDetails: (reproducibility: Reproducibility, projectId: string) => void 
}) => {
    const myDisputedPors = useMemo(() => {
        return projects.flatMap(p => 
            p.reproducibilities
                .filter(r => r.verifier === currentUser.walletAddress && r.status === PoRStatus.Disputed)
                .map(r => ({ ...r, projectTitle: p.title, projectId: p.id }))
        );
    }, [projects, currentUser.walletAddress]);
    
    const ActionStatCard = ({ icon: Icon, iconClass, count, label, tooltipText }: {
        icon: React.FC<any>,
        iconClass: string,
        count: number,
        label: string,
        tooltipText: string,
    }) => (
        <div className="bg-cairn-gray-100 dark:bg-cairn-gray-900 p-4 rounded-xl flex items-center space-x-4 transition-colors hover:bg-cairn-gray-200 dark:hover:bg-cairn-gray-800">
            <Icon className={`w-8 h-8 flex-shrink-0 ${iconClass}`} />
            <div>
                <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-text dark:text-text-dark">{count}</p>
                    <span className="text-base font-medium text-text-secondary dark:text-text-dark-secondary">
                        {count === 1 ? 'Dispute' : 'Disputes'}
                    </span>
                </div>
                <div className="flex items-center space-x-1.5 mt-0.5">
                    <p className="text-sm text-text-secondary dark:text-text-dark-secondary">{label}</p>
                    <Tooltip text={tooltipText}>
                        <InfoIcon className="w-4 h-4 text-text-secondary/70 dark:text-text-dark-secondary/70 cursor-help" />
                    </Tooltip>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-background-light dark:bg-background-dark-light rounded-xl p-5 border border-border dark:border-border-dark shadow-sm h-full flex flex-col">
            <h4 className="font-semibold mb-4 text-text dark:text-text-dark flex-shrink-0">My Proof Disputes</h4>
            
            <div className="grid grid-cols-1 gap-4 flex-shrink-0">
                <ActionStatCard
                    icon={FlagIcon}
                    iconClass="text-status-danger"
                    count={myDisputedPors.length}
                    label="On my PoRs"
                    tooltipText="These are Proof of Reproducibility submissions you made that have been disputed by the community. Review the project and dispute details."
                />
            </div>

            {myDisputedPors.length > 0 ? (
                <>
                    <div className="my-4 border-t border-border dark:border-border-dark -mx-5 px-5"></div>
                    <div className="flex-grow overflow-y-auto -mr-2 pr-2">
                        <ul className="space-y-2">
                            {myDisputedPors.map(r => {
                                return (
                                    <li key={r.id} className="flex justify-between items-center p-3 rounded-lg transition-colors bg-status-danger-bg dark:bg-status-danger-bg-dark/50">
                                        <div>
                                            <p className="font-semibold text-sm text-text dark:text-text-dark">PoR on: {r.projectTitle}</p>
                                            <p className="text-xs font-semibold text-status-danger">Your submission was disputed</p>
                                        </div>
                                        <button onClick={() => onViewContributionDetails(r, r.projectId)} className="text-xs font-semibold py-1 px-3 rounded-full transition-colors hover:opacity-80 bg-status-danger-bg text-status-danger dark:bg-status-danger-bg-dark dark:text-red-300">
                                            View
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center flex-grow text-center py-4">
                    <CheckCircleIcon className="mx-auto h-10 w-10 text-status-success" />
                    <p className="mt-3 text-sm font-medium text-text dark:text-text-dark">No disputes on your submissions.</p>
                    <p className="mt-1 text-xs text-text-secondary dark:text-text-dark-secondary">All your contributions are in good standing.</p>
                </div>
            )}
        </div>
    );
};

const ActivityFeedWidget = ({ projects, onViewReview }: { projects: Project[], onViewReview: (reproducibility: Reproducibility, projectId: string) => void }) => {
    const recentSubmissions = useMemo(() => {
        return projects
            .flatMap(p => p.reproducibilities.map(r => ({ ...r, projectTitle: p.title, projectId: p.id })))
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 10);
    }, [projects]);

    const formatDate = (timestamp: string) => {
        const d = new Date(timestamp);
        return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
    };

    return (
        <div className="bg-background-light dark:bg-background-dark-light rounded-xl p-6 border border-border dark:border-border-dark shadow-sm flex flex-col h-80">
            <h4 className="font-semibold mb-6 text-text dark:text-text-dark text-lg shrink-0">Activity Feed</h4>
            {recentSubmissions.length > 0 ? (
                <div className="flex-grow min-h-0 overflow-y-auto -mr-3 pr-3">
                    <ul className="relative border-l border-border dark:border-border-dark ml-3">
                        {recentSubmissions.map((r) => {
                            return (
                                <li key={r.id} className="relative pl-8 pb-6 last:pb-0">
                                    <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-primary transform -translate-x-1/2 ring-4 ring-background-light dark:ring-background-dark-light"></div>
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="text-sm flex-grow">
                                            <p className="text-text dark:text-text-dark leading-relaxed">
                                                <span className="font-semibold text-primary font-mono" title={r.verifier}>
                                                    {r.verifier.substring(0,8)}...
                                                </span>
                                                {' submitted a PoR for '}
                                                <span className="font-semibold">{r.projectTitle}</span>.
                                            </p>
                                            <p className="mt-1 text-xs text-text-secondary dark:text-text-dark-secondary">{formatDate(r.timestamp)}</p>
                                        </div>
                                        <button
                                            onClick={() => onViewReview(r, r.projectId)}
                                            className="text-xs bg-primary-light text-primary font-semibold py-1 px-3 rounded-full hover:bg-blue-200/50 transition-colors flex-shrink-0"
                                        >
                                            View
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center flex-grow text-center py-4">
                    <SearchIcon className="mx-auto h-8 w-8 text-text-secondary" />
                    <p className="mt-3 text-sm font-medium text-text dark:text-text-dark">No recent activity.</p>
                    <p className="mt-1 text-xs text-text-secondary dark:text-text-dark-secondary">Reproducibility submissions will appear here.</p>
                </div>
            )}
        </div>
    );
};

const ReproducibilityHistoryWidget = ({ projects, currentUser, onViewContributionDetails }: { projects: Project[], currentUser: UserProfile, onViewContributionDetails: (reproducibility: Reproducibility, projectId: string) => void }) => {
    const myContributions = useMemo(() => {
        return projects
            .flatMap(p => 
                p.reproducibilities
                    .filter(r => r.verifier === currentUser.walletAddress)
                    .map(r => ({ ...r, projectTitle: p.title, projectId: p.id }))
            )
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [projects, currentUser.walletAddress]);

    return (
        <div className="bg-background-light dark:bg-background-dark-light rounded-xl p-5 border border-border dark:border-border-dark shadow-sm">
            {myContributions.length > 0 ? (
                <div className="max-h-96 overflow-y-auto">
                    <ul className="space-y-2 pr-2">
                        {myContributions.map(r => (
                            <li key={r.id} className="flex justify-between items-center bg-cairn-gray-100 dark:bg-cairn-gray-800 p-3 rounded-lg">
                                <div className="flex-grow pr-4">
                                    <p className="font-semibold text-sm truncate text-text dark:text-text-dark">On: {r.projectTitle}</p>
                                    <p className="text-xs text-text-secondary dark:text-text-dark-secondary">{new Date(r.timestamp).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center space-x-3 flex-shrink-0">
                                    <PoRStatusBadge status={r.status} />
                                    <button
                                        onClick={() => onViewContributionDetails(r, r.projectId)}
                                        className="text-xs bg-primary-light text-primary font-semibold py-1 px-3 rounded-full hover:bg-blue-200/50 transition-colors"
                                    >
                                        View
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-8">
                    <BeakerIcon className="mx-auto h-8 w-8 text-text-secondary" />
                    <p className="mt-3 text-sm font-medium text-text dark:text-text-dark">No contributions yet.</p>
                    <p className="mt-1 text-xs text-text-secondary dark:text-text-dark-secondary">Review projects in the Discover tab to contribute.</p>
                </div>
            )}
        </div>
    );
};

const MyMetricsWidget = ({ currentUser, totalPorsContributed, porRequirement }: { currentUser: UserProfile, totalPorsContributed: number, porRequirement: number }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark-light p-6 rounded-xl border border-border dark:border-border-dark flex flex-col h-full">
            <h4 className="font-semibold mb-4 text-text dark:text-text-dark flex-shrink-0">My Contributions</h4>
            <div className="flex flex-col space-y-6 flex-grow justify-center">
                {/* Metric 1: New Project Quota */}
                <div className="flex items-start space-x-4">
                    <div className="bg-primary-light dark:bg-primary/20 p-3 rounded-lg flex items-center justify-center">
                        <CheckCircleIcon className="w-6 h-6 text-primary dark:text-primary-light" />
                    </div>
                    <div>
                        <div className="flex items-baseline space-x-2">
                            <p className="text-3xl font-bold text-text dark:text-text-dark">{`${currentUser.porContributedCount} / ${porRequirement}`}</p>
                            <div className="flex items-center space-x-1.5">
                            <p className="text-sm font-medium text-text-secondary dark:text-text-dark-secondary">PoR Quota</p>
                            <Tooltip text="Review projects and submit enough Proof Of Reproducibility to create new projects.">
                                    <InfoIcon className="w-4 h-4 text-text-secondary/70 dark:text-text-dark-secondary/70 cursor-help" />
                            </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Metric 2: Total PoRs Submitted */}
                <div className="flex items-start space-x-4">
                    <div className="bg-primary-light dark:bg-primary/20 p-3 rounded-lg flex items-center justify-center">
                        <BeakerIcon className="w-6 h-6 text-primary dark:text-primary-light" />
                    </div>
                    <div>
                        <div className="flex items-baseline space-x-2">
                            <p className="text-3xl font-bold text-text dark:text-text-dark">{totalPorsContributed}</p>
                            <div className="flex items-center space-x-1.5">
                                <p className="text-sm font-medium text-text-secondary dark:text-text-dark-secondary">Number of PoR Submitted</p>
                                <Tooltip text="Total amount of your contributions on this platform.">
                                    <InfoIcon className="w-4 h-4 text-text-secondary/70 dark:text-text-dark-secondary/70 cursor-help" />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ImpactOpportunitiesWidget = () => {
    const opportunities = [
        {
            id: 'opp-1',
            issuer: 'Schmidt Futures',
            amount: '2.0M',
            currency: 'USD',
            title: 'AI for Climate Science Initiative',
            deadline: '15 Aug',
            isNew: true,
            url: 'https://www.schmidtfutures.com/',
        },
        {
            id: 'opp-2',
            issuer: 'Wellcome Trust',
            amount: '500K',
            currency: 'GBP',
            title: 'Global Health Innovation Grant',
            deadline: '30 Sep',
            isNew: true,
            url: 'https://wellcome.org/',
        },
        {
            id: 'opp-3',
            issuer: 'NSF Program',
            amount: '100K',
            currency: 'USD',
            title: 'Trustworthy AI Systems Program',
            deadline: '01 Nov',
            isNew: false,
            url: 'https://www.nsf.gov/',
        }
    ];

    const newCount = opportunities.filter(op => op.isNew).length;

    return (
        <div className="bg-background-light dark:bg-background-dark-light rounded-xl p-5 border border-border dark:border-border-dark shadow-sm flex flex-col h-80">
            <h4 className="font-semibold mb-4 text-text dark:text-text-dark shrink-0 flex items-center">
                <LightbulbIcon className="w-5 h-5 mr-2 text-primary" />
                <span className="mr-1.5">Impact Opportunities</span>
                <Tooltip text="Announcements of funding opportunities and prizes for specific research initiatives aimed at creating impact.">
                    <InfoIcon className="w-4 h-4 text-text-secondary/70 dark:text-text-dark-secondary/70 cursor-help" />
                </Tooltip>
                {newCount > 0 && (
                     <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-status-danger text-white text-xs font-bold">
                        {newCount}
                    </span>
                )}
            </h4>
            <div className="flex-grow min-h-0 overflow-y-auto -mr-2 pr-2">
                <ul className="space-y-3">
                    {opportunities.map(opp => (
                        <li key={opp.id} className="bg-cairn-gray-50 dark:bg-cairn-gray-900/70 p-4 rounded-lg border border-border dark:border-border-dark">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-semibold text-text dark:text-text-dark">{opp.issuer}</p>
                                    <p className="text-xs font-semibold text-status-success">
                                        {opp.amount} <span className="text-green-400 dark:text-green-500">{opp.currency} total funding</span>
                                    </p>
                                </div>
                                {opp.isNew && <span className="text-xs bg-status-danger-bg text-status-danger font-semibold px-2 py-0.5 rounded-full dark:bg-status-danger-bg-dark dark:text-red-300">New</span>}
                            </div>
                            <h5 className="font-semibold my-3 text-text dark:text-text-dark">{opp.title}</h5>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-text-secondary dark:text-text-dark-secondary">Deadline: {opp.deadline}</p>
                                <a href={opp.url} target="_blank" rel="noopener noreferrer" className="bg-primary-light text-primary font-semibold py-1.5 px-4 rounded-lg hover:bg-blue-200/50 dark:bg-primary/20 dark:text-primary-light dark:hover:bg-primary/30 transition-colors text-xs">
                                    Details
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const FundingDashboard = ({ projects, onSelectProject }: { projects: Project[], onSelectProject: (p: Project) => void }) => {
    const { fundingHistory } = useAppContext();
    const totalRaised = useMemo(() => projects.filter(p => p.status === ProjectStatus.Active || p.status === ProjectStatus.Funded).reduce((sum, p) => sum + p.fundingPool, 0), [projects]);
    const activeProjects = useMemo(() => projects.filter(p => p.status === ProjectStatus.Active || p.status === ProjectStatus.Funded).length, [projects]);
    const numberFormatter = new Intl.NumberFormat('de-DE');
    
    const projectsForTable = useMemo(() => (
        projects
            .filter(p => p.status === ProjectStatus.Funded || p.status === ProjectStatus.Active)
            .sort((a,b) => b.fundingPool - a.fundingPool)
    ), [projects]);

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold mb-1 text-text dark:text-text-dark">My Funding Metrics</h1>
                <p className="text-text-secondary dark:text-text-dark-secondary">Track the financial health and impact of your research portfolio.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard icon={DownloadIcon} title="Total Raised" value={`$${numberFormatter.format(totalRaised)}`} />
                <StatCard icon={FileTextIcon} title="Active/Funded Projects" value={activeProjects} />
            </div>
            <div className="bg-background-light dark:bg-background-dark-light rounded-xl p-6 border border-border dark:border-border-dark shadow-sm">
                <h3 className="font-semibold mb-4 text-lg text-text dark:text-text-dark">Funding Details by Project</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-text-secondary dark:text-text-dark-secondary uppercase bg-cairn-gray-50 dark:bg-cairn-gray-800/50">
                           <tr>
                                <th className="p-4 font-semibold">Project</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">First Funded</th>
                                <th className="p-4 font-semibold">Total Funds</th>
                                <th className="p-4 font-semibold">Funders</th>
                                <th className="p-4 font-semibold">Tx Hashes</th>
                                <th className="p-4 font-semibold">Impact Level</th>
                                <th className="p-4 font-semibold text-center">Impact Cert</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-border dark:divide-border-dark">
                            {projectsForTable.map(p => {
                                const projectFundingEvents = fundingHistory.filter(f => f.projectId === p.id);
                                const firstFundedDate = projectFundingEvents.length > 0
                                    ? new Date(projectFundingEvents.reduce((oldest, current) => new Date(current.timestamp) < new Date(oldest.timestamp) ? current : oldest).timestamp).toLocaleDateString('de-DE')
                                    : 'N/A';
                                const totalFunds = p.fundingPool;
                                const funders = [...new Set(projectFundingEvents.map(f => f.funderWallet))];
                                const txHashes = projectFundingEvents.map(f => f.txHash);
                                const impactLevel = getImpactLevel(p.hypercertFraction);
                                
                                return (
                                <tr key={p.id} onClick={() => onSelectProject(p)} className="hover:bg-cairn-gray-50 dark:hover:bg-cairn-gray-800/20 cursor-pointer transition-colors">
                                    <td className="p-4 font-semibold text-text dark:text-text-dark">{p.title}</td>
                                    <td className="p-4"><StatusBadge status={p.status} /></td>
                                    <td className="p-4 font-mono text-text-secondary dark:text-text-dark-secondary">
                                        {firstFundedDate}
                                    </td>
                                    <td className="p-4 font-mono font-bold text-status-success">${numberFormatter.format(totalFunds)}</td>
                                    <td className="p-4">
                                        {funders.length > 0 ? (
                                            <div className="flex items-center -space-x-3 overflow-hidden">
                                                {funders.slice(0, 3).map(wallet => {
                                                    return (
                                                    <div key={wallet} title={wallet} className="inline-block h-8 w-8 rounded-full ring-2 ring-background-light dark:ring-background-dark-light bg-cairn-gray-300 dark:bg-cairn-gray-600 flex items-center justify-center text-xs font-bold text-cairn-gray-800 dark:text-cairn-gray-200">
                                                        {wallet.substring(2, 4).toUpperCase()}
                                                    </div>
                                                )})}
                                                {funders.length > 3 && (
                                                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-background-light dark:ring-background-dark-light bg-cairn-gray-400 dark:bg-cairn-gray-500 flex items-center justify-center text-xs font-bold text-white">
                                                        +{funders.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-text-secondary dark:text-text-dark-secondary">N/A</span>
                                        )}
                                    </td>
                                    <td className="p-4 font-mono text-sm">
                                        {txHashes.length > 0 ? (
                                            <div className="flex flex-col space-y-1 items-start">
                                                 {txHashes.slice(0, 2).map(hash => (
                                                    <a key={hash} href="#" onClick={(e) => e.stopPropagation()} className="text-primary hover:underline" title={hash}>
                                                        {hash.substring(0, 8)}...
                                                    </a>
                                                ))}
                                                 {txHashes.length > 2 && <span className="text-xs text-text-secondary">...and {txHashes.length - 2} more</span>}
                                            </div>
                                        ) : <span className="text-text-secondary dark:text-text-dark-secondary">N/A</span>}
                                    </td>
                                    <td className="p-4">
                                        <ImpactLevelBadge level={impactLevel} />
                                    </td>
                                    <td className="p-4 text-center">
                                        {p.status !== ProjectStatus.Draft && p.hypercertFraction > 0 ? (
                                            <button className="text-primary hover:text-blue-400" title={`View Impact Certificate (${(p.hypercertFraction * 100).toFixed(0)}%)`}>
                                                <FileTextIcon className="w-6 h-6" />
                                            </button>
                                        ) : (
                                             <span className="text-text-secondary dark:text-text-dark-secondary">N/A</span>
                                        )}
                                    </td>
                                </tr>
                                );
                            })}
                             {projectsForTable.length === 0 && (
                                <tr><td colSpan={8} className="text-center p-6 text-text-secondary dark:text-text-dark-secondary">You have no active or funded projects to display.</td></tr>
                            )}
                        </tbody>
                    </table>
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

export function ScientistDashboard({ projects, onSelectProject, onNewProject, currentUser, onViewContributionDetails, activePage }: { projects: Project[], onSelectProject: (p: Project) => void, onNewProject: () => void, currentUser: UserProfile, onViewContributionDetails: (reproducibility: Reproducibility, projectId: string) => void, activePage: string }) {
    
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'mostPors' | 'leastPors'>('newest');
    
    const porRequirement = 3;
    const isEligibleToCreate = currentUser.porContributedCount >= porRequirement;

    const myProjects = useMemo(() => projects.filter(p => p.ownerId === currentUser.walletAddress), [projects, currentUser.walletAddress]);
    
    const totalPorsContributed = useMemo(() => {
        return projects.reduce((count, project) => {
            return count + project.reproducibilities.filter(r => r.verifier === currentUser.walletAddress).length;
        }, 0);
    }, [projects, currentUser.walletAddress]);
    
    const discoverProjects = useMemo(() => {
        const activeProjects = projects.filter(p => p.ownerId !== currentUser.walletAddress && p.status === ProjectStatus.Active);
        
        return [...activeProjects].sort((a, b) => {
             switch (sortOrder) {
                case 'oldest':
                    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
                case 'mostPors':
                    return b.reproducibilities.filter(r => r.status === PoRStatus.Success).length - a.reproducibilities.filter(r => r.status === PoRStatus.Success).length;
                case 'leastPors':
                    return a.reproducibilities.filter(r => r.status === PoRStatus.Success).length - b.reproducibilities.filter(r => r.status === PoRStatus.Success).length;
                case 'newest':
                default:
                    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
            }
        });

    }, [projects, currentUser.walletAddress, sortOrder]);

    let content;

    if (activePage === 'funding') {
        content = <FundingDashboard projects={myProjects} onSelectProject={onSelectProject} />;
    } else if (activePage === 'discover') {
        content = (
            <div className="space-y-8">
                <PageHeader title="Discover & PoR" subtitle="Contribute to the community by reviewing projects and find new research." />
                
                {/* Section 1: My Metrics & Disputes */}
                <div className="space-y-4">
                    {/* Title "My Community Standing" removed as per request */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <MyMetricsWidget currentUser={currentUser} totalPorsContributed={totalPorsContributed} porRequirement={porRequirement} />
                        <DisputesWidget projects={projects} currentUser={currentUser} onViewContributionDetails={onViewContributionDetails} />
                    </div>
                </div>

                {/* Section 2: Reproducibility History */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-text dark:text-text-dark">Reproducibility History</h2>
                    <ReproducibilityHistoryWidget projects={projects} currentUser={currentUser} onViewContributionDetails={onViewContributionDetails} />
                </div>

                {/* Section 3: Projects Discovery */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2 className="text-2xl font-bold text-text dark:text-text-dark">Discover Projects</h2>
                        <div className="relative">
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest' | 'mostPors' | 'leastPors')}
                                className="appearance-none bg-background-light dark:bg-background-dark-light border border-border dark:border-border-dark rounded-lg py-2 pl-3 pr-10 text-sm font-semibold text-text dark:text-text-dark focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                                <option value="newest">Sort by: Newest</option>
                                <option value="oldest">Sort by: Oldest</option>
                                <option value="mostPors">Sort by: Most PoRs</option>
                                <option value="leastPors">Sort by: Least PoRs</option>
                            </select>
                            <ChevronDownIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary dark:text-text-dark-secondary" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {discoverProjects.map(p => (
                            <DiscoverProjectCard key={p.id} project={p} onSelectProject={onSelectProject} />
                        ))}
                        {discoverProjects.length === 0 && (
                            <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-16 px-6 border-2 border-dashed border-border dark:border-border-dark rounded-xl bg-cairn-gray-100 dark:bg-cairn-gray-800/50">
                                <SearchIcon className="mx-auto h-12 w-12 text-text-secondary" />
                                <h3 className="mt-4 text-xl font-semibold text-text dark:text-text-dark">No Active Projects to Review</h3>
                                <p className="mt-2 text-md text-text-secondary dark:text-text-dark-secondary">
                                    Check back later to find new research to review and contribute to.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } else { // 'projects' and default
        content = (
            <>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <PageHeader title="My Research Portfolio" subtitle="Manage your projects, track activity, and create new research initiatives." />
                    <div className="relative group flex-shrink-0">
                        <button
                            onClick={onNewProject}
                            disabled={!isEligibleToCreate}
                            className="flex items-center space-x-2 bg-primary text-primary-text font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors shadow-md hover:shadow-lg disabled:bg-cairn-gray-400 dark:disabled:bg-cairn-gray-600 disabled:cursor-not-allowed"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>New Project</span>
                        </button>
                        {!isEligibleToCreate && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs text-center px-3 py-1.5 bg-text text-background-light dark:bg-text-dark dark:text-background-dark text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                {`Need ${porRequirement - currentUser.porContributedCount} more PoRs to create a project (${porRequirement} total).`}
                                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-text dark:border-t-text-dark"></div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-1">
                        <ActionRequiredWidget projects={myProjects} onSelectProject={onSelectProject} />
                    </div>
                    <div className="lg:col-span-1">
                        <ActivityFeedWidget projects={projects} onViewReview={onViewContributionDetails} />
                    </div>
                    <div className="lg:col-span-1">
                        <ImpactOpportunitiesWidget />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-text dark:text-text-dark mb-6">All My Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <NewProjectCard 
                            onNewProject={onNewProject} 
                            isEligible={isEligibleToCreate} 
                            porRequirement={porRequirement} 
                            porContributedCount={currentUser.porContributedCount}
                        />
                        {myProjects.map(p => <MyProjectCard key={p.id} project={p} onSelectProject={onSelectProject} />)}
                    </div>
                </div>
            </>
        );
    }
    
    return (
        <div className="animate-fade-in">
            {content}
        </div>
    );
};
