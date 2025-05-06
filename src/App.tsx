import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WebinarList from "./pages/WebinarList";
import WebinarDetail from "./pages/WebinarDetail";
import CalendarPage from "./pages/Calendar";
import Trainees from "./pages/Trainees";
import PrivateRoute from "./keycloak/PrivateRoute";
import Unhauthorized from "./pages/Unhauthorized";
import Page from "./pages/Page";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute roles={["entreprise", "admin"]}>
                  <Index />
                </PrivateRoute>
              }
            />
            <Route
              path="/webinaires"
              element={
                <PrivateRoute roles={["entreprise", "admin"]}>
                  <WebinarList />
                </PrivateRoute>
              }
            />
            <Route
              path="/webinaire/:id"
              element={
                <PrivateRoute roles={["entreprise", "admin"]}>
                  <WebinarDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendrier"
              element={
                <PrivateRoute roles={["entreprise", "admin"]}>
                  <CalendarPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/stagiaires"
              element={
                <PrivateRoute roles={["entreprise", "admin"]}>
                  <Trainees />
                </PrivateRoute>
              }
            />

            <Route path="/unauthorized" element={<Unhauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
