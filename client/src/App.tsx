import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import NotFound from "@/pages/not-found";

// Import Pages
import Login from "@/pages/login";
import Register from "@/pages/register";
import ForgotPassword from "@/pages/forgot-password";
import Dashboard from "@/pages/dashboard";
import Comparison from "@/pages/comparison";
import CalculatorPage from "@/pages/calculator";

// Import Auth Hook
import { useUser } from "@/hooks/use-auth";

function ProtectedRoute({ component: Component }: { component: any }) {
  const { data: user, isLoading } = useUser();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-white/60 font-medium animate-pulse">Loading securely...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Wrap in a micro-task to avoid React state updates during render phase warning
    setTimeout(() => setLocation("/login"), 0);
    return null;
  }

  return <Component />;
}

function PublicOnlyRoute({ component: Component }: { component: any }) {
  const { data: user, isLoading } = useUser();
  const [, setLocation] = useLocation();

  if (isLoading) return null;

  if (user) {
    setTimeout(() => setLocation("/dashboard"), 0);
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={() => <PublicOnlyRoute component={Login} />} />
      <Route path="/login" component={() => <PublicOnlyRoute component={Login} />} />
      <Route path="/register" component={() => <PublicOnlyRoute component={Register} />} />
      <Route path="/forgot-password" component={() => <PublicOnlyRoute component={ForgotPassword} />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/comparison" component={() => <ProtectedRoute component={Comparison} />} />
      <Route path="/calculator" component={() => <ProtectedRoute component={CalculatorPage} />} />
      
      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
