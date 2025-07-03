
"use client";

import { useClipboard } from "../../hooks/use-clipboard";
import { Output, OutputType } from "../../lib/types";
import { FileTextIcon, LinkIcon, GitHubIcon, IpfsIcon, CopyIcon, CheckIcon, VideoIcon, DatabaseIcon, CodeIcon, ToolboxIcon } from "../ui/icons";
import React from "react";

export const OutputListItem = ({ output }: { output: Output }) => {
    const { copy, copied } = useClipboard();
    
    const outputIcons: Record<string, React.FC<any>> = { 
        "Document": FileTextIcon, 
        "Dataset": DatabaseIcon,
        "Code": CodeIcon,
        "Tools & External Services": ToolboxIcon,
        "Video": VideoIcon,
        "Output Log": FileTextIcon, 
        "Others": LinkIcon 
    };
    const Icon = outputIcons[output.type] || LinkIcon;

    const isGitUrl = (url: string) => /github\.com/.test(url);

    const DataBox = ({ children }: { children: React.ReactNode }) => (
        <div className="flex items-center space-x-3 bg-cairn-gray-100 dark:bg-cairn-gray-800/60 p-2.5 rounded-lg font-mono text-sm border border-border dark:border-border-dark">
            {children}
        </div>
    );

    return (
        <li className="py-6 first:pt-0 last:pb-0">
            <div className="flex items-start space-x-4">
                <Icon className="w-6 h-6 mt-1 text-primary flex-shrink-0" />
                <div className="flex-grow">
                    <p className="font-semibold text-text dark:text-text-dark">{output.description}</p>
                    <p className="text-sm text-text-secondary dark:text-text-dark-secondary">{output.type} - {output.timestamp}</p>
                    
                    <div className="mt-4 space-y-2">
                        {/* URL */}
                        {output.data.url && (
                             <DataBox>
                                {isGitUrl(output.data.url) ? <GitHubIcon className="w-5 h-5 text-text-secondary flex-shrink-0" /> : <LinkIcon className="w-5 h-5 text-text-secondary flex-shrink-0" />}
                                <a href={!output.data.url.startsWith('http') ? `https://${output.data.url}` : output.data.url} target="_blank" rel="noopener noreferrer" className="text-primary dark:text-primary-light hover:underline truncate flex-grow">{output.data.url}</a>
                                <button onClick={() => copy(output.data.url!)} className="p-1 rounded hover:bg-cairn-gray-300 dark:hover:bg-cairn-gray-600">
                                    {copied ? <CheckIcon className="w-4 h-4 text-status-success" /> : <CopyIcon className="w-4 h-4 text-text-secondary" />}
                                </button>
                            </DataBox>
                        )}

                        {/* IPFS */}
                        {output.data.ipfsCid && (
                             <DataBox>
                                <IpfsIcon className="w-5 h-5 text-text-secondary flex-shrink-0" />
                                <span className="text-text-secondary mr-2">IPFS:</span>
                                <span className="text-text dark:text-text-dark truncate flex-grow">{output.data.ipfsCid}</span>
                                <button onClick={() => copy(output.data.ipfsCid!)} className="p-1 rounded hover:bg-cairn-gray-300 dark:hover:bg-cairn-gray-600">
                                    {copied ? <CheckIcon className="w-4 h-4 text-status-success" /> : <CopyIcon className="w-4 h-4 text-text-secondary" />}
                                </button>
                                <a href={`https://ipfs.io/ipfs/${output.data.ipfsCid}`} target="_blank" rel="noopener noreferrer" className="p-1 rounded hover:bg-cairn-gray-300 dark:hover:bg-cairn-gray-600">
                                    <LinkIcon className="w-4 h-4 text-text-secondary" />
                                </a>
                            </DataBox>
                        )}

                        {/* Other Text (like commit hash) */}
                        {output.data.otherText && (
                           <DataBox>
                                <span className="text-text dark:text-text-dark whitespace-pre-wrap">{output.data.otherText}</span>
                           </DataBox>
                        )}
                        
                        {/* File */}
                        {output.data.fileName && (
                            <DataBox>
                                <FileTextIcon className="w-5 h-5 text-text-secondary" />
                                <span className="text-text dark:text-text-dark font-medium flex-grow">{output.data.fileName}</span>
                                {!output.data.ipfsCid && <span className="text-xs text-text-secondary">(upload pending)</span>}
                            </DataBox>
                        )}

                         {/* Tools */}
                        {output.data.tools && output.data.tools.length > 0 && (
                            <DataBox>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                    {output.data.tools.map(tool => (
                                        <span key={tool} className="inline-flex items-center text-xs font-semibold text-text dark:text-text-dark">
                                           <CheckIcon className="w-3.5 h-3.5 mr-1.5 text-primary"/>
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </DataBox>
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
};
