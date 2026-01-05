import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface PermissionModalProps {
  open: boolean;
  onAllow: () => void;
  onDeny: () => void;
}

export function PermissionModal({ open, onAllow, onDeny }: PermissionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onDeny}>
      <DialogContent className="sm:max-w-sm mx-4 rounded-3xl">
        <div className="text-center p-2">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="text-[hsl(37,100%,50%)] h-10 w-10" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3">Camera Access Required</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We need access to your camera to scan QR codes. This helps us provide you with the best scanning experience.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={onAllow}
              className="w-full bg-[hsl(37,100%,50%)] hover:bg-[hsl(37,100%,45%)] text-white py-4 px-6 rounded-2xl font-semibold"
            >
              Allow Camera Access
            </Button>
            
            <Button 
              onClick={onDeny}
              variant="secondary"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium"
            >
              Not Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
