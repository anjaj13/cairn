
"use client";

import { HowItWorksHeaderLogo } from '../ui/logo';
import { LightbulbIcon, UploadCloudIcon, CheckCircleIcon, HypercertIcon, SearchIcon, ChartBarIcon, GavelIcon, ScaleIcon, IpfsIcon, BeakerIcon, UsersGroupIcon } from '../ui/icons';
import React from 'react';
import { useAppContext } from '../../context/app-provider';
import { AppFooter } from '../landing/landing-page';

const HowItWorksHeader = ({ onNavigate } : { onNavigate: (page: 'landing') => void}) => (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
            <HowItWorksHeaderLogo />
            <button onClick={() => onNavigate('landing')} className="text-sm font-semibold text-text-secondary hover:text-primary dark:text-text-dark-secondary dark:hover:text-primary-light">
                Back to Home
            </button>
        </nav>
    </header>
);

const CtaSection = () => {
    const { connectWallet } = useAppContext();

    return (
        <section className="bg-gradient-to-r from-blue-700 to-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
                <div className="relative isolate overflow-hidden text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to Pioneer the Future of Research?</h2>
                    <p className="mt-6 text-lg leading-8 text-blue-200">Join CAIRN today. Start a project, fund groundbreaking science, and be part of the DeSci revolution.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button onClick={() => connectWallet()} className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-lg hover:bg-primary-light/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-transform hover:scale-105">
                            Enter the Platform
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const HowItWorksPage = ({ onNavigate }: { onNavigate: (page: 'landing') => void }) => {
    const scientistSteps = [
        { icon: LightbulbIcon, title: "Create Project", description: "Define your research scope, goals, and other significant information." },
        { icon: UploadCloudIcon, title: "Record Outputs", description: "Securely log code, documents, protocols and other relevant data on IPFS for immutable record-keeping." },
        { icon: CheckCircleIcon, title: "Enable Reproducibility", description: "Community members can now review and reproduce your work, strengthening its validity with Proof Of Reproducibility." },
        { icon: HypercertIcon, title: "Gain Impact & Funding", description: "Generate Hypercerts, show your impact and get retroactive funding." },
    ];
    const funderSteps = [
        { icon: SearchIcon, title: "Discover Projects", description: "Filter and find high-potential projects that align with your funding mission." },
        { icon: ChartBarIcon, title: "Assess Impact", description: "Analyze on-chain data, reproducibility metrics, and impact value of the project." },
        { icon: GavelIcon, title: "Participate in DAO Voting", description: "Use your stake to vote for funding allocation towards validated, impactful research." },
        { icon: ScaleIcon, title: "Track Your Contribution", description: "See the real-world impact of your funding through transparent, on-chain reporting." },
    ];
    const coreConcepts = [
        { icon: IpfsIcon, title: "IPFS Integration", description: "All research outputs are stored on the InterPlanetary File System, ensuring data is permanent, content-addressed, and resilient." },
        { icon: HypercertIcon, title: "Hypercerts", description: "We use Hypercerts to create granular, transferable, and composable claims about the impact of scientific work, enabling retroactive rewards." },
        { icon: BeakerIcon, title: "Proof-of-Reproducibility", description: "Our novel on-chain mechanism for verifying scientific claims. Successful reproductions strengthen a project's impact score." },
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark text-text dark:text-text-dark font-sans">
            <HowItWorksHeader onNavigate={onNavigate} />
            <main>
                <section className="py-20 sm:py-24 text-center bg-background dark:bg-background-dark">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-text dark:text-text-dark tracking-tight">The CAIRN Workflow</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary dark:text-text-dark-secondary">A transparent, step-by-step journey for researchers and funders on our decentralized science platform.</p>
                    </div>
                </section>
                
                <section className="py-20 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold tracking-tight text-text dark:text-text-dark sm:text-4xl">A Researcher's Journey</h2>
                            <p className="mt-4 text-lg text-text-secondary dark:text-text-dark-secondary">
                                Follow these four steps to bring your research from an idea to a globally verifiable and fundable asset on the CAIRN platform.
                            </p>
                        </div>

                        <div className="relative mt-20">
                            {/* The connector line for desktop */}
                            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-border dark:bg-border-dark" aria-hidden="true"></div>

                            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
                                {scientistSteps.map((step, index) => (
                                    <div key={index} className="flex flex-col items-center text-center">
                                        {/* The circle on the line */}
                                        <div className="relative flex items-center justify-center w-24 h-24 bg-background dark:bg-background-dark lg:bg-transparent rounded-full z-10">
                                           <div className="flex items-center justify-center w-full h-full rounded-full bg-background-light dark:bg-background-dark ring-4 ring-primary">
                                             <step.icon className="h-9 w-9 text-primary dark:text-blue-400" />
                                           </div>
                                            <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold ring-4 ring-white dark:ring-background-dark">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <h3 className="mt-6 text-lg font-semibold text-text dark:text-text-dark">{step.title}</h3>
                                        <p className="mt-2 text-sm text-text-secondary dark:text-text-dark-secondary">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 sm:py-24 bg-background dark:bg-background-dark">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-text dark:text-text-dark">A Funder's Perspective</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {funderSteps.map(step => (
                                <div key={step.title} className="text-center p-6 bg-background-light dark:bg-background-dark-light rounded-xl shadow-lg border border-border dark:border-border-dark">
                                    <step.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-text dark:text-text-dark">{step.title}</h3>
                                    <p className="mt-2 text-text-secondary dark:text-text-dark-secondary">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                 <section className="py-20 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-text dark:text-text-dark">Core Concepts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {coreConcepts.map(concept => (
                                <div key={concept.title} className="flex items-start gap-4 p-4">
                                    <concept.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-lg text-text dark:text-text-dark">{concept.title}</h3>
                                        <p className="text-text-secondary dark:text-text-dark-secondary">{concept.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <CtaSection />
            </main>
            <AppFooter />
        </div>
    );
}
