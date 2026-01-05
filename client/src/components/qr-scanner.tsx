import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScannerOverlay } from "./scanner-overlay";
import { X, Flashlight, FlashlightOff } from "lucide-react";
import { useQrScanner } from "@/hooks/use-qr-scanner";

interface QrScannerProps {
  onResult: (result: string) => void;
  onError: (error: string) => void;
  onClose: () => void;
}

export function QrScanner({ onResult, onError, onClose }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const { startScanning, stopScanning, isScanning } = useQrScanner({
    videoRef,
    onResult,
    onError,
  });

  useEffect(() => {
    startScanning();
    document.body.style.overflow = 'hidden';
    
    return () => {
      stopScanning();
      document.body.style.overflow = 'auto';
    };
  }, [startScanning, stopScanning]);

  const handleClose = () => {
    stopScanning();
    onClose();
  };

  const toggleFlash = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const track = stream.getVideoTracks()[0];
      
      if (track && 'applyConstraints' in track) {
        try {
          await track.applyConstraints({
            advanced: [{ torch: !flashEnabled } as any]
          });
          setFlashEnabled(!flashEnabled);
        } catch (error) {
          console.warn('Flash not supported on this device');
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        muted
      />
      
      <ScannerOverlay />
      
      {/* Scanner controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="text-center mb-6">
          <p className="text-white text-lg font-medium">Position QR code within the frame</p>
          <p className="text-white/70 text-sm mt-1">Scanning will happen automatically</p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleClose}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-3 px-8 rounded-2xl font-medium"
            variant="ghost"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
          
          <Button
            onClick={toggleFlash}
            className="bg-[hsl(37,100%,50%)] hover:bg-[hsl(37,100%,45%)] text-white py-3 px-8 rounded-2xl font-medium"
          >
            {flashEnabled ? (
              <FlashlightOff className="mr-2 h-4 w-4" />
            ) : (
              <Flashlight className="mr-2 h-4 w-4" />
            )}
            Flash
          </Button>
        </div>
      </div>
    </div>
  );
}
