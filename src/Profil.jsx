import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
 
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
 
const tabFade = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit:   { opacity: 0, x: -20, transition: { duration: 0.25 } }
};
 
/* ─── Données mock ─── */
const mockFreelancer = {
  nom: 'Yassine Khalil',
  titre: 'Développeur Full Stack & UI Designer',
  localisation: 'Casablanca, Maroc',
  membre: 'Membre depuis Janvier 2024',
  note: 4.9,
  avis: 38,
  projetsTermines: 52,
  tauxReponse: '98%',
  avatar: 'https://i.pravatar.cc/150?img=12',
  bio: `Développeur passionné avec 5 ans d'expérience en React, Node.js et Django.
Je livre des projets de qualité dans les délais impartis, avec une attention particulière
au design et à l'expérience utilisateur.`,
  competences: ['React.js', 'Node.js', 'Django', 'MySQL', 'Figma', 'TypeScript', 'Python', 'REST API'],
  tarif: '350 MAD / heure',
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
 
const mockClient = {
  nom: 'Yassine Khalil',
  titre: 'Fondateur @ TechStart Maroc',
  localisation: 'Casablanca, Maroc',
  membre: 'Membre depuis Janvier 2024',
  projetsPublies: 8,
  projetsActifs: 2,
  totalDepense: '24 500 MAD',
  avatar: 'https://i.pravatar.cc/150?img=12',
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
      backgroundColor: color + '18', color, border: `1px solid ${color}40`,
      borderRadius: '20px', padding: '4px 14px', fontSize: '13px', fontWeight: '600'
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
 
/* ─── Onglet Freelancer ─── */
function TabFreelancer({ data }) {
  return (
    <motion.div key="freelancer" variants={tabFade} initial="hidden" animate="visible" exit="exit">
 
      {/* Statistiques */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <StatBox valeur={data.projetsTermines} label="Projets terminés" />
        <StatBox valeur={data.note + '/5'} label="Note moyenne" />
        <StatBox valeur={data.avis} label="Avis reçus" />
        <StatBox valeur={data.tauxReponse} label="Taux de réponse" />
      </div>
 
      {/* Bio */}
      <Section titre="À propos">
        <p style={{ color: '#555', lineHeight: '1.8', fontSize: '15px', whiteSpace: 'pre-line' }}>
          {data.bio}
        </p>
      </Section>
 
      {/* Compétences */}
      <Section titre="Compétences">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {data.competences.map((c, i) => (
            <motion.span key={i} whileHover={{ scale: 1.08 }}
              style={{
                backgroundColor: '#1a1a2e', color: '#7cb342',
                padding: '6px 16px', borderRadius: '20px',
                fontSize: '13px', fontWeight: '600', cursor: 'default'
              }}>{c}</motion.span>
          ))}
        </div>
      </Section>
 
      {/* Tarif & dispo */}
      <Section titre="Tarif & disponibilité">
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{
            flex: 1, backgroundColor: '#f0f8e8', border: '1px solid #c5e0a0',
            borderRadius: '10px', padding: '20px', textAlign: 'center'
          }}>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '6px' }}>Tarif horaire</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#558b2f' }}>{data.tarif}</div>
          </div>
          <div style={{
            flex: 1, backgroundColor: '#e8f5e9', border: '1px solid #a5d6a7',
            borderRadius: '10px', padding: '20px', textAlign: 'center'
          }}>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '6px' }}>Disponibilité</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#2e7d32' }}>
              🟢 {data.disponibilite}
            </div>
          </div>
        </div>
      </Section>
 
      {/* Portfolio */}
      <Section titre="Portfolio">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {data.portfolio.map((p, i) => (
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
 
      {/* Avis */}
      <AvisSection avis={data.avisListe} />
    </motion.div>
  );
}
 
/* ─── Onglet Client ─── */
function TabClient({ data }) {
  const statutCouleur = { 'Terminé': '#7cb342', 'En cours': '#1976d2', 'En attente': '#f59e0b' };
  return (
    <motion.div key="client" variants={tabFade} initial="hidden" animate="visible" exit="exit">
 
      {/* Stats */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <StatBox valeur={data.projetsPublies} label="Projets publiés" />
        <StatBox valeur={data.projetsActifs} label="Projets actifs" />
        <StatBox valeur={data.totalDepense} label="Total dépensé" />
      </div>
 
      {/* Bio */}
      <Section titre="À propos">
        <p style={{ color: '#555', lineHeight: '1.8', fontSize: '15px', whiteSpace: 'pre-line' }}>
          {data.bio}
        </p>
      </Section>
 
      {/* Projets publiés */}
      <Section titre="Projets publiés">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.projetsListe.map((p, i) => (
            <motion.div key={i} whileHover={{ x: 4 }}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 20px', backgroundColor: '#f9f9f9',
                borderRadius: '10px', borderLeft: `4px solid ${statutCouleur[p.statut] || '#ccc'}`
              }}>
              <div>
                <div style={{ fontWeight: '700', color: '#1a1a2e', marginBottom: '4px' }}>{p.titre}</div>
                <div style={{ fontSize: '13px', color: '#888' }}>
                  {p.candidats} candidats · Publié le {p.date}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '700', color: '#558b2f', marginBottom: '6px' }}>{p.budget}</div>
                <Badge
                  label={p.statut}
                  color={statutCouleur[p.statut] || '#888'}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
 
      {/* Avis laissés */}
      <AvisSection avis={data.avisListe} titre="Avis reçus des freelancers" />
    </motion.div>
  );
}
 
/* ─── Section générique ─── */
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
 
/* ─── Avis ─── */
function AvisSection({ avis, titre = 'Avis clients' }) {
  return (
    <Section titre={titre}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {avis.map((a, i) => (
          <motion.div key={i} whileHover={{ scale: 1.01 }}
            style={{
              backgroundColor: '#f9f9f9', borderRadius: '10px',
              padding: '20px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)'
            }}>
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
 
/* ─── Page principale ─── */
export default function Profil() {
  const [onglet, setOnglet] = useState('freelancer'); // 'freelancer' | 'client'
  const navigate = useNavigate();
  const data = onglet === 'freelancer' ? mockFreelancer : mockClient;
 
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4',
      minHeight: '100vh', margin: 0, padding: 0 }}>
 
      {/* NAVBAR — identique à App.jsx */}
      <nav style={{
        backgroundColor: '#fff', padding: '15px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100
      }}>
        <h1 onClick={() => navigate('/')}
          style={{ color: '#7cb342', margin: 0, fontSize: '26px', cursor: 'pointer' }}>
          freelance<span style={{ color: '#333' }}>Platform</span>
        </h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#333' }}>Accueil</span>
          <span onClick={() => navigate('/projets')} style={{ cursor: 'pointer', color: '#333' }}>Projets</span>
          <button onClick={() => navigate('/inscription')} style={{
            backgroundColor: '#7cb342', color: 'white', border: 'none',
            padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
          }}>Inscription</button>
        </div>
      </nav>
 
      {/* HERO PROFIL */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #2a2a4e 100%)',
        padding: '50px 40px 0', color: 'white'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'flex-end', gap: '28px', paddingBottom: '0' }}>
 
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src={data.avatar} alt={data.nom}
                style={{
                  width: '110px', height: '110px', borderRadius: '50%',
                  border: '4px solid #7cb342', objectFit: 'cover',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }} />
              <span style={{
                position: 'absolute', bottom: '6px', right: '6px',
                width: '16px', height: '16px', backgroundColor: '#4caf50',
                borderRadius: '50%', border: '2px solid #fff'
              }} />
            </div>
 
            {/* Infos principales */}
            <div style={{ flex: 1, paddingBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800' }}>{data.nom}</h2>
                <Badge label="Vérifié ✓" color="#7cb342" />
              </div>
              <p style={{ color: '#bbb', margin: '0 0 8px', fontSize: '15px' }}>{data.titre}</p>
              <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#aaa' }}>
                <span>📍 {data.localisation}</span>
                <span>🗓 {data.membre}</span>
                {onglet === 'freelancer' && (
                  <span style={{ color: '#f4c542' }}>
                    ★ {mockFreelancer.note} ({mockFreelancer.avis} avis)
                  </span>
                )}
              </div>
            </div>
 
            {/* Bouton contacter */}
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{
                backgroundColor: '#7cb342', color: 'white', border: 'none',
                padding: '14px 28px', borderRadius: '8px', cursor: 'pointer',
                fontWeight: '700', fontSize: '15px', marginBottom: '20px',
                boxShadow: '0 4px 14px rgba(124,179,66,0.4)'
              }}>
              ✉ Contacter
            </motion.button>
          </motion.div>
 
          {/* Onglets */}
          <div style={{ display: 'flex', gap: '0', marginTop: '16px' }}>
            {[
              { key: 'freelancer', label: '👨‍💻 Profil Freelancer' },
              { key: 'client', label: '🏢 Profil Client' }
            ].map(o => (
              <button key={o.key} onClick={() => setOnglet(o.key)}
                style={{
                  padding: '14px 32px', border: 'none', cursor: 'pointer',
                  fontSize: '14px', fontWeight: '700', transition: 'all 0.2s',
                  backgroundColor: 'transparent',
                  color: onglet === o.key ? '#7cb342' : '#aaa',
                  borderBottom: onglet === o.key ? '3px solid #7cb342' : '3px solid transparent',
                }}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>
 
      {/* CONTENU ONGLETS */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '36px 40px' }}>
        <AnimatePresence mode="wait">
          {onglet === 'freelancer'
            ? <TabFreelancer key="freelancer" data={mockFreelancer} />
            : <TabClient key="client" data={mockClient} />
          }
        </AnimatePresence>
      </div>
 
      {/* FOOTER */}
      <footer style={{
        backgroundColor: '#111', color: 'white',
        textAlign: 'center', padding: '40px',
      }}>
        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#7cb342', marginBottom: '10px' }}>
          freelancePlatform
        </p>
        <p style={{ color: '#555' }}>© 2026 FreelancePlatform — Tous droits réservés</p>
      </footer>
    </div>
  );
}
 