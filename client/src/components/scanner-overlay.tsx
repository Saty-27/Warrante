export function ScannerOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Camera overlay with corner guides */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white/50 rounded-3xl">
        {/* Top corners */}
        <div className="absolute -top-1 -left-1 w-8 h-8 border-4 border-[hsl(37,100%,50%)] border-r-transparent border-b-transparent rounded-tl-3xl"></div>
        <div className="absolute -top-1 -right-1 w-8 h-8 border-4 border-[hsl(37,100%,50%)] border-l-transparent border-b-transparent rounded-tr-3xl"></div>
        
        {/* Bottom corners */}
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-4 border-[hsl(37,100%,50%)] border-r-transparent border-t-transparent rounded-bl-3xl"></div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-4 border-[hsl(37,100%,50%)] border-l-transparent border-t-transparent rounded-br-3xl"></div>
        
        {/* Scanning line */}
        <div className="scan-line absolute top-0 left-0 w-full"></div>
      </div>
    </div>
  );
}
