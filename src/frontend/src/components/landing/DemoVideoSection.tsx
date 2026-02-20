import { Play } from 'lucide-react';
import { useState } from 'react';
import VideoModal from './VideoModal';

export default function DemoVideoSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 px-6 bg-muted/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          See It In Action
        </h2>
        
        <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <div className="relative aspect-video bg-gradient-to-br from-primary to-secondary rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
            {/* Placeholder thumbnail */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0d7377] to-[#1a1a2e]">
              <div className="text-white text-center">
                <div className="text-6xl font-bold mb-4">NEXY MYNDIS</div>
                <div className="text-xl opacity-80">Platform Demo</div>
              </div>
            </div>
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 group-hover:bg-black/30">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                <Play className="w-12 h-12 text-primary ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
