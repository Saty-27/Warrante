import { Button } from "@/components/ui/button";
import { ArrowLeft, QrCode, History } from "lucide-react";
import { useLocation } from "wouter";
import profileImagePath from "@assets/alex-mccarthy-RGKdWJOUFH0-unsplash_1750842553247.png";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation("/profile");
  };

  const handleGenerate = () => {
    setLocation("/generate");
  };

  const handleHistory = () => {
    // TODO: Implement history view
    console.log("View history");
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="w-10 h-10 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-white text-xl font-bold">Warante</h1>
        <div className="w-10 h-10"></div> {/* Spacer for centering */}
      </div>

      {/* Profile Section */}
      <div className="text-center px-6 mt-8">
        {/* Profile Image */}
        <div className="w-40 h-40 mx-auto mb-6 relative">
          <div className="w-full h-full rounded-full border-4 border-white overflow-hidden">
            <img
              src={profileImagePath}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-white mb-6">Anjali Singh</h2>

        {/* View Details Button */}
        <Button
          className="bg-[hsl(37,100%,50%)] hover:bg-[hsl(37,100%,45%)] text-black font-semibold py-3 px-8 rounded-2xl mb-12"
        >
          View Details
        </Button>
      </div>

      {/* Warranty List Card Section */}
      <div className="px-6">
        <h3 className="text-xl font-bold text-white mb-4 text-center">Warrenty List Card</h3>
        
        {/* Card */}
        <div className="bg-white rounded-2xl p-6 mb-8">
          <div className="text-center">
            <p className="text-black text-lg">Not Scanned Any Card</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm">
        <div className="flex items-center justify-around py-4 px-6">
          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className="flex flex-col items-center space-y-1 text-white/70 hover:text-white transition-colors"
          >
            <QrCode className="h-6 w-6" />
            <span className="text-xs font-medium">Generate</span>
          </button>

          {/* Center QR Button */}
          <div className="relative">
            <div className="w-16 h-16 bg-[hsl(37,100%,50%)] rounded-full flex items-center justify-center shadow-lg">
              <QrCode className="h-8 w-8 text-black" />
            </div>
          </div>

          {/* History Button */}
          <button
            onClick={handleHistory}
            className="flex flex-col items-center space-y-1 text-white/70 hover:text-white transition-colors"
          >
            <History className="h-6 w-6" />
            <span className="text-xs font-medium">History</span>
          </button>
        </div>
      </div>
    </div>
  );
}