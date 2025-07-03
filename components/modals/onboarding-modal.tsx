"use client";

import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { useAppContext } from '../../context/app-provider';
import { CheckCircleIcon, SpinnerIcon, UsersIcon, AlertTriangleIcon } from '../ui/icons';

type VerificationStep = 'intro' | 'verifying' | 'success' | 'error';

// This mock SDK simulates a third-party verification service.
const VerificationSDK = {
  verify: (): Promise<{ success: boolean; message: string }> => {
    console.log("Mock Verification SDK: Starting verification...");
    return new Promise(resolve => {
      // Simulate network delay and processing time
      setTimeout(() => {
        // Simulate a 80% success rate for demonstration purposes
        const isSuccess = Math.random() > 0.20;
        if (isSuccess) {
          console.log("Mock Verification SDK: Verification successful.");
          resolve({ success: true, message: "Identity confirmed." });
        } else {
          console.log("Mock Verification SDK: Verification failed.");
          resolve({ success: false, message: "Automatic verification failed. Please try again or contact support." });
        }
      }, 3500);
    });
  }
};


export const OnboardingModal = () => {
    const { completeOnboarding, closeOnboardingModal } = useAppContext();
    const [step, setStep] = useState<VerificationStep>('intro');
    const [errorMessage, setErrorMessage] = useState('');

    const handleStartVerification = async () => {
        setStep('verifying');
        const result = await VerificationSDK.verify();
        if (result.success) {
            setStep('success');
        } else {
            setErrorMessage(result.message);
            setStep('error');
        }
    };
    
    const handleRetry = () => {
        setErrorMessage('');
        handleStartVerification();
    };
    
    const handleFinish = () => {
        completeOnboarding();
    };

    const renderContent = () => {
        const contentContainerClasses = "text-center p-8 flex flex-col items-center justify-center min-h-[400px]";
        switch (step) {
            case 'intro': return (
                <div className={contentContainerClasses}>
                    <div className="p-4 bg-primary-light dark:bg-primary/20 rounded-full mb-6">
                       <UsersIcon className="w-12 h-12 text-primary dark:text-primary-light" />
                    </div>
                    <h3 className="text-3xl font-bold text-text dark:text-text-dark">Welcome to CAIRN!</h3>
                    <p className="text-text-secondary dark:text-text-dark-secondary mt-2 max-w-md mx-auto">To ensure community integrity, we require new members to complete a one-time identity check.</p>
                </div>
            );
            case 'verifying': return (
                <div className={contentContainerClasses}>
                    <SpinnerIcon className="w-16 h-16 text-primary animate-spin" />
                    <h3 className="text-2xl font-semibold mt-6 text-text dark:text-text-dark">Verification in Progress...</h3>
                    <p className="text-text-secondary dark:text-text-dark-secondary mt-2">Your identity is being securely verified. Please wait.</p>
                </div>
            );
            case 'success': return (
                <div className={contentContainerClasses}>
                    <CheckCircleIcon className="w-20 h-20 text-status-success" />
                    <h3 className="text-3xl font-bold mt-6 text-text dark:text-text-dark">Verification Complete!</h3>
                    <p className="text-text-secondary dark:text-text-dark-secondary mt-2 max-w-md mx-auto">Welcome to CAIRN. You are now a verified member of the community.</p>
                </div>
            );
            case 'error': return (
                <div className={contentContainerClasses}>
                    <AlertTriangleIcon className="w-16 h-16 text-status-danger" />
                    <h3 className="text-2xl font-semibold mt-6 text-text dark:text-text-dark">Verification Failed</h3>
                    <p className="text-text-secondary dark:text-text-dark-secondary mt-2 max-w-md mx-auto">{errorMessage}</p>
                </div>
            );
        }
    };
    
    const renderFooter = () => {
        switch (step) {
            case 'intro': return (
                <div className="flex justify-center">
                    <button onClick={handleStartVerification} className="bg-primary text-primary-text font-semibold py-3 px-8 rounded-lg hover:bg-primary-hover transition-colors flex items-center space-x-2">
                        <span>Start Verification</span>
                    </button>
                </div>
            );
            case 'verifying': return null;
            case 'success': return (
                <div className="flex justify-center">
                    <button onClick={handleFinish} className="bg-primary text-primary-text font-semibold py-3 px-8 rounded-lg hover:bg-primary-hover transition-colors">
                        Enter the Platform
                    </button>
                </div>
            );
            case 'error': return (
                 <div className="flex justify-center">
                    <button onClick={handleRetry} className="bg-primary text-primary-text font-semibold py-3 px-8 rounded-lg hover:bg-primary-hover transition-colors">
                        Try Again
                    </button>
                </div>
            );
        }
    }

    return (
        <Modal 
            onClose={() => { if (step !== 'verifying') { closeOnboardingModal(); } }}
            title="Community Onboarding"
            footer={renderFooter()}
        >
            {renderContent()}
        </Modal>
    );
};