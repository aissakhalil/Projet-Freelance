import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
 
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
 
const etapes = [
  { num: '1', titre: 'Publiez votre projet', desc: 'Décrivez votre besoin en quelques minutes. Précisez le budget, le délai et les compétences requises. C\'est gratuit !', emoji: '📝' },
  { num: '2', titre: 'Recevez des candidatures', desc: 'Des freelancers qualifiés postulent à votre projet. Comparez leurs profils, portfolios et tarifs facilement.', emoji: '📩' },
  { num: '3', titre: 'Choisissez le meilleur', desc: 'Discutez avec les candidats via notre messagerie, puis sélectionnez le freelancer qui correspond le mieux.', emoji: '✅' },
  { num: '4', titre: 'Payez en toute sécurité', desc: 'Le paiement est sécurisé et n\'est libéré qu\'après validation de votre projet. Zéro risque garanti.', emoji: '🔒' },
];
 
const avantages = [
  { emoji: '', titre: 'Rapide', desc: 'Recevez vos premières candidatures en moins de 24h.' },
  { emoji: '', titre: 'Large choix', desc: 'Accédez à des milliers de freelancers dans toutes les disciplines.' },
  { emoji: '', titre: 'Économique', desc: 'Publiez gratuitement et ne payez que pour les services sélectionnés.' },
  { emoji: '', titre: 'Sécurisé', desc: 'Paiements protégés et freelancers vérifiés par notre équipe.' },
];
 
export default function PourClients() {
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
          🏢 Pour les Clients
        </motion.h2>
        <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '600px', margin: '0 auto 30px' }}>
          Trouvez le freelancer parfait pour votre projet en quelques minutes.
        </p>
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/publier')}
          style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
            padding: '16px 36px', borderRadius: '8px', cursor: 'pointer',
            fontSize: '17px', fontWeight: 'bold', boxShadow: '0 4px 14px rgba(124,179,66,0.4)' }}>
          Publier un projet gratuitement →
        </motion.button>
      </motion.div>
 
      {/* ÉTAPES */}
      <div style={{ maxWidth: '1000px', margin: '60px auto', padding: '0 40px' }}>
        <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', fontSize: '30px', color: '#1a1a2e', marginBottom: '40px' }}>
          Comment ça marche ?
        </motion.h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
          {etapes.map((e, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.1 }}
              style={{ backgroundColor: 'white', borderRadius: '14px', padding: '30px 20px',
                textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                borderTop: '4px solid #7cb342' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>{e.emoji}</div>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#7cb342',
                borderRadius: '50%', color: 'white', fontWeight: '800', fontSize: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                {e.num}
              </div>
              <h4 style={{ color: '#1a1a2e', marginBottom: '10px', fontSize: '16px' }}>{e.titre}</h4>
              <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.6' }}>{e.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
 
      {/* AVANTAGES */}
      <div style={{ backgroundColor: '#1a1a2e', padding: '60px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ textAlign: 'center', fontSize: '30px', color: 'white', marginBottom: '40px' }}>
            Pourquoi choisir FreelancePlatform ?
          </motion.h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
            {avantages.map((a, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ delay: i * 0.1 }}
                whileHover={{ backgroundColor: '#7cb342' }}
                style={{ backgroundColor: '#2a2a4e', borderRadius: '12px', padding: '30px',
                  textAlign: 'center', transition: 'all 0.3s' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{a.emoji}</div>
                <h4 style={{ color: '#7cb342', marginBottom: '8px' }}>{a.titre}</h4>
                <p style={{ color: '#ccc', fontSize: '13px', lineHeight: '1.6' }}>{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
 
      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '60px 40px', backgroundColor: '#f0f8e8' }}>
        <h3 style={{ fontSize: '28px', color: '#1a1a2e', marginBottom: '12px' }}>Prêt à démarrer ?</h3>
        <p style={{ color: '#666', marginBottom: '24px' }}>Créez un compte gratuit et publiez votre premier projet.</p>
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/inscription')}
          style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
            padding: '15px 36px', borderRadius: '8px', cursor: 'pointer',
            fontSize: '16px', fontWeight: 'bold' }}>
          Créer un compte →
        </motion.button>
      </div>
 
      <footer style={{ backgroundColor: '#111', color: 'white', textAlign: 'center', padding: '30px' }}>
        <p style={{ color: '#7cb342', fontWeight: 'bold', fontSize: '18px' }}>freelancePlatform</p>
        <p style={{ color: '#555', fontSize: '13px' }}>© 2026 FreelancePlatform — Tous droits réservés</p>
      </footer>
    </div>
  );
}