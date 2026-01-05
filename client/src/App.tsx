import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import Dashboard from "@/pages/dashboard";
import Generate from "@/pages/generate";
import ProductDetails from "@/pages/product-details";
import Result from "@/pages/result";
import AllProducts from "@/pages/all-products";
import CompanyDetails from "@/pages/company-details";
import Settings from "@/pages/settings";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/generate" component={Generate} />
      <Route path="/product-details" component={ProductDetails} />
      <Route path="/result" component={Result} />
      <Route path="/all-products" component={AllProducts} />
      <Route path="/company-details" component={CompanyDetails} />
      <Route path="/settings" component={Settings} />
      <Route path="/admin" component={AdminDashboard} />
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
