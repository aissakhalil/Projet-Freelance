import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from './api';

const categories = ['Tous', 'Développement Web', 'Design', 'Marketing',
  'Développement Mobile', 'Traduction', 'Vidéo'];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function Projets() {
  const navigate = useNavigate();
  const [catActive, setCatActive] = useState('Tous');
  const [search, setSearch] = useState('');
  const [utilisateur, setUtilisateur] = useState(null);
  const [projetsData, setProjetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ÉTATS MODAL CANDIDATURE ---
  const [modalOuvert, setModalOuvert] = useState(false);
  const [projetSelectionne, setProjetSelectionne] = useState(null);
  const [lettre, setLettre] = useState('');
  const [tarifPropose, setTarifPropose] = useState('');
  const [envoi, setEnvoi] = useState(false);
  const [messageRetour, setMessageRetour] = useState(null);

  // 1. Récupération de l'utilisateur connecté
  useEffect(() => {
    const verifierUtilisateur = async () => {
      try {
        const response = await api.get('user/me/');
        setUtilisateur(response.data); // role est déjà dans response.data (Phase 3)
      } catch (err) {
        setUtilisateur(null);
      }
    };
    verifierUtilisateur();
  }, []);

  // 2. Chargement des projets
  useEffect(() => {
    const chargerProjets = async () => {
      try {
        const response = await api.get('projets/');
        setProjetsData(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des projets :", err);
      } finally {
        setLoading(false);
      }
    };
    chargerProjets();
  }, []);

  const handleDeconnexion = () => {
    localStorage.clear();
    window.location.reload();
  };

  // --- OUVRIR LE MODAL ---
  const ouvrirModal = (projet) => {
    setProjetSelectionne(projet);
    setLettre('');
    setTarifPropose('');
    setMessageRetour(null);
    setModalOuvert(true);
  };

  // --- FERMER LE MODAL ---
  const fermerModal = () => {
    setModalOuvert(false);
    setProjetSelectionne(null);
    setMessageRetour(null);
  };

  // --- SOUMETTRE LA CANDIDATURE ---
  const soumettreCandiature = async () => {
    if (!lettre.trim()) {
      setMessageRetour({ type: 'erreur', texte: 'Veuillez écrire une lettre de motivation.' });
      return;
    }
    setEnvoi(true);
    try {
      await api.post(`projets/${projetSelectionne.id}/postuler/`, {
        lettre,
        tarif_propose: tarifPropose || null,
      });
      setMessageRetour({ type: 'succes', texte: '✅ Candidature envoyée avec succès !' });
      setTimeout(() => fermerModal(), 2000);
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Une erreur est survenue.';
      setMessageRetour({ type: 'erreur', texte: errMsg });
    } finally {
      setEnvoi(false);
    }
  };

  const projetsFiltres = projetsData.filter(p => {
    const matchCat = catActive === 'Tous' || p.categorie === catActive;
    const matchSearch = p.titre.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Détecter si l'utilisateur est le client propriétaire du projet
  const estProprietaire = (projet) => utilisateur && utilisateur.id === projet.client;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f7f7', fontFamily: 'Arial,sans-serif' }}>

      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#fff', padding: '15px 40px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={() => navigate('/')}
          style={{ color: '#7cb342', margin: 0, fontSize: '26px', cursor: 'pointer' }}>
          freelance<span style={{ color: '#333' }}>Platform</span>
        </h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#333' }}>Accueil</span>
          {utilisateur ? (
            <>
              <span onClick={() => navigate('/profil')}
                style={{ cursor: 'pointer', color: '#333', fontWeight: 'bold' }}>Mon Profil</span>
              <span onClick={handleDeconnexion}
                style={{ cursor: 'pointer', color: '#e53935', fontWeight: 'bold' }}>Déconnexion</span>
            </>
          ) : (
            <>
              <span onClick={() => navigate('/connexion')} style={{ cursor: 'pointer', color: '#333' }}>Connexion</span>
              <button onClick={() => navigate('/inscription')}
                style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
                  padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                Inscription
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HEADER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ background: 'linear-gradient(135deg,#7cb342,#558b2f)',
          padding: '50px 40px', textAlign: 'center', color: 'white' }}>
        <motion.h2
          initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ fontSize: '48px', fontWeight: '900',
            fontFamily: 'EB Garamond, Georgia, serif', letterSpacing: '1px',
            textShadow: '2px 4px 10px rgba(0,0,0,0.3)', marginBottom: '20px' }}>
          Projets disponibles
        </motion.h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <input type="text" placeholder="Rechercher un projet..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '12px 20px', width: '400px',
              borderRadius: '5px', border: 'none', fontSize: '15px' }} />
          <button style={{ backgroundColor: '#333', color: 'white', border: 'none',
            padding: '12px 25px', borderRadius: '5px', cursor: 'pointer', fontSize: '15px' }}>
            Rechercher
          </button>
        </motion.div>
      </motion.div>

      {/* ZONE CENTRALE */}
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* FILTRES */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
          {categories.map((cat, i) => (
            <button key={i} onClick={() => setCatActive(cat)}
              style={{ padding: '8px 18px', borderRadius: '20px', border: 'none',
                cursor: 'pointer', fontWeight: 'bold',
                backgroundColor: catActive === cat ? '#7cb342' : 'white',
                color: catActive === cat ? 'white' : '#333',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.3s' }}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* CHARGEMENT */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#7cb342', fontWeight: 'bold' }}>
            Chargement des missions en temps réel...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '25px' }}>
            {projetsFiltres.map((projet, i) => (
              <motion.div key={projet.id}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(0,0,0,0.12)' }}
                style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.07)', cursor: 'pointer', transition: 'all 0.3s' }}>

                <span style={{ backgroundColor: '#e8f5e9', color: '#7cb342',
                  padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  {projet.categorie}
                </span>

                <h4 style={{ margin: '15px 0 10px', color: '#333', fontSize: '17px' }}>
                  {projet.titre}
                </h4>

                <p style={{ color: '#777', fontSize: '13px', lineHeight: '1.6',
                  marginBottom: '15px', whiteSpace: 'pre-line' }}>
                  {projet.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginTop: '10px',
                  borderTop: '1px solid #f0f0f0', paddingTop: '15px' }}>
                  <div>
                    <p style={{ margin: 0, color: '#333', fontSize: '13px', fontWeight: 'bold' }}>
                      {projet.client_nom || 'Client Externe'}
                    </p>
                    <p style={{ margin: 0, color: '#aaa', fontSize: '11px' }}>
                      {projet.date_publication
                        ? new Date(projet.date_publication).toLocaleDateString()
                        : 'Récemment'}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#7cb342' }}>
                      {projet.budget}€
                    </p>

                    {/* BOUTON DYNAMIQUE SELON RÔLE */}
                    {!utilisateur ? (
                      <button onClick={() => navigate('/connexion')}
                        style={{ backgroundColor: '#eee', color: '#777', border: 'none',
                          padding: '8px 16px', borderRadius: '5px', cursor: 'pointer',
                          marginTop: '5px', fontSize: '12px' }}>
                        Se connecter
                      </button>
                    ) : estProprietaire(projet) ? (
                      <span style={{ fontSize: '11px', color: '#aaa', marginTop: '5px', display: 'block' }}>
                        Votre projet
                      </span>
                    ) : utilisateur.role === 'client' ? (
                      <span style={{ fontSize: '11px', color: '#aaa', marginTop: '5px', display: 'block' }}>
                        Réservé aux freelancers
                      </span>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => ouvrirModal(projet)}
                        style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
                          padding: '8px 16px', borderRadius: '5px', cursor: 'pointer',
                          marginTop: '5px', fontWeight: 'bold' }}>
                        Postuler
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && projetsFiltres.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>
            <p style={{ fontSize: '25px' }}>Aucun projet trouvé</p>
          </motion.div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1a1a2e', color: 'white',
        textAlign: 'center', padding: '30px', marginTop: '40px' }}>
        <p style={{ color: '#7cb342', fontWeight: 'bold', fontSize: '18px' }}>freelancePlatform</p>
        <p style={{ color: '#aaa', fontSize: '13px' }}>2026 FreelancePlatform Tous droits réservés</p>
      </footer>

      {/* ===== MODAL CANDIDATURE ===== */}
      <AnimatePresence>
        {modalOuvert && projetSelectionne && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={fermerModal}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
              display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px',
                width: '90%', maxWidth: '550px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>

              {/* TITRE MODAL */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
                <div>
                  <h2 style={{ margin: 0, color: '#333', fontSize: '22px' }}>Postuler au projet</h2>
                  <p style={{ margin: '5px 0 0', color: '#7cb342', fontWeight: 'bold', fontSize: '15px' }}>
                    {projetSelectionne.titre}
                  </p>
                </div>
                <button onClick={fermerModal}
                  style={{ background: 'none', border: 'none', fontSize: '24px',
                    cursor: 'pointer', color: '#aaa', lineHeight: 1 }}>✕</button>
              </div>

              {/* BUDGET DU CLIENT */}
              <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px',
                padding: '12px 16px', marginBottom: '20px' }}>
                <p style={{ margin: 0, color: '#777', fontSize: '13px' }}>Budget du client</p>
                <p style={{ margin: 0, color: '#7cb342', fontWeight: 'bold', fontSize: '20px' }}>
                  {projetSelectionne.budget}€
                </p>
              </div>

              {/* TARIF PROPOSÉ */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold',
                  color: '#333', marginBottom: '8px', fontSize: '14px' }}>
                  Votre tarif proposé (€) <span style={{ color: '#aaa', fontWeight: 'normal' }}>— optionnel</span>
                </label>
                <input
                  type="number" min="0" placeholder={`Budget client : ${projetSelectionne.budget}€`}
                  value={tarifPropose} onChange={(e) => setTarifPropose(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px',
                    border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>

              {/* LETTRE DE MOTIVATION */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', fontWeight: 'bold',
                  color: '#333', marginBottom: '8px', fontSize: '14px' }}>
                  Lettre de motivation <span style={{ color: '#e53935' }}>*</span>
                </label>
                <textarea
                  placeholder="Décrivez votre expérience, pourquoi vous êtes le bon candidat pour ce projet..."
                  value={lettre} onChange={(e) => setLettre(e.target.value)}
                  rows={6}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px',
                    border: '1px solid #ddd', fontSize: '14px', resize: 'vertical',
                    fontFamily: 'Arial, sans-serif', lineHeight: '1.6', boxSizing: 'border-box' }} />
              </div>

              {/* MESSAGE RETOUR (succès ou erreur) */}
              {messageRetour && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px',
                    backgroundColor: messageRetour.type === 'succes' ? '#e8f5e9' : '#ffebee',
                    color: messageRetour.type === 'succes' ? '#2e7d32' : '#c62828',
                    fontWeight: 'bold', fontSize: '14px' }}>
                  {messageRetour.texte}
                </motion.div>
              )}

              {/* BOUTONS */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={fermerModal}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px',
                    border: '1px solid #ddd', backgroundColor: 'white',
                    color: '#333', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
                  Annuler
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={soumettreCandiature} disabled={envoi}
                  style={{ flex: 2, padding: '12px', borderRadius: '8px', border: 'none',
                    backgroundColor: envoi ? '#aaa' : '#7cb342', color: 'white',
                    cursor: envoi ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
                  {envoi ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                </motion.button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Projets;