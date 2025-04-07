import React, { useState } from 'react';
import { User } from 'lucide-react';  // Utilisation de l'icône User de lucide-react
import AdminLogin from './AdminLogin'; // Import de la modale de connexion

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // Gère l'état de la modale
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Gère l'état de connexion

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    closeModal();
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        {/* Icone utilisateur */}
        <div onClick={openModal} className="cursor-pointer">
          <User className="h-8 w-8 mx-auto" />
        </div>

        {/* Affiche le statut de l'utilisateur (Connecté ou non) */}
        {isLoggedIn ? (
          <p className="mt-4">Vous êtes connecté en tant qu'administrateur</p>
        ) : (
          <p className="mt-4">Non connecté</p>
        )}
      </div>

      {/* Modale de connexion */}
      <AdminLogin isOpen={isModalOpen} onClose={closeModal} onLogin={handleLoginSuccess} />
    </footer>
  );
};

export default Footer;
