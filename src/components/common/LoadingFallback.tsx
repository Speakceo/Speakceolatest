const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="text-center">
      {/* Animated logo pulse */}
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-[#1876D2]/20 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-[#1876D2]/30 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#1876D2] to-[#00B0FF] shadow-lg shadow-[#1876D2]/40" />
      </div>
      <p className="text-gray-500 text-sm font-medium tracking-wider uppercase">Loading...</p>
    </div>
  </div>
);

export default LoadingFallback;
