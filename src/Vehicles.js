import React, { useState, useEffect } from 'react';
import { Clock, Fuel } from 'lucide-react';
import Slider from "react-slick"; 


const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("https://depannetoutbackend.vercel.app/api/vehicles");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setVehicles(data);
      } catch (err) {
        console.error("Erreur lors du chargement des véhicules :", err);
      }
    };
  
    fetchVehicles();
  }, []);
  

  const settings = {
    dots: true,
    infinite: vehicles.length > 1, // ✅ active seulement s'il y a plus d'un véhicule
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: (
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3">
        &#8592;
      </div>
    ),
    nextArrow: (
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3">
        &#8594;
      </div>
    ),
  };
  

  return (
    <section id="vehicles" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold">Nos Véhicules en Vente</h2>
        <p className="section-subtitle">
          Découvrez notre sélection de véhicules soigneusement
        </p>

        <Slider {...settings}>
          {vehicles.map((vehicle, index) => (
            <div 
              key={index}
              className="card overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={vehicle.images[0]} 
                  alt={vehicle.name}
                  className={`w-full h-full object-contain transition-transform duration-700 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                />
                
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{vehicle.name}</h3>
                  <p className="text-2xl text-blue-600 font-bold whitespace-nowrap">
                    {vehicle.price.toLocaleString()} €
                  </p>
                </div>

                <div className="flex items-center space-x-4 mb-6 text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{vehicle.mileage} km</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="h-4 w-4 mr-1" />
                    <span>{vehicle.carburant}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  {vehicle.specs && Object.entries(vehicle.specs).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-2 rounded">
                      <span className="text-gray-600 block">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <button className="btn-primary w-full">
                  Contactez-nous pour en savoir plus 😊✨
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Vehicles;
