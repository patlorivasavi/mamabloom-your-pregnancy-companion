import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Droplets, Moon, Baby, Smile, TrendingUp, Activity } from "lucide-react";

interface HealthData {
  bp: string;
  weight: string;
  water: number;
  sleep: number;
  kicks: number;
  mood: string;
}

const moods = [
  { label: "Happy", emoji: "😊" },
  { label: "Calm", emoji: "😌" },
  { label: "Tired", emoji: "😴" },
  { label: "Anxious", emoji: "😰" },
  { label: "Nauseous", emoji: "🤢" },
];

const Dashboard = () => {
  const [data, setData] = useState<HealthData>({
    bp: "120/80",
    weight: "68",
    water: 1.5,
    sleep: 6,
    kicks: 12,
    mood: "Happy",
  });

  const healthScore = calculateHealthScore(data);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Health Dashboard</h1>
        <p className="text-muted-foreground mb-8">Your daily maternal health overview</p>

        {/* Risk Meter */}
        <div className="mb-8 p-6 rounded-2xl bg-card shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
              <Activity size={22} className="text-primary" /> Pregnancy Health Score
            </h2>
            <span className={`text-3xl font-bold ${healthScore >= 70 ? "text-secondary" : healthScore >= 50 ? "text-accent" : "text-destructive"}`}>
              {healthScore}%
            </span>
          </div>
          <div className="w-full h-4 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${healthScore}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${healthScore >= 70 ? "gradient-sage" : healthScore >= 50 ? "bg-accent" : "bg-destructive"}`}
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {healthScore >= 70 ? "✔ Healthy Pregnancy — Keep it up!" : healthScore >= 50 ? "⚠ Moderate — Consider improving sleep and hydration" : "❗ Risk Detected — Please consult your doctor"}
          </p>
        </div>

        {/* Input Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard
            icon={<Heart className="text-primary" size={20} />}
            title="Blood Pressure"
            value={data.bp}
            unit="mmHg"
            status={data.bp === "120/80" ? "normal" : "warning"}
            onChange={(v) => setData({ ...data, bp: v })}
            type="text"
          />
          <MetricCard
            icon={<TrendingUp className="text-secondary" size={20} />}
            title="Weight"
            value={data.weight}
            unit="kg"
            status="normal"
            onChange={(v) => setData({ ...data, weight: v })}
            type="text"
          />
          <MetricCard
            icon={<Droplets className="text-primary" size={20} />}
            title="Water Intake"
            value={String(data.water)}
            unit="liters"
            status={data.water >= 2 ? "normal" : data.water >= 1.5 ? "warning" : "danger"}
            onChange={(v) => setData({ ...data, water: parseFloat(v) || 0 })}
            type="number"
            recommendation="Recommended: 2-3L daily"
          />
          <MetricCard
            icon={<Moon className="text-accent" size={20} />}
            title="Sleep Hours"
            value={String(data.sleep)}
            unit="hours"
            status={data.sleep >= 7 ? "normal" : data.sleep >= 5 ? "warning" : "danger"}
            onChange={(v) => setData({ ...data, sleep: parseFloat(v) || 0 })}
            type="number"
            recommendation="Recommended: 7-9 hours"
          />
          <MetricCard
            icon={<Baby className="text-primary" size={20} />}
            title="Baby Kick Count"
            value={String(data.kicks)}
            unit="kicks"
            status={data.kicks >= 10 ? "normal" : data.kicks >= 6 ? "warning" : "danger"}
            onChange={(v) => setData({ ...data, kicks: parseInt(v) || 0 })}
            type="number"
            recommendation="Normal: 10+ kicks/day"
          />
          <div className="p-5 rounded-2xl bg-card shadow-card border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Smile className="text-accent" size={20} />
              <span className="font-medium text-foreground text-sm">Mood</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m.label}
                  onClick={() => setData({ ...data, mood: m.label })}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    data.mood === m.label
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  unit: string;
  status: "normal" | "warning" | "danger";
  onChange: (v: string) => void;
  type: string;
  recommendation?: string;
}

const MetricCard = ({ icon, title, value, unit, status, onChange, type, recommendation }: MetricCardProps) => (
  <div className="p-5 rounded-2xl bg-card shadow-card border border-border">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <span className="font-medium text-foreground text-sm">{title}</span>
      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
        status === "normal" ? "bg-secondary/10 text-secondary" : status === "warning" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
      }`}>
        {status === "normal" ? "✔ Good" : status === "warning" ? "⚠ Low" : "❗ Alert"}
      </span>
    </div>
    <div className="flex items-baseline gap-2">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-20 bg-transparent text-2xl font-bold text-foreground outline-none border-b border-border focus:border-primary transition-colors"
      />
      <span className="text-sm text-muted-foreground">{unit}</span>
    </div>
    {recommendation && <p className="text-xs text-muted-foreground mt-2">{recommendation}</p>}
  </div>
);

function calculateHealthScore(data: HealthData): number {
  let score = 100;
  if (data.water < 1.5) score -= 15;
  else if (data.water < 2) score -= 5;
  if (data.sleep < 5) score -= 20;
  else if (data.sleep < 7) score -= 10;
  if (data.kicks < 6) score -= 25;
  else if (data.kicks < 10) score -= 10;
  if (data.mood === "Anxious" || data.mood === "Nauseous") score -= 5;
  return Math.max(0, Math.min(100, score));
}

export default Dashboard;
