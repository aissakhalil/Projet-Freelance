import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Connexion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [erreur, setErreur] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConnexion = async (e) => {
    e.preventDefault();
    setErreur("");

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: form.email,
        password: form.password
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      // Récupérer les vraies infos + profil de l'utilisateur
      const userInfo = await axios.get('http://127.0.0.1:8000/api/user/me/', {
        headers: { Authorization: `Bearer ${response.data.access}` }
      });

      const d = userInfo.data;

      // Sauvegarder tous les champs du profil dans le localStorage
      localStorage.setItem('utilisateur', JSON.stringify({
        id: d.id,
        nom: d.username,
        email: d.email,
        role: d.role,
        bio: d.bio,
        competences: d.competences,
        tarif: d.tarif,
        localisation: d.localisation,
        entreprise: d.entreprise,
        secteur: d.secteur,
        disponibilite: d.disponibilite,
        avatar: d.avatar,
      }));

      window.location.href = "/";

    } catch (err) {
      console.error(err);
      setErreur("Email ou mot de passe incorrect, ou serveur injoignable.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f7f7', fontFamily: 'Arial, sans-serif' }}>
      
      <nav style={{ backgroundColor: '#fff', padding: '15px 40px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={() => navigate('/')} style={{ color: '#7cb342', margin: 0, fontSize: '26px', cursor: 'pointer' }}>
          freelance<span style={{ color: '#333' }}>Platform</span>
        </h1>
      </nav>

      <div style={{ maxWidth: '450px', margin: '80px auto', padding: '0 20px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px', fontFamily: 'EB Garamond, serif', fontSize: '28px' }}>
            Bon retour parmi nous
          </h2>

          <form onSubmit={handleConnexion}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                Email (ou Username)
              </label>
              <input type="text" name="email" value={form.email} onChange={handleChange} required
                placeholder="votre@email.com"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                Mot de passe
              </label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
            </div>

            {erreur && (
              <div style={{ color: '#e53935', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
                ⚠️ {erreur}
              </div>
            )}

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit"
              style={{ width: '100%', backgroundColor: '#7cb342', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              Se connecter
            </motion.button>
          </form>

          <p style={{ textAlign: 'center', color: '#888', fontSize: '13px', marginTop: '25px' }}>
            Pas encore de compte ?{' '}
            <span onClick={() => navigate('/inscription')}
              style={{ color: '#7cb342', cursor: 'pointer', fontWeight: 'bold' }}>
              S'inscrire gratuitement
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}