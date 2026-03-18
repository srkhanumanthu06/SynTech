import Link from "next/link";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";
import { SynTechLogo } from "@/components/ui/SynTechLogo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50 pt-16 pb-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <SynTechLogo className="h-10 w-auto group-hover:scale-105 transition-transform" />
              <span className="text-xl font-bold tracking-tight text-white">
                SynTech
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering enterprises with next-generation artificial intelligence, cloud infrastructure, and modern digital transformation solutions.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-all text-gray-400">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-all text-gray-400">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-all text-gray-400">
                <Github className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-3">
              {["AI Solutions", "Cloud Transformation", "Enterprise Software", "Data Analytics"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 text-sm hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {["About Us", "Careers", "Blog"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 text-sm hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@syntech.com" className="flex items-center gap-2 text-gray-400 text-sm hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  hello@syntech.com
                </a>
              </li>
              <li className="text-gray-400 text-sm">
                123 Innovation Drive,<br />Tech Valley, CA 94043
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SynTech Consulting. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
