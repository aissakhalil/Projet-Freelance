import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
 
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
 
const categories = [
  { emoji: '', titre: 'Programmation & Tech', desc: 'Développement web, mobile, logiciels, scripts, APIs...', count: '1 240 projets' },
  { emoji: '', titre: 'Graphisme & Design', desc: 'Logos, identités visuelles, UI/UX, illustrations...', count: '870 projets' },
  { emoji: '', titre: 'Marketing Digital', desc: 'SEO, réseaux sociaux, publicité, email marketing...', count: '650 projets' },
  { emoji: '', titre: 'Rédaction & Traduction', desc: 'Articles, copywriting, traduction FR/EN/AR...', count: '430 projets' },
  { emoji: '', titre: 'Vidéo & Animation', desc: 'Montage, motion design, after effects, YouTube...', count: '310 projets' },
  { emoji: '', titre: 'Business', desc: 'Plans d\'affaires, études de marché, comptabilité...', count: '280 projets' },
  { emoji: '', titre: 'Consulting', desc: 'Conseil stratégique, coaching, formation...', count: '195 projets' },
  { emoji: '', titre: 'Musique & Audio', desc: 'Composition, mixage, doublage, podcasts...', count: '120 projets' },
];
 
export default function Categories() {
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
 
      {/* HEADER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ background: 'linear-gradient(135deg,#7cb342,#558b2f)',
          padding: '60px 40px', textAlign: 'center', color: 'white' }}>
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '42px', fontWeight: '900', fontFamily: 'EB Garamond, Georgia, serif', marginBottom: '12px' }}>
          Toutes les Catégories
        </motion.h2>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>
          Explorez des centaines de services proposés par nos freelancers
        </p>
      </motion.div>
 
      {/* GRILLE */}
      <div style={{ maxWidth: '1100px', margin: '50px auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {categories.map((cat, i) => (
            <motion.div key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
              onClick={() => navigate('/projets')}
              style={{ backgroundColor: 'white', borderRadius: '14px', padding: '30px 24px',
                textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                borderBottom: '3px solid #7cb342' }}>
              <div style={{ fontSize: '48px', marginBottom: '14px' }}>{cat.emoji}</div>
              <h3 style={{ color: '#1a1a2e', fontSize: '16px', fontWeight: '700', marginBottom: '10px' }}>
                {cat.titre}
              </h3>
              <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.6', marginBottom: '14px' }}>
                {cat.desc}
              </p>
              <span style={{ backgroundColor: '#f0f8e8', color: '#558b2f',
                padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                {cat.count}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
 
      <footer style={{ backgroundColor: '#111', color: 'white', textAlign: 'center', padding: '30px', marginTop: '40px' }}>
        <p style={{ color: '#7cb342', fontWeight: 'bold', fontSize: '18px' }}>freelancePlatform</p>
        <p style={{ color: '#555', fontSize: '13px' }}>© 2026 FreelancePlatform — Tous droits réservés</p>
      </footer>
    </div>
  );
}