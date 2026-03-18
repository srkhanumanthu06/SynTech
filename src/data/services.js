import { Bot, Database, Lock, Globe2, Smartphone, TerminalSquare } from "lucide-react";

export const SERVICES = [
  {
    title: "Generative AI Integration",
    slug: "generative-ai",
    description: "Incorporate LLMs and gen-AI into your existing products to enhance user experience and automate content generation.",
    icon: <Bot className="w-6 h-6 text-primary" />,
    gradient: "from-blue-500 to-cyan-400",
    overview: "We deploy enterprise-grade Generative AI models into your existing applications to automate workflows, generate intelligent insights, and create natural language interfaces for your customers.",
    keyOfferings: [
      "Custom LLM Fine-tuning (Llama 3, Mistral, Command R)",
      "Retrieval-Augmented Generation (RAG) Architecture",
      "AI Agent Swarms for Task Automation",
      "Semantic Search and Vector Database Deployment"
    ],
    techStack: ["LangChain", "Pinecone", "OpenAI / HuggingFace", "Next.js"]
  },
  {
    title: "Data Migration & Lakes",
    slug: "data-migration",
    description: "Securely migrate legacy databases to modern, highly-queriable data lakes with automated ETL pipelines.",
    icon: <Database className="w-6 h-6 text-primary" />,
    gradient: "from-emerald-500 to-teal-400",
    overview: "Transform your data infrastructure. We migrate terabytes of legacy data into scalable, modern data lakes, setting up robust ETL pipelines that deliver real-time analytics to your BI tools.",
    keyOfferings: [
      "Zero-downtime Database Migration",
      "Apache Kafka Event Streaming",
      "Data Warehouse Design (Snowflake, BigQuery)",
      "Real-time Dashboarding and Analytics"
    ],
    techStack: ["Snowflake", "dbt", "Apache Airflow", "AWS Redshift"]
  },
  {
    title: "Cybersecurity & Compliance",
    slug: "cybersecurity",
    description: "Zero-trust architecture implementation and compliance auditing for enterprise security.",
    icon: <Lock className="w-6 h-6 text-primary" />,
    gradient: "from-red-500 to-orange-400",
    overview: "Protect your enterprise from sophisticated threats. We implement Zero-Trust models across your entire infrastructure, conduct intensive penetration testing, and ensure SOC2 compliance.",
    keyOfferings: [
      "Zero-Trust Network Architecture",
      "Automated Threat Detection and Response",
      "SOC2, HIPAA, and GDPR Compliance Audits",
      "Identity and Access Management (IAM)"
    ],
    techStack: ["CrowdStrike", "Okta", "AWS Shield", "Wazuh"]
  },
  {
    title: "Web3 & Blockchain",
    slug: "web3",
    description: "Smart contract development and decentralized application architecture for modern scale.",
    icon: <Globe2 className="w-6 h-6 text-primary" />,
    gradient: "from-purple-500 to-violet-400",
    overview: "Build trustless, decentralized applications. Our blockchain architects design secure smart contracts and high-throughput Web3 infrastructure for finance, supply chain, and digital identity.",
    keyOfferings: [
      "EVM-compatible Smart Contract Auditing",
      "Decentralized Application (dApp) Frontends",
      "Tokenomics Design and Implementation",
      "Private Blockchain Networks"
    ],
    techStack: ["Solidity", "Hardhat", "ethers.js", "Polygon"]
  },
  {
    title: "Mobile App Ecosystems",
    slug: "mobile",
    description: "Cross-platform mobile applications using React Native and Flutter with native performance.",
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    gradient: "from-pink-500 to-rose-400",
    overview: "Capture your mobile audience with blazing fast, natively-compiling applications. We build cross-platform apps that feel perfectly native on both iOS and Android, sharing 95% of their codebase.",
    keyOfferings: [
      "React Native & Expo Development",
      "Flutter & Dart Applications",
      "Mobile CI/CD via Fastlane",
      "Offline-first Sync Architectures"
    ],
    techStack: ["React Native", "Expo", "Flutter", "Swift/Kotlin"]
  },
  {
    title: "DevOps & MLOps",
    slug: "devops",
    description: "Automated CI/CD pipelines and model lifecycle management for continuous deployment.",
    icon: <TerminalSquare className="w-6 h-6 text-primary" />,
    gradient: "from-amber-500 to-yellow-400",
    overview: "Ship code fearlessly. We build the infrastructure that allows your engineering teams to deploy thousands of times a day safely, while monitoring ML model drift in production.",
    keyOfferings: [
      "Kubernetes Orchestration & Helm Charts",
      "Continuous Integration / Continuous Deployment",
      "Infrastructure as Code (Terraform)",
      "ML Model Drift Monitoring (MLOps)"
    ],
    techStack: ["Docker", "Kubernetes", "GitHub Actions", "Terraform"]
  }
];
