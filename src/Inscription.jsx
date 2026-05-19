import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Footer from './Footer';
import BrandTitle from './BrandTitle';

export default function Inscription() {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [form, setForm] = useState({ nom: '', email: '', password: '' });
  const [errors, setErrors] = useState({ type: '', nom: '', email: '', password: '', form: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async () => {
    const nextErrors = { type: '', nom: '', email: '', password: '', form: '' };
    if (!type) nextErrors.type = "Veuillez choisir un type de compte.";
    if (!form.nom.trim()) nextErrors.nom = "Le nom est requis.";
    if (!form.email.trim()) {
      nextErrors.email = "L'adresse email est requise.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "L'adresse email n'est pas valide.";
    } else if (!form.email.toLowerCase().endsWith('@gmail.com')) {
      nextErrors.email = "L'adresse email doit se terminer par @gmail.com.";
    }
    if (!form.password) nextErrors.password = "Le mot de passe est requis.";

    if (nextErrors.type || nextErrors.nom || nextErrors.email || nextErrors.password) {
      setErrors(nextErrors);
      return;
    }
    setErrors({ type: '', nom: '', email: '', password: '', form: '' });

    try {
      await axios.post('http://127.0.0.1:8000/api/register/', {
        username: form.nom,
        email: form.email,
        password: form.password,
        role: type            // ← ajout
      });

      alert("Compte créé avec succès ! Veuillez vous connecter.");
      navigate('/connexion');

    } catch (err) {
      console.error(err);
      const apiError = err.response?.data?.error || err.response?.data?.detail;
      if (apiError?.toLowerCase().includes('utilisateur')) {
        setErrors({ ...errors, nom: apiError });
      } else if (apiError?.toLowerCase().includes('email')) {
        setErrors({ ...errors, email: apiError });
      } else {
        setErrors({ ...errors, form: apiError || "Erreur lors de l'inscription. Vérifiez vos informations." });
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f7f7', fontFamily: 'Arial, sans-serif' }}>

      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#fff', padding: '15px 40px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={() => navigate('/')} style={{ margin: 0, fontSize: '26px', cursor: 'pointer' }}>
          <BrandTitle />
        </h1>
        <span onClick={() => navigate('/connexion')}
          style={{ cursor: 'pointer', color: '#333', fontSize: '14px' }}>
          Déjà un compte ? <strong style={{ color: '#7cb342' }}>Se connecter</strong>
        </span>
      </nav>

      {/* HEADER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ background: 'linear-gradient(135deg,#7cb342,#558b2f)',
          padding: '40px', textAlign: 'center', color: 'white' }}>
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '36px', fontWeight: '900',
            fontFamily: 'EB Garamond, Georgia, serif', marginBottom: '8px' }}>
          Créer un compte
        </motion.h2>
        <p style={{ opacity: 0.9 }}>Rejoignez des milliers de professionnels</p>
      </motion.div>

      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: 'white', borderRadius: '12px',
            padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>

          {/* CHOIX TYPE DE COMPTE */}
          <h3 style={{ color: '#333', marginBottom: '8px', fontSize: '16px' }}>
            Je suis... <span style={{ color: '#e53935', fontSize: '18px' }}>*</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
            {[
              { val: 'client', emoji: '🏢', titre: 'Un client', desc: 'Je publie des projets et cherche des freelancers' },
              { val: 'freelancer', emoji: '💻', titre: 'Un freelancer', desc: 'Je propose mes services et postule aux projets' },
            ].map(opt => (
              <motion.div key={opt.val} whileHover={{ scale: 1.03 }} onClick={() => setType(opt.val)}
                style={{
                  border: `2px solid ${type === opt.val ? '#7cb342' : '#ddd'}`,
                  borderRadius: '10px', padding: '20px', textAlign: 'center', cursor: 'pointer',
                  backgroundColor: type === opt.val ? '#f0f8e8' : 'white',
                  transition: 'all 0.2s'
                }}>
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>{opt.emoji}</div>
                <div style={{ fontWeight: '700', color: type === opt.val ? '#558b2f' : '#333', fontSize: '16px' }}>
                  {opt.titre}
                </div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '6px', lineHeight: '1.4' }}>
                  {opt.desc}
                </div>
                {type === opt.val && (
                  <div style={{ marginTop: '10px', color: '#7cb342', fontWeight: '700', fontSize: '13px' }}>
                    ✓ Sélectionné
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          {errors.type && (
            <div style={{ color: '#e53935', fontSize: '13px', marginTop: '-10px', marginBottom: '18px' }}>
              ⚠️ {errors.type}
            </div>
          )}

          {/* CHAMPS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {[
              { name: 'nom', label: 'Nom complet', placeholder: 'Ex: Yassine Khalil', type: 'text' },
              { name: 'email', label: 'Adresse email', placeholder: 'Ex: yassine@gmail.com', type: 'email' },
              { name: 'password', label: 'Mot de passe', placeholder: '••••••••', type: 'password' },
            ].map(field => (
              <div key={field.name}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: 'bold', fontSize: '14px' }}>
                  {field.label} *
                </label>
                <input
                  type={field.type} name={field.name}
                  value={form[field.name]} onChange={handleChange}
                  placeholder={field.placeholder}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px',
                    border: '1px solid #ddd', fontSize: '15px',
                    boxSizing: 'border-box', outline: 'none' }} />
                {errors[field.name] && (
                  <div style={{ color: '#e53935', fontSize: '13px', marginTop: '8px' }}>
                    ⚠️ {errors[field.name]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {errors.form && (
            <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '12px 16px',
              borderRadius: '8px', marginTop: '16px', fontSize: '14px', borderLeft: '4px solid #e53935' }}>
              ⚠️ {errors.form}
            </div>
          )}

          {/* BOUTON */}
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            style={{ width: '100%', backgroundColor: '#7cb342', color: 'white',
              border: 'none', padding: '15px', borderRadius: '8px',
              fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '24px',
              boxShadow: '0 4px 14px rgba(124,179,66,0.4)' }}>
            Créer mon compte {type === 'freelancer' ? '💻' : type === 'client' ? '🏢' : ''} →
          </motion.button>

          <p style={{ textAlign: 'center', color: '#888', fontSize: '13px', marginTop: '16px' }}>
            Déjà un compte ?{' '}
            <span onClick={() => navigate('/connexion')}
              style={{ color: '#7cb342', cursor: 'pointer', fontWeight: 'bold' }}>
              Se connecter
            </span>
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}