

"use client";

import { useState, ComponentProps, memo } from "react";
import { Project, Output, OutputType } from "../../lib/types";
import { Modal } from "../ui/modal";
import { UploadCloudIcon, TrashIcon, LinkIcon, CheckCircleIcon, FileTextIcon, VideoIcon } from "../ui/icons";

type PorEvidenceType = 'Document' | 'Video' | 'Output Log' | 'Others';

const FormInput = memo((props: ComponentProps<'input'>) => <input {...props} className="w-full p-2.5 border border-border dark:border-border-dark rounded-lg bg-transparent focus:ring-1 focus:ring-primary focus:border-primary font-mono text-sm" />);
const FormTextarea = memo((props: ComponentProps<'textarea'>) => <textarea {...props} className="w-full p-2.5 border border-border dark:border-border-dark rounded-lg bg-transparent h-24 focus:ring-1 focus:ring-primary focus:border-primary" />);
const FormSelect = memo((props: ComponentProps<'select'>) => <select {...props} className="w-full p-2.5 border border-border dark:border-border-dark rounded-lg bg-transparent dark:text-white focus:ring-1 focus:ring-primary focus:border-primary" />);
const FormFileInput = memo((props: ComponentProps<'input'>) => <input type="file" {...props} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-blue-200/50 dark:file:bg-primary/20 dark:file:text-primary-light dark:hover:file:bg-primary/30" />);

export const SubmitPorModal = ({ project, onClose, onSubmit }: { project: Project; onClose: () => void; onSubmit: (data: { notes: string; evidence: Output[] }) => void; }) => {
    const [stagedEvidence, setStagedEvidence] = useState<Output[]>([]);
    const [notes, setNotes] = useState('');
    
    // Form state
    const [type, setType] = useState<PorEvidenceType>('Document');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [fileName, setFileName] = useState('');

    const resetForm = () => {
        setType('Document');
        setDescription('');
        setUrl('');
        setFileName('');
    };

    const handleAddRecord = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description) return;

        const newEvidence: Output = {
            id: `evidence-staged-${Date.now()}`,
            type,
            timestamp: new Date().toISOString().split('T')[0],
            description,
            data: {},
        };

        switch (type) {
            case 'Document':
            case 'Output Log':
                newEvidence.data = { url, fileName };
                break;
            case 'Video':
                 newEvidence.data = { url };
                break;
            case 'Others':
                newEvidence.data = { url, fileName, otherText: description };
                break;
        }
        setStagedEvidence(prev => [...prev, newEvidence]);
        resetForm();
    };

    const handleDeleteRecord = (evidenceId: string) => {
        setStagedEvidence(prev => prev.filter(o => o.id !== evidenceId));
    };
    
    const handleFinalSubmit = () => {
        if (stagedEvidence.length > 0 && notes) {
            onSubmit({ notes, evidence: stagedEvidence });
        }
    };

    const renderDataFields = () => {
        switch (type) {
            case 'Document': return (<>
                <FormInput type="url" placeholder="URL to document (e.g., Google Doc, arXiv)" value={url} onChange={e => setUrl(e.target.value)} />
                <FormFileInput onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
            </>);
             case 'Video': return (<>
                <FormInput type="url" placeholder="YouTube, Vimeo, etc. URL" value={url} onChange={e => setUrl(e.target.value)} />
            </>);
            case 'Output Log': return (<>
                <FormInput type="url" placeholder="URL to log file (e.g., Pastebin, Gist)" value={url} onChange={e => setUrl(e.target.value)} />
                <FormFileInput onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
            </>);
            case 'Others':
                return (
                     <>
                        <FormInput type="url" placeholder="URL (optional)" value={url} onChange={e => setUrl(e.target.value)} />
                        <FormFileInput onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
                    </>
                );
            default: return null;
        }
    };
    
    const evidenceIcons: Record<PorEvidenceType, React.FC<any>> = {
        "Document": FileTextIcon, 
        "Video": VideoIcon,
        "Output Log": FileTextIcon, 
        "Others": LinkIcon 
    };
    
    const modalFooter = (
         <div className="flex justify-end">
            <button onClick={handleFinalSubmit} disabled={stagedEvidence.length === 0 || !notes} className="flex items-center space-x-2 bg-status-success text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-cairn-gray-400 disabled:cursor-not-allowed">
                <CheckCircleIcon className="w-5 h-5" />
                <span>Submit {stagedEvidence.length} Piece(s) of Evidence</span>
            </button>
        </div>
    );

    return (
        <Modal onClose={onClose} title={`Submit for Reproducibility`} footer={modalFooter}>
            <div className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-1">Notes & Methodology</label>
                    <FormTextarea placeholder="Describe your reproduction process, any deviations, and the outcome." value={notes} onChange={e => setNotes(e.target.value)} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <form onSubmit={handleAddRecord} className="space-y-4">
                        <h4 className="font-semibold text-text dark:text-text-dark">Add Evidence</h4>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-1">Evidence Type</label>
                            <FormSelect value={type} onChange={(e) => setType(e.target.value as PorEvidenceType)}>
                                <option value="Document">Document</option>
                                <option value="Video">Video</option>
                                <option value="Output Log">Output Log</option>
                                <option value="Others">Others</option>
                            </FormSelect>
                        </div>
                         
                        <div>
                            <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-1">Description</label>
                            <FormTextarea placeholder="e.g., 'Log files from my simulation run'" value={description} onChange={e => setDescription(e.target.value)} required={type !== 'Others'} />
                        </div>
                        
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">Data Details</label>
                            {renderDataFields()}
                        </div>
                        <button type="submit" className="w-full bg-primary-light text-primary font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-200/50 dark:bg-primary/20 dark:text-primary-light dark:hover:bg-primary/30 transition-colors">
                            Add Evidence to Submission
                        </button>
                    </form>

                    <div className="space-y-3">
                        <h4 className="font-semibold text-text dark:text-text-dark">Staged Evidence ({stagedEvidence.length})</h4>
                        <div className="bg-cairn-gray-100 dark:bg-cairn-gray-800 p-3 rounded-lg space-y-2 min-h-[200px] max-h-96 overflow-y-auto">
                            {stagedEvidence.length === 0 ? (
                                 <p className="text-sm text-text-secondary text-center py-4">No evidence staged yet.</p>
                            ): (
                                stagedEvidence.map(output => {
                                    const Icon = evidenceIcons[output.type as PorEvidenceType];
                                    return (
                                    <div key={output.id} className="flex items-start justify-between bg-background-light dark:bg-background-dark-light p-2 rounded-md shadow-sm">
                                        <div className="flex items-start space-x-2">
                                            <Icon className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                                            <p className="text-sm flex-grow text-text dark:text-text-dark">{output.description}</p>
                                        </div>
                                        <button onClick={() => handleDeleteRecord(output.id)} className="p-1 rounded-full hover:bg-status-danger-bg dark:hover:bg-status-danger-bg-dark">
                                            <TrashIcon className="w-4 h-4 text-status-danger"/>
                                        </button>
                                    </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};