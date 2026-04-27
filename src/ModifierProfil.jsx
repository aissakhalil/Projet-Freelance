import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const competencesDisponibles = [
  'React.js', 'Node.js', 'Django', 'MySQL', 'Figma', 'TypeScript',
  'Python', 'REST API', 'Vue.js', 'Laravel', 'MongoDB', 'Flutter',
  'Photoshop', 'Illustrator', 'SEO', 'WordPress', 'PHP', 'Java'
];

export default function ModifierProfil() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [utilisateur, setUtilisateur] = useState(null);
  const [apercu, setApercu] = useState(null);
  const [succes, setSucces] = useState(false);
  const [onglet, setOnglet] = useState('general'); // general | competences | securite
  const [form, setForm] = useState({
    nom: '', titre: '', localisation: '', bio: '',
    tarif: '', disponibilite: 'Disponible maintenant',
    competences: [],
    motdepasse: '', confirmer: '',
  });

  useEffect(() => {
    const data = localStorage.getItem('utilisateur');
    if (!data) { navigate('/connexion'); return; }
    const u = JSON.parse(data);
    setUtilisateur(u);
    setForm(f => ({
      ...f,
      nom: u.nom || '',
      titre: u.titre || '',
      localisation: u.localisation || '',
      bio: u.bio || '',
      tarif: u.tarif || '',
      disponibilite: u.disponibilite || 'Disponible maintenant',
      competences: u.competences || [],
    }));
    setApercu(u.avatar || '');
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const fichier = e.target.files[0];
    if (!fichier) return;
    const reader = new FileReader();
    reader.onloadend = () => setApercu(reader.result);
    reader.readAsDataURL(fichier);
  };

  const toggleCompetence = (comp) => {
    setForm(f => ({
      ...f,
      competences: f.competences.includes(comp)
        ? f.competences.filter(c => c !== comp)
        : [...f.competences, comp]
    }));
  };

  const handleSauvegarder = () => {
    const mise_a_jour = {
      ...utilisateur,
      nom: form.nom,
      titre: form.titre,
      localisation: form.localisation,
      bio: form.bio,
      tarif: form.tarif,
      disponibilite: form.disponibilite,
      competences: form.competences,
      avatar: apercu || utilisateur.avatar,
    };
    localStorage.setItem('utilisateur', JSON.stringify(mise_a_jour));
    setSucces(true);
    setTimeout(() => { setSucces(false); navigate('/profil'); }, 2000);
  };

  if (!utilisateur) return null;
  const estFreelancer = utilisateur.type === 'freelancer';

  const InputField = ({ label, name, type = 'text', placeholder }) => (
    <div>
      <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: '600', fontSize: '14px' }}>
        {label}
      </label>
      <input type={type} name={name} value={form[name]} onChange={handleChange}
        placeholder={placeholder}
        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px',
          border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }} />
    </div>
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>

      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#fff', padding: '15px 40px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={() => navigate('/')} style={{ color: '#7cb342', margin: 0, fontSize: '26px', cursor: 'pointer' }}>
          freelance<span style={{ color: '#333' }}>Platform</span>
        </h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={() => navigate('/profil')}
            style={{ backgroundColor: 'white', color: '#333', border: '1px solid #ddd',
              padding: '9px 18px', borderRadius: '5px', cursor: 'pointer', fontSize: '13px' }}>
            ← Retour au profil
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg,#1a1a2e,#2a2a4e)', padding: '40px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', fontFamily: 'EB Garamond, Georgia, serif', marginBottom: '6px' }}>
          ✏️ Modifier mon profil
        </h2>
        <p style={{ opacity: 0.8, fontSize: '15px' }}>Mettez à jour vos informations personnelles</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>

        {/* SUCCÈS */}
        {succes && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '16px 20px',
              borderRadius: '10px', marginBottom: '24px', fontWeight: '700',
              textAlign: 'center', fontSize: '16px', border: '1px solid #a5d6a7' }}>
            ✅ Profil mis à jour avec succès ! Redirection...
          </motion.div>
        )}

        {/* PHOTO DE PROFIL */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}
          style={{ backgroundColor: 'white', borderRadius: '14px', padding: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
          <h3 style={{ color: '#1a1a2e', marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>
            📸 Photo de profil
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            {/* Aperçu avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src={apercu} alt="Avatar"
                style={{ width: '100px', height: '100px', borderRadius: '50%',
                  objectFit: 'cover', border: '3px solid #7cb342',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }} />
              <div onClick={() => fileInputRef.current.click()}
                style={{ position: 'absolute', bottom: 0, right: 0,
                  backgroundColor: '#7cb342', borderRadius: '50%', width: '30px', height: '30px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', border: '2px solid white', fontSize: '14px' }}>
                ✏️
              </div>
            </div>
            <div>
              <p style={{ color: '#555', fontSize: '14px', marginBottom: '12px', lineHeight: '1.6' }}>
                Choisissez une photo professionnelle.<br/>
                Formats acceptés : JPG, PNG. Taille max : 2 Mo.
              </p>
              <input ref={fileInputRef} type="file" accept="image/*"
                onChange={handlePhoto} style={{ display: 'none' }} />
              <motion.button whileHover={{ scale: 1.03 }}
                onClick={() => fileInputRef.current.click()}
                style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
                  padding: '10px 22px', borderRadius: '7px', cursor: 'pointer',
                  fontWeight: '700', fontSize: '14px' }}>
                Changer la photo
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ONGLETS */}
        <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '24px', overflow: 'hidden' }}>
          {[
            { key: 'general', label: '👤 Informations générales' },
            ...(estFreelancer ? [{ key: 'competences', label: '🛠️ Compétences & Tarif' }] : []),
            { key: 'securite', label: '🔒 Sécurité' },
          ].map(o => (
            <button key={o.key} onClick={() => setOnglet(o.key)}
              style={{ flex: 1, padding: '14px', border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: '700', transition: 'all 0.2s',
                backgroundColor: onglet === o.key ? '#7cb342' : 'white',
                color: onglet === o.key ? 'white' : '#555',
                borderBottom: onglet === o.key ? 'none' : '2px solid #eee' }}>
              {o.label}
            </button>
          ))}
        </div>

        {/* ONGLET GÉNÉRAL */}
        {onglet === 'general' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}
            style={{ backgroundColor: 'white', borderRadius: '14px', padding: '32px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <InputField label="Nom complet" name="nom" placeholder="Votre nom complet" />
              <InputField label="Titre professionnel" name="titre" placeholder="Ex: Développeur Full Stack React & Django" />
              <InputField label="Localisation" name="localisation" placeholder="Ex: Casablanca, Maroc" />
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: '600', fontSize: '14px' }}>
                  Bio / À propos
                </label>
                <textarea name="bio" value={form.bio} onChange={handleChange} rows={5}
                  placeholder="Décrivez-vous en quelques phrases..."
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px',
                    border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box',
                    outline: 'none', resize: 'vertical', lineHeight: '1.6' }} />
              </div>
            </div>
          </motion.div>
        )}

        {/* ONGLET COMPÉTENCES (freelancer seulement) */}
        {onglet === 'competences' && estFreelancer && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}
            style={{ backgroundColor: 'white', borderRadius: '14px', padding: '32px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Compétences */}
              <div>
                <label style={{ display: 'block', marginBottom: '12px', color: '#333', fontWeight: '700', fontSize: '15px' }}>
                  Compétences <span style={{ color: '#888', fontWeight: '400', fontSize: '13px' }}>
                    ({form.competences.length} sélectionnées)
                  </span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {competencesDisponibles.map((comp, i) => (
                    <motion.span key={i} whileHover={{ scale: 1.05 }}
                      onClick={() => toggleCompetence(comp)}
                      style={{
                        padding: '7px 16px', borderRadius: '20px', cursor: 'pointer',
                        fontSize: '13px', fontWeight: '600', transition: 'all 0.2s',
                        backgroundColor: form.competences.includes(comp) ? '#1a1a2e' : '#f0f0f0',
                        color: form.competences.includes(comp) ? '#7cb342' : '#555',
                        border: form.competences.includes(comp) ? '1px solid #7cb342' : '1px solid transparent',
                      }}>
                      {form.competences.includes(comp) ? '✓ ' : ''}{comp}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Tarif */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: '600', fontSize: '14px' }}>
                  Tarif horaire
                </label>
                <input type="text" name="tarif" value={form.tarif} onChange={handleChange}
                  placeholder="Ex: 350 MAD / heure"
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px',
                    border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }} />
              </div>

              {/* Disponibilité */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: '600', fontSize: '14px' }}>
                  Disponibilité
                </label>
                <select name="disponibilite" value={form.disponibilite} onChange={handleChange}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px',
                    border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }}>
                  <option>Disponible maintenant</option>
                  <option>Disponible dans 1 semaine</option>
                  <option>Disponible dans 1 mois</option>
                  <option>Non disponible</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* ONGLET SÉCURITÉ */}
        {onglet === 'securite' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}
            style={{ backgroundColor: 'white', borderRadius: '14px', padding: '32px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ backgroundColor: '#fff8e1', border: '1px solid #ffe082',
                borderRadius: '8px', padding: '14px 16px', fontSize: '13px', color: '#f57f17' }}>
                ⚠️ Laissez vide si vous ne souhaitez pas changer votre mot de passe.
              </div>
              <InputField label="Nouveau mot de passe" name="motdepasse" type="password" placeholder="••••••••" />
              <InputField label="Confirmer le mot de passe" name="confirmer" type="password" placeholder="••••••••" />
            </div>
          </motion.div>
        )}

        {/* BOUTONS */}
        <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/profil')}
            style={{ flex: 1, backgroundColor: 'white', color: '#333', border: '1px solid #ddd',
              padding: '14px', borderRadius: '8px', cursor: 'pointer',
              fontSize: '15px', fontWeight: '600' }}>
            Annuler
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleSauvegarder}
            style={{ flex: 2, backgroundColor: '#7cb342', color: 'white', border: 'none',
              padding: '14px', borderRadius: '8px', cursor: 'pointer',
              fontSize: '15px', fontWeight: '700',
              boxShadow: '0 4px 14px rgba(124,179,66,0.4)' }}>
            💾 Sauvegarder les modifications
          </motion.button>
        </div>
      </div>

      <footer style={{ backgroundColor: '#111', color: 'white', textAlign: 'center', padding: '30px', marginTop: '40px' }}>
        <p style={{ color: '#7cb342', fontWeight: 'bold', fontSize: '18px' }}>freelancePlatform</p>
        <p style={{ color: '#555', fontSize: '13px' }}>© 2026 FreelancePlatform — Tous droits réservés</p>
      </footer>
    </div>
  );
}