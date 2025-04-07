import React, { useState } from 'react';
import TimePicker from 'react-time-picker'; // Importation du composant TimePicker

const ModifyInfo = ({ onBack }) => {
  const [openTime, setOpenTime] = useState('09:00'); // Horaire d'ouverture
  const [closeTime, setCloseTime] = useState('18:00'); // Horaire de fermeture
  const [isEditingHours, setIsEditingHours] = useState(false); // État pour afficher/masquer l'éditeur d'horaires

  const handleSaveHours = () => {
    // Logique pour sauvegarder les horaires
    console.log('Horaires enregistrés:', openTime, closeTime);
    setIsEditingHours(false); // Fermer l'éditeur après la sauvegarde
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Modifier les Informations</h2>
      <button
        onClick={() => setIsEditingHours(true)}
        className="bg-yellow-500 text-white p-2 w-full"
      >
        Modifier les Horaires
      </button>

      {isEditingHours && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md">
          <div className="mb-4">
            <label className="block text-lg font-medium">Horaire d'ouverture</label>
            <TimePicker
              value={openTime}
              onChange={setOpenTime}
              className="w-full p-2 border border-gray-300 rounded-md"
              clearIcon={null}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium">Horaire de fermeture</label>
            <TimePicker
              value={closeTime}
              onChange={setCloseTime}
              className="w-full p-2 border border-gray-300 rounded-md"
              clearIcon={null}
            />
          </div>
          <button
            onClick={handleSaveHours}
            className="bg-green-500 text-white p-2 w-full mt-4"
          >
            Enregistrer les Horaires
          </button>
          <button
            onClick={() => setIsEditingHours(false)}
            className="bg-gray-500 text-white p-2 w-full mt-4"
          >
            Annuler
          </button>
        </div>
      )}

      <button className="bg-yellow-500 text-white p-2 w-full mt-4">Modifier le Numéro de Téléphone</button>
      <button className="bg-yellow-500 text-white p-2 w-full mt-4">Modifier l'Email</button>
      <button onClick={onBack} className="mt-4 bg-gray-500 text-white p-2 w-full">
        Retour
      </button>
    </div>
  );
};

export default ModifyInfo;
