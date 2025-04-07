import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la redirection

const AdminLogin = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminChoice, setAdminChoice] = useState(null);
  const navigate = useNavigate(); // Initialiser useNavigate pour la redirection

  const handleLogin = async () => {
    try {
      const response = await fetch('https://depanne-tout-backend.vercel.app/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Envoie les données de connexion
      });

      const data = await response.json(); // Récupère la réponse du serveur

      if (response.ok) {
        setIsAuthenticated(true); // Si la connexion est réussie
        navigate('/admin/dashboard'); // Rediriger vers le tableau de bord admin après une connexion réussie
      } else {
        setError(data.message || 'Erreur inconnue'); // Affiche l'erreur du serveur
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('Erreur de connexion au serveur');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminChoice(null);
    setUsername('');
    setPassword('');
    navigate('/'); // Rediriger vers la page d'accueil ou une autre page après la déconnexion
  };

  const handleAddVehicle = () => {
    // Cette fonction est appelée pour afficher la modale d'ajout de véhicule
    setAdminChoice('addVehicle'); // On change l'état pour afficher la modale d'ajout
  };

  const handleBack = () => {
    setAdminChoice(null); // Retourner à la page principale du tableau de bord
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {!isAuthenticated ? (
          <>
            <h2 className="text-2xl mb-4">Admin Login</h2>
            {error && <p className="text-red-500">{error}</p>}

            <div>
              <label className="block mb-2">Nom d'utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez votre nom d'utilisateur"
                className="border p-2 w-full mb-4 text-black"
              />
            </div>

            <div>
              <label className="block mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="border p-2 w-full mb-4 text-black"
              />
            </div>

            <button onClick={handleLogin} className="bg-blue-500 text-white p-2 w-full">
              Se connecter
            </button>
            <button onClick={onClose} className="mt-4 bg-gray-500 text-white p-2 w-full">
              Fermer
            </button>
          </>
        ) : (
          <>
            {!adminChoice ? (
              <>
                <h2 className="text-2xl mb-4">Panneau Admin</h2>
                <button
                  onClick={handleAddVehicle}
                  className="bg-green-500 text-white p-2 w-full mb-4"
                >
                  Ajouter un véhicule
                </button>
                <button
                  onClick={() => setAdminChoice('settings')}
                  className="bg-yellow-500 text-white p-2 w-full"
                >
                  Modifier les informations
                </button>
                <button onClick={handleLogout} className="mt-4 bg-red-500 text-white p-2 w-full">
                  Se déconnecter
                </button>
              </>
            ) : adminChoice === 'addVehicle' ? (
              <AddVehicleForm onBack={handleBack} />
            ) : adminChoice === 'settings' ? (
              <ModifyInfo onBack={handleBack} />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

// Composant pour ajouter un véhicule
const AddVehicleForm = ({ onBack }) => {
  const [vehicle, setVehicle] = useState({
    brand: '',      // Marque
    model: '',      // Modèle
    price: '',
    image: [],
    carburant: '',
    mileage: '',
    specs: {
      moteur: '',
      puissance: '',
      transmission: '',
      propulsion: '',
    },
  });
  
  const [currentStep, setCurrentStep] = useState(1); // Pour gérer l'étape actuelle du formulaire

  // Validation de chaque champ
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleSpecsChange = (e) => {
    const { name, value } = e.target;
    setVehicle({
      ...vehicle,
      specs: {
        ...vehicle.specs,
        [name]: value,
      },
    });
  };

  // Avancer à l'étape suivante
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleAddVehicle = async () => {
    try {
      const response = await fetch('https://depanne-tout-backend.vercel.app/api/vehicles/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicle),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Véhicule ajouté avec succès !');
        onBack(); // Revenir au dashboard
      } else {
        alert(data.message || 'Erreur lors de l\'ajout');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du véhicule :', error);
      alert('Erreur serveur');
    }
  };
  

  // Affichage des champs en fonction de l'étape actuelle
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
  return (
    <div className="form-group">
      <label className="text-lg font-medium text-black">Marque</label>
      <input
        type="text"
        name="brand"
        value={vehicle.brand || ""}
        onChange={handleInputChange}
        className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
        placeholder="Entrez la marque du véhicule"
      />

      <label className="text-lg font-medium text-black mt-4 block">Modèle</label>
      <input
        type="text"
        name="model"
        value={vehicle.model || ""}
        onChange={handleInputChange}
        className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
        placeholder="Entrez le modèle du véhicule"
      />

      <button
        onClick={goToNextStep}
        className="bg-blue-500 text-white py-2 px-4 mt-6 rounded-md"
      >
        Suivant
      </button>
    </div>
  );

        case 2:
          return (
            <div className="form-group">
              <label className="text-lg font-medium text-black">Prix</label>
              <div className="relative mt-2">
                <input
                  type="number"
                  name="price"
                  value={vehicle.price}
                  onChange={handleInputChange}
                  className="w-full p-3 pr-14 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                  placeholder="Entrez le prix"
                />
                <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 font-medium">
                  €
                </span>
              </div>
        
              <button
                onClick={goToNextStep}
                className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md"
              >
                Suivant
              </button>
            </div>
          );
        
      
        case 3:
          return (
            <div className="form-group">
              <label className="text-lg font-medium text-black">Images du véhicule</label>
              <input
                type="file"
                accept="image/*"
                multiple // <== Permet la sélection multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  const readers = files.map(file => {
                    return new Promise((resolve, reject) => {
                      const reader = new FileReader();
                      reader.onloadend = () => resolve(reader.result);
                      reader.onerror = reject;
                      reader.readAsDataURL(file);
                    });
                  });
        
                  Promise.all(readers).then(imagesBase64 => {
                    setVehicle({
                      ...vehicle,
                      images: imagesBase64, // Tableau de base64
                    });
                  });
                }}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
        
              {/* Aperçu des images */}
              {vehicle.image.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {vehicle.image.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Véhicule ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md border"
                    />
                  ))}
                </div>
              )}
        
              <button
                onClick={goToNextStep}
                className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md"
              >
                Suivant
              </button>
            </div>
          );
        
          case 4:
            return (
              <div className="form-group">
                <label className="text-lg font-medium text-black mb-2 block">Type de carburant</label>
          
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Essence", "Diesel", "Électrique", "Hybride", "GPL", "Superéthanol E85"].map((fuel) => (
                    <button
                      key={fuel}
                      type="button"
                      onClick={() => setVehicle({ ...vehicle, carburant: fuel })}
                      className={`px-4 py-2 rounded-md border ${
                        vehicle.carburant === fuel
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-black border-gray-300"
                      } transition duration-150 ease-in-out`}
                    >
                      {fuel}
                    </button>
                  ))}
                </div>
          
                <button
                  onClick={goToNextStep}
                  className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md"
                >
                  Suivant
                </button>
              </div>
            );
          
          
            case 5:
              return (
                <div className="form-group">
                  <label className="text-lg font-medium text-black">Kilométrage</label>
                  <div className="relative mt-2">
                    <input
                      type="number"
                      name="mileage"
                      value={vehicle.mileage}
                      onChange={handleInputChange}
                      className="w-full p-3 pr-14 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                      placeholder="Entrez le kilométrage"
                    />
                    <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 font-medium">
                      KM
                    </span>
                  </div>
            
                  <button
                    onClick={goToNextStep}
                    className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md"
                  >
                    Suivant
                  </button>
                </div>
              );
            
              case 6:
  return (
    <div>
      <h3 className="text-xl font-semibold text-black mb-4">Spécifications (1/2)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="text-lg font-medium text-black">Moteur</label>
          <input
            type="text"
            name="moteur"
            value={vehicle.specs.moteur}
            onChange={handleSpecsChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            placeholder="Entrez le type de moteur"
          />
        </div>

        <div className="form-group">
          <label className="text-lg font-medium text-black">Puissance</label>
          <input
            type="text"
            name="puissance"
            value={vehicle.specs.puissance}
            onChange={handleSpecsChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            placeholder="Entrez la puissance"
          />
        </div>

        <div className="form-group">
          <label className="text-lg font-medium text-black">Puissance Fiscal</label>
          <input
            type="text"
            name="puissance"
            value={vehicle.specs.puissance}
            onChange={handleSpecsChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            placeholder="Entrez la puissance"
          />
        </div>
      </div>

      <button
        onClick={goToNextStep}
        className="bg-blue-500 text-white py-3 px-6 rounded-md mt-6"
      >
        Suivant
      </button>
    </div>
  );
  case 7:
    return (
      <div>
        <h3 className="text-xl font-semibold text-black mb-4">Spécifications (2/2)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="text-lg font-medium text-black">Transmission</label>
            <input
              type="text"
              name="transmission"
              value={vehicle.specs.transmission}
              onChange={handleSpecsChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              placeholder="Entrez la transmission"
            />
          </div>
  
          <div className="form-group">
            <label className="text-lg font-medium text-black">Propulsion</label>
            <input
              type="text"
              name="propulsion"
              value={vehicle.specs.propulsion}
              onChange={handleSpecsChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              placeholder="Entrez la propulsion"
            />
          </div>
        </div>
  
        <button
          onClick={handleAddVehicle}
          className="bg-green-500 text-white py-3 px-6 rounded-md mt-6"
        >
          Ajouter le véhicule
        </button>
      </div>
    );
  
              
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Ajouter un véhicule</h2>
      {renderFormStep()}
      <button
        onClick={onBack}
        className="bg-gray-500 text-white py-3 px-6 mt-6 rounded-md hover:bg-gray-600 focus:outline-none"
      >
        Retour
      </button>
    </div>
  );
};



// Composant pour modifier les informations
const ModifyInfo = ({ onBack }) => {
  const navigate = useNavigate(); // Initialiser useNavigate pour la redirection

  const handleModifyHours = () => {
    navigate('/modify-info'); // Redirige vers l'écran pour modifier les horaires
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Modifier les Informations</h2>
      <button
        onClick={handleModifyHours}
        className="bg-yellow-500 text-white p-2 w-full"
      >
        Modifier les Horaires
      </button>
      <button className="bg-yellow-500 text-white p-2 w-full mt-4">Modifier le Numéro de Téléphone</button>
      <button className="bg-yellow-500 text-white p-2 w-full mt-4">Modifier l'Email</button>
      <button onClick={onBack} className="mt-4 bg-gray-500 text-white p-2 w-full">
        Retour
      </button>
    </div>
  );
};

export default AdminLogin;
