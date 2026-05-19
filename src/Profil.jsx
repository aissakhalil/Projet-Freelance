import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from "./Footer";

// Petit composant interne créé pour éviter l'erreur et afficher ton nouveau nom !
function BrandTitle() {
  return <span>FreeAgent</span>;
}

export default function Profil() {
  const navigate = useNavigate();
  const [u, setU] = useState(null);
  const [loading, setLoading] = useState(true);

  // AVATARS : Même style mais couleurs différentes
  const AVATAR_FREELANCE = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const AVATAR_CLIENT = "https://cdn-icons-png.flaticon.com/512/3135/3135768.png";

  useEffect(() => {
    const data = localStorage.getItem('utilisateur');
    if (!data) {
      navigate('/connexion');
      setLoading(false);
      return;
    }
    try {
      setU(JSON.parse(data));
    } catch (e) {
      console.error("JSON invalide dans localStorage:", e);
      localStorage.removeItem('utilisateur');
      navigate('/connexion');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', color: '#888' }}>
      Chargement...
    </div>
  );

  if (!u) return null;

  const isClient = u.role === 'client';
  const color = u.disponibilite_brute === "Off" ? "#e53935" : (u.disponibilite_brute === "Invisible" ? "#9e9e9e" : (isClient ? "#3498db" : "#4caf50"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="profil-page"
    >
      {/* NAVBAR */}
      <nav className="profil-navbar">
        <h1 className="profil-navbar-title" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <BrandTitle />
        </h1>
        <div className="profil-navbar-actions">
          <button className="profil-navbar-button secondary" onClick={() => navigate('/')}>Accueil</button>
          <button className="profil-navbar-button primary" onClick={() => navigate('/publier')}>Publier un projet</button>
          <button className="profil-navbar-button danger" onClick={() => { localStorage.removeItem('utilisateur'); navigate('/'); }}>Déconnexion</button>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <div className={`profil-header ${isClient ? 'client' : 'freelance'}`}>
        <div className="profil-header-inner">
          <div className="profil-avatar-box">
            <img
              src={u.avatar || (isClient ? AVATAR_CLIENT : AVATAR_FREELANCE)}
              alt="Profil"
              className="profil-avatar"
              style={{ border: `5px solid ${isClient ? '#3498db' : color}` }}
            />
            <div className="profil-status-dot" style={{ backgroundColor: color }} />
          </div>
          <div className="profil-summary">
            <h2 className="profil-name">
              {u.nom}
              {isClient && <span className="profil-role-chip">RECRUTEUR</span>}
            </h2>
            <p className="profil-location">
              📍 {u.localisation || 'Maroc'} • {isClient ? (u.entreprise || 'Client Particulier') : '💼 Freelance Verified'}
            </p>
          </div>
          <button className="profil-edit-button" onClick={() => navigate('/modifier-profil')}>
            Modifier le profil
          </button>
        </div>
      </div>

      {/* BODY SECTION */}
      <div className="profil-main">

        {isClient ? (
          /* --- DESIGN CLIENT (AVEC NOUVELLES INFOS) --- */
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="profil-card client">
                <h3>À propos de l'organisation</h3>
                <p style={{ color: '#555', lineHeight: '1.8', fontSize: '16px', marginTop: '15px' }}>
                  {u.bio || "Ce client n'a pas encore rédigé de présentation."}
                </p>
                <div className="profil-grid-small">
                  <div>
                    <strong style={{ display: 'block', color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>Entreprise</strong>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{u.entreprise || "Non spécifié"}</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>Secteur d'activité</strong>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{u.secteur || "Non spécifié"}</span>
                  </div>
                </div>
              </div>

              <div className="profil-card client">
                <h3>Missions publiées</h3>
                <p style={{ marginTop: '20px', color: '#888', fontStyle: 'italic' }}>Aucun projet actif pour le moment.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="profil-card" style={{ textAlign: 'center' }}>
                <div className="profil-label">Statut du compte</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '30px', backgroundColor: '#e3f2fd', color: '#1976d2', fontWeight: 'bold' }}>
                  <div style={{ width: '10px', height: '10px', backgroundColor: '#1976d2', borderRadius: '50%' }}></div>
                  {u.disponibilite || "Actif"}
                </div>
                <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />
                <div style={{ fontSize: '14px', color: '#555' }}>
                  Projets postés : <strong>0</strong>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* --- DESIGN FREELANCE (TON DESIGN ORIGINAL - INCHANGÉ) --- */
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="profil-card freelance">
                <h3>Résumé Professionnel</h3>
                <p style={{ color: '#555', lineHeight: '1.8', fontSize: '16px', marginTop: '15px' }}>{u.bio || "Aucune description renseignée."}</p>
              </div>
              <div className="profil-card freelance">
                <h3>Compétences Experts</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
                  {u.competences?.map((c, i) => (
                    <span key={i} className="profil-badge">{c}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="profil-card" style={{ textAlign: 'center' }}>
                <div className="profil-label">Tarif Moyen</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a2e' }}>{u.tarif || "Sur devis"}</div>
                <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: color, borderRadius: '50%' }}></div>
                  <span style={{ fontWeight: 'bold', color: '#555' }}>{u.disponibilite}</span>
                </div>
              </div>
              <div className="profil-card profil-footer-card">
                <h4>Statistiques</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Projets finis</span><b style={{ color: '#7cb342' }}>48</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Note globale</span><b style={{ color: '#7cb342' }}>5.0 ★</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Taux réponse</span><b style={{ color: '#7cb342' }}>100%</b></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </motion.div>
  );
}