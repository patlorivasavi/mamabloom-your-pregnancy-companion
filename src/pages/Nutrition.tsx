import { useState } from "react";
import { motion } from "framer-motion";
import { Apple, Leaf, Beef } from "lucide-react";

type DietType = "all" | "vegetarian" | "vegan";

interface FoodRec {
  symptom: string;
  emoji: string;
  foods: { name: string; benefit: string; diets: DietType[] }[];
}

const recommendations: FoodRec[] = [
  {
    symptom: "Fatigue / Low Energy",
    emoji: "😴",
    foods: [
      { name: "Spinach", benefit: "Rich in iron", diets: ["all", "vegetarian", "vegan"] },
      { name: "Dates", benefit: "Natural energy boost", diets: ["all", "vegetarian", "vegan"] },
      { name: "Lentils", benefit: "Iron + protein", diets: ["all", "vegetarian", "vegan"] },
      { name: "Red meat", benefit: "High heme iron", diets: ["all"] },
      { name: "Pomegranate juice", benefit: "Iron absorption", diets: ["all", "vegetarian", "vegan"] },
    ],
  },
  {
    symptom: "Nausea / Morning Sickness",
    emoji: "🤢",
    foods: [
      { name: "Ginger tea", benefit: "Anti-nausea", diets: ["all", "vegetarian", "vegan"] },
      { name: "Crackers", benefit: "Settle stomach", diets: ["all", "vegetarian", "vegan"] },
      { name: "Banana", benefit: "Easy to digest", diets: ["all", "vegetarian", "vegan"] },
      { name: "Peppermint", benefit: "Soothes nausea", diets: ["all", "vegetarian", "vegan"] },
    ],
  },
  {
    symptom: "Weak Bones / Calcium",
    emoji: "🦴",
    foods: [
      { name: "Milk / Yogurt", benefit: "Calcium source", diets: ["all", "vegetarian"] },
      { name: "Paneer / Cheese", benefit: "Protein + calcium", diets: ["all", "vegetarian"] },
      { name: "Sesame seeds", benefit: "Plant calcium", diets: ["all", "vegetarian", "vegan"] },
      { name: "Fortified soy milk", benefit: "Vegan calcium", diets: ["all", "vegetarian", "vegan"] },
    ],
  },
  {
    symptom: "Constipation",
    emoji: "😣",
    foods: [
      { name: "Prunes", benefit: "Natural laxative", diets: ["all", "vegetarian", "vegan"] },
      { name: "Oats", benefit: "High fiber", diets: ["all", "vegetarian", "vegan"] },
      { name: "Sweet potato", benefit: "Fiber-rich", diets: ["all", "vegetarian", "vegan"] },
      { name: "Flaxseeds", benefit: "Omega-3 + fiber", diets: ["all", "vegetarian", "vegan"] },
    ],
  },
  {
    symptom: "Brain Development (Baby)",
    emoji: "🧒",
    foods: [
      { name: "Salmon", benefit: "DHA omega-3", diets: ["all"] },
      { name: "Walnuts", benefit: "Plant omega-3", diets: ["all", "vegetarian", "vegan"] },
      { name: "Eggs", benefit: "Choline for brain", diets: ["all", "vegetarian"] },
      { name: "Chia seeds", benefit: "ALA omega-3", diets: ["all", "vegetarian", "vegan"] },
    ],
  },
];

const Nutrition = () => {
  const [diet, setDiet] = useState<DietType>("all");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Smart Nutrition Guide</h1>
        <p className="text-muted-foreground mb-6">Personalized food recommendations for a healthy pregnancy</p>

        <div className="flex gap-2 mb-8">
          {[
            { key: "all" as DietType, label: "All Foods", icon: Beef },
            { key: "vegetarian" as DietType, label: "Vegetarian", icon: Apple },
            { key: "vegan" as DietType, label: "Vegan", icon: Leaf },
          ].map((d) => (
            <button
              key={d.key}
              onClick={() => setDiet(d.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                diet === d.key ? "gradient-bloom text-primary-foreground shadow-soft" : "bg-card border border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              <d.icon size={16} /> {d.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {recommendations.map((rec, i) => {
            const filtered = rec.foods.filter((f) => f.diets.includes(diet));
            if (filtered.length === 0) return null;
            return (
              <motion.div
                key={rec.symptom}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-2xl bg-card shadow-card border border-border"
              >
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  {rec.emoji} {rec.symptom}
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {filtered.map((food) => (
                    <div key={food.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <span className="text-secondary font-bold">●</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{food.name}</p>
                        <p className="text-xs text-muted-foreground">{food.benefit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Nutrition;
