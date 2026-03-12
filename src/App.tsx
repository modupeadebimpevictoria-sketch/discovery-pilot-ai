import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { CareersProvider } from "@/contexts/CareersContext";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import OfflineBanner from "@/components/OfflineBanner";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import CareerExploration from "./pages/CareerExploration";
import CareerUniverse from "./pages/CareerUniverse";
import CareerFeed from "./pages/CareerFeed";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Quests from "./pages/Quests";
import CareerPassport from "./pages/CareerPassport";
import Opportunities from "./pages/Opportunities";
import Mentor from "./pages/Mentor";
import Me from "./pages/Me";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <CareersProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/results" element={<Results />} />
              <Route path="/career/:id" element={<CareerExploration />} />
              <Route path="/universe" element={<CareerUniverse />} />
              <Route path="/feed" element={<CareerFeed />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/roadmap/:id" element={<Roadmap />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/passport" element={<CareerPassport />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/mentor" element={<Mentor />} />
              <Route path="/me" element={<Me />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <TopBar />
            <OfflineBanner />
            <BottomNav />
          </BrowserRouter>
        </CareersProvider>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
