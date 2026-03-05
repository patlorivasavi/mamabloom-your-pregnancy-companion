import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, BookOpen } from "lucide-react";

interface JournalEntry {
  id: number;
  date: string;
  mood: string;
  symptoms: string;
  note: string;
}

const moodOptions = ["😊 Happy", "😌 Calm", "😴 Tired", "😰 Anxious", "🤢 Nauseous", "🥰 Grateful", "😢 Emotional"];

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    { id: 1, date: "2026-03-04", mood: "😊 Happy", symptoms: "Mild back pain", note: "Baby kicked a lot today! Feeling blessed." },
    { id: 2, date: "2026-03-03", mood: "😴 Tired", symptoms: "Fatigue, heartburn", note: "Couldn't sleep well but the prenatal yoga helped." },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ mood: "", symptoms: "", note: "" });

  const addEntry = () => {
    if (!form.note) return;
    setEntries([
      { id: Date.now(), date: new Date().toISOString().split("T")[0], ...form },
      ...entries,
    ]);
    setForm({ mood: "", symptoms: "", note: "" });
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Pregnancy Journal</h1>
            <p className="text-muted-foreground">Cherish every moment of your journey</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="p-3 rounded-xl gradient-bloom text-primary-foreground shadow-soft hover:opacity-90"
          >
            <Plus size={20} />
          </button>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8 p-6 rounded-2xl bg-card shadow-card border border-border"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">New Entry</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Mood</label>
                <div className="flex flex-wrap gap-2">
                  {moodOptions.map((m) => (
                    <button
                      key={m}
                      onClick={() => setForm({ ...form, mood: m })}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        form.mood === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Symptoms</label>
                <input
                  value={form.symptoms}
                  onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
                  placeholder="e.g., Mild back pain, fatigue"
                  className="w-full px-4 py-2 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Thoughts & Notes</label>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  rows={3}
                  placeholder="How are you feeling today?"
                  className="w-full px-4 py-2 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>
              <button
                onClick={addEntry}
                className="px-6 py-2 rounded-xl gradient-bloom text-primary-foreground font-medium shadow-soft hover:opacity-90"
              >
                Save Entry
              </button>
            </div>
          </motion.div>
        )}

        {/* Entries */}
        <div className="space-y-4">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-card shadow-card border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{entry.date}</span>
                </div>
                {entry.mood && (
                  <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">{entry.mood}</span>
                )}
              </div>
              {entry.symptoms && (
                <p className="text-xs text-muted-foreground mb-2">Symptoms: {entry.symptoms}</p>
              )}
              <p className="text-sm text-foreground leading-relaxed">{entry.note}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Journal;
