import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";

import { TechStack } from "@/components/sections/TechStack";
import { HiringAssistant } from "@/components/sections/HiringAssistant";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Capabilities />
      <Services />
      <Industries />

      <TechStack />
      <HiringAssistant />
      <Contact />
    </>
  );
}
