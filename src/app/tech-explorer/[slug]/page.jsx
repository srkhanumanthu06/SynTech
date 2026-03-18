import { TECHNOLOGIES } from "@/data/technologies";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, ArrowLeft, Zap, ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  return TECHNOLOGIES.map((tech) => ({ slug: tech.slug }));
}

export async function generateMetadata({ params }) {
  const p = await params;
  const tech = TECHNOLOGIES.find((t) => t.slug === p.slug);
  if (!tech) return {};
  return {
    title: `${tech.name} — SynTech Technology Explorer`,
    description: tech.description,
  };
}

export default async function TechDetailPage({ params }) {
  const p = await params;
  const tech = TECHNOLOGIES.find((t) => t.slug === p.slug);
  if (!tech) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">

        {/* Back link */}
        <Link href="/tech-explorer" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Technology Explorer
        </Link>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 mb-10">
          <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-10 pointer-events-none`} />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center text-4xl font-bold text-white shadow-xl shrink-0`}>
              {tech.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1 font-medium">{tech.category}</p>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{tech.name}</h1>
              <p className="text-gray-300 text-base leading-relaxed max-w-2xl">{tech.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {tech.tags?.map((tag) => (
                  <span key={tag} className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${tech.gradient} bg-opacity-10 border border-white/10 text-white/80 font-medium`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8">
          <p className="text-gray-300 leading-relaxed text-base">{tech.deepDive?.intro}</p>
        </div>

        {/* Deep Dive Sections */}
        {tech.deepDive?.sections?.length > 0 && (
          <div className="space-y-6 mb-10">
            {tech.deepDive.sections.map((section, i) => (
              <div key={i} className="bg-black/30 border border-white/8 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${tech.gradient}`} />
                  <h2 className="text-white font-bold text-xl">{section.heading}</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* 2-column: Key Features + Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Zap className={`w-5 h-5 text-cyan-400`} /> Key Features
            </h3>
            <ul className="space-y-3">
              {tech.keyFeatures?.map((feature, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-start gap-3 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-secondary" /> SynTech Use Cases
            </h3>
            <ul className="space-y-3">
              {tech.useCases?.map((uc, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-start gap-3 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0" />
                  {uc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Official Docs CTA */}
        <a
          href={tech.docUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-3 w-full h-14 rounded-2xl bg-gradient-to-r ${tech.gradient} text-white font-bold text-base hover:opacity-90 transition-opacity shadow-lg`}
        >
          View Official Documentation <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
