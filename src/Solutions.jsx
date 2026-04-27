import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const solutions = [
  { emoji: '🏭', titre: 'Équipe dédiée', desc: 'Constituez une équipe de freelancers permanents pour vos projets long terme.' },
  { emoji: '⚡', titre: 'Matching prioritaire', desc: 'Accédez en priorité aux meilleurs talents avant les autres clients.' },
  { emoji: '📊', titre: 'Tableau de bord', desc: 'Gérez tous vos projets et freelancers depuis un tableau de bord centralisé.' },
  { emoji: '🔐', titre: 'NDA & Confidentialité', desc: 'Contrats de confidentialité intégrés pour protéger vos données sensibles.' },
  { emoji: '💳', titre: 'Facturation centralisée', desc: 'Une seule facture mensuelle pour tous vos freelancers. Simplifié.' },
  { emoji: '🤝', titre: 'Account Manager', desc: 'Un gestionnaire dédié pour vous accompagner et gérer vos relations.' },
];

const clients = [
  { nom: 'TechMaroc', secteur: 'Startup Tech', temoignage: 'Nous avons recruté 5 freelancers en moins d\'une semaine. Qualité exceptionnelle.' },
  { nom: 'Atlas Digital', secteur: 'Agence Marketing', temoignage: 'La solution entreprise nous a permis de scaler nos projets rapidement et efficacement.' },
  { nom: 'Souss Industries', secteur: 'Industrie', temoignage: 'La facturation centralisée a simplifié notre comptabilité. Excellent service.' },
];

export default function Solutions() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f7f7f7' }}>

      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#fff', padding: '15px 40px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={() => navigate('/')} style={{ color: '#7cb342', margin: 0, fontSize: '26px', cursor: 'pointer' }}>
          freelance<span style={{ color: '#333' }}>Platform</span>
        </h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span onClick={() => navigate('/projets')} style={{ cursor: 'pointer', color: '#333' }}>Projets</span>
          <span onClick={() => navigate('/connexion')} style={{ cursor: 'pointer', color: '#333' }}>Connexion</span>
          <button onClick={() => navigate('/inscription')}
            style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
              padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Inscription
          </button>
        </div>
      </nav>

      {/* HERO */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ background: 'linear-gradient(135deg,#1a1a2e,#2a2a4e)',
          padding: '80px 40px', textAlign: 'center', color: 'white' }}>
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '42px', fontWeight: '900', fontFamily: 'EB Garamond, Georgia, serif', marginBottom: '16px' }}>
          🏢 Solutions Entreprises
        </motion.h2>
        <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '650px', margin: '0 auto 30px' }}>
          Des solutions sur mesure pour les entreprises qui ont besoin de talents freelance à grande échelle.
        </p>
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/inscription')}
          style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
            padding: '16px 36px', borderRadius: '8px', cursor: 'pointer',
            fontSize: '17px', fontWeight: 'bold', boxShadow: '0 4px 14px rgba(124,179,66,0.4)' }}>
          Demander une démo →
        </motion.button>
      </motion.div>

      {/* SOLUTIONS */}
      <div style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 40px' }}>
        <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', fontSize: '30px', color: '#1a1a2e', marginBottom: '40px' }}>
          Ce que nous offrons
        </motion.h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
          {solutions.map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
              style={{ backgroundColor: 'white', borderRadius: '14px', padding: '32px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.07)', borderLeft: '4px solid #7cb342' }}>
              <div style={{ fontSize: '40px', marginBottom: '14px' }}>{s.emoji}</div>
              <h4 style={{ color: '#1a1a2e', fontSize: '17px', marginBottom: '10px' }}>{s.titre}</h4>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.6' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TÉMOIGNAGES */}
      <div style={{ backgroundColor: '#f0f8e8', padding: '60px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ textAlign: 'center', fontSize: '30px', color: '#1a1a2e', marginBottom: '40px' }}>
            Ils nous font confiance
          </motion.h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            {clients.map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ delay: i * 0.1 }}
                style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
                <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.7', marginBottom: '16px', fontStyle: 'italic' }}>
                  "{c.temoignage}"
                </p>
                <div style={{ fontWeight: '700', color: '#1a1a2e' }}>{c.nom}</div>
                <div style={{ color: '#7cb342', fontSize: '13px' }}>{c.secteur}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '60px 40px', backgroundColor: '#1a1a2e' }}>
        <h3 style={{ fontSize: '28px', color: 'white', marginBottom: '12px' }}>
          Parlons de vos besoins
        </h3>
        <p style={{ color: '#aaa', marginBottom: '24px' }}>
          Notre équipe enterprise est disponible pour vous proposer une offre personnalisée.
        </p>
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/inscription')}
          style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
            padding: '15px 36px', borderRadius: '8px', cursor: 'pointer',
            fontSize: '16px', fontWeight: 'bold' }}>
          Nous contacter →
        </motion.button>
      </div>

      <footer style={{ backgroundColor: '#111', color: 'white', textAlign: 'center', padding: '30px' }}>
        <p style={{ color: '#7cb342', fontWeight: 'bold', fontSize: '18px' }}>freelancePlatform</p>
        <p style={{ color: '#555', fontSize: '13px' }}>© 2026 FreelancePlatform — Tous droits réservés</p>
      </footer>
    </div>
  );
}