import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from './api';
import Footer from './Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const STATUT_COULEURS = {
  en_attente: { bg: '#fff8e1', color: '#f9a825', label: '⏳ En attente' },
  accepte:    { bg: '#e8f5e9', color: '#2e7d32', label: '✅ Accepté' },
  refuse:     { bg: '#ffebee', color: '#c62828', label: '❌ Refusé' },
};

function MesProjets() {
  const navigate = useNavigate();
  const [utilisateur, setUtilisateur] = useState(null);
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Projet sélectionné pour voir ses candidatures
  const [projetActif, setProjetActif] = useState(null);
  const [candidatures, setCandidatures] = useState([]);
  const [loadingCandidatures, setLoadingCandidatures] = useState(false);

  // 1. Vérification utilisateur connecté + rôle client
  useEffect(() => {
    const verifier = async () => {
      try {
        const res = await api.get('user/me/');
        if (res.data.role !== 'client') {
          navigate('/projets'); // Les freelancers n'ont pas accès
          return;
        }
        setUtilisateur(res.data);
      } catch {
        navigate('/connexion');
      }
    };
    verifier();
  }, []);

  // 2. Chargement des projets du client
  useEffect(() => {
    const charger = async () => {
      try {
        const res = await api.get('projets/');
        // On filtre côté front pour ne garder que les projets du client connecté
        const data = localStorage.getItem('utilisateur');
        const user = data ? JSON.parse(data) : null;
        if (user) {
          setProjets(res.data.filter(p => p.client === user.id));
        }
      } catch (err) {
        console.error('Erreur chargement projets :', err);
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  // 3. Charger les candidatures d'un projet
  const voirCandidatures = async (projet) => {
    if (projetActif?.id === projet.id) {
      setProjetActif(null);
      setCandidatures([]);
      return;
    }
    setProjetActif(projet);
    setLoadingCandidatures(true);
    try {
      const res = await api.get(`projets/${projet.id}/candidatures/`);
      setCandidatures(res.data);
    } catch (err) {
      console.error('Erreur chargement candidatures :', err);
    } finally {
      setLoadingCandidatures(false);
    }
  };

  // 4. Changer le statut d'une candidature
  const changerStatut = async (candidatureId, statut) => {
    try {
      await api.patch(`candidatures/${candidatureId}/statut/`, { statut });
      setCandidatures(prev =>
        prev.map(c => c.id === candidatureId ? { ...c, statut } : c)
      );
    } catch (err) {
      console.error('Erreur changement statut :', err);
    }
  };

  const handleDeconnexion = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f7f7', fontFamily: 'Arial, sans-serif' }}>

      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#fff', padding: '15px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={() => navigate('/')}
          style={{ margin: 0, fontSize: '26px', cursor: 'pointer' }}>
          <BrandTitle />
        </h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#333' }}>Accueil</span>
          <span onClick={() => navigate('/projets')} style={{ cursor: 'pointer', color: '#333' }}>Projets</span>
          <span onClick={() => navigate('/profil')}
            style={{ cursor: 'pointer', color: '#333', fontWeight: 'bold' }}>Mon Profil</span>
          <span onClick={() => navigate('/publier')}
            style={{ cursor: 'pointer', color: '#7cb342', fontWeight: 'bold' }}>+ Publier un projet</span>
          <span onClick={handleDeconnexion}
            style={{ cursor: 'pointer', color: '#e53935', fontWeight: 'bold' }}>Déconnexion</span>
        </div>
      </nav>

      {/* HEADER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ background: 'linear-gradient(135deg,#7cb342,#558b2f)',
          padding: '40px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ fontSize: '40px', fontWeight: '900',
          fontFamily: 'EB Garamond, Georgia, serif', margin: 0 }}>
          Mes Projets
        </h2>
        <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
          Gérez vos projets et consultez les candidatures reçues
        </p>
      </motion.div>

      {/* CONTENU */}
      <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>

        {/* BOUTON PUBLIER */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '25px' }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/publier')}
            style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
              padding: '12px 24px', borderRadius: '8px', cursor: 'pointer',
              fontWeight: 'bold', fontSize: '15px' }}>
            + Publier un nouveau projet
          </motion.button>
        </div>

        {/* CHARGEMENT */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#7cb342', fontWeight: 'bold' }}>
            Chargement de vos projets...
          </div>
        ) : projets.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '80px', color: '#aaa' }}>
            <p style={{ fontSize: '22px' }}>Vous n'avez pas encore publié de projet.</p>
            <motion.button whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/publier')}
              style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
                padding: '12px 28px', borderRadius: '8px', cursor: 'pointer',
                fontWeight: 'bold', fontSize: '15px', marginTop: '20px' }}>
              Publier mon premier projet
            </motion.button>
          </motion.div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {projets.map((projet, i) => (
              <motion.div key={projet.id}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ delay: i * 0.1 }}>

                {/* CARTE PROJET */}
                <div style={{ backgroundColor: 'white', borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.07)', overflow: 'hidden' }}>

                  <div style={{ padding: '25px', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ backgroundColor: '#e8f5e9', color: '#7cb342',
                        padding: '4px 12px', borderRadius: '20px',
                        fontSize: '12px', fontWeight: 'bold' }}>
                        {projet.categorie}
                      </span>
                      <h3 style={{ margin: '12px 0 8px', color: '#333', fontSize: '20px' }}>
                        {projet.titre}
                      </h3>
                      <p style={{ color: '#777', fontSize: '14px',
                        lineHeight: '1.6', margin: '0 0 12px' }}>
                        {projet.description.length > 150
                          ? projet.description.substring(0, 150) + '...'
                          : projet.description}
                      </p>
                      <p style={{ margin: 0, color: '#aaa', fontSize: '12px' }}>
                        Publié le {new Date(projet.date_publication).toLocaleDateString()}
                      </p>
                    </div>

                    <div style={{ textAlign: 'right', marginLeft: '20px', minWidth: '140px' }}>
                      <p style={{ fontSize: '24px', fontWeight: 'bold',
                        color: '#7cb342', margin: '0 0 15px' }}>
                        {projet.budget}€
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => voirCandidatures(projet)}
                        style={{ backgroundColor: projetActif?.id === projet.id ? '#558b2f' : '#7cb342',
                          color: 'white', border: 'none', padding: '10px 18px',
                          borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
                          fontSize: '14px', width: '100%' }}>
                        {projetActif?.id === projet.id ? '▲ Masquer' : '▼ Voir les candidatures'}
                      </motion.button>
                    </div>
                  </div>

                  {/* PANNEAU CANDIDATURES */}
                  <AnimatePresence>
                    {projetActif?.id === projet.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ borderTop: '1px solid #f0f0f0', overflow: 'hidden' }}>

                        <div style={{ padding: '25px', backgroundColor: '#fafafa' }}>
                          <h4 style={{ margin: '0 0 20px', color: '#333', fontSize: '16px' }}>
                            Candidatures reçues
                          </h4>

                          {loadingCandidatures ? (
                            <p style={{ color: '#7cb342', fontWeight: 'bold', textAlign: 'center' }}>
                              Chargement...
                            </p>
                          ) : candidatures.length === 0 ? (
                            <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0' }}>
                              Aucune candidature reçue pour ce projet.
                            </p>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                              {candidatures.map(c => (
                                <motion.div key={c.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  style={{ backgroundColor: 'white', borderRadius: '10px',
                                    padding: '20px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                                    borderLeft: `4px solid ${STATUT_COULEURS[c.statut].color}` }}>

                                  <div style={{ display: 'flex', justifyContent: 'space-between',
                                    alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                      {/* AVATAR */}
                                      <div style={{ width: '44px', height: '44px', borderRadius: '50%',
                                        backgroundColor: '#7cb342', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontWeight: 'bold', fontSize: '18px',
                                        overflow: 'hidden', flexShrink: 0 }}>
                                        {c.freelancer_avatar
                                          ? <img src={c.freelancer_avatar} alt=""
                                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                          : c.freelancer_nom?.charAt(0).toUpperCase()}
                                      </div>
                                      <div>
                                        <p style={{ margin: 0, fontWeight: 'bold', color: '#333', fontSize: '15px' }}>
                                          {c.freelancer_nom}
                                        </p>
                                        <p style={{ margin: 0, color: '#aaa', fontSize: '12px' }}>
                                          {new Date(c.date_candidature).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>

                                    {/* BADGE STATUT */}
                                    <span style={{ padding: '5px 14px', borderRadius: '20px',
                                      fontSize: '12px', fontWeight: 'bold',
                                      backgroundColor: STATUT_COULEURS[c.statut].bg,
                                      color: STATUT_COULEURS[c.statut].color }}>
                                      {STATUT_COULEURS[c.statut].label}
                                    </span>
                                  </div>

                                  {/* TARIF PROPOSÉ */}
                                  {c.tarif_propose && (
                                    <div style={{ marginBottom: '10px' }}>
                                      <span style={{ fontSize: '13px', color: '#777' }}>Tarif proposé : </span>
                                      <span style={{ fontWeight: 'bold', color: '#7cb342', fontSize: '16px' }}>
                                        {c.tarif_propose}€
                                      </span>
                                    </div>
                                  )}

                                  {/* LETTRE DE MOTIVATION */}
                                  {c.lettre && (
                                    <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6',
                                      margin: '0 0 15px', backgroundColor: '#f9f9f9',
                                      padding: '12px', borderRadius: '8px' }}>
                                      {c.lettre}
                                    </p>
                                  )}

                                  {/* BOUTONS D'ACTION */}
                                  {c.statut === 'en_attente' && (
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                      <motion.button
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        onClick={() => changerStatut(c.id, 'accepte')}
                                        style={{ backgroundColor: '#2e7d32', color: 'white',
                                          border: 'none', padding: '8px 20px', borderRadius: '6px',
                                          cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
                                        ✅ Accepter
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        onClick={() => changerStatut(c.id, 'refuse')}
                                        style={{ backgroundColor: '#c62828', color: 'white',
                                          border: 'none', padding: '8px 20px', borderRadius: '6px',
                                          cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
                                        ❌ Refuser
                                      </motion.button>
                                    </div>
                                  )}

                                  {/* SI DÉJÀ TRAITÉ */}
                                  {c.statut !== 'en_attente' && (
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      onClick={() => changerStatut(c.id, 'en_attente')}
                                      style={{ backgroundColor: '#eee', color: '#777',
                                        border: 'none', padding: '7px 16px', borderRadius: '6px',
                                        cursor: 'pointer', fontSize: '12px' }}>
                                      ↩ Remettre en attente
                                    </motion.button>
                                  )}

                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default MesProjets;