import { useCallback, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services, { type ServiceId } from "./components/Services";
import Calculator from "./components/Calculator";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import Guarantees from "./components/Guarantees";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import LeadForm from "./components/LeadForm";
import Footer from "./components/Footer";

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function App() {
  const [calcType, setCalcType] = useState<ServiceId>("capital");
  const [calcSummary, setCalcSummary] = useState("");

  const handleCalcRequest = useCallback((service: ServiceId) => {
    setCalcType(service);
    scrollToId("calculator");
  }, []);

  const handleEstimate = useCallback((summary: string) => {
    setCalcSummary(summary);
    scrollToId("lead");
  }, []);

  return (
    <div className="noise min-h-screen bg-paper font-body text-ink antialiased">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services onCalc={handleCalcRequest} />
        <Calculator type={calcType} onTypeChange={setCalcType} onSubmit={handleEstimate} />
        <Portfolio />
        <Process />
        <Guarantees />
        <Reviews />
        <Faq />
        <LeadForm prefill={calcSummary} />
      </main>
      <Footer />

      {/* sticky mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-ink/15 bg-paper/95 backdrop-blur-xl" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="grid grid-cols-2 gap-2 p-2">
          <a
            href="tel:+74951204060"
            className="flex items-center justify-center gap-2 rounded-xl border border-ink/15 py-3.5 font-display text-sm font-extrabold text-ink active:scale-[0.98]"
          >
            <Phone size={17} />
            Позвонить
          </a>
          <a
            href="#calculator"
            className="flex items-center justify-center gap-2 rounded-xl bg-copper py-3.5 font-display text-sm font-extrabold text-ink active:scale-[0.98]"
          >
            Смета <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
