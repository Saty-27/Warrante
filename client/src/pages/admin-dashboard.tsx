import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  User, 
  CreditCard, 
  Building, 
  FileText, 
  Share2,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Search,
  Settings,
  Bell,
  Calendar,
  Menu,
  X
} from "lucide-react";
import { useLocation } from "wouter";

// Custom hook for intersection observer animations
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

// Animated Card Component
function AnimatedCard({ children, delay = 0 }) {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("Users");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleBack = () => {
    setLocation("/profile");
  };

  // Sample data for the dashboard
  const metrics = [
    {
      title: "Daily User",
      value: "7,265",
      change: "+11.01%",
      trend: "up",
      color: "bg-blue-500"
    },
    {
      title: "Website Visits",
      value: "3,671",
      change: "-0.03%",
      trend: "down",
      color: "bg-gray-700"
    },
    {
      title: "New Users",
      value: "256",
      change: "+15.03%",
      trend: "up",
      color: "bg-blue-400"
    },
    {
      title: "Active Users",
      value: "2,318",
      change: "+6.08%",
      trend: "up",
      color: "bg-gray-600"
    }
  ];

  const deviceTraffic = [
    { name: "Linux", value: 15 },
    { name: "Mac", value: 25 },
    { name: "iOS", value: 20 },
    { name: "Windows", value: 35 },
    { name: "Android", value: 85, highlight: true },
    { name: "Other", value: 10 }
  ];

  const locationTraffic = [
    { name: "US", value: 45 },
    { name: "Canada", value: 25 },
    { name: "Mexico", value: 35 },
    { name: "China", value: 65 },
    { name: "Japan", value: 40 },
    { name: "Australia", value: 30 }
  ];

  const projects = [
    {
      id: 1,
      manager: "ByeWind",
      avatar: "👤",
      date: "Jun 24, 2025",
      product: "Fan",
      status: "In Progress",
      statusColor: "bg-purple-100 text-purple-700"
    },
    {
      id: 2,
      manager: "Natal Craig",
      avatar: "👤",
      date: "Mar 10, 2025",
      product: "Freeze",
      status: "Complete",
      statusColor: "bg-green-100 text-green-700"
    },
    {
      id: 3,
      manager: "Drew Cano",
      avatar: "👤",
      date: "Nov 10, 2025",
      product: "Cooler",
      status: "Pending",
      statusColor: "bg-blue-100 text-blue-700"
    },
    {
      id: 4,
      manager: "Orlando Diggs",
      avatar: "👤",
      date: "Dec 20, 2025",
      product: "Washing machine",
      status: "Approved",
      statusColor: "bg-yellow-100 text-yellow-700"
    },
    {
      id: 5,
      manager: "Andi Lane",
      avatar: "👤",
      date: "Jul 25, 2025",
      product: "Microwave",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-700"
    }
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: Users, label: "User Activity" },
    { icon: FolderOpen, label: "Projects" },
    { icon: User, label: "User Profile" },
    { icon: CreditCard, label: "Account" },
    { icon: Building, label: "Corporate" },
    { icon: FileText, label: "Blog" },
    { icon: Share2, label: "Social" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:relative lg:translate-x-0 transform transition-transform duration-300 ease-in-out z-50 w-64 bg-white shadow-sm border-r h-full ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:block`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center transform transition-transform hover:scale-110">
                <span className="text-white text-sm font-bold">W</span>
              </div>
              <span className="font-semibold text-lg">Warante</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 transform hover:scale-105 ${
                  item.active 
                    ? "bg-gray-100 text-gray-900 font-medium shadow-md" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <div className="bg-white border-b px-4 lg:px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="hidden sm:flex items-center space-x-2 text-gray-500">
                <LayoutDashboard className="h-4 w-4" />
                <span className="text-sm">Dashboards</span>
                <span>/</span>
                <span className="text-gray-900 font-medium">Overview</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="relative hidden sm:block">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-32 sm:w-48 focus:w-56"
                />
              </div>
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform hidden sm:flex">
                <Calendar className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-4 lg:p-6 space-y-6 overflow-x-hidden">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {metrics.map((metric, index) => (
              <AnimatedCard key={index} delay={index * 100}>
                <Card className={`${metric.color} text-white border-0 hover:scale-105 transition-all duration-300 cursor-pointer group`}>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 text-sm font-medium mb-1">
                          {metric.title}
                        </p>
                        <h3 className="text-xl lg:text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                          {metric.value}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-1 group-hover:scale-110 transition-transform duration-300">
                        {metric.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 animate-pulse" />
                        ) : (
                          <TrendingDown className="h-4 w-4 animate-pulse" />
                        )}
                        <span className="text-sm font-medium">{metric.change}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>

          {/* Analytics Chart Section */}
          <AnimatedCard delay={400}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex flex-wrap gap-4 sm:gap-6">
                    {["Users", "Projects", "Operating Status"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-sm font-medium pb-2 border-b-2 transition-all duration-300 hover:scale-105 ${
                          activeTab === tab
                            ? "text-purple-600 border-purple-600 transform scale-105"
                            : "text-gray-500 border-transparent hover:text-gray-700"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 hidden sm:block">Week</span>
                    <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Chart area - simplified visualization */}
                <div className="h-48 sm:h-64 flex items-end space-x-2 justify-center overflow-hidden">
                  <div className="w-full max-w-4xl">
                    <svg viewBox="0 0 600 200" className="w-full h-full">
                      {/* Chart line with animation */}
                      <polyline
                        fill="none"
                        stroke="#8B5CF6"
                        strokeWidth="2"
                        points="50,150 100,120 150,100 200,80 250,60 300,70 350,50 400,40 450,45 500,35 550,30"
                        className="animate-pulse"
                        style={{
                          strokeDasharray: "1000",
                          strokeDashoffset: "1000",
                          animation: "drawLine 2s ease-in-out forwards"
                        }}
                      />
                      {/* Data points */}
                      {[50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550].map((x, i) => {
                        const y = [150, 120, 100, 80, 60, 70, 50, 40, 45, 35, 30][i];
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#8B5CF6"
                            className="hover:r-6 transition-all duration-300 cursor-pointer animate-bounce"
                            style={{
                              animationDelay: `${i * 200}ms`,
                              animationDuration: "0.6s",
                              animationFillMode: "both"
                            }}
                          />
                        );
                      })}
                      {/* X-axis labels */}
                      <text x="50" y="190" textAnchor="middle" className="text-xs fill-gray-500">Jan</text>
                      <text x="150" y="190" textAnchor="middle" className="text-xs fill-gray-500">Feb</text>
                      <text x="250" y="190" textAnchor="middle" className="text-xs fill-gray-500">Mar</text>
                      <text x="350" y="190" textAnchor="middle" className="text-xs fill-gray-500">Apr</text>
                      <text x="450" y="190" textAnchor="middle" className="text-xs fill-gray-500">May</text>
                      <text x="550" y="190" textAnchor="middle" className="text-xs fill-gray-500">Jun</text>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Traffic Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Device Traffic */}
            <AnimatedCard delay={600}>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-blue-600">Device Traffic</CardTitle>
                    <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-2 lg:gap-4">
                    {deviceTraffic.map((device, index) => (
                      <div key={index} className="text-center group cursor-pointer">
                        <div className="relative h-12 lg:h-16 bg-gray-100 rounded mb-2 flex items-end justify-center transition-all duration-300 group-hover:bg-gray-200">
                          <div
                            className={`w-6 lg:w-8 rounded-t transition-all duration-500 group-hover:scale-110 ${
                              device.highlight ? "bg-blue-500" : "bg-gray-300"
                            } relative`}
                            style={{ 
                              height: `${device.value}%`,
                              animationDelay: `${index * 100}ms`
                            }}
                          >
                            {device.highlight && (
                              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-gray-800 text-white px-2 py-1 rounded animate-pulse">
                                24.3K
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors">{device.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>

            {/* Location Traffic */}
            <AnimatedCard delay={700}>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-green-600">Location Traffic</CardTitle>
                    <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-2 lg:gap-4">
                    {locationTraffic.map((location, index) => (
                      <div key={index} className="text-center group cursor-pointer">
                        <div className="h-12 lg:h-16 bg-gray-100 rounded mb-2 flex items-end justify-center transition-all duration-300 group-hover:bg-gray-200">
                          <div
                            className="w-6 lg:w-8 bg-gray-400 rounded-t transition-all duration-500 group-hover:scale-110 group-hover:bg-green-400"
                            style={{ 
                              height: `${location.value}%`,
                              animationDelay: `${index * 100}ms`
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors">{location.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>

          {/* Product Traffic Chart */}
          <AnimatedCard delay={800}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                  <CardTitle className="text-lg font-semibold text-red-500">Product Traffic</CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">All</Button>
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">SmokeJ</Button>
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform hidden sm:block">Dashboard</Button>
                    <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-24 sm:h-32 overflow-hidden">
                  <svg viewBox="0 0 600 120" className="w-full h-full">
                    {/* Generate multiple bars for product traffic */}
                    {Array.from({ length: 50 }, (_, i) => {
                      const x = i * 12;
                      const height = Math.random() * 80 + 20;
                      const isRed = Math.random() > 0.5;
                      return (
                        <rect
                          key={i}
                          x={x}
                          y={120 - height}
                          width="8"
                          height={height}
                          fill={isRed ? "#EF4444" : "#94A3B8"}
                          className="hover:opacity-80 transition-all duration-300 cursor-pointer"
                          style={{
                            animationDelay: `${i * 20}ms`,
                            transform: "scaleY(0)",
                            transformOrigin: "bottom",
                            animation: "scaleUp 0.6s ease-out forwards"
                          }}
                        />
                      );
                    })}
                    {/* X-axis labels */}
                    <text x="50" y="115" textAnchor="middle" className="text-xs fill-gray-500">Jan</text>
                    <text x="150" y="115" textAnchor="middle" className="text-xs fill-gray-500">Feb</text>
                    <text x="250" y="115" textAnchor="middle" className="text-xs fill-gray-500">Mar</text>
                    <text x="350" y="115" textAnchor="middle" className="text-xs fill-gray-500">Apr</text>
                    <text x="450" y="115" textAnchor="middle" className="text-xs fill-gray-500">May</text>
                    <text x="550" y="115" textAnchor="middle" className="text-xs fill-gray-500">Jun</text>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Projects Table */}
          <AnimatedCard delay={900}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-green-600">Projects</CardTitle>
                  <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="hidden sm:grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
                    <span>Manager</span>
                    <span>Date</span>
                    <span>Warranty Product</span>
                    <span>Status</span>
                  </div>
                  <div className="space-y-2">
                    {projects.map((project, index) => (
                      <div 
                        key={project.id} 
                        className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-start sm:items-center py-3 border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 rounded-lg px-2 hover:scale-[1.01] cursor-pointer group"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          opacity: 0,
                          transform: "translateY(20px)",
                          animation: "fadeInUp 0.6s ease-out forwards"
                        }}
                      >
                        <div className="flex items-center space-x-3 col-span-full sm:col-span-1">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
                            {project.avatar}
                          </div>
                          <div>
                            <span className="font-medium block">{project.manager}</span>
                            <span className="text-gray-600 text-sm sm:hidden">{project.date}</span>
                          </div>
                        </div>
                        <span className="text-gray-600 hidden sm:block">{project.date}</span>
                        <div className="sm:hidden">
                          <span className="text-gray-600 block">{project.product}</span>
                        </div>
                        <span className="text-gray-600 hidden sm:block">{project.product}</span>
                        <div className="flex justify-start sm:justify-end">
                          <Badge className={`${project.statusColor} hover:scale-105 transition-transform`}>
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>

        {/* Footer */}
        <div className="bg-white border-t px-4 lg:px-6 py-4 mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <span className="text-white text-xs">W</span>
              </div>
              <span>© 2025 Satyam Gupta</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hover:text-gray-700 cursor-pointer transition-colors">About</span>
              <span className="hover:text-gray-700 cursor-pointer transition-colors">Support</span>
              <span className="hover:text-gray-700 cursor-pointer transition-colors">Contact Us</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}