import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { trpc } from "@/lib/trpc";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "./_core/hooks/useAuth";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";

function AppRouter() {
  const auth = useAuth();
  const setup = trpc.auth.status.useQuery(undefined, { retry: false });
  if (auth.loading || setup.isLoading) return <div className="app-loading"><LoaderCircle className="animate-spin" size={22}/><span>Carregando ambiente seguro…</span></div>;
  if (!auth.user) return <AuthPage setupRequired={setup.data?.setupRequired ?? false} />;
  return <Home user={auth.user} onLogout={auth.logout} />;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster position="top-right"/><AppRouter/></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
