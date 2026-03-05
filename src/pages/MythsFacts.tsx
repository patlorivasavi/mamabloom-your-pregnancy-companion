import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

interface Quiz {
  statement: string;
  isTrue: boolean;
  explanation: string;
}

const quizzes: Quiz[] = [
  { statement: "Pregnant women should eat for two.", isTrue: false, explanation: "Calorie intake only needs a slight increase of about 300 calories/day in the second and third trimester." },
  { statement: "Exercising during pregnancy is dangerous.", isTrue: false, explanation: "Moderate exercise like walking and prenatal yoga is safe and beneficial for most pregnancies." },
  { statement: "Morning sickness only happens in the morning.", isTrue: false, explanation: "Nausea can occur at any time of day and is very common in the first trimester." },
  { statement: "Folic acid helps prevent birth defects.", isTrue: true, explanation: "Folic acid is crucial for neural tube development and should be taken before and during early pregnancy." },
  { statement: "You can't fly during pregnancy.", isTrue: false, explanation: "Most airlines allow flying up to 36 weeks. Always consult your doctor before travel." },
  { statement: "Caffeine should be completely avoided.", isTrue: false, explanation: "Moderate caffeine (under 200mg/day) is generally considered safe during pregnancy." },
  { statement: "Pregnancy lasts exactly 9 months.", isTrue: false, explanation: "Pregnancy typically lasts about 40 weeks (280 days) from the last menstrual period, which is closer to 10 lunar months." },
  { statement: "Prenatal vitamins are important for baby's development.", isTrue: true, explanation: "Prenatal vitamins provide essential nutrients like iron, calcium, and DHA crucial for fetal development." },
  { statement: "Spicy food can induce labor.", isTrue: false, explanation: "There's no scientific evidence that spicy food induces labor, though it may cause heartburn." },
  { statement: "Staying hydrated helps reduce pregnancy complications.", isTrue: true, explanation: "Proper hydration helps prevent UTIs, constipation, and supports amniotic fluid levels." },
];

const MythsFacts = () => {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const quiz = quizzes[current];

  const handleAnswer = (ans: boolean) => {
    setAnswer(ans);
    if (ans === quiz.isTrue) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= quizzes.length) {
      setCompleted(true);
    } else {
      setCurrent((c) => c + 1);
      setAnswer(null);
    }
  };

  const restart = () => {
    setCurrent(0);
    setAnswer(null);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Myth vs Fact</h1>
        <p className="text-muted-foreground mb-8">Test your pregnancy knowledge!</p>

        {!completed ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 rounded-2xl bg-card shadow-card border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Question {current + 1}/{quizzes.length}</span>
                <span className="text-sm font-medium text-primary">Score: {score}</span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-muted mb-6">
                <div
                  className="h-full rounded-full gradient-bloom transition-all"
                  style={{ width: `${((current + 1) / quizzes.length) * 100}%` }}
                />
              </div>

              <h2 className="font-display text-xl font-semibold text-foreground mb-6">"{quiz.statement}"</h2>

              {answer === null ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="flex-1 py-3 rounded-xl bg-secondary/10 text-secondary font-medium hover:bg-secondary/20 transition-colors border border-secondary/20"
                  >
                    ✅ True
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="flex-1 py-3 rounded-xl bg-destructive/10 text-destructive font-medium hover:bg-destructive/20 transition-colors border border-destructive/20"
                  >
                    ❌ False
                  </button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className={`p-4 rounded-xl mb-4 ${
                    answer === quiz.isTrue ? "bg-secondary/10 border border-secondary/20" : "bg-destructive/10 border border-destructive/20"
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {answer === quiz.isTrue ? (
                        <CheckCircle className="text-secondary" size={20} />
                      ) : (
                        <XCircle className="text-destructive" size={20} />
                      )}
                      <span className="font-medium text-foreground">
                        {answer === quiz.isTrue ? "Correct!" : "Not quite!"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{quiz.explanation}</p>
                  </div>
                  <button
                    onClick={next}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-xl gradient-bloom text-primary-foreground font-medium shadow-soft hover:opacity-90"
                  >
                    {current + 1 < quizzes.length ? "Next" : "See Results"} <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl bg-card shadow-card border border-border text-center"
          >
            <span className="text-6xl block mb-4">🎉</span>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Quiz Complete!</h2>
            <p className="text-4xl font-bold text-primary mb-2">{score}/{quizzes.length}</p>
            <p className="text-muted-foreground mb-6">
              {score >= 8 ? "Amazing! You're a pregnancy expert!" : score >= 5 ? "Good job! Keep learning!" : "Keep going! Knowledge is power!"}
            </p>
            <button onClick={restart} className="px-6 py-3 rounded-xl gradient-bloom text-primary-foreground font-medium shadow-soft hover:opacity-90">
              Try Again
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MythsFacts;
