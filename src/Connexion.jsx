import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
 
export default function Connexion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [erreur, setErreur] = useState('');
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = () => {
    if (!form.email || !form.password) {
      setErreur("Veuillez remplir tous les champs.");
      return;
    }
 
    // Récupérer l'utilisateur sauvegardé lors de l'inscription
    const utilisateurSauvegarde = localStorage.getItem('utilisateur');
 
    if (!utilisateurSauvegarde) {
      setErreur("Aucun compte trouvé. Veuillez d'abord vous inscrire.");
      return;
    }
 
    const utilisateur = JSON.parse(utilisateurSauvegarde);
 
    // Vérifier l'email
    if (utilisateur.email !== form.email) {
      setErreur("Email ou mot de passe incorrect.");
      return;
    }
 
    // Connexion réussie — marquer comme connecté
    localStorage.setItem('connecte', 'true');
 
    // Rediriger vers le profil (le type est déjà dans localStorage)
    navigate('/profil');
  };
 
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f7f7', fontFamily: 'Arial, sans-serif' }}>
 
      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#fff', padding: '15px 40px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={() => navigate('/')} style={{ color: '#7cb342', margin: 0, fontSize: '26px', cursor: 'pointer' }}>
          freelance<span style={{ color: '#333' }}>Platform</span>
        </h1>
        <span style={{ cursor: 'pointer', color: '#333', fontSize: '14px' }}
          onClick={() => navigate('/inscription')}>
          Pas de compte ? <strong style={{ color: '#7cb342' }}>S'inscrire</strong>
        </span>
      </nav>
 
      {/* HEADER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ background: 'linear-gradient(135deg,#1a1a2e,#2a2a4e)',
          padding: '40px', textAlign: 'center', color: 'white' }}>
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '36px', fontWeight: '900',
            fontFamily: 'EB Garamond, Georgia, serif', marginBottom: '8px' }}>
          Connexion
        </motion.h2>
        <p style={{ opacity: 0.8 }}>Bon retour sur FreelancePlatform</p>
      </motion.div>
 
      <div style={{ maxWidth: '480px', margin: '40px auto', padding: '0 20px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: 'white', borderRadius: '12px',
            padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
 
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: 'bold', fontSize: '14px' }}>
                Adresse email *
              </label>
              <input type="email" name="email"
                value={form.email} onChange={handleChange}
                placeholder="Ex: yassine@email.com"
                style={{ width: '100%', padding: '12px', borderRadius: '8px',
                  border: '1px solid #ddd', fontSize: '15px',
                  boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: 'bold', fontSize: '14px' }}>
                Mot de passe *
              </label>
              <input type="password" name="password"
                value={form.password} onChange={handleChange}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px', borderRadius: '8px',
                  border: '1px solid #ddd', fontSize: '15px',
                  boxSizing: 'border-box', outline: 'none' }} />
            </div>
          </div>
 
          {/* ERREUR */}
          {erreur && (
            <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '12px 16px',
              borderRadius: '8px', marginTop: '16px', fontSize: '14px', borderLeft: '4px solid #e53935' }}>
              ⚠️ {erreur}
            </div>
          )}
 
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            style={{ width: '100%', backgroundColor: '#1a1a2e', color: 'white',
              border: 'none', padding: '15px', borderRadius: '8px',
              fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '24px' }}>
            Se connecter →
          </motion.button>
 
          {/* DÉMO RAPIDE */}
          <div style={{ backgroundColor: '#f0f8e8', borderRadius: '8px', padding: '16px', marginTop: '20px' }}>
            <p style={{ color: '#558b2f', fontWeight: 'bold', fontSize: '13px', margin: '0 0 10px' }}>
              Démo rapide — tester sans inscription :
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => {
                localStorage.setItem('utilisateur', JSON.stringify({
                  nom: 'Yassine Khalil', email: 'freelancer@demo.com',
                  type: 'freelancer', titre: 'Développeur Full Stack & UI Designer',
                  localisation: 'Casablanca, Maroc',
                  membre: 'Membre depuis Janvier 2024',
                  avatar: 'https://www.muslimtherapist.directory/pictures/profile/pimage-429.png',
                }));
                localStorage.setItem('connecte', 'true');
                navigate('/profil');
              }} style={{ flex: 1, backgroundColor: '#1a1a2e', color: '#7cb342',
                border: 'none', padding: '10px', borderRadius: '6px',
                cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>
                 Demo Freelancer
              </button>
              <button onClick={() => {
                localStorage.setItem('utilisateur', JSON.stringify({
                  nom: 'Sara Bennani', email: 'client@demo.com',
                  type: 'client', titre: 'Fondatrice @ TechStart Maroc',
                  localisation: 'Rabat, Maroc',
                  membre: 'Membre depuis Mars 2024',
                  avatar: 'https://i.pravatar.cc/150?img=5',
                }));
                localStorage.setItem('connecte', 'true');
                navigate('/profil');
              }} style={{ flex: 1, backgroundColor: '#7cb342', color: 'white',
                border: 'none', padding: '10px', borderRadius: '6px',
                cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>
                 Demo Client
              </button>
            </div>
          </div>
 
          <p style={{ textAlign: 'center', color: '#888', fontSize: '13px', marginTop: '16px' }}>
            Pas encore de compte ?{' '}
            <span onClick={() => navigate('/inscription')}
              style={{ color: '#7cb342', cursor: 'pointer', fontWeight: 'bold' }}>
              S'inscrire
            </span>
          </p>
        </motion.div>
      </div>
 
      <footer style={{ backgroundColor: '#1a1a2e', color: 'white', textAlign: 'center', padding: '30px', marginTop: '40px' }}>
        <p style={{ color: '#7cb342', fontWeight: 'bold', fontSize: '18px' }}>freelancePlatform</p>
        <p style={{ color: '#aaa', fontSize: '13px' }}>© 2026 FreelancePlatform — Tous droits réservés</p>
      </footer>
    </div>
  );
}