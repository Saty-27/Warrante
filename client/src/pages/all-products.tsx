import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, QrCode, History } from "lucide-react";
import { useLocation } from "wouter";
import bajajLogo from "@assets/Bajaj_Auto_Ltd_logo.svg (1)_1750847690200.png";
import godrejLogo from "@assets/Bajaj_Auto_Ltd_logo.svg (3)_1750847690201.png";
import haierLogo from "@assets/Bajaj_Auto_Ltd_logo.svg (4)_1750847690201.png";
import hpLogo from "@assets/Bajaj_Auto_Ltd_logo.svg (5)_1750847690201.png";
import motorolaLogo from "@assets/Bajaj_Auto_Ltd_logo.svg (6)_1750847690201.png";

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
    scannedTime: "Scanned 7 month ago"
  },
  {
    id: "4",
    name: "Hp Laptop",
    logo: hpLogo,
    scannedTime: "Scanned 8 month ago"
  },
  {
    id: "5",
    name: "Motorol Mobile",
    logo: motorolaLogo,
    scannedTime: "Scanned month ago"
  }
];

export default function AllProducts() {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation("/result");
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
        <div className="w-10 h-10 bg-black/60 rounded-lg flex items-center justify-center shadow-lg">
          <Menu className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-6">
        {/* Tab Navigation */}
        <div className="bg-black/60 rounded-2xl p-1 mb-6 flex">
          <button className="flex-1 bg-[#FCB523] text-black py-3 px-4 rounded-xl font-semibold text-sm">
            All Products
          </button>
          <button className="flex-1 text-white py-3 px-4 font-semibold text-sm">
            Ending Soon
          </button>
          <button className="flex-1 text-white py-3 px-4 font-semibold text-sm">
            Ended
          </button>
        </div>

        {/* Product List */}
        <div className="space-y-4 pb-24">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => setLocation("/company-details")}
              className="bg-white rounded-2xl p-4 shadow-lg flex items-center space-x-4 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <img
                src={product.logo}
                alt={`${product.name} logo`}
                className="w-12 h-12 object-contain rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-black">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.scannedTime}</p>
              </div>
            </div>
          ))}
        </div>
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
            <div className="w-14 h-14 bg-[#FCB523] rounded-full flex items-center justify-center shadow-lg">
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