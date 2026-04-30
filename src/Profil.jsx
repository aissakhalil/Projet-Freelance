import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Profil() {
  const navigate = useNavigate();
  const [u, setU] = useState(null);
  
  // AVATARS : Même style mais couleurs différentes
  const AVATAR_FREELANCE = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // Gris/Vert
  const AVATAR_CLIENT = "https://cdn-icons-png.flaticon.com/512/3135/3135768.png";    // Même style mais version "Business"

  useEffect(() => {
    const data = localStorage.getItem('utilisateur');
    if (!data) { navigate('/connexion'); return; }
    setU(JSON.parse(data));
  }, [navigate]);

  if (!u) return null;

  const isClient = u.role === 'client';
  const color = u.disponibilite_brute === "Off" ? "#e53935" : (u.disponibilite_brute === "Invisible" ? "#9e9e9e" : (isClient ? "#3498db" : "#4caf50"));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}
    >
      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#fff', padding: '15px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ color: '#7cb342', margin: 0, fontSize: '24px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '-1px' }} onClick={() => navigate('/')}>freelance<span style={{color: '#333'}}>Platform</span></h1>
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', fontWeight: '400', fontSize: '15px' }}>Accueil</button>
          <button onClick={() => navigate('/publier')} style={{ background: '#7cb342', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', color: 'white' }}>Publier un projet</button>
          <button onClick={() => { localStorage.removeItem('utilisateur'); navigate('/'); }} style={{ backgroundColor: '#e53935', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Déconnexion</button>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <div style={{ background: isClient ? 'linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%)' : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '60px 0', color: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={u.avatar || (isClient ? AVATAR_CLIENT : AVATAR_FREELANCE)} 
              alt="Profil"
              style={{ width: '140px', height: '140px', borderRadius: '50%', border: `5px solid ${isClient ? '#3498db' : color}`, objectFit: 'cover', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', backgroundColor: 'white' }} 
            />
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '25px', height: '25px', backgroundColor: color, borderRadius: '50%', border: '4px solid #1a1a2e' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '36px', margin: '0 0 10px 0', fontWeight: 'bold' }}>
               {u.nom} {isClient && <span style={{fontSize: '14px', background: '#3498db', color: 'white', padding: '4px 12px', borderRadius: '20px', marginLeft: '10px', verticalAlign: 'middle'}}>RECRUTEUR</span>}
            </h2>
            <p style={{ color: '#aaa', fontSize: '18px' }}>
              📍 {u.localisation || "Maroc"} • {isClient ? (u.entreprise || "Client Particulier") : "💼 Freelance Verified"}
            </p>
          </div>
          <button onClick={() => navigate('/modifier-profil')} style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 25px', borderRadius: '10px', cursor: 'pointer', backdropFilter: 'blur(10px)', fontWeight: 'bold' }}>
            Modifier le profil
          </button>
        </div>
      </div>

      {/* BODY SECTION */}
      <div style={{ maxWidth: '1000px', margin: '-40px auto 40px', padding: '0 20px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        
        {isClient ? (
          /* --- DESIGN CLIENT (AVEC NOUVELLES INFOS) --- */
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginTop: 0, color: '#1a1a2e', borderBottom: '2px solid #3498db', display: 'inline-block', paddingBottom: '5px' }}>À propos de l'organisation</h3>
                <p style={{ color: '#555', lineHeight: '1.8', fontSize: '16px', marginTop: '15px' }}>
                  {u.bio || "Ce client n'a pas encore rédigé de présentation."}
                </p>
                <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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

              <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginTop: 0, color: '#1a1a2e', borderBottom: '2px solid #3498db', display: 'inline-block', paddingBottom: '5px' }}>Missions publiées</h3>
                <p style={{marginTop: '20px', color: '#888', fontStyle: 'italic'}}>Aucun projet actif pour le moment.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', marginBottom: '10px' }}>Statut du compte</div>
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
              <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginTop: 0, color: '#1a1a2e', borderBottom: '2px solid #7cb342', display: 'inline-block', paddingBottom: '5px' }}>Résumé Professionnel</h3>
                <p style={{ color: '#555', lineHeight: '1.8', fontSize: '16px', marginTop: '15px' }}>{u.bio || "Aucune description renseignée."}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginTop: 0, color: '#1a1a2e', borderBottom: '2px solid #7cb342', display: 'inline-block', paddingBottom: '5px' }}>Compétences Experts</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
                  {u.competences?.map((c, i) => (
                    <span key={i} style={{ backgroundColor: '#f0f7e9', color: '#558b2f', padding: '8px 20px', borderRadius: '30px', fontSize: '14px', fontWeight: 'bold', border: '1px solid #dcedc8' }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>Tarif Moyen</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a2e' }}>{u.tarif || "Sur devis"}</div>
                <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: color, borderRadius: '50%' }}></div>
                  <span style={{ fontWeight: 'bold', color: '#555' }}>{u.disponibilite}</span>
                </div>
              </div>
              <div style={{ backgroundColor: '#1a1a2e', padding: '25px', borderRadius: '20px', color: 'white' }}>
                <h4 style={{ margin: '0 0 15px 0' }}>Statistiques</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Projets finis</span><b style={{color: '#7cb342'}}>48</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Note globale</span><b style={{color: '#7cb342'}}>5.0 ★</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Taux réponse</span><b style={{color: '#7cb342'}}>100%</b></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}