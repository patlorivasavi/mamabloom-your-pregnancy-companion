import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, AlertCircle, RotateCcw } from "lucide-react";

type Severity = "safe" | "monitor" | "danger";

interface SymptomData {
  name: string;
  emoji: string;
  severity: Severity;
  advice: string;
}

const symptoms: SymptomData[] = [
  { name: "Mild Nausea", emoji: "🤢", severity: "safe", advice: "Common in first trimester. Stay hydrated and eat small meals." },
  { name: "Headache", emoji: "🤕", severity: "monitor", advice: "Rest and stay hydrated. If persistent or severe, consult your doctor." },
  { name: "Swelling (hands/face)", emoji: "🫲", severity: "monitor", advice: "Some swelling is normal but rapid swelling may need medical attention." },
  { name: "Bleeding", emoji: "🩸", severity: "danger", advice: "Contact your healthcare provider immediately." },
  { name: "Fatigue", emoji: "😴", severity: "safe", advice: "Normal during pregnancy. Ensure adequate rest and iron intake." },
  { name: "Fever", emoji: "🌡️", severity: "danger", advice: "Fever during pregnancy needs medical evaluation. Contact your doctor." },
  { name: "Reduced Baby Movement", emoji: "👶", severity: "danger", advice: "If you notice reduced movement, contact your doctor immediately." },
  { name: "Back Pain", emoji: "💆", severity: "safe", advice: "Common as your body adjusts. Try prenatal stretches." },
  { name: "Blurred Vision", emoji: "👁️", severity: "danger", advice: "May indicate preeclampsia. Seek immediate medical attention." },
  { name: "Leg Cramps", emoji: "🦵", severity: "safe", advice: "Stay hydrated and stretch before bed. Magnesium may help." },
  { name: "Heartburn", emoji: "🔥", severity: "safe", advice: "Eat smaller meals and avoid spicy food. Sleep elevated." },
  { name: "Severe Abdominal Pain", emoji: "⚡", severity: "danger", advice: "Severe pain needs immediate medical evaluation." },
];

const severityConfig = {
  safe: { label: "Normal Symptom", icon: CheckCircle, bg: "bg-safe\\/10", text: "text-safe", border: "border-safe/20" },
  monitor: { label: "Monitor Closely", icon: AlertTriangle, bg: "bg-warning\\/10", text: "text-warning", border: "border-warning/20" },
  danger: { label: "Consult Doctor", icon: AlertCircle, bg: "bg-danger\\/10", text: "text-danger", border: "border-danger/20" },
};

const SymptomChecker = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
    setShowResults(false);
  };

  const selectedSymptoms = symptoms.filter((s) => selected.includes(s.name));
  const worstSeverity: Severity = selectedSymptoms.some((s) => s.severity === "danger")
    ? "danger"
    : selectedSymptoms.some((s) => s.severity === "monitor")
    ? "monitor"
    : "safe";

  const dangerCombos = checkDangerousCombos(selected);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Smart Symptom Checker</h1>
        <p className="text-muted-foreground mb-8">Select your symptoms and get instant health guidance</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
          {symptoms.map((s) => (
            <button
              key={s.name}
              onClick={() => toggle(s.name)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selected.includes(s.name)
                  ? "border-primary bg-primary/5 shadow-soft"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <span className="text-2xl block mb-1">{s.emoji}</span>
              <span className="text-sm font-medium text-foreground">{s.name}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowResults(true)}
            disabled={selected.length === 0}
            className="px-6 py-3 rounded-xl gradient-bloom text-primary-foreground font-medium shadow-soft hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            Analyze Symptoms ({selected.length})
          </button>
          {selected.length > 0 && (
            <button
              onClick={() => { setSelected([]); setShowResults(false); }}
              className="px-4 py-3 rounded-xl bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              <RotateCcw size={18} />
            </button>
          )}
        </div>

        <AnimatePresence>
          {showResults && selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 space-y-4"
            >
              {/* Overall status */}
              <div className={`p-5 rounded-2xl border ${worstSeverity === "danger" ? "border-destructive/30 bg-destructive/5" : worstSeverity === "monitor" ? "border-accent/30 bg-accent/5" : "border-secondary/30 bg-secondary/5"}`}>
                <div className="flex items-center gap-3 mb-2">
                  {worstSeverity === "danger" ? <AlertCircle className="text-destructive" size={24} /> : worstSeverity === "monitor" ? <AlertTriangle className="text-accent" size={24} /> : <CheckCircle className="text-secondary" size={24} />}
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {worstSeverity === "danger" ? "🔴 Consult Doctor Immediately" : worstSeverity === "monitor" ? "🟡 Monitor Closely" : "🟢 Normal Pregnancy Symptoms"}
                  </h3>
                </div>
                {dangerCombos && <p className="text-sm text-destructive font-medium">{dangerCombos}</p>}
              </div>

              {/* Individual symptoms */}
              {selectedSymptoms.map((s) => {
                const config = severityConfig[s.severity];
                const Icon = config.icon;
                return (
                  <div key={s.name} className={`p-4 rounded-xl border ${config.border} bg-card`}>
                    <div className="flex items-start gap-3">
                      <Icon size={20} className={config.text} />
                      <div>
                        <h4 className="font-medium text-foreground">{s.emoji} {s.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{s.advice}</p>
                        <span className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${config.text} bg-card border ${config.border}`}>
                          {config.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

function checkDangerousCombos(selected: string[]): string | null {
  if (selected.includes("Headache") && selected.includes("Blurred Vision")) {
    return "⚠️ Severe headache + blurred vision may indicate preeclampsia risk. Please consult a doctor immediately.";
  }
  if (selected.includes("Swelling (hands/face)") && selected.includes("Headache")) {
    return "⚠️ Swelling with headache could be a sign of preeclampsia. Monitor closely and consult your doctor.";
  }
  if (selected.includes("Bleeding") && selected.includes("Severe Abdominal Pain")) {
    return "⚠️ Bleeding with severe pain requires immediate emergency medical attention.";
  }
  return null;
}

export default SymptomChecker;
