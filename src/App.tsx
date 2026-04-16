import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  ArrowLeft, 
  Download, 
  WandSparkles, 
  Camera, 
  Lightbulb,
  ArrowLeftRight,
  Check,
  User
} from 'lucide-react';

// --- Components ---

const Header = () => (
  <nav className="h-[72px] px-10 flex items-center justify-between border-b border-border">
    <div className="font-bold text-[18px] tracking-tight flex items-center gap-2">
      <div className="w-6 h-6 bg-gradient-to-br from-accent to-[#5856D6] rounded-[6px]" />
      AMIR STUDIO PRO
    </div>
    <div className="hidden md:flex gap-8 text-[13px] font-medium text-text-dim">
      <span className="text-white cursor-pointer">Workspace</span>
      <span className="hover:text-white transition cursor-pointer">Lens Library</span>
      <span className="hover:text-white transition cursor-pointer">Batch Editor</span>
      <span className="hover:text-white transition cursor-pointer">Cloud Assets</span>
    </div>
    <div className="text-white cursor-pointer">
      <User className="w-6 h-6" />
    </div>
  </nav>
);

const Sidebar = ({ onReset }: { onReset: () => void }) => (
  <aside className="w-[280px] border-r border-border p-8 flex flex-col gap-10 overflow-y-auto">
    <div className="flex flex-col gap-4">
      <p className="text-[11px] font-bold text-text-dim uppercase tracking-[0.1em]">Neural Engine</p>
      <div className="tool-item active">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold">f/1.8 Bokeh</span>
          <span className="text-[11px] text-text-dim">Ultra Depth Mapping</span>
        </div>
        <Check className="w-4 h-4 text-accent" />
      </div>
      <div className="tool-item">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold">Object Removal</span>
          <span className="text-[11px] text-text-dim">Generative Fill v4</span>
        </div>
      </div>
      <div className="tool-item">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold">Face Pro</span>
          <span className="text-[11px] text-text-dim">Studio Relighting</span>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-4">
      <p className="text-[11px] font-bold text-text-dim uppercase tracking-[0.1em]">Optical Correction</p>
      <div className="tool-item">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold">Sony G-Master</span>
          <span className="text-[11px] text-text-dim">Lens Profile #882</span>
        </div>
      </div>
      <div className="tool-item">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold">Chromatic Aberr.</span>
          <span className="text-[11px] text-text-dim">Auto-Zero Enabled</span>
        </div>
      </div>
    </div>

    <button 
      onClick={onReset}
      className="mt-auto bg-white text-black py-3 px-6 rounded-full font-semibold text-[13px] hover:bg-gray-200 transition-colors"
    >
      Export Ultra HD
    </button>
  </aside>
);

const Footer = () => (
  <footer className="h-[48px] border-t border-border px-10 flex items-center justify-between text-[11px] text-text-dim">
    <div className="flex items-center gap-2 text-accent font-semibold uppercase tracking-[0.1em]">
      <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_var(--color-accent)]" />
      Neural Engine 4.0 Active
    </div>
    <div className="flex gap-6">
      <span>RAW 14-BIT • 42MP • ISO 100</span>
      <span>Amir AI Studio &copy; 2025</span>
    </div>
  </footer>
);

const ComparisonSlider = ({ before, after }: { before: string; after: string }) => {
  const [position, setPosition] = useState(45);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseUp = () => { isDragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => { if (isDragging.current) handleMove(e.clientX); };
  
  const onTouchStart = () => { isDragging.current = true; };
  const onTouchEnd = () => { isDragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => { if (isDragging.current) handleMove(e.touches[0].clientX); };

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-[20px] border border-border shadow-[0_40px_100px_rgba(0,0,0,0.8)] cursor-col-resize select-none"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* After Image (Enhanced) */}
      <img 
        src={after} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'contrast(1.1) saturate(1.2) brightness(1.1)' }}
        referrerPolicy="no-referrer"
      />
      
      {/* Before Image (Original) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden z-10"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, borderRight: '1.5px solid white' }}
      >
        <img 
          src={before} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'grayscale(0.5) blur(4px) brightness(0.8)' }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 z-20 w-10 flex items-center justify-center -translate-x-1/2"
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <div className="w-9 h-9 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] text-[10px] font-bold">
          |||
        </div>
      </div>

      {/* Labels */}
      <div className="label-tag top-6 left-6 bg-black/50 border border-white/20">
        Source
      </div>
      <div className="label-tag top-6 right-6 bg-accent">
        Neural Result
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing Engine...");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        startProcessing();
      };
      reader.readAsDataURL(file);
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setProgress(0);
    
    const steps = [
      "Removing wires & clutter...",
      "Applying f/1.8 Bokeh...",
      "Correcting Focal Length...",
      "Enhancing Sony Sharpness..."
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      
      if (currentProgress % 25 === 0) {
        setStatus(steps[Math.floor(currentProgress / 26)] || steps[steps.length - 1]);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 40);
  };

  const reset = () => {
    setImage(null);
    setIsProcessing(false);
    setProgress(0);
  };

  return (
    <div className="h-screen flex flex-col bg-bg font-sans">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar onReset={reset} />

        <main className="flex-1 bg-[radial-gradient(circle_at_center,#111111_0%,#050505_100%)] p-10 flex items-center justify-center relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!image && (
              <motion.div 
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center group cursor-pointer" 
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleUpload}
                />
                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-accent transition-all duration-700 shadow-2xl">
                  <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Upload your photo</h2>
                <p className="text-text-dim font-light text-base">Drag and drop or click to enhance your image</p>
              </motion.div>
            )}

            {image && isProcessing && (
              <motion.div 
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex items-center justify-center relative"
              >
                {/* Scan Line Animation */}
                <div className="absolute top-[20%] left-0 w-full h-0.5 bg-accent shadow-[0_0_15px_var(--color-accent)] animate-scan z-20 opacity-60" />
                
                <div className="relative w-48 h-48 mx-auto mb-12">
                  <div className="absolute inset-0 border-[6px] border-accent/10 rounded-full"></div>
                  <div className="absolute inset-0 border-[6px] border-t-accent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-3xl font-bold tracking-tighter">{progress}%</span>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-text-dim mt-1">Optimization</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-20 text-center">
                  <p className="text-sm font-medium tracking-[0.3em] text-accent uppercase animate-pulse">
                    {status}
                  </p>
                </div>
              </motion.div>
            )}

            {image && !isProcessing && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full"
              >
                <ComparisonSlider before={image} after={image} />
              </motion.div>
            )}
          </AnimatePresence>

        </main>
      </div>

      <Footer />
    </div>
  );
}
