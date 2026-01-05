import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink, Copy, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultModalProps {
  open: boolean;
  result: string;
  onClose: () => void;
  onScanAgain: () => void;
}

export function ResultModal({ open, result, onClose, onScanAgain }: ResultModalProps) {
  const { toast } = useToast();

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "QR code content copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const shareResult = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QR Code Result',
          text: result,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      copyResult(); // Fallback to copy
    }
  };

  const openResult = () => {
    if (result.startsWith('http')) {
      window.open(result, '_blank');
    } else {
      toast({
        title: "Not a URL",
        description: "This QR code doesn't contain a valid web link",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-3xl p-0 overflow-hidden">
        <div className="p-6">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">QR Code Scanned!</h3>
            <p className="text-gray-600">Here's what we found:</p>
          </div>
          
          {/* Scanned content */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="text-gray-800 font-mono text-sm break-all">
              {result}
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="space-y-3">
            <Button 
              onClick={openResult}
              className="w-full bg-[hsl(37,100%,50%)] hover:bg-[hsl(37,100%,45%)] text-white py-4 px-6 rounded-2xl font-semibold"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Link
            </Button>
            
            <div className="flex space-x-3">
              <Button 
                onClick={copyResult}
                variant="secondary"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              
              <Button 
                onClick={shareResult}
                variant="secondary"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            
            <Button 
              onClick={onScanAgain}
              variant="outline"
              className="w-full border-2 border-[hsl(37,100%,50%)] text-[hsl(37,100%,50%)] hover:bg-[hsl(37,100%,50%)] hover:text-white py-3 px-6 rounded-2xl font-semibold"
            >
              Scan Another Code
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
