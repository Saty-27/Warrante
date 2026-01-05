import { Button } from "@/components/ui/button";
import { ArrowLeft, QrCode, History, Settings } from "lucide-react";
import { useLocation } from "wouter";
import bajajLogo from "@assets/Bajaj_Auto_Ltd_logo.svg (1)_1750847690200.png";
import godrejLogo from "@assets/Bajaj_Auto_Ltd_logo.svg (3)_1750847690201.png";
import haierLogo from "@assets/Bajaj_Auto_Ltd_logo.svg (4)_1750847690201.png";
import profileImage from "@assets/alex-mccarthy-RGKdWJOUFH0-unsplash_1750848305050.png";

interface Product {
  id: string;
  name: string;
  logo: string;
  scannedTime: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Bajaj Electric Fan",
    logo: bajajLogo,
    scannedTime: "Scanned 5 month ago"
  },
  {
    id: "2", 
    name: "Goodrej Refrigerator",
    logo: godrejLogo,
    scannedTime: "Scanned 6 month ago"
  },
  {
    id: "3",
    name: "Haier Wachine Machine", 
    logo: haierLogo,
    scannedTime: "Scanned 9 month ago"
  }
];

export default function Profile() {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation("/");
  };

  const handleViewDetails = () => {
    // Navigate to profile details or edit profile
    setLocation("/profile-edit");
  };

  const handleViewAll = () => {
    setLocation("/all-products");
  };

  const handleGenerate = () => {
    setLocation("/generate");
  };

  const handleHistory = () => {
    setLocation("/settings");
  };

  const handleSettings = () => {
    setLocation("/settings");
  };

  const handleScanner = () => {
    setLocation("/generate");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 sm:p-6">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="w-8 h-8 sm:w-10 sm:h-10 p-0 hover:bg-white/10 text-white"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <h1 className="text-white text-lg sm:text-xl font-bold ml-3 sm:ml-4">Warante</h1>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center px-6 mb-8">
        {/* Profile Photo */}
        <div className="w-32 h-32 rounded-full border-4 border-white mb-4 overflow-hidden">
          <img 
            src={profileImage}
            alt="Anjali Singh Profile"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Name */}
        <h2 className="text-white text-2xl font-bold mb-4">Anjali Singh</h2>
        
        {/* View Details Button */}
        <Button
          onClick={handleViewDetails}
          className="bg-[#FCB523] hover:bg-[#E8A41F] text-black font-semibold px-8 py-3 rounded-xl"
        >
          View Details
        </Button>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-600 mx-6 mb-6"></div>

      {/* Warranty List Card Section */}
      <div className="flex-1 px-6">
        <h3 className="text-white text-xl font-bold mb-4 text-center">Warranty List Card</h3>
        
        {/* Product Cards */}
        <div className="space-y-4 mb-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-4 shadow-lg flex items-center space-x-4 border-l-4 border-[#FCB523] border-b-4 border-b-[#FCB523]"
            >
              <img
                src={product.logo}
                alt={`${product.name} logo`}
                className="w-12 h-12 object-contain rounded-lg"
              />
              <div className="flex-1">
                <h4 className="text-lg font-bold text-black">{product.name}</h4>
                <p className="text-gray-600 text-sm">{product.scannedTime}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center pb-24">
          <Button
            onClick={handleViewAll}
            className="bg-[#FCB523] hover:bg-[#E8A41F] text-black font-semibold px-8 py-3 rounded-xl"
          >
            View All
          </Button>
        </div>
      </div>

      {/* Bottom Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm safe-area-pb">
        <div className="flex items-center justify-around py-2 sm:py-3 px-2 sm:px-4">
          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className="flex flex-col items-center space-y-1 text-white/70 hover:text-white transition-colors min-w-0 flex-1"
          >
            <QrCode className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-medium">Generate</span>
          </button>

          {/* History Button */}
          <button
            onClick={handleHistory}
            className="flex flex-col items-center space-y-1 text-yellow-500 hover:text-yellow-400 transition-colors min-w-0 flex-1"
          >
            <History className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-medium">History</span>
          </button>

          {/* Center QR Button */}
          <div className="relative flex-1 flex justify-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FCB523] rounded-full flex items-center justify-center shadow-lg">
              <QrCode className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
          </div>

          {/* Settings Button */}
          <button
            onClick={handleSettings}
            className="flex flex-col items-center space-y-1 text-yellow-500 hover:text-yellow-400 transition-colors min-w-0 flex-1"
          >
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-medium">Settings</span>
          </button>

          {/* Scanner Button */}
          <button
            onClick={handleScanner}
            className="flex flex-col items-center space-y-1 text-white/70 hover:text-white transition-colors min-w-0 flex-1"
          >
            <QrCode className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-medium">Scanner</span>
          </button>
        </div>
      </div>
    </div>
  );
}