import React from "react";
import { Settings, Battery, Gauge, Wrench, Car, PenTool as Tool } from "lucide-react";

const services = [
  {
    icon: Settings,
    title: "Optimisation des Performances",
    description: "Réglage expert du moteur et optimisation des performances pour une puissance et une efficacité maximales",
  },
  {
    icon: Battery,
    title: "Systèmes Électriques",
    description: "Diagnostics électriques complets et réparations utilisant des technologies de pointe",
  },
  {
    icon: Tool,
    title: "Entretien Premium",
    description: "Entretien planifié et soins préventifs pour garder votre véhicule en parfait état",
  },
  {
    icon: Gauge,
    title: "Diagnostics Avancés",
    description: "Diagnostics informatisés à la pointe pour une identification précise des problèmes",
  },
  {
    icon: Wrench,
    title: "Réparations Expertes",
    description: "Réparations professionnelles pour tous les problèmes mécaniques, garanties par notre qualité",
  },
  {
    icon: Car,
    title: "Travaux de Carrosserie Personnalisés",
    description: "Réparations de carrosserie premium, modifications sur mesure et services de peinture professionnels",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="section-title text-4xl font-bold">Nos Prestations</h2>
      <p className="section-subtitle">
        Des solutions automobiles complètes, réalisées avec précision et expertise
      </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="card p-8 group">
                <div className="text-blue-600 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                <div className="mt-6">
                  <a
                    href="#contact"
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                   En savoir plus →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;