import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Activity, Baby, BookOpen, Shield, Apple, Dumbbell, Brain } from "lucide-react";
import logo from "@/assets/logo.png";

const features = [
  { icon: Activity, title: "Smart Symptom Checker", desc: "AI-powered categorization of symptoms into safe, monitor, or urgent levels", path: "/symptoms", color: "bg-primary/10 text-primary" },
  { icon: Heart, title: "Health Dashboard", desc: "Track BP, weight, sleep, water intake and mood with beautiful visuals", path: "/dashboard", color: "bg-secondary/10 text-secondary" },
  { icon: Baby, title: "Baby Growth Timeline", desc: "Week-by-week baby development with size comparisons and milestones", path: "/baby-growth", color: "bg-accent/10 text-accent" },
  { icon: Shield, title: "Risk Prediction Meter", desc: "Comprehensive pregnancy health score based on your daily inputs", path: "/dashboard", color: "bg-destructive/10 text-destructive" },
  { icon: BookOpen, title: "Pregnancy Journal", desc: "Log your mood, symptoms, thoughts and cherish every moment", path: "/journal", color: "bg-primary/10 text-primary" },
  { icon: Brain, title: "Myth vs Fact Quiz", desc: "Test your pregnancy knowledge with interactive myth-busting", path: "/myths", color: "bg-secondary/10 text-secondary" },
  { icon: Apple, title: "Smart Nutrition", desc: "Personalized food recommendations based on symptoms and trimester", path: "/nutrition", color: "bg-accent/10 text-accent" },
  { icon: Dumbbell, title: "Safe Exercises", desc: "Trimester-specific exercise guides for a healthy pregnancy", path: "/exercises", color: "bg-primary/10 text-primary" },
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Your Pregnancy Companion 🌸
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
                Bloom Into
                <br />
                <span className="text-primary">Motherhood</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
                Track symptoms, monitor baby's growth, and get personalized health insights throughout your beautiful pregnancy journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/symptoms"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bloom text-primary-foreground font-medium shadow-soft hover:opacity-90 transition-opacity"
                >
                  Start Tracking
                  <Heart size={18} />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card text-foreground font-medium shadow-card hover:shadow-elevated transition-shadow border border-border"
                >
                  View Dashboard
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full gradient-bloom opacity-10 absolute -inset-4 blur-3xl" />
                <img src={logo} alt="MamaBloom" className="relative w-72 h-72 sm:w-96 sm:h-96 object-contain drop-shadow-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Comprehensive tools designed to support you and your baby through every stage of pregnancy</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={f.path}
                className="block p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all border border-border group"
              >
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 MamaBloom — Your trusted pregnancy companion 🌸
        </p>
      </footer>
    </div>
  );
};

export default Landing;
