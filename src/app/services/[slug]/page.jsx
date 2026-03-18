import { SERVICES } from "@/data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Layers } from "lucide-react";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const p = await params;
  const service = SERVICES.find((s) => s.slug === p.slug);
  if (!service) return {};
  return {
    title: `${service.title} — SynTech Enterprise Solutions`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }) {
  const p = await params;
  const service = SERVICES.find((s) => s.slug === p.slug);
  if (!service) notFound();

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${service.gradient} opacity-5 blur-[150px] pointer-events-none rounded-full`} />
      <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br ${service.gradient} opacity-5 blur-[150px] pointer-events-none rounded-full`} />

      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        
        {/* Navigation */}
        <Link 
          href="/#services" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all services
        </Link>

        {/* Hero Area */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
          <div className={`w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-2xl`}>
            {/* Clone the icon element and make it larger if possible, otherwise just render it */}
            <div className="scale-[1.5] text-white brightness-200 drop-shadow-md">
              {service.icon}
            </div>
          </div>
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-4">
              Enterprise Service Line
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              {service.title}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              {service.overview}
            </p>
          </div>
        </div>

        {/* Content Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          
          {/* Key Offerings Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Layers className="w-6 h-6 text-primary" /> Key Offerings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.keyOfferings.map((offering, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-1 shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-gray-300 font-medium leading-relaxed">{offering}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact / Why SynTech Block */}
            <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-8 md:p-10">
              <h3 className="text-xl font-bold text-white mb-4">The SynTech Advantage</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Our architects don't just write code—they build durable, scalable pillars for your business. 
                When executing <strong>{service.title}</strong> initiatives, we guarantee enterprise-grade security, zero-downtime cutovers, and deeply integrated handoffs to your internal teams.
              </p>
            </div>
          </div>

          {/* Tech Stack Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#0f0f13] border border-white/10 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`} /> Primary Tech Stack
              </h3>
              <div className="flex flex-col gap-3">
                {service.techStack.map((tech, idx) => (
                  <div key={idx} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium text-sm flex items-center justify-between group">
                    {tech}
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Sidebar */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3">Ready to scale?</h3>
              <p className="text-gray-400 text-sm mb-6">Discuss your {service.title} requirements with our architecture team.</p>
              <Link 
                href="/book-consultation"
                className="flex items-center justify-center w-full py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                Book a Consultation
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
