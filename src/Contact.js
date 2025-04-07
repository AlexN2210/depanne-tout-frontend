import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 bg-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <h2 className="section-title font-bold text-gray-400 text-3xl">Contactez-nous</h2>
        <p className="section-subtitle text-gray-400">
        Planifiez un rendez-vous pour un service ou renseignez-vous sur nos véhicules
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Informations de contact</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white">Localisation</p>
                    <p className="text-gray-400">6 av Charles de Gaulle, 87190 Magnac Laval</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white">Téléphone 📞
                    </p>
                    <p className="text-gray-400">05 87 77 95 64</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white">Email</p>
                    <p className="text-gray-400">sas.depannetout@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white">Horaire d'ouverture</p>
                    <div className="text-gray-400">
                    <p>Lundi - Vendredi : 8h00 - 18h00</p>
<p>Samedi : 9h00 - 16h00</p>
<p>Dimanche : Fermé</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input 
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Motif de contact
                </label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Sélectionnez un service</option>
<option>Optimisation des performances</option>
<option>Service d'entretien</option>
<option>Achat de véhicule</option>
<option>Essai de conduite</option>
<option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <span>Envoyer le message</span>
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
