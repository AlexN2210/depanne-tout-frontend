import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import Vehicles from './Vehicles';
import Contact from './Contact';
import Footer from './Footer';
import AdminDashboard from './AdminDashboard'; // Page admin
import AdminLogin from './AdminLogin'; // Modale de connexion admin
import ModifyInfo from './ModifyInfo';  // Import de ModifyInfo

import { useState } from 'react';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);  // Connexion réussie de l'admin
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false); // Déconnexion de l'admin
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Services />
        <Vehicles />
        <Contact />
        <Footer />
      </div>

      {/* Routes */}
      <Routes>
        {/* Route pour la page d'admin */}
        <Route
          path="/admin-dashboard"
          element={isAdminLoggedIn ? <AdminDashboard onLogout={handleAdminLogout} /> : <Navigate to="/admin-login" />}
        />

        {/* Route pour la page de connexion de l'admin */}
        <Route
          path="/admin-login"
          element={<AdminLogin onLogin={handleAdminLogin} />}
        />

        {/* Routes pour modifier les informations */}
        <Route path="/modify-info" element={<ModifyInfo />} />
        

        {/* Routes par défaut */}
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
