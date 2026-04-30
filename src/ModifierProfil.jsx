import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ModifierProfil = () => {
  const navigate = useNavigate();
  
  // AVATARS DIFFÉRENTS SELON LE RÔLE
  const AVATAR_FREELANCE = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const AVATAR_CLIENT = "https://cdn-icons-png.flaticon.com/512/6009/6009864.png"; // Icône plus "Business / Client"

  const [user, setUser] = useState({
    nom: '', region: '', bio: '', 
    competences: '', tarif: '', 
    entreprise: '', secteur: '', // Nouveaux champs pour Client
    disponibilite: 'On', avatar: '', role: ''
  });

  useEffect(() => {
    const data = localStorage.getItem('utilisateur');
    if (data) {
      const p = JSON.parse(data);
      const isClient = p.role === 'client';
      
      setUser({
        role: p.role || 'freelance',
        nom: p.nom || '',
        region: p.localisation || '',
        bio: p.bio || '',
        // Données Freelance
        competences: Array.isArray(p.competences) ? p.competences.join(', ') : '',
        tarif: p.tarif ? p.tarif.replace(' MAD / heure', '') : '',
        // Données Client
        entreprise: p.entreprise || '',
        secteur: p.secteur || '',
        disponibilite: p.disponibilite_brute || 'On',
        avatar: p.avatar || (isClient ? AVATAR_CLIENT : AVATAR_FREELANCE)
      });
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUser({ ...user, avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const supprimerPhoto = () => setUser({ ...user, avatar: user.role === 'client' ? AVATAR_CLIENT : AVATAR_FREELANCE });

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataActuelle = JSON.parse(localStorage.getItem('utilisateur')) || {};
    
    const misAJour = {
      ...dataActuelle,
      nom: user.nom,
      localisation: user.region,
      bio: user.bio,
      avatar: user.avatar,
      disponibilite_brute: user.disponibilite,
    };

    if (user.role === 'client') {
      misAJour.entreprise = user.entreprise;
      misAJour.secteur = user.secteur;
      misAJour.disponibilite = user.disponibilite === "Off" ? "Recrutement en pause" : "Recrutement actif";
    } else {
      misAJour.competences = user.competences.split(',').map(s => s.trim()).filter(s => s !== "");
      misAJour.tarif = user.tarif ? user.tarif + " MAD / heure" : "Non spécifié";
      misAJour.disponibilite = user.disponibilite === "Off" ? "Indisponible" : "Disponible maintenant";
    }

    localStorage.setItem('utilisateur', JSON.stringify(misAJour));
    navigate('/profil');
  };

  const isClient = user.role === 'client';
  const themeColor = isClient ? '#3498db' : '#7cb342';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ padding: '40px 20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1a1a2e', marginBottom: '30px' }}>Modifier mon profil {isClient ? 'Client' : 'Freelance'}</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* SECTION AVATAR */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '15px' }}>
            <img src={user.avatar} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${themeColor}` }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <label style={{ backgroundColor: '#1a1a2e', color: 'white', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
                Changer la photo
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              </label>
              <button type="button" onClick={supprimerPhoto} style={{ background: '#fff', color: '#e53935', border: '1px solid #e53935', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer' }}>Réinitialiser</button>
            </div>
          </div>

          {/* NOM ET BIO (Commun) */}
          <div>
            <label style={{ fontWeight: 'bold' }}>Nom complet</label>
            <input value={user.nom} onChange={(e) => setUser({...user, nom: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '5px' }} />
          </div>

          <div>
            <label style={{ fontWeight: 'bold' }}>{isClient ? 'Description de vos besoins' : 'Bio Professionnelle'}</label>
            <textarea value={user.bio} onChange={(e) => setUser({...user, bio: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '5px', height: '100px' }} />
          </div>

          {/* CHAMPS DYNAMIQUES SELON LE RÔLE */}
          {isClient ? (
            <>
              <div>
                <label style={{ fontWeight: 'bold' }}>Nom de l'entreprise / Organisation</label>
                <input value={user.entreprise} onChange={(e) => setUser({...user, entreprise: e.target.value})} placeholder="Ex: Tech Solutions" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '5px' }} />
              </div>
              <div>
                <label style={{ fontWeight: 'bold' }}>Secteur d'activité</label>
                <input value={user.secteur} onChange={(e) => setUser({...user, secteur: e.target.value})} placeholder="Ex: Marketing, Développement web..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '5px' }} />
              </div>
            </>
          ) : (
            <>
              <div>
                <label style={{ fontWeight: 'bold' }}>Compétences (séparées par virgules)</label>
                <input value={user.competences} onChange={(e) => setUser({...user, competences: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '5px' }} />
              </div>
              <div>
                <label style={{ fontWeight: 'bold' }}>Tarif souhaité (MAD/h)</label>
                <input type="number" value={user.tarif} onChange={(e) => setUser({...user, tarif: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '5px' }} />
              </div>
            </>
          )}

          {/* DISPONIBILITÉ */}
          <div>
            <label style={{ fontWeight: 'bold' }}>{isClient ? 'Statut du compte' : 'Disponibilité'}</label>
            <select value={user.disponibilite} onChange={(e) => setUser({...user, disponibilite: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '5px' }}>
              <option value="On">{isClient ? 'Recrutement Ouvert' : 'Disponible'}</option>
              <option value="Off">{isClient ? 'En pause' : 'Indisponible'}</option>
            </select>
          </div>

          <button type="submit" style={{ padding: '15px', backgroundColor: themeColor, color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
            Sauvegarder les modifications
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ModifierProfil;