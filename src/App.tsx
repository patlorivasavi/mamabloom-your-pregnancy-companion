import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import SymptomChecker from "./pages/SymptomChecker";
import Dashboard from "./pages/Dashboard";
import BabyGrowth from "./pages/BabyGrowth";
import KickCounter from "./pages/KickCounter";
import Journal from "./pages/Journal";
import MythsFacts from "./pages/MythsFacts";
import Nutrition from "./pages/Nutrition";
import Exercises from "./pages/Exercises";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/symptoms" element={<SymptomChecker />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/baby-growth" element={<BabyGrowth />} />
          <Route path="/kick-counter" element={<KickCounter />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/myths" element={<MythsFacts />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
