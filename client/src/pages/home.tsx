import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrScanner } from "@/components/qr-scanner";
import { PermissionModal } from "@/components/permission-modal";
import { ResultModal } from "@/components/result-modal";
import { ErrorModal } from "@/components/error-modal";
import { ArrowRight, QrCode } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useLocation } from "wouter";

export default function Home() {
  const [showScanner, setShowScanner] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const [, setLocation] = useLocation();

  const handleStartScan = () => {
    // Redirect to profile page
    setLocation("/profile");
  };

  const handlePermissionGranted = () => {
    setHasPermission(true);
    setShowPermissionModal(false);
    setShowScanner(true);
  };

  const handlePermissionDenied = () => {
    setShowPermissionModal(false);
    setErrorMessage("Camera access is required to scan QR codes. Please allow camera access in your browser settings.");
    setShowErrorModal(true);
  };

  const handleScanResult = (result: string) => {
    setScanResult(result);
    setShowScanner(false);
    setShowResultModal(true);
  };

  const handleScanError = (error: string) => {
    setErrorMessage(error);
    setShowScanner(false);
    setShowErrorModal(true);
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "/api/auth/google";
    } catch (error) {
      setErrorMessage("Failed to connect to Google. Please try again.");
      setShowErrorModal(true);
    }
  };

  const handleScanAgain = () => {
    setShowResultModal(false);
    setShowScanner(true);
  };

  if (showScanner) {
    return (
      <QrScanner
        onResult={handleScanResult}
        onError={handleScanError}
        onClose={() => setShowScanner(false)}
      />
    );
  }

  return (
    <div className="gradient-bg min-h-screen flex flex-col relative overflow-hidden">
      {/* Header section with QR icon */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="text-center max-w-md mx-auto">
          {/* QR Scanner Icon with corner brackets */}
          <div className="mb-6 sm:mb-8">
            <div className="scanner-corners w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto relative">
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                {/* QR Code Grid Pattern */}
                <div className="grid grid-cols-3 gap-1 sm:gap-2">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-800 rounded"></div>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-transparent border-2 border-gray-800"></div>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-800 rounded"></div>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-transparent border-2 border-gray-800"></div>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-800"></div>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-transparent border-2 border-gray-800"></div>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-800 rounded"></div>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-transparent border-2 border-gray-800"></div>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-800 rounded"></div>
                </div>
              </div>
              <div className="bottom-corners"></div>
            </div>
          </div>
          
          <div className="text-white/90 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide text-center leading-tight px-2">
            <span className="text-white">Warante</span>
            <br />
            <span className="text-white/90">Scan and Save</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Panel */}
      <div className="floating-panel bg-[hsl(0,0%,17%)] rounded-t-3xl p-4 sm:p-6 pb-6 sm:pb-8 mx-2 sm:mx-0">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-2">Warante</h2>
          <p className="text-white/70 text-sm sm:text-base px-2">Point your camera at any QR code to scan</p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3 sm:space-y-4 max-w-sm mx-auto">
          {/* Let's Go Button */}
          <Button 
            onClick={handleStartScan}
            className="button-hover w-full bg-[hsl(37,100%,50%)] hover:bg-[hsl(37,100%,45%)] text-white py-4 sm:py-6 px-4 sm:px-6 rounded-2xl font-semibold text-base sm:text-lg shadow-lg transition-all duration-200 hover:scale-105"
            size="lg"
          >
            <span>Let's Go</span>
            <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          
          {/* Google Login Button */}
          <Button 
            onClick={handleGoogleLogin}
            className="button-hover w-full bg-[hsl(45,100%,50%)] hover:bg-[hsl(45,100%,45%)] text-[hsl(0,0%,17%)] py-4 sm:py-6 px-4 sm:px-6 rounded-2xl font-semibold text-base sm:text-lg shadow-lg transition-all duration-200 hover:scale-105"
            size="lg"
          >
            <FaGoogle className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
            <span>Login With Google</span>
            <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      {/* Modals */}
      <PermissionModal
        open={showPermissionModal}
        onAllow={handlePermissionGranted}
        onDeny={handlePermissionDenied}
      />

      <ResultModal
        open={showResultModal}
        result={scanResult}
        onClose={() => setShowResultModal(false)}
        onScanAgain={handleScanAgain}
      />

      <ErrorModal
        open={showErrorModal}
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
        onRetry={() => {
          setShowErrorModal(false);
          handleStartScan();
        }}
      />
    </div>
  );
}
