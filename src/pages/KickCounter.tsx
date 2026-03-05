import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Baby, RotateCcw, Clock } from "lucide-react";

interface Kick {
  time: Date;
}

const KickCounter = () => {
  const [kicks, setKicks] = useState<Kick[]>([]);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!sessionStart) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - sessionStart.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionStart]);

  const addKick = () => {
    if (!sessionStart) setSessionStart(new Date());
    setKicks([...kicks, { time: new Date() }]);
  };

  const reset = () => {
    setKicks([]);
    setSessionStart(null);
    setElapsed(0);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const status = kicks.length >= 10 ? "healthy" : kicks.length >= 6 ? "monitor" : kicks.length > 0 ? "low" : "idle";

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Baby Kick Counter</h1>
        <p className="text-muted-foreground mb-10">Tap whenever you feel your baby move</p>

        {/* Main kick button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          onClick={addKick}
          className="w-48 h-48 sm:w-56 sm:h-56 rounded-full gradient-bloom shadow-elevated flex flex-col items-center justify-center mx-auto mb-8 transition-shadow hover:shadow-soft"
        >
          <Baby className="text-primary-foreground mb-2" size={48} />
          <span className="text-primary-foreground text-lg font-medium">Tap for Kick</span>
        </motion.button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-card shadow-card border border-border">
            <p className="text-3xl font-bold text-foreground">{kicks.length}</p>
            <p className="text-sm text-muted-foreground">Kicks</p>
          </div>
          <div className="p-4 rounded-2xl bg-card shadow-card border border-border">
            <div className="flex items-center justify-center gap-1">
              <Clock size={16} className="text-muted-foreground" />
              <p className="text-3xl font-bold text-foreground">{formatTime(elapsed)}</p>
            </div>
            <p className="text-sm text-muted-foreground">Duration</p>
          </div>
          <div className="p-4 rounded-2xl bg-card shadow-card border border-border">
            <p className={`text-lg font-bold ${
              status === "healthy" ? "text-secondary" : status === "monitor" ? "text-accent" : status === "low" ? "text-destructive" : "text-muted-foreground"
            }`}>
              {status === "healthy" ? "✔ Healthy" : status === "monitor" ? "⚠ Monitor" : status === "low" ? "❗ Low" : "—"}
            </p>
            <p className="text-sm text-muted-foreground">Status</p>
          </div>
        </div>

        {/* Status message */}
        {kicks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-xl border mb-6 ${
              status === "healthy"
                ? "border-secondary/20 bg-secondary/5"
                : status === "low"
                ? "border-destructive/20 bg-destructive/5"
                : "border-accent/20 bg-accent/5"
            }`}
          >
            <p className="text-sm text-foreground">
              {status === "healthy"
                ? "👶 Great! Baby movement is healthy and within normal range."
                : status === "monitor"
                ? "⚠️ Keep counting. Baby may need more time to reach 10 kicks."
                : "❗ Baby movement seems lower than normal. If this persists, contact your healthcare provider."}
            </p>
          </motion.div>
        )}

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 text-sm"
        >
          <RotateCcw size={14} /> Reset Session
        </button>

        {/* Recent kicks */}
        {kicks.length > 0 && (
          <div className="mt-8 text-left">
            <h3 className="font-display text-lg font-semibold text-foreground mb-3">Recent Kicks</h3>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {[...kicks].reverse().slice(0, 10).map((k, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground py-1 px-3 rounded-lg bg-card">
                  <span>👣</span>
                  <span>Kick #{kicks.length - i}</span>
                  <span className="ml-auto">{k.time.toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default KickCounter;
