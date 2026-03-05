import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Heart, Wind, Footprints } from "lucide-react";

type Trimester = 1 | 2 | 3;

interface Exercise {
  name: string;
  duration: string;
  icon: React.ReactNode;
  description: string;
  benefits: string[];
  trimesters: Trimester[];
  safety: "safe" | "caution";
}

const exercises: Exercise[] = [
  { name: "Walking", duration: "20-30 min", icon: <Footprints size={20} />, description: "Gentle walking at a comfortable pace", benefits: ["Improves circulation", "Boosts mood", "Low impact"], trimesters: [1, 2, 3], safety: "safe" },
  { name: "Prenatal Yoga", duration: "20-30 min", icon: <Heart size={20} />, description: "Gentle yoga poses designed for pregnancy", benefits: ["Flexibility", "Stress relief", "Better sleep"], trimesters: [1, 2, 3], safety: "safe" },
  { name: "Swimming", duration: "20-30 min", icon: <Wind size={20} />, description: "Low-impact water exercises", benefits: ["No joint stress", "Full body workout", "Cooling"], trimesters: [1, 2, 3], safety: "safe" },
  { name: "Pelvic Floor Exercises", duration: "10-15 min", icon: <Dumbbell size={20} />, description: "Kegel exercises to strengthen pelvic muscles", benefits: ["Birth preparation", "Prevents incontinence"], trimesters: [1, 2, 3], safety: "safe" },
  { name: "Pelvic Tilts", duration: "10 min", icon: <Dumbbell size={20} />, description: "Gentle tilting to relieve back pain", benefits: ["Back pain relief", "Core strength"], trimesters: [2, 3], safety: "safe" },
  { name: "Breathing Exercises", duration: "10-15 min", icon: <Wind size={20} />, description: "Deep breathing and relaxation techniques", benefits: ["Labor preparation", "Reduces anxiety", "Better oxygen flow"], trimesters: [1, 2, 3], safety: "safe" },
  { name: "Light Stretching", duration: "15 min", icon: <Heart size={20} />, description: "Gentle full-body stretches", benefits: ["Reduces cramps", "Improves flexibility"], trimesters: [1, 2, 3], safety: "safe" },
  { name: "Stationary Cycling", duration: "15-20 min", icon: <Dumbbell size={20} />, description: "Low resistance cycling", benefits: ["Cardio fitness", "Low impact"], trimesters: [1, 2], safety: "caution" },
];

const Exercises = () => {
  const [trimester, setTrimester] = useState<Trimester>(1);

  const filtered = exercises.filter((e) => e.trimesters.includes(trimester));

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Safe Exercise Guide</h1>
        <p className="text-muted-foreground mb-6">Stay active with trimester-appropriate exercises</p>

        <div className="flex gap-3 mb-8">
          {([1, 2, 3] as Trimester[]).map((t) => (
            <button
              key={t}
              onClick={() => setTrimester(t)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                trimester === t ? "gradient-bloom text-primary-foreground shadow-soft" : "bg-card border border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              Trimester {t}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((ex, i) => (
            <motion.div
              key={ex.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-card shadow-card border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    {ex.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{ex.name}</h3>
                    <p className="text-xs text-muted-foreground">{ex.duration}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  ex.safety === "safe" ? "bg-secondary/10 text-secondary" : "bg-accent/10 text-accent"
                }`}>
                  {ex.safety === "safe" ? "✔ Safe" : "⚠ Caution"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{ex.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {ex.benefits.map((b) => (
                  <span key={b} className="text-xs px-2 py-1 rounded-lg bg-muted text-muted-foreground">{b}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-accent/10 border border-accent/20">
          <p className="text-sm text-foreground">
            ⚠️ <strong>Disclaimer:</strong> Always consult your healthcare provider before starting any exercise routine during pregnancy. Stop immediately if you feel dizzy, short of breath, or experience pain.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Exercises;
