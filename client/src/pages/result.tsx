import { Button } from "@/components/ui/button";
import { ArrowLeft, Share, Copy, QrCode, History, Grid3X3 } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import bajajLogo from "@assets/Bajaj_Auto_Ltd_logo.svg (1)_1750847198719.png";

export default function Result() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleBack = () => {
    setLocation("/product-details");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bajaj Electric Fan - Warranty Details',
          text: 'Warranty end on - Uploaded date on 19 June 2025 6:30pm',
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('Bajaj Electric Fan - Warranty end on - Uploaded date on 19 June 2025 6:30pm');
      toast({
        title: "Copied!",
        description: "Product details copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleGenerate = () => {
    setLocation("/generate");
  };

  const handleHistory = () => {
    setLocation("/dashboard");
  };

  return (
    <div className="gradient-bg min-h-screen flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center shadow-lg">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="w-full h-full p-0 hover:bg-transparent text-black"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <h1 className="text-black text-xl font-bold">Warante</h1>
        <div className="w-10 h-10"></div> {/* Spacer for centering */}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center px-6 py-8">
        {/* Product Card */}
        <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-lg mb-8">
          {/* Bajaj Logo and Title */}
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src={bajajLogo} 
              alt="Bajaj Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h2 className="text-lg font-bold text-black">Bajaj Electric Fan</h2>
              <p className="text-gray-600 text-sm">Warrenty end on</p>
            </div>
          </div>
          
          {/* Upload Date */}
          <p className="text-gray-700 text-sm mb-4">
            Uploaded date on 19 June 2025 6:30pm
          </p>
          
          {/* Show Invoice Link */}
          <button className="text-[hsl(37,100%,50%)] font-semibold text-sm hover:underline">
            Show Invoice
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-6 mb-16">
          {/* Share Button */}
          <div className="flex flex-col items-center">
            <Button
              onClick={handleShare}
              className="w-14 h-14 bg-[#FCB523] hover:bg-[#E8A41F] text-black rounded-2xl p-0 shadow-lg"
            >
              <Share className="h-6 w-6" />
            </Button>
            <span className="text-black text-sm font-medium mt-2">Share</span>
          </div>

          {/* Copy Button */}
          <div className="flex flex-col items-center">
            <Button
              onClick={handleCopy}
              className="w-14 h-14 bg-[#FCB523] hover:bg-[#E8A41F] text-black rounded-2xl p-0 shadow-lg"
            >
              <Copy className="h-6 w-6" />
            </Button>
            <span className="text-black text-sm font-medium mt-2">Copy</span>
          </div>

          {/* All Button */}
          <div className="flex flex-col items-center">
            <Button
              onClick={() => setLocation("/all-products")}
              className="w-14 h-14 bg-[#FCB523] hover:bg-[#E8A41F] text-black rounded-2xl p-0 shadow-lg"
            >
              <Grid3X3 className="h-6 w-6" />
            </Button>
            <span className="text-black text-sm font-medium mt-2">All</span>
          </div>
        </div>

        {/* Decorative Circle */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[hsl(37,100%,50%)] rounded-full opacity-60"></div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm">
        <div className="flex items-center justify-around py-3 px-6">
          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className="flex flex-col items-center space-y-1 text-white/70 hover:text-white transition-colors"
          >
            <QrCode className="h-5 w-5" />
            <span className="text-xs font-medium">Generate</span>
          </button>

          {/* Center QR Button */}
          <div className="relative">
            <div className="w-14 h-14 bg-[#FF8C00] rounded-full flex items-center justify-center shadow-lg">
              <QrCode className="h-7 w-7 text-white" />
            </div>
          </div>

          {/* History Button */}
          <button
            onClick={handleHistory}
            className="flex flex-col items-center space-y-1 text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            <History className="h-5 w-5" />
            <span className="text-xs font-medium">History</span>
          </button>
        </div>
      </div>
    </div>
  );
}