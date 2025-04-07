import React, { useState } from 'react';

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState([
    // Exemple de données de véhicules dans l'état
    { id: 1, name: 'BMW M4', price: '77 341 €', image: 'https://via.placeholder.com/150', specs: {} },
    { id: 2, name: 'Porsche 911', price: '129 900 €', image: 'https://via.placeholder.com/150', specs: {} },
  ]);
  const [contactInfo, setContactInfo] = useState({
    phone: '0123456789',
    email: 'contact@exemple.com',
    hours: 'Lundi - Vendredi: 9h - 18h',
  });
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    image: '',
    name: '',
    price: '',
    rating: '',
    mileage: '',
    specs: {
      moteur: '',
      puissance: '',
      transmission: '',
      propulsion: '',
    },
  });

  const handleAddVehicle = () => {
    if (
      !newVehicle.name ||
      !newVehicle.price ||
      !newVehicle.image ||
      !newVehicle.specs.moteur ||
      !newVehicle.specs.puissance ||
      !newVehicle.specs.transmission ||
      !newVehicle.specs.propulsion
    ) {
      alert('Please fill in all fields');
      return; // Alerte si champs manquant 
    }

    const vehicleToAdd = { ...newVehicle, id: vehicles.length + 1 };
    setVehicles([...vehicles, vehicleToAdd]);
    setIsAddVehicleModalOpen(false); // Fermer la modale après ajout
    setNewVehicle({
      image: '',
      name: '',
      price: '',
      rating: '',
      mileage: '',
      specs: {
        moteur: '',
        puissance: '',
        transmission: '',
        propulsion: '',
      },
    }); // Réinitialiser les champs
  };

  const handleDeleteVehicle = (id) => {
    const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== id);
    setVehicles(updatedVehicles);
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('specs')) {
      const specName = name.split('.')[1];
      setNewVehicle({
        ...newVehicle,
        specs: { ...newVehicle.specs, [specName]: value },
      });
    } else {
      setNewVehicle({
        ...newVehicle,
        [name]: value,
      });
    }
  };

  return (
    <div className="admin-dashboard p-8">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <section className="vehicles-management mb-8">
        <h3 className="text-xl font-semibold mb-4">Manage Vehicles</h3>
        <button
          onClick={() => setIsAddVehicleModalOpen(true)}
          className="bg-green-500 text-white p-2 rounded mb-4"
        >
          Add New Vehicle
        </button>
        <div className="vehicle-list">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-item flex items-center mb-4 p-4 border-b">
              <img src={vehicle.image} alt={vehicle.name} className="w-20 h-20 object-cover mr-4" />
              <div className="vehicle-details flex-grow">
                <h4 className="text-lg font-medium">{vehicle.name}</h4>
                <p className="text-sm">{vehicle.price}</p>
              </div>
              <button
                onClick={() => handleDeleteVehicle(vehicle.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-info-management">
        <h3 className="text-xl font-semibold mb-4">Update Contact Information</h3>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={contactInfo.phone}
            onChange={handleContactInfoChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={contactInfo.email}
            onChange={handleContactInfoChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Operating Hours</label>
          <input
            type="text"
            name="hours"
            value={contactInfo.hours}
            onChange={handleContactInfoChange}
            className="border p-2 w-full"
          />
        </div>
      </section>

      {/* Modale d'ajout de véhicule */}
      {isAddVehicleModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl mb-4">Add New Vehicle</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddVehicle(); }}>
            <div>
  <label className="block mb-2">Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewVehicle({ ...newVehicle, image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    }}
    className="border p-2 w-full mb-4"
  />

  {newVehicle.image && (
    <img
      src={newVehicle.image}
      alt="Preview"
      className="w-full h-40 object-cover mb-4 rounded"
    />
  )}
</div>


              <div>
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newVehicle.name}
                  onChange={handleVehicleChange}
                  placeholder="Vehicle Name"
                  className="border p-2 w-full mb-4 text-black"
                />
              </div>

              <div>
                <label className="block mb-2">Price</label>
                <input
                  type="text"
                  name="price"
                  value={newVehicle.price}
                  onChange={handleVehicleChange}
                  placeholder="Price"
                  className="border p-2 w-full mb-4 text-black"
                />
              </div>

              <div>
                <label className="block mb-2">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={newVehicle.rating}
                  onChange={handleVehicleChange}
                  placeholder="Rating"
                  className="border p-2 w-full mb-4 text-black"
                />
              </div>

              <div>
                <label className="block mb-2">Mileage</label>
                <input
                  type="text"
                  name="mileage"
                  value={newVehicle.mileage}
                  onChange={handleVehicleChange}
                  placeholder="Mileage"
                  className="border p-2 w-full mb-4 text-black"
                />
              </div>

              <div>
                <h3 className="text-lg mb-2">Specifications</h3>
                <div>
                  <label className="block mb-2">Moteur</label>
                  <input
                    type="text"
                    name="specs.moteur"
                    value={newVehicle.specs.moteur}
                    onChange={handleVehicleChange}
                    placeholder="Moteur"
                    className="border p-2 w-full mb-4 text-black"
                  />
                </div>
                <div>
                  <label className="block mb-2">Puissance</label>
                  <input
                    type="text"
                    name="specs.puissance"
                    value={newVehicle.specs.puissance}
                    onChange={handleVehicleChange}
                    placeholder="Puissance"
                    className="border p-2 w-full mb-4 text-black"
                  />
                </div>
                <div>
                  <label className="block mb-2">Transmission</label>
                  <input
                    type="text"
                    name="specs.transmission"
                    value={newVehicle.specs.transmission}
                    onChange={handleVehicleChange}
                    placeholder="Transmission"
                    className="border p-2 w-full mb-4 text-black"
                  />
                </div>
                <div>
                  <label className="block mb-2">Propulsion</label>
                  <input
                    type="text"
                    name="specs.propulsion"
                    value={newVehicle.specs.propulsion}
                    onChange={handleVehicleChange}
                    placeholder="Propulsion"
                    className="border p-2 w-full mb-4 text-black"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddVehicleModalOpen(false)}
                  className="bg-gray-500 text-white p-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
