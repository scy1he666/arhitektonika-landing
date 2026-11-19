import { useCallback, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
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
    <div className="min-h-screen bg-paper font-body text-ink antialiased">
      <Header />
      <main>
        <Hero />
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
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-2 gap-2 p-2">
          <a
            href="tel:+74951204060"
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-line text-[14px] font-medium text-ink transition-colors duration-150 active:bg-sunk"
          >
            <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
            Позвонить
          </a>
          <a
            href="#calculator"
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-ink text-[14px] font-medium text-paper transition-colors duration-150 active:bg-ink-2"
          >
            Смета
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
