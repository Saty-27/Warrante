import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Image, Zap, RotateCcw, Plus, QrCode, History, Minus, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Generate() {
  const [, setLocation] = useLocation();
  const [zoomLevel, setZoomLevel] = useState(30);

  const handleBack = () => {
    setLocation("/dashboard");
  };

  const handleGenerate = () => {
    // Current page - do nothing or show current state
    console.log("Already on generate page");
  };

  const handleHistory = () => {
    setLocation("/dashboard");
  };

  const handleZoomIn = () => {
    setZoomLevel(Math.min(100, zoomLevel + 10));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(0, zoomLevel - 10));
  };

  return (
    <div className="min-h-screen bg-gray-500 text-white relative overflow-hidden" style={{
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(120, 200, 120, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 120, 120, 0.2) 0%, transparent 50%)
      `
    }}>
      {/* Header */}
      <div className="relative flex items-center justify-center p-4 pt-8">
        {/* Back Button */}
        <Button
          onClick={handleBack}
          variant="ghost"
          className="absolute left-4 top-8 w-10 h-10 p-0 bg-gray-700/80 backdrop-blur-sm hover:bg-gray-600/50 text-white rounded-xl"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        {/* App Title */}
        <h1 className="text-white text-xl font-bold">Warante</h1>
        
        {/* Right Side Controls */}
        <div className="absolute right-4 top-8 flex items-center space-x-2 bg-gray-700/80 backdrop-blur-sm rounded-2xl px-4 py-3">
          <Button
            variant="ghost"
            className="w-8 h-8 p-0 bg-transparent hover:bg-gray-600/50 text-white rounded-lg"
          >
            <Image className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            className="w-8 h-8 p-0 bg-transparent hover:bg-gray-600/50 text-white rounded-lg"
          >
            <Zap className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            className="w-8 h-8 p-0 bg-transparent hover:bg-gray-600/50 text-white rounded-lg"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* QR Code Scanner Area */}
      <div className="flex-1 flex items-center justify-center px-8 py-8">
        <div className="relative">
          {/* QR Code Scanner Frame */}
          <div className="w-72 h-72 relative">
            {/* Corner brackets - Exact orange color and shape */}
            <div className="absolute -top-2 -left-2 w-12 h-12">
              <div className="absolute top-0 left-0 w-10 h-4 bg-[#FF8C00] rounded-br-xl"></div>
              <div className="absolute top-0 left-0 w-4 h-10 bg-[#FF8C00] rounded-br-xl"></div>
            </div>
            
            <div className="absolute -top-2 -right-2 w-12 h-12">
              <div className="absolute top-0 right-0 w-10 h-4 bg-[#FF8C00] rounded-bl-xl"></div>
              <div className="absolute top-0 right-0 w-4 h-10 bg-[#FF8C00] rounded-bl-xl"></div>
            </div>
            
            <div className="absolute -bottom-2 -left-2 w-12 h-12">
              <div className="absolute bottom-0 left-0 w-10 h-4 bg-[#FF8C00] rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-4 h-10 bg-[#FF8C00] rounded-tr-xl"></div>
            </div>
            
            <div className="absolute -bottom-2 -right-2 w-12 h-12">
              <div className="absolute bottom-0 right-0 w-10 h-4 bg-[#FF8C00] rounded-tl-xl"></div>
              <div className="absolute bottom-0 right-0 w-4 h-10 bg-[#FF8C00] rounded-tl-xl"></div>
            </div>

            {/* QR Code Area with dotted background */}
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden"
                 style={{
                   backgroundImage: `radial-gradient(circle, #ccc 1px, transparent 1px)`,
                   backgroundSize: '8px 8px'
                 }}>
              
              {/* QR Code Pattern */}
              <div className="w-48 h-48 bg-white relative">
                {/* Top-left finder pattern */}
                <div className="absolute top-2 left-2 w-12 h-12 bg-black">
                  <div className="absolute top-1 left-1 w-10 h-10 bg-white">
                    <div className="absolute top-2 left-2 w-6 h-6 bg-black"></div>
                  </div>
                </div>
                
                {/* Top-right finder pattern */}
                <div className="absolute top-2 right-2 w-12 h-12 bg-black">
                  <div className="absolute top-1 left-1 w-10 h-10 bg-white">
                    <div className="absolute top-2 left-2 w-6 h-6 bg-black"></div>
                  </div>
                </div>
                
                {/* Bottom-left finder pattern */}
                <div className="absolute bottom-2 left-2 w-12 h-12 bg-black">
                  <div className="absolute top-1 left-1 w-10 h-10 bg-white">
                    <div className="absolute top-2 left-2 w-6 h-6 bg-black"></div>
                  </div>
                </div>
                
                {/* Data pattern in middle */}
                <div className="absolute top-16 left-16 w-16 h-16">
                  {Array.from({ length: 64 }, (_, i) => {
                    const isBlack = Math.random() > 0.5;
                    return (
                      <div
                        key={i}
                        className={`w-2 h-2 inline-block ${isBlack ? 'bg-black' : 'bg-white'}`}
                      />
                    );
                  })}
                </div>
                
                {/* Timing patterns */}
                <div className="absolute top-12 left-0 right-0 h-2">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 inline-block ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`}
                    />
                  ))}
                </div>
                <div className="absolute left-12 top-0 bottom-0 w-2">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 block ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Scanning line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#FF8C00] shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Zoom Control */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleZoomOut}
            variant="ghost"
            className="w-8 h-8 p-0 text-white hover:bg-white/20 rounded-full"
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <div className="w-32 h-1 bg-white/40 rounded-full relative">
            <div 
              className="absolute top-0 left-0 h-full bg-white/80 rounded-full"
              style={{ width: `${zoomLevel}%` }}
            ></div>
            <div 
              className="absolute top-1/2 w-3 h-3 bg-[#FF8C00] rounded-full transform -translate-y-1/2"
              style={{ left: `${zoomLevel}%`, transform: 'translateY(-50%) translateX(-50%)' }}
            ></div>
          </div>
          
          <Button
            onClick={handleZoomIn}
            variant="ghost"
            className="w-8 h-8 p-0 text-white hover:bg-white/20 rounded-full"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm">
        <div className="flex items-center justify-around py-3 px-6">
          {/* Generate Button - Active */}
          <button
            onClick={handleGenerate}
            className="flex flex-col items-center space-y-1 text-white transition-colors"
          >
            <QrCode className="h-5 w-5" />
            <span className="text-xs font-medium">Generate</span>
          </button>

          {/* Center Plus Button */}
          <div className="relative">
            <button
              onClick={() => setLocation("/product-details")}
              className="w-14 h-14 bg-[#FF8C00] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FF7C00] transition-colors"
            >
              <Plus className="h-7 w-7 text-white" />
            </button>
          </div>

          {/* History Button */}
          <button
            onClick={handleHistory}
            className="flex flex-col items-center space-y-1 text-white/70 hover:text-white transition-colors"
          >
            <History className="h-5 w-5" />
            <span className="text-xs font-medium">History</span>
          </button>
        </div>
      </div>
    </div>
  );
}