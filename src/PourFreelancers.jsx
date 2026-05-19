import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';
import BrandTitle from './BrandTitle';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const etapes = [
  { num: '1', emoji: '', titre: 'Créez votre profil', desc: 'Présentez vos compétences, votre portfolio et fixez votre tarif horaire.' },
  { num: '2', emoji: '', titre: 'Trouvez des projets', desc: 'Parcourez des centaines de projets et postulez à ceux qui correspondent à votre profil.' },
  { num: '3', emoji: '', titre: 'Discutez avec le client', desc: 'Échangez via notre messagerie pour clarifier les besoins avant de commencer.' },
  { num: '4', emoji: '', titre: 'Soyez payé', desc: 'Recevez votre paiement de façon sécurisée dès la validation du projet.' },
];

const stats = [
  { valeur: '10 000+', label: 'Freelancers actifs' },
  { valeur: '5 000+', label: 'Projets publiés' },
  { valeur: '98%', label: 'Taux de satisfaction' },
  { valeur: '24h', label: 'Délai moyen de réponse' },
];

const conseils = [
  { emoji: '', titre: 'Photo professionnelle', desc: 'Un profil avec une vraie photo reçoit 3x plus de candidatures acceptées.' },
  { emoji: '', titre: 'Portfolio complet', desc: 'Montrez vos meilleurs travaux pour convaincre les clients dès le premier coup d\'œil.' },
  { emoji: '', titre: 'Collectez des avis', desc: 'Les premiers avis positifs boostent votre visibilité sur la plateforme.' },
  { emoji: '', titre: 'Soyez spécifique', desc: 'Un profil spécialisé attire plus de clients que "je fais tout".' },
];

export default function PourFreelancers() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f7f7f7' }}>

      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#fff', padding: '15px 40px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={() => navigate('/')} style={{ margin: 0, fontSize: '26px', cursor: 'pointer' }}>
          <BrandTitle />
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
        style={{ background: 'linear-gradient(135deg,#7cb342,#558b2f)',
          padding: '80px 40px', textAlign: 'center', color: 'white' }}>
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '42px', fontWeight: '900', fontFamily: 'EB Garamond, Georgia, serif', marginBottom: '16px' }}>
          👨‍💻 Pour les Freelancers
        </motion.h2>
        <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '600px', margin: '0 auto 30px' }}>
          Développez votre activité, trouvez des clients et gérez votre carrière en toute liberté.
        </p>
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/inscription')}
          style={{ backgroundColor: 'white', color: '#7cb342', border: 'none',
            padding: '16px 36px', borderRadius: '8px', cursor: 'pointer',
            fontSize: '17px', fontWeight: 'bold' }}>
          Créer mon profil freelancer →
        </motion.button>
      </motion.div>

      {/* STATS */}
      <div style={{ backgroundColor: '#1a1a2e', padding: '40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
          {stats.map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.1 }}
              style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#7cb342' }}>{s.valeur}</div>
              <div style={{ color: '#aaa', fontSize: '13px', marginTop: '4px' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ÉTAPES */}
      <div style={{ maxWidth: '1000px', margin: '60px auto', padding: '0 40px' }}>
        <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', fontSize: '30px', color: '#1a1a2e', marginBottom: '40px' }}>
          Comment démarrer ?
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

      {/* CONSEILS */}
      <div style={{ backgroundColor: '#f0f8e8', padding: '60px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ textAlign: 'center', fontSize: '30px', color: '#1a1a2e', marginBottom: '40px' }}>
            Conseils pour réussir
          </motion.h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
            {conseils.map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px',
                  textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{c.emoji}</div>
                <h4 style={{ color: '#558b2f', marginBottom: '8px' }}>{c.titre}</h4>
                <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.6' }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '60px 40px', backgroundColor: '#1a1a2e' }}>
        <h3 style={{ fontSize: '28px', color: 'white', marginBottom: '12px' }}>Lancez-vous dès aujourd'hui !</h3>
        <p style={{ color: '#aaa', marginBottom: '24px' }}>Inscription gratuite, sans commission sur les premiers projets.</p>
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/inscription')}
          style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
            padding: '15px 36px', borderRadius: '8px', cursor: 'pointer',
            fontSize: '16px', fontWeight: 'bold' }}>
          Rejoindre en tant que Freelancer →
        </motion.button>
      </div>

      <Footer />
    </div>
  );
}