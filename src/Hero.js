import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen">
      
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2500")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-white px-4">
        <div className="text-center max-w-4xl mx-auto fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          L'Excellence au Service de votre
            <span className="text-blue-500"> Véhicule</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300">
          Service de qualité, entretien soigné et expertise incomparable pour prendre soin de votre voiture
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#services" className="btn-primary w-full sm:w-auto">
            Découvrez nos services
            </a>
            <a 
              href="#vehicles" 
              className="btn-primary w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            >
              Découvrez nos véhicules en vente
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/70" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
