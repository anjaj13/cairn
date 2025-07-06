# Cairn
![image](https://github.com/user-attachments/assets/03c61a16-7669-44ec-8280-617f433ad560)

## 🪄 What is Cairn?

**Cairn** is a protocol and platform for **tracking the reuse and reproduction of scientific outputs in embodied AI, and for retroactively rewarding impactful, reproducible research**.
 
 > By leveraging decentralized storage, smart contracts, and tokenized impact assets, Cairn creates a transparent, incentive-aligned ecosystem for scientists, funders, and the broader research community.

![image](https://github.com/user-attachments/assets/434b93dd-dc2e-4e3f-8c3e-6675f94f93d6)

## **Core Features:**  
  - Tracks reuse and reproduction of scientific outputs  
  - Retroactively rewards impactful work  
  - Ensures transparency and data integrity  
---

## Project Motivation 

Scientific research, especially in embodied AI, faces systemic challenges:  
- **Poor incentives** for long-term, impactful work: Academic recognition and funding systems tend to reward novelty and publication volume over real-world usability, long-term impact, and reproducibility.
- **Reproducibility crisis**: A large portion of published research cannot be reliably reproduced, leading to wasted effort, erosion of trust, and slower scientific progress.  
- **Centralized funding**: Funding decisions are concentrated in a few institutions, which can limit diversity in research agendas and hinder innovation from underrepresented contributors.

![image](https://github.com/user-attachments/assets/4ea511fe-d537-448a-839d-b90f58030858)

---
## How Cairn solves these problems

We combined established concepts with a new system designed to provide verifiable evidence for scientific experiments:

- **Decentralized Storage:** All research data, models, and proofs are stored on IPFS and Filecoin for permanence and verifiability.  
- **Smart Contracts:** Manage project registration and proof of reproducibility, impact evaluation, and funding distribution on-chain.  
- **Proof of Reproducibility (PoR):** Verifiable, cryptographically-secured evidence that experiments have been independently reproduced.  
- **Hypercerts:** Tokenized certificates of impact, representing the value of scientific contributions.  
- **Retroactive Funding:** Rewards are distributed based on actual impact and reproducibility, not just proposals.  
- **DAO Governance:** Community-driven evaluation and funding decisions.


![image](https://github.com/user-attachments/assets/f5b31236-e306-4ef6-a37f-c5e832c3da3b)


## Filecoin integration
Cairn integrates Filecoin technology as a foundational layer to ensure decentralized, secure, and verifiable storage of scientific research data and metadata:

- **Programmable Storage on Filecoin:**  
  Cairn deploys smart contracts on the **Filecoin Virtual Machine (FVM)**, utilizing its WASM-based, Ethereum-compatible environment to orchestrate decentralized storage deals and manage on-chain logic for research data and metadata.

- **Data Storage and Retrieval:**  
  All scientific research outputs—including datasets, machine learning models, benchmarks, and Proofs of Reproducibility (PoRs)—are stored on **IPFS**, with seamless integration to Filecoin’s decentralized storage network via onramps. This ensures **data provenance, immutability, and long-term availability**.

- **On-Chain Interaction with Filecoin Calibration Testnet:**  
  Our smart contracts interact directly with the Filecoin calibration testnet, demonstrating real on-chain programmable storage and retrieval workflows.

- **Crypto-based Payments with USDFC Stablecoin:**  
  Cairn uses the **USDFC stablecoin**, native to Filecoin’s ecosystem, to enable **stable, trustless, and efficient capital flows** between funders and researchers, supporting usage-based billing and retroactive funding models.

- **Programmable Storage Logic:**  
  Leveraging FVM’s unique ability to combine storage primitives with smart contract logic, Cairn implements automated funding distribution, impact evaluation, and Proof of Reproducibility verification on-chain.

- **Developer-First Tooling:**  
  The project integrates Filecoin’s SDKs and tooling to simplify interactions with Filecoin Services, including storage deal orchestration and payment flows.

  
## All Architecture & Integrations

| Component         | Technology / Protocol         | Purpose                                              |
|-------------------|------------------------------|------------------------------------------------------|
| Storage           | **Filecoin**, **IPFS**       | Decentralized, verifiable storage of all research data and metadata |
| Payments          | **USDFC Stablecoin**         | Stable, on-chain funding and rewards                 |
| Smart Contracts   | Filecoin Virtual Machine (FVM) | Transparent, immutable project and funding logic     |
| Impact Assets     | Hypercerts                   | Tokenized, tradable proof of  impact       |


## Platform Features:
- **Create Projects**  
  Register new research efforts on-chain, minting Hypercert impact assets to represent contributions
- **Record Outputs**  
  Publish models, datasets, benchmarks, and Proofs of Reproducibility (PoRs) on IPFS, linked via smart contracts.
- **Verify Reproducibility**  
  Submit PoRs—cryptographically hashed experiment logs, video proofs, and receipts—stored on IPFS and immortalized on-chain.
- **Evaluate Impact**  
  A DAO of scientists, funders, and evaluators votes on each project’s impact tier.
- **Retroactive Funding**  
  Distribute USDFC funds proportionally to impact-asset holders based on verified impact.

---

## How Cairn Works

1. **Project Creation:**  
   Scientists register new research projects using decentralized identity and Proof of Humanity. Project metadata and outputs are stored on IPFS and registered on-chain.

2. **Recording Outputs:**  
   Models, datasets, and results are published and linked to the project.

3. **Proof of Reproducibility (PoR):**  
   Third parties submit cryptographically-secured evidence of successful experiment replication. All PoR data (outputs, logs, receipts, video) is stored on IPFS and linked via smart contracts.

4. **Impact Evaluation:**  
   The Cairn DAO votes on the impact of each project, determining eligibility and tier for retroactive funding.

5. **Retroactive Funding:**  
   Once a project meets criteria (outputs, PoRs, impact evaluation), funds are distributed to contributors based on verified impact.

---

## Demo

- **Whitepaper:** See `Cairn_whitepaper-2.pdf` for a detailed technical and conceptual overview.  
- **Demo Video:** See `Cairn-Video.mp4` for a walkthrough of the platform and its features.

---

## Getting Started

> **Note:** For detailed setup instructions for smart contracts, frontend, and other modules, see the respective subdirectory README files.

### Prerequisites

- Node.js, npm/yarn  
- Filecoin wallet (for testnet/mainnet interaction)  
- IPFS node or gateway access

### Quick Start


