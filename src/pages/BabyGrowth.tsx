import { useState } from "react";
import { motion } from "framer-motion";

const weekData: Record<number, { size: string; emoji: string; weight: string; length: string; developments: string[]; care: string[] }> = {
  4: { size: "Poppy seed", emoji: "🌱", weight: "<1g", length: "1mm", developments: ["Neural tube forming", "Heart begins to develop"], care: ["Start taking folic acid", "Avoid alcohol"] },
  8: { size: "Raspberry", emoji: "🫐", weight: "1g", length: "1.6cm", developments: ["Tiny fingers forming", "Baby starts moving"], care: ["First prenatal visit", "Stay hydrated"] },
  12: { size: "Lime", emoji: "🍋", weight: "14g", length: "5.4cm", developments: ["Reflexes developing", "Fingerprints forming"], care: ["Nuchal translucency scan", "Start gentle exercise"] },
  16: { size: "Avocado", emoji: "🥑", weight: "100g", length: "11.6cm", developments: ["Can make facial expressions", "Skeleton hardening"], care: ["Anatomy scan upcoming", "Increase calcium intake"] },
  20: { size: "Banana", emoji: "🍌", weight: "300g", length: "25cm", developments: ["Hearing develops", "Movements become stronger", "Can sense light"], care: ["Mid-pregnancy ultrasound", "Start tracking kicks"] },
  24: { size: "Corn", emoji: "🌽", weight: "600g", length: "30cm", developments: ["Lungs developing", "Can respond to sounds", "Sleep cycles forming"], care: ["Glucose screening test", "Monitor swelling"] },
  28: { size: "Eggplant", emoji: "🍆", weight: "1kg", length: "37cm", developments: ["Eyes can open", "Brain developing rapidly", "Can dream"], care: ["Third trimester begins", "Rest more frequently"] },
  32: { size: "Squash", emoji: "🎃", weight: "1.7kg", length: "42cm", developments: ["Bones fully formed", "Practicing breathing", "Gaining fat"], care: ["Monitor baby position", "Prepare birth plan"] },
  36: { size: "Honeydew melon", emoji: "🍈", weight: "2.6kg", length: "47cm", developments: ["Lungs nearly mature", "Head may engage"], care: ["Weekly checkups", "Pack hospital bag"] },
  40: { size: "Watermelon", emoji: "🍉", weight: "3.4kg", length: "51cm", developments: ["Fully developed", "Ready for birth!"], care: ["Watch for labor signs", "Stay calm and prepared"] },
};

const weeks = Object.keys(weekData).map(Number);

const BabyGrowth = () => {
  const [week, setWeek] = useState(20);
  const data = weekData[week];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Baby Growth Timeline</h1>
        <p className="text-muted-foreground mb-8">See how your baby develops week by week</p>

        {/* Week Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {weeks.map((w) => (
            <button
              key={w}
              onClick={() => setWeek(w)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                week === w
                  ? "gradient-bloom text-primary-foreground shadow-soft"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              Week {w}
            </button>
          ))}
        </div>

        {/* Baby Info Card */}
        <motion.div
          key={week}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-card shadow-card border border-border overflow-hidden"
        >
          <div className="gradient-hero p-8 text-center">
            <span className="text-8xl block mb-4">{data.emoji}</span>
            <h2 className="font-display text-2xl font-bold text-foreground">Week {week}</h2>
            <p className="text-lg text-muted-foreground mt-1">Your baby is the size of a <strong className="text-foreground">{data.size}</strong></p>
            <div className="flex justify-center gap-6 mt-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-bold text-foreground">{data.weight}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Length</p>
                <p className="font-bold text-foreground">{data.length}</p>
              </div>
            </div>
          </div>

          <div className="p-6 grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">🧒 Development</h3>
              <ul className="space-y-2">
                {data.developments.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-secondary mt-0.5">●</span> {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">💝 Recommended Care</h3>
              <ul className="space-y-2">
                {data.care.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">●</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BabyGrowth;
