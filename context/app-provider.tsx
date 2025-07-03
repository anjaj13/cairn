"use client";

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { UserRole, Project, ToastInfo, UserProfile, Reproducibility, Output, ProjectStatus, PoRStatus, FundingEvent } from '../lib/types';
import { MOCK_PROJECTS, MOCK_USERS, SCIENTIST_WALLET_ALICE, MOCK_FUNDING_HISTORY, CURRENT_USER_WALLET } from '../lib/constants';
import { CheckCircleIcon, AlertTriangleIcon, InfoIcon, CloseIcon } from '../components/ui/icons';

interface AppContextType {
    isDarkMode: boolean;
    setIsDarkMode: (dark: boolean) => void;
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    currentUser: UserProfile | null;
    toasts: ToastInfo[];
    addToast: (message: string, type?: ToastInfo['type']) => void;
    dismissToast: (id: number) => void;
    handlePorSubmit: (projectId: string, reproducibilityData: { notes: string, evidence: Output[] }) => void;
    handleAddProject: (project: Project) => void;
    handleAddOutputs: (projectId: string, outputs: Output[]) => Project;
    handleDispute: (projectId: string, reproducibilityId: string) => void;
    handleInstantFund: (projectId: string, amount: number) => void;
    fundingHistory: FundingEvent[];

    // Auth
    connectedWallet: string | null;
    isAuthenticated: boolean;
    connectWallet: (role?: UserRole) => Promise<void>;
    disconnectWallet: () => void;
    isOnboardingModalOpen: boolean;
    completeOnboarding: () => void;
    closeOnboardingModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkModeState] = useState(true);
    const [userRole, setUserRole] = useState<UserRole>(UserRole.Scientist);
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    const [fundingHistory, setFundingHistory] = useState<FundingEvent[]>(MOCK_FUNDING_HISTORY);
    const [toasts, setToasts] = useState<ToastInfo[]>([]);
    
    // Auth State
    const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

    const isAuthenticated = !!connectedWallet;

    const setIsDarkMode = (dark: boolean) => {
        setIsDarkModeState(dark);
        if (typeof window !== 'undefined') {
            const root = window.document.documentElement;
            if (dark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    };

    // Set initial theme
    useEffect(() => {
        setIsDarkMode(isDarkMode);
    }, [isDarkMode]);

    const dismissToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const addToast = useCallback((message: string, type: ToastInfo['type'] = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            dismissToast(id);
        }, 5000);
    }, [dismissToast]);

    const connectWallet = async (role: UserRole = UserRole.Scientist) => {
        // If MetaMask is not installed, simulate a connection for development.
        if (typeof (window as any).ethereum === 'undefined') {
            console.warn("MetaMask not found. Simulating wallet connection for development.");
            const mockAccount = CURRENT_USER_WALLET; // Use the main mock wallet address

            setConnectedWallet(mockAccount);

            // Find or create a user profile for the mock account
            let userProfile = MOCK_USERS.find(u => u.walletAddress.toLowerCase() === mockAccount.toLowerCase());
            if (!userProfile) {
                userProfile = {
                    walletAddress: mockAccount,
                    name: `Mock User (${mockAccount.substring(0, 6)}...)`,
                    porContributedCount: 0,
                    isVerified: false,
                };
            }
            
            setCurrentUser(userProfile);
            setUserRole(role);
            setIsDarkMode(false); // Default to light mode for the app
            addToast(`Wallet connected (mock): ${mockAccount.substring(0, 6)}...`, 'success');

            // Check for onboarding
            const isVerifiedInStorage = localStorage.getItem(`cairn_verified_${mockAccount}`) === 'true';
            if (!userProfile.isVerified && !isVerifiedInStorage) {
                setIsOnboardingModalOpen(true);
            }
            return;
        }

        // Original logic for when MetaMask is present
        try {
            const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            
            if (account) {
                setConnectedWallet(account);

                let userProfile = MOCK_USERS.find(u => u.walletAddress.toLowerCase() === account.toLowerCase());
                
                if (!userProfile) {
                    userProfile = {
                        walletAddress: account,
                        name: `New User (${account.substring(0, 6)}...)`,
                        porContributedCount: 0,
                        isVerified: false,
                    };
                }
                
                setCurrentUser(userProfile);
                setUserRole(role);
                setIsDarkMode(false); // Default to light mode for the app

                addToast(`Wallet connected: ${account.substring(0, 6)}...`, 'success');

                const isVerifiedInStorage = localStorage.getItem(`cairn_verified_${account}`) === 'true';
                if (!userProfile.isVerified && !isVerifiedInStorage) {
                    setIsOnboardingModalOpen(true);
                }
            }
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            addToast('Failed to connect wallet. Please try again.', 'error');
        }
    };

    const disconnectWallet = () => {
        setConnectedWallet(null);
        setCurrentUser(null);
        setUserRole(UserRole.Scientist);

        // Revert to dark mode for landing page
        setIsDarkMode(true);
        
        addToast("Wallet disconnected.", 'info');
    };

    const closeOnboardingModal = () => {
        setIsOnboardingModalOpen(false);
    };

    const completeOnboarding = () => {
        if (currentUser) {
            const updatedUser = { ...currentUser, isVerified: true };
            setCurrentUser(updatedUser);
            localStorage.setItem(`cairn_verified_${currentUser.walletAddress}`, 'true');
        }
        setIsOnboardingModalOpen(false);
        addToast("Identity verified successfully!", 'success');
    };

    const handleAddProject = (project: Project) => {
        setProjects(prev => [project, ...prev]);
        // The user must be eligible to have reached this point. Reset their counter.
        setCurrentUser(prevUser => ({
            ...prevUser!,
            porContributedCount: 0,
        }));
        addToast("Project created! Your PoR contribution counter has been reset.", 'success');
    };

    const handleAddOutputs = (projectId: string, outputs: Output[]): Project => {
        let updatedProject: Project | undefined;
        let wasDraftAndOwned = false;

        const updatedProjects = projects.map(p => {
            if (p.id === projectId) {
                const wasDraft = p.status === ProjectStatus.Draft;
                if(wasDraft && currentUser && p.ownerId === currentUser.walletAddress) {
                    wasDraftAndOwned = true;
                }
                const newStatus = wasDraft ? ProjectStatus.Active : p.status;
                const latestTimestamp = outputs.reduce((latest, current) => {
                    return new Date(current.timestamp) > new Date(latest) ? current.timestamp : latest;
                }, '1970-01-01');

                updatedProject = { 
                    ...p, 
                    outputs: outputs,
                    status: newStatus,
                    lastOutputDate: latestTimestamp,
                };
                return updatedProject;
            }
            return p;
        });
        setProjects(updatedProjects);
        
        if (wasDraftAndOwned) {
            addToast(`Project activated! It is now publicly visible.`, 'success');
        } else {
             addToast(`${outputs.length} output(s) recorded successfully!`, 'success');
        }

        return updatedProject!;
    };
    
    const handlePorSubmit = (projectId: string, reproducibilityData: { notes: string, evidence: Output[] }) => {
        if (!currentUser) return;
        setProjects(prevProjects => prevProjects.map(p => {
            if (p.id === projectId) {
                const newReproducibility: Reproducibility = {
                    id: `rep-${Date.now()}`,
                    timestamp: new Date().toISOString().split('T')[0],
                    verifier: currentUser.walletAddress,
                    notes: reproducibilityData.notes,
                    evidence: reproducibilityData.evidence.map(e => ({...e, id: e.id.replace('staged', 'final')})),
                    status: PoRStatus.Waiting,
                };
                return { ...p, reproducibilities: [...p.reproducibilities, newReproducibility] };
            }
            return p;
        }));
        setCurrentUser(prevUser => ({
            ...prevUser!,
            porContributedCount: prevUser!.porContributedCount + 1,
        }));
        addToast("PoR submitted! Your contribution is recorded.", 'success');
    };

    const handleDispute = (projectId: string, reproducibilityId: string) => {
        let reproducibilityAuthor = '';
        setProjects(prevProjects => prevProjects.map(p => {
            if (p.id === projectId) {
                const updatedReproducibilities = p.reproducibilities.map(r => {
                    if (r.id === reproducibilityId) {
                        reproducibilityAuthor = r.verifier;
                        return { ...r, status: PoRStatus.Disputed };
                    }
                    return r;
                });
                return { ...p, reproducibilities: updatedReproducibilities };
            }
            return p;
        }));
        if (reproducibilityAuthor) {
            addToast(`Submission from ${reproducibilityAuthor.substring(0, 8)}... has been flagged for review.`, 'info');
        }
    };
    
    const handleInstantFund = (projectId: string, amount: number) => {
        let projectTitle = '';
        setProjects(prevProjects => prevProjects.map(p => {
            if (p.id === projectId) {
                projectTitle = p.title;
                const updatedProject = {
                    ...p,
                    fundingPool: p.fundingPool + amount,
                };
                if (updatedProject.fundingPool >= (p.fundingGoal || Infinity)) {
                    updatedProject.status = ProjectStatus.Funded;
                    addToast(`Project "${p.title}" has been fully funded!`, 'success');
                } else {
                    addToast(`Successfully funded $${amount.toLocaleString()} to "${p.title}"!`, 'success');
                }
                return updatedProject;
            }
            return p;
        }));

        if (projectTitle && currentUser) {
            const newFundingEvent: FundingEvent = {
                id: `fh-${Date.now()}`,
                projectId,
                projectTitle,
                amount,
                timestamp: new Date().toISOString().split('T')[0],
                funderWallet: currentUser.walletAddress,
                txHash: `0x${Date.now().toString(16)}${Math.random().toString(16).substring(2, 12)}`,
            };
            setFundingHistory(prev => [newFundingEvent, ...prev]);
        }
    };

    const value = {
        isDarkMode,
        setIsDarkMode,
        userRole,
        setUserRole,
        projects,
        setProjects,
        currentUser,
        toasts,
        addToast,
        dismissToast,
        handlePorSubmit,
        handleAddProject,
        handleAddOutputs,
        handleDispute,
        handleInstantFund,
        fundingHistory,
        connectedWallet,
        isAuthenticated,
        connectWallet,
        disconnectWallet,
        isOnboardingModalOpen,
        completeOnboarding,
        closeOnboardingModal,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} dismissToast={dismissToast} />
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

// Toast Components
const Toast = ({ message, type, onDismiss }: { message: string, type: ToastInfo['type'], onDismiss: () => void }) => {
    const icons = {
        success: <CheckCircleIcon className="w-6 h-6 text-status-success" />,
        error: <AlertTriangleIcon className="w-6 h-6 text-status-danger" />,
        info: <InfoIcon className="w-6 h-6 text-status-info" />,
    };

    return (
        <div className="animate-toast-in bg-background-light dark:bg-background-dark-light shadow-lg rounded-xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 overflow-hidden w-full max-w-sm">
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">{icons[type]}</div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-semibold text-text dark:text-text-dark">{message}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button onClick={onDismiss} className="rounded-full inline-flex text-text-secondary dark:text-text-dark-secondary hover:text-text dark:hover:text-text-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            <span className="sr-only">Close</span>
                            <CloseIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToastContainer = ({ toasts, dismissToast }: { toasts: ToastInfo[], dismissToast: (id: number) => void }) => (
    <div className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50">
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onDismiss={() => dismissToast(toast.id)} />
            ))}
        </div>
    </div>
);