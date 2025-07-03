

"use client";

import { useState, useRef, useEffect, ComponentProps, memo } from "react";
import { Project, Output, OutputType, ToolOption, TOOL_OPTIONS } from "../../lib/types";
import { Modal } from "../ui/modal";
import { UploadCloudIcon, TrashIcon, LinkIcon, AlertTriangleIcon, FileTextIcon, DatabaseIcon, CodeIcon, ToolboxIcon, ChevronUpDownIcon, VideoIcon } from "../ui/icons";
import { REPRODUCIBILITY_TEMPLATES } from "../../lib/constants";

const FormInput = memo((props: ComponentProps<'input'>) => <input {...props} className="w-full p-2.5 border border-border dark:border-border-dark rounded-lg bg-transparent focus:ring-1 focus:ring-primary focus:border-primary font-mono text-sm" />);
const FormTextarea = memo((props: ComponentProps<'textarea'>) => <textarea {...props} className="w-full p-2.5 border border-border dark:border-border-dark rounded-lg bg-transparent h-24 focus:ring-1 focus:ring-primary focus:border-primary" />);
const FormSelect = memo((props: ComponentProps<'select'>) => <select {...props} className="w-full p-2.5 border border-border dark:border-border-dark rounded-lg bg-transparent dark:text-white focus:ring-1 focus:ring-primary focus:border-primary" />);
const FormFileInput = memo((props: ComponentProps<'input'>) => <input type="file" {...props} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-blue-200/50 dark:file:bg-primary/20 dark:file:text-primary-light dark:hover:file:bg-primary/30" />);

export const AddOutputModal = ({ project, onClose, onAddOutputs }: { project: Project; onClose: () => void; onAddOutputs: (outputs: Output[]) => void; }) => {
    const [stagedOutputs, setStagedOutputs] = useState<Output[]>([]);
    const [type, setType] = useState<OutputType>('Document');
    const [description, setDescription] = useState('');
    
    // Data fields state
    const [url, setUrl] = useState('');
    const [ipfsCid, setIpfsCid] = useState('');
    const [fileName, setFileName] = useState('');
    const [otherText, setOtherText] = useState('');
    const [selectedTools, setSelectedTools] = useState<ToolOption[]>([]);
    
    const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsToolsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const resetForm = () => {
        setType('Document');
        setDescription('');
        setUrl('');
        setIpfsCid('');
        setFileName('');
        setOtherText('');
        setSelectedTools([]);
        setIsToolsDropdownOpen(false);
    };

    const handleToolToggle = (tool: ToolOption) => {
        setSelectedTools(prev =>
            prev.includes(tool)
                ? prev.filter(t => t !== tool)
                : [...prev, tool]
        );
    };

    const handleAddRecord = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description) return;

        const newOutput: Output = {
            id: `out-staged-${Date.now()}`,
            type,
            timestamp: new Date().toISOString().split('T')[0],
            description,
            data: {},
        };

        switch (type) {
            case 'Document':
            case 'Dataset':
                newOutput.data = { url, ipfsCid, fileName };
                break;
            case 'Code':
            case 'Video':
                newOutput.data = { url };
                break;
            case 'Tools & External Services':
                newOutput.data = { tools: selectedTools };
                break;
            case 'Output Log':
                newOutput.data = { url, fileName };
                break;
            case 'Others':
                newOutput.data = { url, ipfsCid, fileName, otherText };
                break;
        }
        setStagedOutputs(prev => [...prev, newOutput]);
        resetForm();
    };

    const handleDeleteRecord = (outputId: string) => {
        setStagedOutputs(prev => prev.filter(o => o.id !== outputId));
    };
    
    const handleRecordOutputs = () => {
        if (stagedOutputs.length > 0) {
            onAddOutputs(stagedOutputs);
        }
    };

    const renderDataFields = () => {
        switch (type) {
            case 'Document':
            case 'Dataset':
                return (
                    <>
                        <FormInput type="url" placeholder="URL to document (e.g., arXiv, G-Doc)" value={url} onChange={e => setUrl(e.target.value)} />
                        <FormInput type="text" placeholder="IPFS CID (optional)" value={ipfsCid} onChange={e => setIpfsCid(e.target.value)} />
                        <FormFileInput onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
                    </>
                );
            case 'Code':
                 return (
                    <>
                     <FormInput type="url" placeholder="URL to code repository (e.g., GitHub)" value={url} onChange={e => setUrl(e.target.value)} />
                    </>
                );
            case 'Video':
                return (
                    <>
                        <FormInput type="url" placeholder="URL to video (e.g., YouTube, Vimeo)" value={url} onChange={e => setUrl(e.target.value)} />
                    </>
                );
             case 'Tools & External Services':
                return (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsToolsDropdownOpen(prev => !prev)}
                            className="w-full p-2.5 border border-border dark:border-border-dark rounded-lg bg-transparent text-left flex justify-between items-center"
                            aria-haspopup="listbox"
                            aria-expanded={isToolsDropdownOpen}
                        >
                            <span className="text-sm truncate pr-2">
                                {selectedTools.length > 0 ? selectedTools.join(', ') : 'Select tools that apply...'}
                            </span>
                            <ChevronUpDownIcon className="w-5 h-5 text-text-secondary flex-shrink-0" />
                        </button>
                        {isToolsDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-background-light dark:bg-background-dark-light border border-border dark:border-border-dark rounded-md shadow-lg max-h-60 overflow-y-auto">
                                <ul role="listbox" className="py-1">
                                    {TOOL_OPTIONS.map(tool => (
                                        <li
                                            key={tool}
                                            className="text-sm hover:bg-primary-light dark:hover:bg-primary/20"
                                        >
                                            <label className="w-full flex items-center px-3 py-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTools.includes(tool)}
                                                    onChange={() => handleToolToggle(tool)}
                                                    className="mr-3 h-4 w-4 rounded border-cairn-gray-300 dark:border-cairn-gray-700 text-primary focus:ring-primary"
                                                />
                                                {tool}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            case 'Output Log':
                 return (
                    <>
                        <FormInput type="url" placeholder="URL to log file (e.g., Pastebin, Gist)" value={url} onChange={e => setUrl(e.target.value)} />
                        <FormFileInput onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
                    </>
                );
            case 'Others':
                return (
                    <>
                        <FormInput type="url" placeholder="URL (optional)" value={url} onChange={e => setUrl(e.target.value)} />
                        <FormInput type="text" placeholder="IPFS CID (optional)" value={ipfsCid} onChange={e => setIpfsCid(e.target.value)} />
                        <FormInput type="text" placeholder="Additional text (e.g., commit hash)" value={otherText} onChange={e => setOtherText(e.target.value)} />
                        <FormFileInput onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
                    </>
                );
            default:
                return null;
        }
    };
    
    const outputIcons: Record<OutputType, React.FC<any>> = { 
        "Document": FileTextIcon, 
        "Dataset": DatabaseIcon,
        "Code": CodeIcon,
        "Tools & External Services": ToolboxIcon,
        "Output Log": FileTextIcon, 
        "Others": LinkIcon,
        "Video": VideoIcon,
    };

    const modalFooter = (
        <div className="space-y-4">
            <div className="flex items-start p-3 text-sm rounded-lg bg-status-warning-bg text-status-warning dark:bg-status-warning-bg-dark/50 ring-1 ring-inset ring-status-warning/20">
                <AlertTriangleIcon className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                    <span className="font-semibold">Permanent Action:</span> This is a one-time action. Once recorded, these outputs are permanently associated with the project and cannot be modified or added to. Please review carefully before finalizing.
                </div>
            </div>
            <div className="flex justify-end">
                <button 
                    onClick={handleRecordOutputs} 
                    disabled={stagedOutputs.length === 0}
                    className="flex items-center space-x-2 bg-primary text-primary-text font-semibold py-2.5 px-6 rounded-lg hover:bg-primary-hover transition-colors disabled:bg-cairn-gray-400 disabled:cursor-not-allowed">
                    <UploadCloudIcon className="w-5 h-5" />
                    <span>Record Outputs and Finalize</span>
                </button>
            </div>
        </div>
    );

    return (
        <Modal onClose={onClose} title={`Add Outputs to "${project.title}"`} footer={modalFooter}>
             <div className="mb-6">
                <h4 className="text-md font-medium text-text dark:text-text-dark mb-2">Output Guidelines</h4>
                <p className="text-sm text-text-secondary dark:text-text-dark-secondary mb-3">These are some examples of outputs for a project in the <strong>{project.domain}</strong> domain. Provide as much detail as possible.</p>
                <ul className="space-y-2 text-sm text-text-secondary list-disc list-inside bg-cairn-gray-100 dark:bg-cairn-gray-800 p-3 rounded-lg">
                    {REPRODUCIBILITY_TEMPLATES[project.domain].map((req, i) => <li key={i}>{req}</li>)}
                </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form to add a single record */}
                <form onSubmit={handleAddRecord} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-1">Output Type</label>
                        <FormSelect value={type} onChange={(e) => setType(e.target.value as OutputType)}>
                            <option value="Document">Document</option>
                            <option value="Dataset">Dataset</option>
                            <option value="Code">Code</option>
                            <option value="Tools & External Services">Tools & External Services</option>
                            <option value="Video">Video</option>
                            <option value="Output Log">Output Log</option>
                            <option value="Others">Others</option>
                        </FormSelect>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-1">Description</label>
                        <FormTextarea placeholder="e.g., 'Sensor fusion algorithm implementation'" value={description} onChange={e => setDescription(e.target.value)} required></FormTextarea>
                    </div>
                    
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">Data Details</label>
                        {renderDataFields()}
                    </div>
                    <button type="submit" className="w-full bg-primary-light text-primary font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-200/50 dark:bg-primary/20 dark:text-primary-light dark:hover:bg-primary/30 transition-colors">
                        Add Output
                    </button>
                </form>

                {/* Staging Area */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-text dark:text-text-dark">Staged Outputs ({stagedOutputs.length})</h4>
                    <div className="bg-cairn-gray-100 dark:bg-cairn-gray-800 p-3 rounded-lg space-y-2 min-h-[200px] max-h-96 overflow-y-auto">
                        {stagedOutputs.length === 0 ? (
                             <p className="text-sm text-text-secondary text-center py-4">No outputs staged yet.</p>
                        ): (
                            stagedOutputs.map(output => {
                                const Icon = outputIcons[output.type];
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
        </Modal>
    );
};