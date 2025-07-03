

import { Project, ResearchDomain, ProjectStatus, Output, Reproducibility, PoRStatus, UserProfile, FundingEvent } from './types';

export const RESEARCH_DOMAINS: ResearchDomain[] = [
  ResearchDomain.Robotics,
  ResearchDomain.Simulation,
  ResearchDomain.Hardware,
];

// --- MOCK USER WALLETS ---
export const CURRENT_USER_WALLET = '0x1A2B...C3D4';
export const SCIENTIST_WALLET_ALICE = '0xAlice...E5F6';
export const SCIENTIST_WALLET_BOB = '0xBob...A7B8';
export const SCIENTIST_WALLET_CHARLIE = '0xCharlie...C9D0';
export const FUNDER_WALLET_1 = '0xabc...123';
export const FUNDER_WALLET_2 = '0xdef...456';
export const FUNDER_WALLET_3 = '0xghi...789';

// --- MOCK USERS ---
export const MOCK_USERS: UserProfile[] = [
    { walletAddress: CURRENT_USER_WALLET, name: 'Dr. Pat Smith (You)', porContributedCount: 2, isVerified: false },
    { walletAddress: SCIENTIST_WALLET_ALICE, name: 'Dr. Alice', porContributedCount: 5, isVerified: true },
    { walletAddress: SCIENTIST_WALLET_BOB, name: 'Dr. Bob', porContributedCount: 8, isVerified: true },
    { walletAddress: SCIENTIST_WALLET_CHARLIE, name: 'Dr. Charlie', porContributedCount: 2, isVerified: false },
    { walletAddress: FUNDER_WALLET_1, name: 'Verifier Alpha', porContributedCount: 12, isVerified: true },
    { walletAddress: FUNDER_WALLET_2, name: 'Verifier Beta', porContributedCount: 7, isVerified: false },
    { walletAddress: FUNDER_WALLET_3, name: 'Verifier Gamma', porContributedCount: 3, isVerified: true },
    { walletAddress: '0x123...abc', name: 'Dr. Eve', porContributedCount: 15, isVerified: true },
    { walletAddress: '0x456...def', name: 'Dr. Frank', porContributedCount: 1, isVerified: true },
    { walletAddress: '0x789...ghi', name: 'Dr. Grace', porContributedCount: 9, isVerified: false },
    { walletAddress: '0xVerifier...1', name: 'Heidi', porContributedCount: 4, isVerified: true },
    { walletAddress: '0xVerifier...3', name: 'Ivan', porContributedCount: 6, isVerified: true },
    { walletAddress: '0xVerifier...4', name: 'Judy', porContributedCount: 11, isVerified: true },
    { walletAddress: '0xVerifier...5', name: 'Mallory', porContributedCount: 13, isVerified: false },
];

export const REPRODUCIBILITY_TEMPLATES: Record<ResearchDomain, string[]> = {
  [ResearchDomain.Robotics]: [
    'Provide full simulation environment files.',
    'List all hardware components and firmware versions.',
    'Include ROS bag files for all experiments.',
    'Document calibration procedures for all sensors.',
  ],
  [ResearchDomain.Simulation]: [
    'Specify simulation software and version.',
    'Include all environment and agent configuration files.',
    'Provide random seeds for all runs.',
    'Document results for baseline comparisons.',
  ],
  [ResearchDomain.Hardware]: [
    'Provide complete schematics and PCB layout files.',
    'List all components in a detailed Bill of Materials (BOM).',
    'Include firmware source code and compiled binaries.',
    'Document assembly instructions with photos or diagrams.',
  ],
};

// --- MOCK FUNDING DATA ---
export const MOCK_FUNDING_HISTORY: FundingEvent[] = [
  { id: 'fh-1', projectId: 'proj-001', projectTitle: 'Autonomous Drone Navigation in Dense Forests', amount: 5000, timestamp: '2024-08-01', funderWallet: FUNDER_WALLET_1, txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b' },
  { id: 'fh-2', projectId: 'proj-008', projectTitle: 'Reinforcement Learning for Quadrupedal Locomotion', amount: 10000, timestamp: '2024-07-28', funderWallet: FUNDER_WALLET_2, txHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c' },
  { id: 'fh-3', projectId: 'proj-005', projectTitle: 'Open Source 3D-Printed Robotic Hand', amount: 2500, timestamp: '2024-07-22', funderWallet: FUNDER_WALLET_3, txHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d' },
  // Funding for current user's projects
  { id: 'fh-4', projectId: 'proj-004', projectTitle: 'My Other Project With Outputs', amount: 1000, timestamp: '2024-07-10', funderWallet: FUNDER_WALLET_1, txHash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e' },
  { id: 'fh-5', projectId: 'proj-010', projectTitle: 'Embodied AI Agent for Warehouse Logistics', amount: 50000, timestamp: '2024-03-20', funderWallet: FUNDER_WALLET_2, txHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f' },
  { id: 'fh-6', projectId: 'proj-010', projectTitle: 'Embodied AI Agent for Warehouse Logistics', amount: 35000, timestamp: '2024-04-05', funderWallet: FUNDER_WALLET_3, txHash: '0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a' },
  { id: 'fh-7', projectId: 'proj-007', projectTitle: 'Legacy Project: Fluid Dynamics Simulation', amount: 75000, timestamp: '2022-06-15', funderWallet: FUNDER_WALLET_1, txHash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b' },
  // Funding events from current user
  { id: 'fh-8', projectId: 'proj-001', projectTitle: 'Autonomous Drone Navigation in Dense Forests', amount: 10000, timestamp: '2024-08-02', funderWallet: CURRENT_USER_WALLET, txHash: '0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9' },
  { id: 'fh-9', projectId: 'proj-002', projectTitle: 'Generative Adversarial Networks for Physics Simulation', amount: 20000, timestamp: '2024-08-03', funderWallet: CURRENT_USER_WALLET, txHash: '0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0' },
];


// --- MOCK PROJECT DATA ---

const MOCK_OUTPUTS_PROJ_1: Output[] = [
    {
        id: 'out-1-1', type: 'Code', timestamp: '2024-07-10', description: 'Initial commit of navigation algorithm.', 
        data: { url: 'github.com/org/repo', otherText: 'Commit hash: a1b2c3d' }
    },
    {
        id: 'out-1-2', type: 'Dataset', timestamp: '2024-07-15', description: 'Forest simulation sensor data.', 
        data: { ipfsCid: 'QmDataset...1', fileName: 'forest_sensor_data.zip' }
    }
];

const MOCK_OUTPUTS_PROJ_2: Output[] = [
    {
        id: 'out-2-1', type: 'Code', timestamp: '2024-06-20', description: 'GAN model architecture definition.', 
        data: { url: 'github.com/org/gan-repo', otherText: 'Commit hash: e4f5g6h' }
    },
     {
        id: 'out-2-2', type: 'Document', timestamp: '2024-06-28', description: 'Training protocol and hyperparameters.', 
        data: { otherText: 'Train for 100 epochs with batch size 32...' }
    }
];

const MOCK_OUTPUTS_PROJ_4: Output[] = [
    { id: 'out-4-1', type: 'Code', timestamp: '2024-07-28', description: 'Added sensor fusion logic', data: { otherText: 'Commit hash: f4b3a2c1' }},
    { id: 'out-4-2', type: 'Output Log', timestamp: '2024-07-30', description: 'Logs from a 2-hour test run in simulation.', data: { fileName: 'sim_run_log.txt' }},
    { id: 'out-4-3', type: 'Tools & External Services', timestamp: '2024-08-01', description: 'Core technologies for this stage.', data: { tools: ['Python', 'ROS'] }}
];

const MOCK_OUTPUTS_PROJ_5: Output[] = [
    { id: 'out-5-1', type: 'Document', timestamp: '2024-07-01', description: 'v1.0 Schematics released', data: { ipfsCid: 'QmHardwareSchematics...5', fileName: 'schematics_v1.pdf' }},
    { id: 'out-5-2', type: 'Code', timestamp: '2024-07-18', description: 'Firmware for microcontroller', data: { url: 'github.com/org/robot-arm', otherText: 'Commit hash: b4a5c6d' }},
];

const MOCK_OUTPUTS_PROJ_6: Output[] = [
    { id: 'out-6-1', type: 'Document', timestamp: '2024-04-11', description: 'Experimental setup protocol.', data: { otherText: 'Detailed setup instructions for replication...' } },
    { id: 'out-6-2', type: 'Dataset', timestamp: '2024-05-20', description: 'Raw sensor data from trial 1-50.', data: { ipfsCid: 'QmSensorData...6', fileName: 'raw_sensor_data_trials_1-50.csv' }},
    { id: 'out-6-3', type: 'Dataset', timestamp: '2024-06-05', description: 'Processed data and visualizations.', data: { ipfsCid: 'QmProcessedData...6', fileName: 'processed_data.json' }},
];

const MOCK_OUTPUTS_PROJ_7: Output[] = [
    { id: 'out-7-1', type: 'Code', timestamp: '2023-11-15', description: 'Initial simulation environment setup', data: { otherText: 'Commit hash: c1d2e3f4' } }
];

const MOCK_OUTPUTS_PROJ_8: Output[] = [
    { id: 'out-8-1', type: 'Code', timestamp: '2024-02-10', description: 'Core reinforcement learning model', data: { url: 'github.com/org/rl-quadruped', otherText: 'Commit hash: a1b2c3d4' }},
    { id: 'out-8-2', type: 'Code', timestamp: '2024-03-22', description: 'MuJoCo simulation environment files', data: { ipfsCid: 'QmSimEnv...8', fileName: 'mujoco_env.xml' }},
    { id: 'out-8-3', type: 'Document', timestamp: '2024-05-01', description: 'Training protocol for achieving gait', data: { otherText: 'Train with PPO for 10M timesteps...' }},
    { id: 'out-8-4', type: 'Tools & External Services', timestamp: '2024-05-15', description: 'Core technologies used in the simulation and training pipeline.', data: { tools: ['Python', 'MuJoCo', 'AWS'] }},
    { id: 'out-8-5', type: 'Dataset', timestamp: '2024-06-15', description: 'Logged states and actions during successful runs', data: { ipfsCid: 'QmLogData...8', fileName: 'successful_run_logs.pkl' }}
];

const MOCK_OUTPUTS_PROJ_10: Output[] = [
    { id: 'out-10-1', type: 'Document', timestamp: '2024-03-01', description: 'System Architecture and Design Principles', data: { url: 'arxiv.org/abs/2403.xxxx' } },
    { id: 'out-10-2', type: 'Code', timestamp: '2024-04-15', description: 'Pathfinding and obstacle avoidance module', data: { url: 'github.com/my-org/warehouse-ai', otherText: 'Commit hash: 9a8b7c6d' } },
    { id: 'out-10-3', type: 'Dataset', timestamp: '2024-05-20', description: 'Simulated warehouse layouts and item distributions', data: { ipfsCid: 'QmWrhsLayout...10', fileName: 'warehouse-layouts.zip' } },
    { id: 'out-10-4', type: 'Tools & External Services', timestamp: '2024-06-01', description: 'Technologies used.', data: { tools: ['Python', 'ROS', 'AWS', 'BitRobot'] }}
];


const createReproducibility = (id: string, timestamp: string, verifier: string, cid: string, notes: string, status: PoRStatus): Reproducibility => ({
    id,
    timestamp,
    verifier,
    notes,
    status,
    evidence: [{
        id: `ev-${id}`,
        type: 'Others',
        timestamp,
        description: 'Log files and recordings of the reproduction run.',
        data: { ipfsCid: cid, fileName: `repro-evidence-${id}.zip` }
    }]
});


export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-008',
    ownerId: SCIENTIST_WALLET_BOB,
    title: 'Reinforcement Learning for Quadrupedal Locomotion',
    description: 'A project exploring advanced reinforcement learning techniques to achieve stable and dynamic locomotion in simulated quadrupedal robots. Focus on energy efficiency and robustness to external perturbations.',
    tags: ['AI', 'Reinforcement Learning', 'Robotics', 'Simulation'],
    status: ProjectStatus.Funded,
    domain: ResearchDomain.Simulation,
    cid: 'QmRL...Quad8',
    hypercertFraction: 0.50,
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    lastOutputDate: '2024-07-22',
    reproducibilities: [
        createReproducibility('rep-10', '2024-06-30', FUNDER_WALLET_1, 'QmEvidence...10', 'Reproduction successful. The agent achieved a stable gait within the specified training time.', PoRStatus.Success),
        createReproducibility('rep-11', '2024-07-05', FUNDER_WALLET_2, 'QmEvidence...11', 'Confirmed results. Energy efficiency metrics are within 2% of the original paper.', PoRStatus.Success),
        createReproducibility('rep-12', '2024-07-15', FUNDER_WALLET_3, 'QmEvidence...12', 'Ran the simulation with added perturbations as described. The robot maintained stability.', PoRStatus.Disputed),
        createReproducibility('rep-13', '2024-07-22', CURRENT_USER_WALLET, 'QmEvidence...13', 'My own verification of the baseline experiment. Everything checks out.', PoRStatus.Waiting),
        createReproducibility('rep-14', '2024-07-28', SCIENTIST_WALLET_ALICE, 'QmEvidence...14', 'Verified. The provided environment and model files work as expected.', PoRStatus.Success)
    ],
    fundingPool: 150000,
    impactScore: 98,
    outputs: MOCK_OUTPUTS_PROJ_8,
    reproducibilityRequirements: REPRODUCIBILITY_TEMPLATES[ResearchDomain.Simulation],
    organization: 'Nexus Simulation Labs',
    impactAssetOwners: [
        { walletAddress: SCIENTIST_WALLET_BOB, contribution: 'Lead Researcher', ownershipPercentage: 40.0 },
        { walletAddress: FUNDER_WALLET_1, contribution: 'Early PoR Verifier', ownershipPercentage: 5.0 },
        { walletAddress: FUNDER_WALLET_2, contribution: 'PoR Verifier', ownershipPercentage: 5.0 },
        { walletAddress: SCIENTIST_WALLET_ALICE, contribution: 'Protocol Contributor', ownershipPercentage: 5.0 },
    ],
  },
  {
    id: 'proj-001',
    ownerId: SCIENTIST_WALLET_ALICE,
    title: 'Autonomous Drone Navigation in Dense Forests',
    description: 'Development of a novel SLAM algorithm for drones operating in GPS-denied environments like dense forests, using only onboard sensor data.',
    tags: ['Drones', 'SLAM', 'Robotics', 'Autonomous Systems'],
    status: ProjectStatus.Funded,
    domain: ResearchDomain.Robotics,
    cid: 'QmXyZ...A1b2C3',
    hypercertFraction: 0.75,
    startDate: '2023-09-01',
    endDate: '2024-09-01',
    lastOutputDate: '2024-07-20',
    reproducibilities: [
      createReproducibility('rep-1', '2024-07-20', '0x123...abc', 'QmEvidence...1', 'Followed the protocol and was able to reproduce the drone trajectory in the simulated forest.', PoRStatus.Success),
      createReproducibility('rep-2', '2024-07-22', '0x456...def', 'QmEvidence...2', 'The SLAM algorithm works. Map accuracy is consistent with the claims.', PoRStatus.Success),
      createReproducibility('rep-3', '2024-07-25', '0x789...ghi', 'QmEvidence...3', 'Reproduction successful. The provided dataset was sufficient for verification.', PoRStatus.Success),
      createReproducibility('rep-15', '2024-07-29', CURRENT_USER_WALLET, 'QmEvidence...15', 'I was able to run the code and get the same output. Looks good.', PoRStatus.Success),
      createReproducibility('rep-16', '2024-08-01', SCIENTIST_WALLET_BOB, 'QmEvidence...16', 'Verified the results. This is solid work.', PoRStatus.Waiting),
    ],
    fundingPool: 24000,
    impactScore: 82,
    outputs: MOCK_OUTPUTS_PROJ_1,
    reproducibilityRequirements: REPRODUCIBILITY_TEMPLATES[ResearchDomain.Robotics],
    organization: 'BioSynth Dynamics',
    impactAssetOwners: [
        { walletAddress: SCIENTIST_WALLET_ALICE, contribution: 'Lead Researcher', ownershipPercentage: 50.0 },
        { walletAddress: '0x123...abc', contribution: 'PoR Verifier', ownershipPercentage: 5.0 },
        { walletAddress: '0x456...def', contribution: 'PoR Verifier', ownershipPercentage: 5.0 },
        { walletAddress: CURRENT_USER_WALLET, contribution: 'PoR Verifier', ownershipPercentage: 5.0 },
    ],
  },
  {
    id: 'proj-005',
    ownerId: SCIENTIST_WALLET_CHARLIE,
    title: 'Open Source 3D-Printed Robotic Hand',
    description: 'This project aims to create a low-cost, highly dexterous robotic hand that can be produced using standard 3D printers and off-the-shelf components. All designs and software are open source.',
    tags: ['3D Printing', 'Robotics', 'Hardware', 'Open Source'],
    status: ProjectStatus.Active,
    domain: ResearchDomain.Hardware,
    cid: 'QmHardware...Hand5',
    hypercertFraction: 0.65,
    startDate: '2024-02-01',
    endDate: '2024-12-31',
    lastOutputDate: '2024-07-18',
    reproducibilities: [
      createReproducibility('rep-5', '2024-07-25', '0xVerifier...1', 'QmRep...5a', '3D printed the parts and assembled the hand. The firmware works as described.', PoRStatus.Success),
      createReproducibility('rep-6', '2024-07-28', CURRENT_USER_WALLET, 'QmRep...5b', 'I was able to build the hand following the instructions. The BOM was accurate.', PoRStatus.Waiting),
    ],
    fundingPool: 35000,
    impactScore: 88,
    outputs: MOCK_OUTPUTS_PROJ_5,
    reproducibilityRequirements: REPRODUCIBILITY_TEMPLATES[ResearchDomain.Hardware],
    impactAssetOwners: [
      { walletAddress: SCIENTIST_WALLET_CHARLIE, contribution: 'Lead Researcher', ownershipPercentage: 100.0 },
    ],
  },
  {
    id: 'proj-002',
    ownerId: SCIENTIST_WALLET_BOB,
    title: 'Generative Adversarial Networks for Physics Simulation',
    description: 'Using GANs to generate realistic physics-based simulations, potentially accelerating scientific discovery in fields like fluid dynamics and material science.',
    tags: ['GANs', 'AI', 'Physics', 'Simulation'],
    status: ProjectStatus.Active,
    domain: ResearchDomain.Simulation,
    cid: 'QmAbC...d4e5F6',
    hypercertFraction: 0.4,
    startDate: '2024-03-10',
    endDate: '2025-03-10',
    lastOutputDate: '2024-07-05',
    reproducibilities: [
        createReproducibility('rep-4', '2024-07-05', '0xabc...123', 'QmEvidence...4', 'The GAN training protocol is clear and the model converges as expected.', PoRStatus.Success),
        createReproducibility('rep-17', '2024-07-19', CURRENT_USER_WALLET, 'QmEvidence...17', 'Re-ran the training script, results are consistent.', PoRStatus.Waiting),
        createReproducibility('rep-18', '2024-07-21', SCIENTIST_WALLET_CHARLIE, 'QmEvidence...18', 'Verified. The generated simulations are qualitatively similar to the examples.', PoRStatus.Success),
    ],
    fundingPool: 50000,
    impactScore: 91,
    outputs: MOCK_OUTPUTS_PROJ_2,
    reproducibilityRequirements: REPRODUCIBILITY_TEMPLATES[ResearchDomain.Simulation],
    impactAssetOwners: [
      { walletAddress: SCIENTIST_WALLET_BOB, contribution: 'Lead Researcher', ownershipPercentage: 100.0 },
    ],
  },
  {
    id: 'proj-006',
    ownerId: SCIENTIST_WALLET_ALICE,
    title: 'Swarm Robotics Behavior Analysis',
    description: 'Analyzing emergent behaviors in large-scale robot swarms. This research explores decentralized coordination algorithms and their application in exploration and task allocation.',
    tags: ['Swarm Intelligence', 'Robotics', 'Multi-agent Systems'],
    status: ProjectStatus.Active,
    domain: ResearchDomain.Robotics,
    cid: 'QmSwarm...Robo6',
    hypercertFraction: 0.25,
    startDate: '2024-01-01',
    endDate: '2024-10-01',
    lastOutputDate: '2024-06-05',
    reproducibilities: [
      createReproducibility('rep-7', '2024-06-20', '0xVerifier...3', 'QmRep...6a', 'Launched the swarm simulation. The emergent patterns match the video evidence.', PoRStatus.Success)
    ],
    fundingPool: 12000,
    impactScore: 75,
    outputs: MOCK_OUTPUTS_PROJ_6,
    reproducibilityRequirements: REPRODUCIBILITY_TEMPLATES[ResearchDomain.Robotics],
    impactAssetOwners: [
      { walletAddress: SCIENTIST_WALLET_ALICE, contribution: 'Lead Researcher', ownershipPercentage: 100.0 },
    ],
  },
  {
    id: 'proj-009',
    ownerId: SCIENTIST_WALLET_CHARLIE,
    title: 'New Study on Material Stress Tolerance',
    description: 'A foundational study to determine the stress tolerance of new composite materials under extreme temperature variations. This data will be crucial for aerospace and hardware applications.',
    tags: ['Material Science', 'Hardware', 'Stress Analysis'],
    status: ProjectStatus.Active,
    domain: ResearchDomain.Hardware,
    cid: 'QmMaterial...Stress9',
    hypercertFraction: 0,
    startDate: '2024-07-20',
    endDate: '2025-02-20',
    lastOutputDate: '2024-08-01',
    reproducibilities: [],
    fundingPool: 500,
    impactScore: 10,
    outputs: [
        {id: 'out-9-1', type: 'Document', timestamp: '2024-08-01', description: 'Initial testing protocol defined.', data: {otherText: 'Apply stress until fracture...'}}
    ],
    reproducibilityRequirements: REPRODUCIBILITY_TEMPLATES[ResearchDomain.Hardware],
    impactAssetOwners: [
      { walletAddress: SCIENTIST_WALLET_CHARLIE, contribution: 'Lead Researcher', ownershipPercentage: 100.0 },
    ],
  },
  // --- Current User's Projects ---
  {
    id: 'proj-003',
    ownerId: CURRENT_USER_WALLET,
    title: 'Low-Cost, Open-Source Robotic Arm',
    description: 'An early-stage project to design and build a 6-axis robotic arm for less than $500, aimed at hobbyists and educational institutions.',
    tags: ['Robotics', 'Hardware', 'DIY', 'Education'],
    status: ProjectStatus.Draft,
    domain: ResearchDomain.Hardware,
    cid: 'QmGhI...j7k8L9',
    hypercertFraction: 0,
    startDate: '2024-05-01',
    endDate: '2025-05-01',
    lastOutputDate: '',
    reproducibilities: [],
    fundingGoal: 15000,
    fundingPool: 2500,
    impactScore: 65,
    outputs: [],
    reproducibilityRequirements: REPRODUCIBILITY_TEMPLATES[ResearchDomain.Hardware],
    organization: 'Atlas Robotics',
    additionalInfoUrl: 'https://www.atlasrobotics.dev/research/arm',
    impactAssetOwners: [],
  },
  {
    id: 'proj-draft-001',
    ownerId: CURRENT_USER_WALLET,
    title: 'Early-Stage Particle Simulation Framework',
    description: 'A new framework for simulating particle interactions in a vacuum. Currently in planning phase.',
    tags: ['Simulation', 'Physics', 'Draft'],
    status: ProjectStatus.Draft,
    domain: ResearchDomain.Simulation,
    cid: 'QmDraft...Sim1',
    hypercertFraction: 0,
    startDate: '2024-08-01',
    endDate: '2025-08-01',
    lastOutputDate: '',
    reproducibilities: [],
    fundingGoal: 20000,
    fundingPool: 0,
    impactScore: 5,
    outputs: [],
    reproducibilityRequirements: REPRODUCIBILITY_TEMPLATES[ResearchDomain.Simulation],
    impactAssetOwners: [],
  },
  {
    id: 'proj-draft-002',
    ownerId: CURRENT_USER_WALLET,
    title: 'Concept for a Bio-Inspired Gripper',
    description: 'Initial concept and design sketches for a new type of robotic gripper inspired by octopus tentacles.',
    tags: ['Robotics', 'Hardware', 'Biomimicry'],
    status: ProjectStatus.Draft,
    domain: ResearchDomain.Hardware,
    cid: 'QmDraft...Grip2',
    hypercertFraction: 0,
    startDate: '2024-08-05',
    endDate: '2025-08-05',
    lastOutputDate: '',
    reproducibilities: [],
    fundingGoal: 5000,
    fundingPool: 0,
    impactScore: 15,
    outputs: [],
    reproducibilityRequirements: REPRODUCIBILITY_TEMPLATES[ResearchDomain.Hardware],
    impactAssetOwners: [],
  },
  {
    id: 'proj-draft-003',
    ownerId: CURRENT_USER_WALLET,
    title: 'Modular Drone Component Research',
    description: 'Researching the feasibility of creating standardized, modular components for custom drone assembly.',
    tags: ['Drones', 'Hardware', 'Modular Design'],
    status: ProjectStatus.Draft,
    domain: ResearchDomain.Robotics,
    cid: 'QmDraft...Drone3',
    hypercertFraction: 0,
    startDate: '2024-07-28',
    endDate: '2025-07-28',
    lastOutputDate: '',
    reproducibilities: [],
    fundingGoal: 25000,
    fundingPool: 100,
    impactScore: 10,
    outputs: [],
    reproducibilityRequirements: REPRODUCIBILITY_TEMPLATES[ResearchDomain.Robotics],
    impactAssetOwners: [],
  },
   {
    id: 'proj-004',
    ownerId: CURRENT_USER_WALLET,
    title: 'My Other Project With Outputs',
    description: 'A test project to demonstrate the output recording functionality on the CAIRN platform.',
    tags: ['Testing', 'Platform'],
    status: ProjectStatus.Active,
    domain: ResearchDomain.Robotics,
    cid: 'QmNew...proj4',
    hypercertFraction: 0.1,
    startDate: '2024-07-01',
    endDate: '2024-09-01',
    lastOutputDate: '2024-08-01',
    reproducibilities: [],
    fundingPool: 1000,
    impactScore: 70,
    outputs: MOCK_OUTPUTS_PROJ_4,
    reproducibilityRequirements: REPRODUCIBILITY_TEMPLATES[ResearchDomain.Robotics],
    impactAssetOwners: [
      { walletAddress: CURRENT_USER_WALLET, contribution: 'Lead Researcher', ownershipPercentage: 100.0 },
    ],
  },
  {
    id: 'proj-010',
    ownerId: CURRENT_USER_WALLET,
    title: 'Embodied AI Agent for Warehouse Logistics',
    description: 'Developing a physical AI agent capable of navigating complex warehouse environments, identifying packages, and performing sorting tasks. The project integrates computer vision with robotic manipulation.',
    tags: ['Embodied AI', 'Logistics', 'Robotics', 'Computer Vision'],
    status: ProjectStatus.Funded,
    domain: ResearchDomain.Robotics,
    cid: 'QmWarehouseAI...10',
    hypercertFraction: 0.85,
    startDate: '2024-02-15',
    endDate: '2025-02-15',
    lastOutputDate: '2024-06-01',
    reproducibilities: [
      createReproducibility('rep-20', '2024-06-15', '0xabc...123', 'QmEvidence...20', 'Successfully ran the warehouse simulation. The agent sorts packages with 98% accuracy.', PoRStatus.Success),
      createReproducibility('rep-21', '2024-06-20', '0xdef...456', 'QmEvidence...21', 'Verified pathfinding on the provided layouts. No collisions observed.', PoRStatus.Waiting),
    ],
    fundingPool: 85000,
    impactScore: 92,
    outputs: MOCK_OUTPUTS_PROJ_10,
    reproducibilityRequirements: REPRODUCIBILITY_TEMPLATES[ResearchDomain.Robotics],
    organization: 'My Personal Research',
    impactAssetOwners: [
        { walletAddress: CURRENT_USER_WALLET, contribution: 'Lead Researcher', ownershipPercentage: 60.0 },
        { walletAddress: '0xabc...123', contribution: 'PoR Verifier', ownershipPercentage: 10.0 },
        { walletAddress: FUNDER_WALLET_2, contribution: 'External Service Provider', ownershipPercentage: 15.0 },
    ],
  },
  {
    id: 'proj-007',
    ownerId: CURRENT_USER_WALLET,
    title: 'Legacy Project: Fluid Dynamics Simulation',
    description: 'An archived project focusing on simulating turbulent flows in complex geometries. The results were published in a top-tier journal.',
    tags: ['Fluid Dynamics', 'Simulation', 'CFD', 'Archived'],
    status: ProjectStatus.Archived,
    domain: ResearchDomain.Simulation,
    cid: 'QmFluid...Sim7',
    hypercertFraction: 0.95,
    startDate: '2022-01-01',
    endDate: '2023-01-01',
    lastOutputDate: '2023-11-15',
    reproducibilities: [
      createReproducibility('rep-8', '2023-12-01', '0xVerifier...4', 'QmRep...7a', 'Archived project reproduction. CFD solver setup confirmed.', PoRStatus.Success),
      createReproducibility('rep-9', '2023-12-10', '0xVerifier...5', 'QmRep...7b', 'Results match published data within a reasonable margin of error.', PoRStatus.Success),
    ],
    fundingPool: 75000,
    impactScore: 95,
    outputs: MOCK_OUTPUTS_PROJ_7,
    reproducibilityRequirements: REPRODUCIBILITY_TEMPLATES[ResearchDomain.Simulation],
    impactAssetOwners: [],
  },
];