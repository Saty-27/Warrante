import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
  onRetry?: () => void;
}

export function ErrorModal({ open, message, onClose, onRetry }: ErrorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm mx-4 rounded-3xl">
        <div className="text-center p-2">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="text-red-600 h-10 w-10" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {message}
          </p>
          
          <div className="space-y-3">
            {onRetry && (
              <Button 
                onClick={onRetry}
                className="w-full bg-[hsl(37,100%,50%)] hover:bg-[hsl(37,100%,45%)] text-white py-4 px-6 rounded-2xl font-semibold"
              >
                Try Again
              </Button>
            )}
            
            <Button 
              onClick={onClose}
              variant="secondary"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
