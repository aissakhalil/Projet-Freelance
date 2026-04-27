import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
 
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
 
const tabFade = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.25 } }
};
 
/* ─── Données mock Freelancer ─── */
const donneesFreelancer = {
  note: 4.9, avis: 38, projetsTermines: 52, tauxReponse: '98%',
  bio: `Développeur passionné avec 5 ans d'expérience en React, Node.js et Django.
Je livre des projets de qualité dans les délais impartis, avec une attention particulière
au design et à l'expérience utilisateur.`,
  competences: ['React.js', 'Node.js', 'Django', 'MySQL', 'Figma', 'TypeScript', 'Python', 'REST API'],
  tarif: '... MAD / heure',
  disponibilite: 'Disponible maintenant',
  portfolio: [
    { titre: 'Plateforme E-commerce', desc: 'React + Django + MySQL', img: 'https://picsum.photos/seed/p1/400/250' },
    { titre: 'App Mobile Livraison', desc: 'React Native + Node.js', img: 'https://picsum.photos/seed/p2/400/250' },
    { titre: 'Dashboard Analytics', desc: 'React + Chart.js', img: 'https://picsum.photos/seed/p3/400/250' },
    { titre: 'SaaS RH', desc: 'Next.js + PostgreSQL', img: 'https://picsum.photos/seed/p4/400/250' },
  ],
  avisListe: [
    { auteur: 'Sara M.', note: 5, date: 'Mars 2025', texte: 'Travail excellent, livré avant le délai. Je recommande vivement !' },
    { auteur: 'Karim B.', note: 5, date: 'Fév 2025', texte: 'Très professionnel, code propre et bien documenté.' },
    { auteur: 'Nadia L.', note: 4, date: 'Jan 2025', texte: 'Bonne communication, résultats conformes aux attentes.' },
  ]
};
 
/* ─── Données mock Client ─── */
const donneesClient = {
  projetsPublies: 8, projetsActifs: 2, totalDepense: '24 500 MAD',
  bio: `Entrepreneur dans la tech, je publie régulièrement des projets de développement
web/mobile et de design sur la plateforme. J'apprécie les freelancers rigoureux et proactifs.`,
  projetsListe: [
    { titre: 'Refonte site vitrine', budget: '3 000 MAD', statut: 'Terminé', candidats: 12, date: 'Mars 2025' },
    { titre: 'Application de gestion RH', budget: '8 000 MAD', statut: 'En cours', candidats: 7, date: 'Avr 2025' },
    { titre: 'Logo & identité visuelle', budget: '1 500 MAD', statut: 'Terminé', candidats: 19, date: 'Fév 2025' },
    { titre: 'Intégration API paiement', budget: '2 500 MAD', statut: 'En attente', candidats: 4, date: 'Avr 2025' },
  ],
  avisListe: [
    { auteur: 'Mohamed A.', note: 5, date: 'Mars 2025', texte: 'Client sérieux, brief clair, paiement rapide.' },
    { auteur: 'Fatima Z.', note: 5, date: 'Jan 2025', texte: 'Très agréable à travailler. Toujours disponible pour répondre.' },
  ]
};
 
/* ─── Composants utilitaires ─── */
function Etoiles({ note }) {
  return (
    <span style={{ color: '#f4c542', fontSize: '16px', letterSpacing: '2px' }}>
      {'★'.repeat(Math.floor(note))}{'☆'.repeat(5 - Math.floor(note))}
      <span style={{ color: '#555', fontSize: '13px', marginLeft: '6px' }}>{note}/5</span>
    </span>
  );
}
 
function Badge({ label, color = '#7cb342' }) {
  return (
    <span style={{
      backgroundColor: color + '18', color,
      border: `1px solid ${color}40`,
      borderRadius: '20px', padding: '4px 14px',
      fontSize: '13px', fontWeight: '600'
    }}>{label}</span>
  );
}
 
function StatBox({ valeur, label }) {
  return (
    <div style={{
      textAlign: 'center', padding: '18px 24px',
      backgroundColor: '#f9f9f9', borderRadius: '10px',
      borderTop: '3px solid #7cb342', flex: 1
    }}>
      <div style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a2e' }}>{valeur}</div>
      <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{label}</div>
    </div>
  );
}
 
function Section({ titre, children }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      style={{ marginBottom: '32px' }}>
      <h3 style={{
        fontSize: '18px', fontWeight: '700', color: '#1a1a2e',
        marginBottom: '16px', paddingBottom: '10px',
        borderBottom: '2px solid #7cb342', display: 'inline-block'
      }}>{titre}</h3>
      {children}
    </motion.div>
  );
}
 
function AvisSection({ avis, titre = 'Avis clients' }) {
  return (
    <Section titre={titre}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {avis.map((a, i) => (
          <motion.div key={i} whileHover={{ scale: 1.01 }}
            style={{ backgroundColor: '#f9f9f9', borderRadius: '10px',
              padding: '20px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ fontWeight: '700', color: '#1a1a2e' }}>{a.auteur}</span>
                <span style={{ color: '#aaa', fontSize: '12px', marginLeft: '10px' }}>{a.date}</span>
              </div>
              <Etoiles note={a.note} />
            </div>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{a.texte}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
 
/* ─── Profil Freelancer ─── */
function ProfilFreelancer({ user }) {
  const d = donneesFreelancer;
  const statutCouleur = { 'Terminé': '#7cb342', 'En cours': '#1976d2', 'En attente': '#f59e0b' };
 
  return (
    <motion.div key="freelancer" variants={tabFade} initial="hidden" animate="visible" exit="exit">
 
      {/* Stats */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <StatBox valeur={d.projetsTermines} label="Projets terminés" />
        <StatBox valeur={d.note + '/5'} label="Note moyenne" />
        <StatBox valeur={d.avis} label="Avis reçus" />
        <StatBox valeur={d.tauxReponse} label="Taux de réponse" />
      </div>
 
      {/* Bio */}
      <Section titre="À propos">
        <p style={{ color: '#555', lineHeight: '1.8', fontSize: '15px', whiteSpace: 'pre-line' }}>
          {d.bio}
        </p>
      </Section>
 
      {/* Compétences */}
      <Section titre="Compétences">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {d.competences.map((c, i) => (
            <motion.span key={i} whileHover={{ scale: 1.08 }}
              style={{ backgroundColor: '#1a1a2e', color: '#7cb342',
                padding: '6px 16px', borderRadius: '20px',
                fontSize: '13px', fontWeight: '600', cursor: 'default' }}>
              {c}
            </motion.span>
          ))}
        </div>
      </Section>
 
      {/* Tarif & dispo */}
      <Section titre="Tarif & disponibilité">
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1, backgroundColor: '#f0f8e8', border: '1px solid #c5e0a0',
            borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '6px' }}>Tarif horaire</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#558b2f' }}>{d.tarif}</div>
          </div>
          <div style={{ flex: 1, backgroundColor: '#e8f5e9', border: '1px solid #a5d6a7',
            borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '6px' }}>Disponibilité</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#2e7d32' }}>
              🟢 {d.disponibilite}
            </div>
          </div>
        </div>
      </Section>
 
      {/* Portfolio */}
      <Section titre="Portfolio">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {d.portfolio.map((p, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(0,0,0,0.14)' }}
              style={{ borderRadius: '10px', overflow: 'hidden', cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <img src={p.img} alt={p.titre}
                style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '14px 16px', backgroundColor: '#fff' }}>
                <div style={{ fontWeight: '700', color: '#1a1a2e', marginBottom: '4px' }}>{p.titre}</div>
                <div style={{ fontSize: '13px', color: '#888' }}>{p.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
 
      <AvisSection avis={d.avisListe} />
    </motion.div>
  );
}
 
/* ─── Profil Client ─── */
function ProfilClient({ user }) {
  const d = donneesClient;
  const statutCouleur = { 'Terminé': '#7cb342', 'En cours': '#1976d2', 'En attente': '#f59e0b' };
  const navigate = useNavigate();
 
  return (
    <motion.div key="client" variants={tabFade} initial="hidden" animate="visible" exit="exit">
 
      {/* Stats */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <StatBox valeur={d.projetsPublies} label="Projets publiés" />
        <StatBox valeur={d.projetsActifs} label="Projets actifs" />
        <StatBox valeur={d.totalDepense} label="Total dépensé" />
      </div>
 
      {/* Bio */}
      <Section titre="À propos">
        <p style={{ color: '#555', lineHeight: '1.8', fontSize: '15px', whiteSpace: 'pre-line' }}>
          {d.bio}
        </p>
      </Section>
 
      {/* Projets publiés */}
      <Section titre="Mes projets publiés">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {d.projetsListe.map((p, i) => (
            <motion.div key={i} whileHover={{ x: 4 }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 20px', backgroundColor: '#f9f9f9',
                borderRadius: '10px', borderLeft: `4px solid ${statutCouleur[p.statut] || '#ccc'}` }}>
              <div>
                <div style={{ fontWeight: '700', color: '#1a1a2e', marginBottom: '4px' }}>{p.titre}</div>
                <div style={{ fontSize: '13px', color: '#888' }}>
                  {p.candidats} candidats · Publié le {p.date}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '700', color: '#558b2f', marginBottom: '6px' }}>{p.budget}</div>
                <Badge label={p.statut} color={statutCouleur[p.statut] || '#888'} />
              </div>
            </motion.div>
          ))}
        </div>
 
        {/* Bouton publier un nouveau projet */}
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/publier')}
          style={{ marginTop: '16px', backgroundColor: '#7cb342', color: 'white',
            border: 'none', padding: '12px 24px', borderRadius: '8px',
            cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
          + Publier un nouveau projet
        </motion.button>
      </Section>
 
      <AvisSection avis={d.avisListe} titre="Avis reçus des freelancers" />
    </motion.div>
  );
}
 
/* ─── Page Profil principale ─── */
export default function Profil() {
  const navigate = useNavigate();
  const [utilisateur, setUtilisateur] = useState(null);
 
  useEffect(() => {
    // Lire l'utilisateur depuis localStorage
    const data = localStorage.getItem('utilisateur');
    if (!data) {
      // Pas connecté → rediriger vers connexion
      navigate('/connexion');
      return;
    }
    setUtilisateur(JSON.parse(data));
  }, []);
 
  const handleDeconnexion = () => {
    localStorage.removeItem('connecte');
    navigate('/');
  };
 
  if (!utilisateur) return null;
 
  const estFreelancer = utilisateur.type === 'freelancer';
 
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4',
      minHeight: '100vh', margin: 0, padding: 0 }}>
 
      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#fff', padding: '15px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={() => navigate('/')}
          style={{ color: '#7cb342', margin: 0, fontSize: '26px', cursor: 'pointer' }}>
          freelance<span style={{ color: '#333' }}>Platform</span>
        </h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#333' }}>Accueil</span>
          <span onClick={() => navigate('/projets')} style={{ cursor: 'pointer', color: '#333' }}>Projets</span>
          {estFreelancer ? null : (
            <span onClick={() => navigate('/publier')} style={{ cursor: 'pointer', color: '#333' }}>
              Publier un projet
            </span>
          )}
          <button onClick={handleDeconnexion}
            style={{ backgroundColor: '#e53935', color: 'white', border: 'none',
              padding: '8px 18px', borderRadius: '5px', cursor: 'pointer',
              fontWeight: 'bold', fontSize: '13px' }}>
            Déconnexion
          </button>
        </div>
      </nav>
 
      {/* HERO PROFIL */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2a2a4e 100%)',
        padding: '50px 40px 0', color: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'flex-end', gap: '28px' }}>
 
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
  src={utilisateur.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
  alt={utilisateur.nom}
  style={{
    width: '110px',
    height: '110px',
    borderRadius: '50%',
    border: '4px solid #7cb342',
    objectFit: 'cover',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
  }}
/>
              <span style={{ position: 'absolute', bottom: '6px', right: '6px',
                width: '16px', height: '16px', backgroundColor: '#4caf50',
                borderRadius: '50%', border: '2px solid #fff' }} />
            </div>
 
            {/* Infos */}
            <div style={{ flex: 1, paddingBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800' }}>{utilisateur.nom}</h2>
                <Badge label="Vérifié ✓" color="#7cb342" />
                <Badge
                  label={estFreelancer ? ' Freelancer' : 'Client'}
                  color={estFreelancer ? '#1976d2' : '#f59e0b'}
                />
              </div>
              <p style={{ color: '#bbb', margin: '0 0 8px', fontSize: '15px' }}>
                {utilisateur.titre}
              </p>
              <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#aaa' }}>
                <span> {utilisateur.localisation}</span>
                <span>🗓 {utilisateur.membre}</span>
                {estFreelancer && (
                  <span style={{ color: '#f4c542' }}>
                    ★ {donneesFreelancer.note} ({donneesFreelancer.avis} avis)
                  </span>
                )}
              </div>
            </div>
 
            {/* Bouton action */}
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => estFreelancer ? null : navigate('/publier')}
              style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
                padding: '14px 28px', borderRadius: '8px', cursor: 'pointer',
                fontWeight: '700', fontSize: '15px', marginBottom: '20px',
                boxShadow: '0 4px 14px rgba(124,179,66,0.4)' }}>
              {estFreelancer ? ' Modifier le profil' : '+ Publier un projet'}
            </motion.button>
          </motion.div>
 
          {/* Badge type de compte */}
          <div style={{ marginTop: '16px', paddingBottom: '16px' }}>
            <div style={{ display: 'inline-block', backgroundColor: estFreelancer ? '#1976d218' : '#f59e0b18',
              border: `1px solid ${estFreelancer ? '#1976d240' : '#f59e0b40'}`,
              borderRadius: '8px', padding: '8px 20px', color: estFreelancer ? '#90caf9' : '#fcd34d',
              fontSize: '13px', fontWeight: '600' }}>
              {estFreelancer
                ? ' Vous êtes connecté en tant que Freelancer'
                : ' Vous êtes connecté en tant que Client'}
            </div>
          </div>
        </div>
      </div>
 
      {/* CONTENU */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '36px 40px' }}>
        <AnimatePresence mode="wait">
          {estFreelancer
            ? <ProfilFreelancer key="freelancer" user={utilisateur} />
            : <ProfilClient key="client" user={utilisateur} />
          }
        </AnimatePresence>
      </div>
 
      {/* FOOTER */}
      <footer style={{ backgroundColor: '#111', color: 'white', textAlign: 'center', padding: '40px' }}>
        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#7cb342', marginBottom: '10px' }}>
          freelancePlatform
        </p>
        <p style={{ color: '#555' }}>© 2026 FreelancePlatform — Tous droits réservés</p>
      </footer>
    </div>
  );
}