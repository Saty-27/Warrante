import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Vibrate, Star, Shield, Share2, Headphones, User, Trash2 } from "lucide-react";
import { useLocation } from "wouter";

export default function Settings() {
  const [, setLocation] = useLocation();
  
  // State for all toggle switches
  const [settings, setSettings] = useState({
    vibration: true,
    rateUs: true,
    privacyPolicy: true,
    share: true,
    help: true,
    profile: true,
    trashedRejected: true,
  });

  const handleBack = () => {
    setLocation("/profile");
  };

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const settingsOptions = [
    {
      key: 'vibration' as keyof typeof settings,
      icon: <Vibrate className="h-6 w-6" />,
      title: "Vibration",
      description: "Vibration when scan is done"
    },
    {
      key: 'rateUs' as keyof typeof settings,
      icon: <Star className="h-6 w-6" />,
      title: "Rate Us",
      description: "Vibration when scan is done"
    },
    {
      key: 'privacyPolicy' as keyof typeof settings,
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy Policy",
      description: "Vibration when scan is done"
    },
    {
      key: 'share' as keyof typeof settings,
      icon: <Share2 className="h-6 w-6" />,
      title: "Share",
      description: "Vibration when scan is done"
    },
    {
      key: 'help' as keyof typeof settings,
      icon: <Headphones className="h-6 w-6" />,
      title: "Help",
      description: "Vibration when scan is done"
    },
    {
      key: 'profile' as keyof typeof settings,
      icon: <User className="h-6 w-6" />,
      title: "Profile",
      description: "Vibration when scan is done"
    },
    {
      key: 'trashedRejected' as keyof typeof settings,
      icon: <Trash2 className="h-6 w-6" />,
      title: "Trashed / Rejected",
      description: "Vibration when scan is done"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCB523] to-[#FF8C00] text-black relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 pt-8 sm:pt-12">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="w-10 h-10 sm:w-12 sm:h-12 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black rounded-xl"
        >
          <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
        <h1 className="text-black text-xl sm:text-2xl font-bold">Settings</h1>
        <div className="w-10 h-10 sm:w-12 sm:h-12"></div> {/* Spacer for centering */}
      </div>

      {/* Settings List */}
      <div className="px-4 sm:px-6 space-y-3 sm:space-y-4 mt-6 sm:mt-8">
        {settingsOptions.map((option) => (
          <div
            key={option.key}
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
              <div className="text-gray-700 flex-shrink-0">
                {option.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-black font-semibold text-base sm:text-lg truncate">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                  {option.description}
                </p>
              </div>
            </div>
            
            <Switch
              checked={settings[option.key]}
              onCheckedChange={() => handleToggle(option.key)}
              className="data-[state=checked]:bg-[#FCB523] flex-shrink-0 ml-2"
            />
          </div>
        ))}
      </div>

      {/* Background decorative circles */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-400/20 to-transparent rounded-full transform translate-x-32 translate-y-32"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-yellow-400/15 to-transparent rounded-full transform -translate-x-20"></div>
    </div>
  );
}