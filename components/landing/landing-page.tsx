
"use client";

import { BeakerIcon, ChartBarIcon, LinkIcon, SearchIcon, UsersGroupIcon, TwitterIcon, GitHubIcon, IpfsIcon, WalletIcon, ArrowRightIcon, ChevronDownIcon, MenuIcon, CloseIcon } from '../ui/icons';
import { LandingHeaderLogo, AppLogo } from '../ui/logo';
import React from 'react';
import { useAppContext } from '../../context/app-provider';
import { UserRole } from '../../lib/types';

const LandingHeader = ({ onNavigate }: { onNavigate: (page: 'howitworks') => void }) => {
    const { connectWallet } = useAppContext();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const scrollToSection = (sectionId: string) => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    };

    const handleNavigate = (page: 'howitworks') => {
        onNavigate(page);
        setIsMobileMenuOpen(false);
    };
    
    const handleConnectWallet = () => {
        // The role parameter is not needed here as this is the generic connect button.
        connectWallet();
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-40 bg-cairn-gray-950/80 backdrop-blur-lg border-b border-cairn-gray-800">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
                <LandingHeaderLogo />

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#features-researchers" onClick={(e) => { e.preventDefault(); scrollToSection('features-researchers'); }} className="text-sm font-semibold text-cairn-gray-300 hover:text-white transition-colors">For Researchers</a>
                    <a href="#features-funders" onClick={(e) => { e.preventDefault(); scrollToSection('features-funders'); }} className="text-sm font-semibold text-cairn-gray-300 hover:text-white transition-colors">For Funders</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('howitworks'); }} className="text-sm font-semibold text-cairn-gray-300 hover:text-white transition-colors">How It Works</a>
                </div>
                <button onClick={() => connectWallet()} className="hidden md:flex items-center space-x-2 bg-blue-600 text-white font-semibold text-sm py-2.5 px-5 rounded-full hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/40 transform hover:scale-105">
                    <WalletIcon className="w-5 h-5" />
                    <span>Connect Wallet</span>
                </button>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-cairn-gray-300 hover:text-white hover:bg-cairn-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {isMobileMenuOpen ? (
                            <CloseIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Panel */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-30 bg-cairn-gray-900 animate-fade-in" aria-modal="true">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 h-full">
                         <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-cairn-gray-700">
                                <div className="space-y-2 py-6">
                                    <a href="#features-researchers" onClick={(e) => { e.preventDefault(); scrollToSection('features-researchers'); }} className="block rounded-lg py-3 px-4 text-base font-semibold leading-7 text-cairn-gray-200 hover:bg-cairn-gray-800">For Researchers</a>
                                    <a href="#features-funders" onClick={(e) => { e.preventDefault(); scrollToSection('features-funders'); }} className="block rounded-lg py-3 px-4 text-base font-semibold leading-7 text-cairn-gray-200 hover:bg-cairn-gray-800">For Funders</a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('howitworks'); }} className="block rounded-lg py-3 px-4 text-base font-semibold leading-7 text-cairn-gray-200 hover:bg-cairn-gray-800">How It Works</a>
                                </div>
                                <div className="py-6">
                                    <button onClick={handleConnectWallet} className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white font-semibold text-sm py-3 px-5 rounded-full hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/40">
                                        <WalletIcon className="w-5 h-5" />
                                        <span>Connect Wallet</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

const HeroSection = () => {
    const { connectWallet } = useAppContext();
    
    // Generate particles for background
    const particles = React.useMemo(() => Array.from({ length: 50 }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 40 + 40;
        const delay = Math.random() * -80;
        const x1 = (Math.random() - 0.5) * 100;
        const y1 = (Math.random() - 0.5) * 100;
        const x2 = (Math.random() - 0.5) * 100;
        const y2 = (Math.random() - 0.5) * 100;
        const x3 = (Math.random() - 0.5) * 100;
        const y3 = (Math.random() - 0.5) * 100;
        
        return {
            id: i,
            style: {
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `move ${duration}s linear ${delay}s infinite`,
                '--tx1': `${x1}px`, '--ty1': `${y1}px`,
                '--tx2': `${x2}px`, '--ty2': `${y2}px`,
                '--tx3': `${x3}px`, '--ty3': `${y3}px`,
            }
        };
    }), []);


    return (
        <section className="relative overflow-hidden bg-cairn-gray-950 text-white min-h-screen flex items-center justify-center">
            <div className="absolute inset-0 z-0 opacity-30">
                {particles.map(p => (
                    <div key={p.id} className="absolute bg-white rounded-full" style={p.style} />
                ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cairn-gray-950 via-cairn-gray-950/80 to-blue-900/20 z-0"></div>
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-cairn-gray-950 to-transparent z-10"></div>
            <div className="absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(29, 78, 216, 0.15), transparent 50%)' }}></div>
            <div className="absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.1), transparent 40%)' }}></div>

            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight" style={{ lineHeight: 1.1 }}>
                       <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-cairn-gray-300">Reproducible Research,</span><br/>
                       <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-blue-500">Retroactively Rewarded</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-cairn-gray-300">
                        A Web3 platform empowering Embodied AI researchers and funders through transparent Proof-of-Reproducibility and impact tracking.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={() => connectWallet()} className="group w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
                            <span>Start a Research Project</span>
                            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>
                        <button onClick={() => connectWallet(UserRole.Funder)} className="group w-full sm:w-auto flex items-center justify-center space-x-2 bg-cairn-gray-800/50 text-cairn-gray-200 font-semibold py-3 px-6 rounded-full ring-1 ring-cairn-gray-700 hover:bg-cairn-gray-800 hover:text-white transition-colors">
                            <span>Explore Fundable Projects</span>
                            <SearchIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden sm:block">
                <a href="#features-researchers" onClick={(e) => { e.preventDefault(); document.getElementById('features-researchers')?.scrollIntoView({ behavior: 'smooth' }); }} className="animate-bounce">
                    <ChevronDownIcon className="w-8 h-8 text-cairn-gray-600"/>
                </a>
            </div>
        </section>
    );
};

const FeatureCard = ({ icon: Icon, name, description }: { icon: React.FC<any>, name: string, description: string}) => (
    <div className="group relative bg-cairn-gray-900/40 backdrop-blur-md p-8 rounded-2xl border border-cairn-gray-800 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:bg-cairn-gray-900/80">
        <div className="absolute -inset-px bg-gradient-to-br from-blue-600/50 to-cairn-gray-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
        <div className="relative">
            <div className="mb-5 bg-cairn-gray-800/50 w-14 h-14 rounded-xl flex items-center justify-center border border-cairn-gray-700">
                <Icon className="h-7 w-7 text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-12deg]" />
            </div>
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="mt-2 text-base text-cairn-gray-400">{description}</p>
        </div>
    </div>
);


const FeaturesSection = () => {
    const scientistFeatures = [
        { name: 'Reproducible Experiments', description: 'Ensure your experiments are easily reproducible with detailed logs and control.', icon: BeakerIcon },
        { name: 'Secure Data Management', description: 'Store research data immutably via IPFS and prove its origin with on-chain records.', icon: IpfsIcon },
        { name: 'Proof-Backed Collaboration', description: 'Collaborate with peers and funders through reproducibility-driven workflows and transparent research validation.', icon: UsersGroupIcon },
    ];
    const funderFeatures = [
        { name: 'Verifiable Research Progress', description: 'Track funded projects through on-chain outputs and reproducibility proofs—making every milestone auditable and tamper-proof.', icon: SearchIcon },
        { name: 'Impact Evaluation', description: 'Explore scientific impact through community evaluation, reproducibility, and downstream metrics.', icon: ChartBarIcon },
        { name: 'Direct Engagement', description: 'Fund researchers whose verified work aligns with your mission—without intermediaries.', icon: LinkIcon },
    ];
    
    return (
        <section className="py-24 sm:py-32 bg-cairn-gray-950 relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-pattern opacity-5" style={{ backgroundSize: '40px 40px' }}></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                <div id="features-researchers">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-base font-semibold leading-7 text-blue-400">For Researchers</h2>
                        <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Tools for Transparent Science</p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">{scientistFeatures.map((feature) => <FeatureCard key={feature.name} {...feature} />)}</div>
                </div>

                <div id="features-funders">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-base font-semibold leading-7 text-blue-400">For Funders</h2>
                        <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Invest with Confidence</p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">{funderFeatures.map((feature) => <FeatureCard key={feature.name} {...feature} />)}</div>
                </div>
            </div>
        </section>
    );
};

export const AppFooter = () => (
    <footer className="bg-background-light dark:bg-cairn-gray-950 text-text-secondary dark:text-cairn-gray-400 border-t border-border dark:border-cairn-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Left Side: Logo and Copyright */}
                <div className="flex flex-col sm:flex-row items-center gap-x-4 gap-y-2 text-center sm:text-left">
                    <AppLogo />
                    <p className="text-sm">&copy; {new Date().getFullYear()} CAIRN Protocol. All rights reserved.</p>
                </div>
                
                {/* Right Side: Navigation and Social Links */}
                <nav className="flex items-center gap-x-6" aria-label="Footer navigation">
                    <a href="#" className="text-sm font-medium hover:text-text dark:hover:text-white transition-colors">Docs</a>
                    <a href="#" className="text-sm font-medium hover:text-text dark:hover:text-white transition-colors">FAQ</a>
                    <a href="#" className="hover:text-text dark:hover:text-white transition-colors" aria-label="Twitter">
                        <TwitterIcon className="h-5 w-5" />
                    </a>
                    <a href="#" className="hover:text-text dark:hover:text-white transition-colors" aria-label="GitHub">
                        <GitHubIcon className="h-5 w-5" />
                    </a>
                </nav>
            </div>
        </div>
    </footer>
);

export const LandingPage = ({ onNavigate }: { onNavigate: (page: 'howitworks') => void }) => {
    return (
        <div className="bg-cairn-gray-950 font-sans">
            <LandingHeader onNavigate={onNavigate} />
            <main>
                <HeroSection />
                <FeaturesSection />
            </main>
            <AppFooter />
        </div>
    );
};