
"use client";

import { Reproducibility, PoRStatus } from "../../lib/types";
import { Modal } from "../ui/modal";
import { OutputListItem } from "../projects/output-list-item";
import { FlagIcon, ClockIcon, CheckCircleIcon } from "../ui/icons";
import React from "react";
import { PoRStatusBadge } from "../ui/por-status-badge";


export const ReproducibilityDetailModal = ({ reproducibility, onClose, onDispute, isOwner }: { reproducibility: Reproducibility, onClose: () => void, onDispute: () => void, isOwner: boolean }) => {
    return (
        <Modal onClose={onClose} title="Submission Details">
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">Verifier</label>
                        <p className="font-mono text-lg text-text dark:text-text-dark">{reproducibility.verifier}</p>
                    </div>
                     <PoRStatusBadge status={reproducibility.status} size="md" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">Timestamp</label>
                    <p className="text-lg text-text dark:text-text-dark">{new Date(reproducibility.timestamp).toLocaleDateString()}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">Notes & Methodology</label>
                    <div className="mt-1 p-3 bg-cairn-gray-100 dark:bg-cairn-gray-800 rounded-md">
                        <p className="text-sm whitespace-pre-wrap text-text-secondary dark:text-text-dark-secondary">{reproducibility.notes}</p>
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-2">Evidence ({reproducibility.evidence.length})</label>
                    {reproducibility.evidence.length > 0 ? (
                        <ul className="divide-y divide-border dark:divide-border-dark border border-border dark:border-border-dark rounded-lg overflow-hidden">
                            {reproducibility.evidence.map(output => (
                                <li className="px-4 bg-background-light dark:bg-background-dark-light" key={output.id}><OutputListItem output={output} /></li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-text-secondary">No evidence was provided with these notes.</p>
                    )}
                </div>

                {reproducibility.status === PoRStatus.Waiting && !isOwner && (
                     <div className="mt-6 p-4 border border-status-warning/30 bg-status-warning-bg dark:bg-status-warning-bg-dark/50 rounded-lg space-y-3">
                        <h4 className="font-semibold text-status-warning">This Submission is under review</h4>
                        <p className="text-sm text-status-warning/80">
                            There is a 7-day waiting period during which any community member can dispute the validity of this submission.
                        </p>
                        <button onClick={onDispute} className="w-full sm:w-auto flex items-center justify-center space-x-2 border-2 border-status-danger bg-transparent text-status-danger font-semibold py-2 px-4 rounded-lg hover:bg-status-danger/10 transition-colors">
                           <FlagIcon className="w-5 h-5" />
                           <span>Dispute Submission</span>
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};
