


export enum UserRole {
  Scientist = 'Scientist',
  Funder = 'Funder',
}

export enum ProjectStatus {
  Draft = 'Draft',
  Active = 'Active',
  Funded = 'Funded',
  Archived = 'Archived',
}

export enum ResearchDomain {
  Robotics = 'Robotics',
  Simulation = 'Simulation',
  Hardware = 'Hardware',
}

export enum PoRStatus {
    Waiting = 'Waiting',
    Disputed = 'Disputed',
    Success = 'Success',
}

export interface ImpactAssetOwner {
    walletAddress: string;
    contribution: string;
    ownershipPercentage: number;
}

export interface Project {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  domain: ResearchDomain;
  coverImageUrl?: string;
  cid: string;
  hypercertFraction: number;
  startDate: string;
  endDate: string;
  lastOutputDate: string;
  reproducibilities: Reproducibility[];
  fundingGoal?: number;
  fundingPool: number;
  impactScore: number;
  outputs: Output[];
  reproducibilityRequirements: string[];
  organization?: string;
  additionalInfoUrl?: string;
  impactAssetOwners: ImpactAssetOwner[];
}

export const TOOL_OPTIONS = ['Python', 'ROS', 'MuJoCo', 'AWS', 'BitRobot'] as const;
export type ToolOption = typeof TOOL_OPTIONS[number];

export type OutputType = 'Document' | 'Dataset' | 'Code' | 'Tools & External Services' | 'Output Log' | 'Others' | 'Video';

export interface Output {
  id: string;
  type: OutputType;
  timestamp: string;
  description: string;
  data: {
    url?: string;
    ipfsCid?: string;
    fileName?: string;
    tools?: ToolOption[];
    otherText?: string;
  };
}


export interface Reproducibility {
  id: string;
  timestamp: string;
  evidence: Output[];
  notes: string;
  verifier: string; // wallet address
  status: PoRStatus;
}

export interface ToastInfo {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface UserProfile {
    walletAddress: string;
    porContributedCount: number;
    name: string;
    isVerified: boolean;
}

export interface FundingEvent {
  id: string;
  projectId: string;
  projectTitle: string;
  amount: number;
  timestamp: string;
  funderWallet: string;
  txHash: string;
}