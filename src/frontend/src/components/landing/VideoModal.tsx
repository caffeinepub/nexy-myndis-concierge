import { X } from 'lucide-react';
import { useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-card rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="aspect-video bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <div className="text-white text-center p-12">
            <div className="text-5xl font-bold mb-6">NEXY MYNDIS</div>
            <div className="text-2xl opacity-90 mb-8">Interactive Platform Demo</div>
            <div className="text-lg opacity-80 max-w-2xl mx-auto">
              Experience how NEXY MYNDIS simplifies NDIS plan management, provider connections, and goal tracking in one seamless platform.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
