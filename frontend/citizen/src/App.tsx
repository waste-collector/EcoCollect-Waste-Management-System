import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { LandingPage } from "./components/LandingPage";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import { CollectionSchedule } from "./components/CollectionSchedule";
import { ReportProblem } from "./components/ReportProblem";
import { Menu } from "lucide-react";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [appView, setAppView] = useState<"landing" | "login" | "register" | "app">("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [currentView, setCurrentView] = useState("dashboard");

  const handleLogin = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    setIsLoggedIn(true);
    setAppView("app");
  };

  const handleRegister = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    setIsLoggedIn(true);
    setAppView("app");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setUserName("");
    setCurrentView("dashboard");
    setAppView("landing");
  };

  // Landing page
  if (appView === "landing") {
    return (
      <>
        <LandingPage
          onLoginClick={() => setAppView("login")}
          onSignupClick={() => setAppView("register")}
        />
        <Toaster />
      </>
    );
  }

  // Login page
  if (appView === "login") {
    return (
      <>
        <Login onLogin={handleLogin} onBackToLanding={() => setAppView("landing")} />
        <Toaster />
      </>
    );
  }

  // Register page
  if (appView === "register") {
    return (
      <>
        <Register onRegister={handleRegister} onBackToLanding={() => setAppView("landing")} />
        <Toaster />
      </>
    );
  }

  // Main app (authenticated)
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          userName={userName}
          userEmail={userEmail}
          currentView={currentView}
          onViewChange={setCurrentView}
          onLogout={handleLogout}
        />
        <main className="flex-1 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b px-4 py-3">
            <div className="flex items-center gap-3">
              <SidebarTrigger>
                <Menu className="w-5 h-5" />
              </SidebarTrigger>
              <h2 className="text-gray-900">
                {currentView === "dashboard" && "Dashboard"}
                {currentView === "schedule" && "Collection Schedule"}
                {currentView === "report" && "Report Problem"}
                {currentView === "history" && "My Reports"}
                {currentView === "settings" && "Settings"}
              </h2>
            </div>
          </div>
          
          <div className="p-6">
            {currentView === "dashboard" && <Dashboard userName={userName} />}
            {currentView === "schedule" && <CollectionSchedule />}
            {currentView === "report" && <ReportProblem />}
            {currentView === "history" && (
              <div className="text-center py-12 text-gray-500">
                Section under development
              </div>
            )}
            {currentView === "settings" && (
              <div className="text-center py-12 text-gray-500">
                Section under development
              </div>
            )}
          </div>
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}