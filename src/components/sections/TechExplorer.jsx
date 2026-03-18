"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ChevronRight } from "lucide-react";
import { TECHNOLOGIES } from "@/data/technologies";

const CATEGORIES = ["All", "AI / ML", "Cloud", "Frontend", "Backend", "Database", "DevOps"];

const _PLACEHOLDER = [
  // AI / ML
  {
    name: "Gemini", category: "AI / ML", icon: "✦", gradient: "from-blue-500 to-cyan-400", tags: ["LLM", "Vision", "API"],
    description: "Google's most capable multimodal LLM, powering our AI consultant, resume analyzer, and project estimator tools.",
    details: "Gemini 2.0 Flash enables low-latency, high-quality text and vision responses at enterprise scale. SynTech uses it as the backbone for all client-facing AI tools.",
    useCases: ["AI Consulting Chatbot", "Multimodal resume parsing", "Structured JSON generation for estimators"],
    keyFeatures: ["Multimodal input (text + image)", "1M token context window", "Structured JSON output mode", "Low-latency Flash variant"],
    docUrl: "https://ai.google.dev/gemini-api/docs",
  },
  {
    name: "TensorFlow", category: "AI / ML", icon: "⬡", gradient: "from-orange-500 to-amber-400", tags: ["Deep Learning", "Python"],
    description: "Open-source deep learning framework for training and deploying large-scale enterprise AI models.",
    details: "TensorFlow's ecosystem (Keras, TF Lite, TF Serving) enables SynTech to go from training to production deployment across cloud and edge devices seamlessly.",
    useCases: ["Custom model training for enterprise AI", "Model serving via TF Serving", "Edge inference via TF Lite"],
    keyFeatures: ["Distributed training support", "Keras high-level API", "Mobile deployment (TF Lite)", "TensorBoard visualization"],
    docUrl: "https://www.tensorflow.org/docs",
  },
  {
    name: "PyTorch", category: "AI / ML", icon: "🔥", gradient: "from-red-500 to-orange-400", tags: ["NLP", "CV"],
    description: "Dynamic computation graph ML framework preferred in research for NLP and computer vision applications.",
    details: "PyTorch's dynamic graph execution allows rapid prototyping and experimentation. SynTech uses it for R&D workloads and fine-tuning foundation models.",
    useCases: ["LLM fine-tuning", "Computer vision pipelines", "Research prototyping"],
    keyFeatures: ["Dynamic computation graphs", "Native CUDA support", "Hugging Face integration", "TorchScript for production"],
    docUrl: "https://pytorch.org/docs",
  },
  {
    name: "LangChain", category: "AI / ML", icon: "⛓", gradient: "from-emerald-500 to-teal-400", tags: ["LLM Chains", "Agents"],
    description: "Orchestration framework for composing LLMs with tools, memory, and external data sources into intelligent agents.",
    details: "LangChain handles the complex wiring of prompts, retrieval systems, tool use, and memory — enabling SynTech to build context-aware RAG pipelines and autonomous AI agents.",
    useCases: ["RAG-powered knowledge bases", "Autonomous agent workflows", "Multi-step LLM pipelines"],
    keyFeatures: ["Agent & tool use abstractions", "Vector store integrations", "Memory management", "LangSmith observability"],
    docUrl: "https://docs.langchain.com",
  },
  {
    name: "Hugging Face", category: "AI / ML", icon: "🤗", gradient: "from-yellow-500 to-amber-400", tags: ["Transformers", "NLP"],
    description: "The AI model hub for accessing, fine-tuning, and deploying thousands of open-source transformer models.",
    details: "Hugging Face's `transformers` library gives SynTech instant access to state-of-the-art pre-trained models for NLP, vision, and audio without training from scratch.",
    useCases: ["Text classification and summarization", "Named entity recognition", "Custom fine-tuning with AutoTrain"],
    keyFeatures: ["80,000+ pre-trained models", "AutoTrain for no-code fine-tuning", "Inference API", "Spaces for model demos"],
    docUrl: "https://huggingface.co/docs",
  },
  // Cloud
  {
    name: "AWS", category: "Cloud", icon: "▲", gradient: "from-amber-500 to-orange-400", tags: ["EC2", "S3", "Lambda"],
    description: "Primary cloud infrastructure provider powering compute, storage, and serverless workloads for SynTech's enterprise clients.",
    details: "AWS's breadth of over 200 managed services gives SynTech unmatched flexibility to architect solutions from simple Lambda functions to complex multi-region microservices.",
    useCases: ["Serverless APIs via Lambda", "Large file storage via S3", "AI model hosting via SageMaker"],
    keyFeatures: ["Global infrastructure (25+ regions)", "SageMaker for ML", "Aurora serverless database", "CloudWatch observability"],
    docUrl: "https://docs.aws.amazon.com",
  },
  {
    name: "Google Cloud", category: "Cloud", icon: "◉", gradient: "from-blue-500 to-indigo-400", tags: ["Vertex AI", "BigQuery"],
    description: "Enterprise cloud platform with best-in-class data analytics and AI services tightly integrated with Google's AI research.",
    details: "GCP's Vertex AI platform enables end-to-end ML pipelines while BigQuery handles petabyte-scale analytics, making it SynTech's go-to for data-intensive AI products.",
    useCases: ["Petabyte analytics with BigQuery", "MLOps with Vertex AI", "Real-time streaming with Pub/Sub"],
    keyFeatures: ["Vertex AI for end-to-end MLOps", "BigQuery ML (in-database ML)", "Dataflow stream processing", "Cloud Run for containers"],
    docUrl: "https://cloud.google.com/docs",
  },
  {
    name: "Azure", category: "Cloud", icon: "⬟", gradient: "from-blue-600 to-sky-400", tags: ["Enterprise", "Hybrid"],
    description: "Microsoft's enterprise cloud platform for seamless integration with existing corporate infrastructure and compliance requirements.",
    details: "Azure's deep integration with Active Directory, Office 365, and enterprise compliance frameworks makes it the preferred choice for Fortune 500 clients requiring hybrid cloud architectures.",
    useCases: ["Enterprise SSO via Active Directory", "Azure AI cognitive services", "Hybrid on-prem/cloud deployments"],
    keyFeatures: ["Azure OpenAI Service", "Entra ID (Active Directory)", "Arc for hybrid cloud", "99.99% SLA guarantees"],
    docUrl: "https://docs.microsoft.com/azure",
  },
  {
    name: "Vercel", category: "Cloud", icon: "▼", gradient: "from-gray-600 to-gray-400", tags: ["Edge", "Next.js", "CDN"],
    description: "Zero-config deployment platform with a global edge network optimized for Next.js and React applications.",
    details: "Vercel's Edge Network runs frontend code in 50+ PoPs worldwide, reducing TTFB to under 10ms. SynTech uses Vercel for all client-facing Next.js deployments.",
    useCases: ["Zero-downtime Next.js deployments", "Edge middleware for auth", "Instant preview deployments per PR"],
    keyFeatures: ["Global Edge Network (50+ regions)", "Serverless & Edge Functions", "ISR (Incremental Static Regeneration)", "Analytics built-in"],
    docUrl: "https://vercel.com/docs",
  },
  {
    name: "Docker", category: "Cloud", icon: "🐳", gradient: "from-sky-500 to-blue-400", tags: ["Containers", "DevOps"],
    description: "Industry-standard containerization platform ensuring consistent, portable application environments from dev to production.",
    details: "Docker containers encapsulate all dependencies, eliminating 'works on my machine' problems. Every SynTech service ships as a Docker image with a multi-stage build for minimal image sizes.",
    useCases: ["Containerizing microservices", "Multi-stage builds for CI/CD", "Local dev environment parity"],
    keyFeatures: ["Layered filesystem for fast builds", "Docker Compose for local orchestration", "Docker Scout security scanning", "Registry image caching"],
    docUrl: "https://docs.docker.com",
  },
  {
    name: "Kubernetes", category: "Cloud", icon: "⎈", gradient: "from-blue-600 to-indigo-500", tags: ["Orchestration", "Scaling"],
    description: "Production-grade container orchestration system for auto-scaling, self-healing, and zero-downtime deployments.",
    details: "K8s manages the entire lifecycle of containerized applications — from rolling deployments and auto-healing to horizontal pod autoscaling under traffic spikes.",
    useCases: ["Auto-scaling stateless microservices", "Blue-green production deployments", "Cluster-wide secrets management"],
    keyFeatures: ["Horizontal Pod Autoscaler", "Self-healing via liveness probes", "Helm chart packaging", "RBAC for multi-tenant clusters"],
    docUrl: "https://kubernetes.io/docs",
  },
  // Frontend
  {
    name: "Next.js", category: "Frontend", icon: "▶", gradient: "from-gray-700 to-gray-500", tags: ["React", "SSR", "Edge"],
    description: "The React framework for production — with server-side rendering, App Router, and Edge Functions built-in.",
    details: "Next.js 16's App Router enables nested layouts, Server Components, and streaming, making it SynTech's default framework for all web products requiring SEO and performance.",
    useCases: ["Server-rendered marketing sites", "Full-stack API routes", "Dashboard apps with streaming"],
    keyFeatures: ["React Server Components", "Turbopack bundler", "Edge Runtime support", "Automatic code splitting"],
    docUrl: "https://nextjs.org/docs",
  },
  {
    name: "React", category: "Frontend", icon: "⚛", gradient: "from-cyan-500 to-blue-400", tags: ["Components", "Hooks"],
    description: "The declarative, component-based UI library that is the foundation of SynTech's entire frontend architecture.",
    details: "React 19's concurrent rendering and useTransition hooks allow SynTech to build UIs that feel instantaneous even when handling complex data interactions.",
    useCases: ["Reusable component design systems", "Real-time dashboard UIs", "Complex state management with Context"],
    keyFeatures: ["Concurrent rendering (React 19)", "Server Components", "useTransition for non-blocking UI", "Strict Mode for bug detection"],
    docUrl: "https://react.dev",
  },
  {
    name: "TypeScript", category: "Frontend", icon: "TS", gradient: "from-blue-500 to-blue-400", tags: ["Types", "Safety"],
    description: "Statically typed JavaScript superset that catches bugs at compile-time and enables rich IDE auto-completion.",
    details: "TypeScript's type system enforces contracts between components and APIs, dramatically reducing runtime errors in large enterprise codebases maintained by multiple teams.",
    useCases: ["Type-safe API client generation", "Enforced component prop contracts", "Large team codebases"],
    keyFeatures: ["Structural type system", "Discriminated unions", "Template literal types", "Project references for monorepos"],
    docUrl: "https://www.typescriptlang.org/docs",
  },
  {
    name: "Tailwind CSS", category: "Frontend", icon: "🌊", gradient: "from-teal-500 to-cyan-400", tags: ["Utility", "Design System"],
    description: "Utility-first CSS framework that enables building entirely custom designs without writing a single line of custom CSS.",
    details: "Tailwind's Just-in-Time compiler generates only the CSS classes used, keeping bundle sizes tiny. SynTech's entire design system is built on Tailwind with custom CSS variables.",
    useCases: ["Rapid UI prototyping", "Consistent design token system", "Dark mode theming"],
    keyFeatures: ["JIT compilation (< 10kb CSS)", "Dark mode support", "Arbitrary value syntax", "v4 CSS-native variables"],
    docUrl: "https://tailwindcss.com/docs",
  },
  {
    name: "Framer Motion", category: "Frontend", icon: "◈", gradient: "from-purple-500 to-pink-400", tags: ["Animation", "Physics"],
    description: "Production-ready animation library for React with support for gestures, layout animations, and physics-based springs.",
    details: "Framer Motion's layout animations and AnimatePresence handle complex UI transitions that would take weeks to build manually, powering every animation on this site.",
    useCases: ["Page transition animations", "Drag-and-drop interfaces", "Staggered list reveals"],
    keyFeatures: ["Layout animations", "AnimatePresence for exit animations", "Spring physics engine", "Scroll-linked animations"],
    docUrl: "https://www.framer.com/motion",
  },
  // Backend
  {
    name: "Node.js", category: "Backend", icon: "⬡", gradient: "from-green-500 to-emerald-400", tags: ["Real-time", "API"],
    description: "Asynchronous, event-driven JavaScript runtime for building high-throughput APIs and real-time applications.",
    details: "Node's non-blocking I/O model handles thousands of concurrent connections with minimal overhead, making it ideal for WebSocket, API gateway, and streaming services.",
    useCases: ["REST and GraphQL API servers", "Real-time WebSocket servers", "Microservice API gateways"],
    keyFeatures: ["Non-blocking event loop", "npm ecosystem (2M+ packages)", "Worker threads for CPU tasks", "Native ESM module support"],
    docUrl: "https://nodejs.org/docs",
  },
  {
    name: "Python", category: "Backend", icon: "🐍", gradient: "from-blue-500 to-yellow-400", tags: ["AI/ML", "Data"],
    description: "The lingua franca of data science and AI — used for ML pipelines, data engineering, and scripting workflows.",
    details: "Python's rich ecosystem (NumPy, Pandas, Scikit-learn, FastAPI) makes it indispensable for SynTech's data engineering and AI model development teams.",
    useCases: ["Data pipeline orchestration", "ML model training and evaluation", "ETL and data transformation scripts"],
    keyFeatures: ["NumPy/Pandas for data manipulation", "Asyncio for async services", "Type hints for safety", "Rich stdlib"],
    docUrl: "https://docs.python.org/3",
  },
  {
    name: "FastAPI", category: "Backend", icon: "⚡", gradient: "from-teal-500 to-green-400", tags: ["REST", "Performance"],
    description: "High-performance Python API framework with automatic OpenAPI/Swagger documentation and native async support.",
    details: "FastAPI is among the fastest Python frameworks available (on par with NodeJS). SynTech uses it for ML model serving endpoints and data microservices that need Python's ecosystem.",
    useCases: ["ML model inference endpoints", "Data microservices with Pydantic validation", "Auto-generated Swagger API docs"],
    keyFeatures: ["Automatic OpenAPI generation", "Pydantic v2 validation", "Native async/await", "Dependency injection system"],
    docUrl: "https://fastapi.tiangolo.com",
  },
  {
    name: "GraphQL", category: "Backend", icon: "◈", gradient: "from-pink-500 to-rose-400", tags: ["API", "Schema"],
    description: "Declarative query language for APIs that lets frontend clients specify exactly the data shape they need.",
    details: "GraphQL eliminates over-fetching and under-fetching by letting clients drive the query shape. SynTech implements GraphQL for data-rich dashboard applications.",
    useCases: ["Complex data relationship queries", "Real-time subscriptions via WebSocket", "Federation across microservices"],
    keyFeatures: ["Type-safe schema-first design", "Real-time subscriptions", "Apollo Federation for microservices", "Introspection & playground"],
    docUrl: "https://graphql.org/learn",
  },
  // Database
  {
    name: "PostgreSQL", category: "Database", icon: "🐘", gradient: "from-blue-600 to-indigo-500", tags: ["Relational", "ACID"],
    description: "The world's most advanced open-source relational database with full ACID compliance and powerful JSON extensions.",
    details: "PostgreSQL's JSONB, PostGIS for geospatial data, and pgvector for AI embeddings make it a single database capable of handling structured, semi-structured, and vector data.",
    useCases: ["Core transactional application data", "Vector similarity search with pgvector", "Geospatial queries with PostGIS"],
    keyFeatures: ["JSONB document storage", "pgvector for AI embeddings", "Full-text search", "Row-level security"],
    docUrl: "https://www.postgresql.org/docs",
  },
  {
    name: "MongoDB", category: "Database", icon: "◉", gradient: "from-green-500 to-emerald-400", tags: ["NoSQL", "Flexible"],
    description: "Document-oriented database designed for flexible schemas, horizontal scaling, and developer productivity.",
    details: "MongoDB's document model maps naturally to JSON API payloads, removing the impedance mismatch between code and data. Atlas's global clusters enable multi-region active-active replication.",
    useCases: ["Content management systems", "Product catalog storage", "User activity event logs"],
    keyFeatures: ["Flexible document schema", "Atlas global clusters", "Aggregation pipeline", "Change streams for real-time"],
    docUrl: "https://www.mongodb.com/docs",
  },
  {
    name: "Redis", category: "Database", icon: "⬡", gradient: "from-red-500 to-rose-400", tags: ["Cache", "Real-time"],
    description: "In-memory data structure store used for caching, session management, rate limiting, and pub/sub messaging.",
    details: "Redis's sub-millisecond latency makes it indispensable for caching expensive database queries, storing user sessions, and powering real-time leaderboards and notification systems.",
    useCases: ["API response caching", "Distributed rate limiting", "Real-time pub/sub for chat/events"],
    keyFeatures: ["Sub-millisecond latency", "Pub/Sub messaging", "Sorted sets for leaderboards", "TTL-based key expiry"],
    docUrl: "https://redis.io/docs",
  },
  {
    name: "Pinecone", category: "Database", icon: "🌲", gradient: "from-teal-500 to-emerald-400", tags: ["Vector", "AI", "RAG"],
    description: "Purpose-built vector database for storing and searching high-dimensional embeddings for AI and semantic search.",
    details: "Pinecone handles the vector index layer in RAG pipelines, enabling semantic similarity search across millions of document embeddings with single-digit millisecond query latency.",
    useCases: ["RAG knowledge base retrieval", "Semantic product recommendations", "Duplicate detection at scale"],
    keyFeatures: ["ANN search (< 10ms)", "Metadata filtering", "Namespaces for multi-tenancy", "Serverless index auto-scaling"],
    docUrl: "https://docs.pinecone.io",
  },
  // DevOps
  {
    name: "GitHub Actions", category: "DevOps", icon: "⚙", gradient: "from-gray-600 to-gray-400", tags: ["CI/CD", "Automation"],
    description: "Native GitHub CI/CD automation for building, testing, and deploying applications on every code commit.",
    details: "GitHub Actions' matrix builds and reusable workflows allow SynTech to maintain consistent CI pipelines across all client repositories with minimal configuration overhead.",
    useCases: ["Automated test suites on every PR", "Multi-environment deployment pipelines", "Scheduled data pipeline jobs"],
    keyFeatures: ["Matrix builds for parallel testing", "Reusable workflow templates", "OIDC for keyless cloud auth", "2000 free minutes/month"],
    docUrl: "https://docs.github.com/en/actions",
  },
  {
    name: "Terraform", category: "DevOps", icon: "◆", gradient: "from-violet-500 to-purple-400", tags: ["IaC", "Cloud"],
    description: "Infrastructure as Code tool for declaratively provisioning and managing cloud resources across any provider.",
    details: "Terraform's plan/apply workflow gives SynTech full visibility into infrastructure changes before they're applied, preventing accidental resource deletions in production.",
    useCases: ["Multi-cloud infrastructure provisioning", "Disaster recovery environment cloning", "Drift detection and enforcement"],
    keyFeatures: ["Provider-agnostic (AWS, GCP, Azure)", "State management for drift detection", "Terraform Cloud for team workflows", "Module registry"],
    docUrl: "https://developer.hashicorp.com/terraform/docs",
  },
  {
    name: "Prometheus", category: "DevOps", icon: "🔥", gradient: "from-orange-500 to-red-400", tags: ["Monitoring", "Metrics"],
    description: "Pull-based metrics collection system for monitoring service health, alerting, and performance benchmarking.",
    details: "Prometheus's multi-dimensional data model and PromQL query language allow SynTech to build precise alerting rules — catching issues before clients notice them.",
    useCases: ["Service latency and error rate tracking", "Resource utilization alerting", "SLO/SLA compliance monitoring"],
    keyFeatures: ["Pull-based metrics scraping", "PromQL for complex queries", "AlertManager for notifications", "Service discovery"],
    docUrl: "https://prometheus.io/docs",
  },
  {
    name: "Grafana", category: "DevOps", icon: "📊", gradient: "from-orange-500 to-amber-400", tags: ["Dashboards", "Observability"],
    description: "Observability platform for visualizing metrics, logs, and traces from Prometheus, Loki, and other data sources.",
    details: "Grafana dashboards give SynTech's SRE team a single-pane-of-glass view across all client infrastructure, from latency p99 percentiles to business KPIs.",
    useCases: ["Real-time infrastructure dashboards", "Log aggregation with Loki", "Business metrics visualization"],
    keyFeatures: ["50+ data source plugins", "Alerting with notification routing", "Loki for log aggregation", "Tempo for distributed tracing"],
    docUrl: "https://grafana.com/docs",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 },
};

function TechModal({ tech, onClose }) {
  if (!tech) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/15 rounded-3xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header gradient bar */}
          <div className={`h-1.5 w-full bg-gradient-to-r ${tech.gradient}`} />

          <div className="p-8">
            {/* Title row */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                  {tech.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">{tech.name}</h2>
                  <span className="text-xs text-gray-500 font-medium">{tech.category}</span>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">{tech.details}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Key Features */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" /> Key Features
                </h3>
                <ul className="space-y-2">
                  {tech.keyFeatures?.map((feature, i) => (
                    <li key={i} className="text-gray-400 text-xs flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* SynTech Use Cases */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-secondary" /> SynTech Use Cases
                </h3>
                <ul className="space-y-2">
                  {tech.useCases?.map((uc, i) => (
                    <li key={i} className="text-gray-400 text-xs flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                      {uc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tech.tags?.map((tag) => (
                <span key={tag} className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${tech.gradient} bg-opacity-10 border border-white/10 text-white/80 font-medium`}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Official Docs Link */}
            <a
              href={tech.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-gradient-to-r ${tech.gradient} text-white font-bold text-sm hover:opacity-90 transition-opacity`}
            >
              View Official Documentation <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function TechExplorer() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return TECHNOLOGIES.filter((tech) => {
      const matchesCategory = activeCategory === "All" || tech.category === activeCategory;
      const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach(cat => {
      counts[cat] = cat === "All" ? TECHNOLOGIES.length : TECHNOLOGIES.filter(t => t.category === cat).length;
    });
    return counts;
  }, []);

  return (
    <section className="container mx-auto px-6 md:px-12">
        <SectionHeader
          highlight="Technology Explorer"
          title="Our Technology Universe"
          subtitle="Explore the full constellation of cutting-edge tools and frameworks powering SynTech's enterprise solutions."
        />

        <div className="max-w-7xl mx-auto mb-10 flex flex-col gap-6">
          <div className="relative max-w-md mx-auto w-full">
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${activeCategory === cat
                  ? "bg-primary text-black border-primary shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                  : "bg-white/5 text-gray-400 border-white/10 hover:border-primary/30 hover:text-white"}`}
              >
                {cat}
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${activeCategory === cat ? "bg-black/20 text-black" : "bg-white/10 text-gray-500"}`}>
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20 text-gray-500">
                No technologies found for "{searchQuery}"
              </motion.div>
            ) : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)] flex flex-col cursor-pointer"
                  >
                    <Link href={`/tech-explorer/${tech.slug}`} className="p-5 flex flex-col h-full w-full">
                      <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl pointer-events-none`} />

                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center text-lg font-bold text-white mb-4 shadow-lg`}>
                        {tech.icon}
                      </div>
                      <div className="absolute top-4 right-4 text-xs text-gray-600 font-medium">{tech.category}</div>

                      <h3 className="text-white font-bold text-base mb-1.5">{tech.name}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2 group-hover:text-gray-300 flex-1">{tech.description}</p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tech.tags.map((tag) => (
                          <span key={tag} className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${tech.gradient} bg-opacity-10 text-white/70 border border-white/10`}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className={`mt-auto w-full py-2 rounded-xl text-xs font-bold border border-white/10 text-white/60 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/10 transition-all flex items-center justify-center gap-1.5`}>
                        Learn More <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Showing <span className="text-primary font-semibold">{filtered.length}</span> of <span className="text-white font-semibold">{TECHNOLOGIES.length}</span> technologies
            </p>
          </motion.div>
        </div>
      </section>
  );
}
