import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

// Imports de tes composants
import Inscription from './Inscription';
import Connexion from './Connexion';
import Projets from './Projets';
import Profil from './Profil';
import PublierProjet from './PublierProjet';
import Categories from './Categories';
import PourClients from './PourClients';
import PourFreelancers from './PourFreelancers';
import Solutions from './Solutions';
import ModifierProfil from './ModifierProfil';
import Messagerie from './Messagerie';
import MesProjets from './MesProjets';

const traductions = {
  Français: {
    cat: 'Catégories', clients: 'Pour les clients',
    freelances: 'Pour les freelances', solutions: 'Solutions entreprises',
    explorer: 'Explorer', projets: 'Projets', connexion: 'Connexion',
    inscription: 'Inscription', hero: 'Trouvez le Freelancer Parfait',
    sous: 'Des milliers de professionnels prêts à travailler sur vos projets',
    recherche: 'Rechercher un service...', btn: 'Rechercher',
    catPop: 'Catégories populaires', tout: 'Tout ce que vous trouvez sur FreelancePlatform',
    footer: 'Tous droits réservés',
    profil: 'Profil', deconnexion: 'Déconnexion',
    publier: 'Publier un projet',
    messages: 'Messages',
    mesProjets: 'Mes Projets',
    cats: ['Programmation & Tech','Graphisme & Design','Marketing Digital',
           'Rédaction & Traduction','Vidéo & Animation','Business','Consulting','Musique & Audio'],
    infos: [
      {titre:'Catégories', texte:'Explorez des centaines de catégories : tech, design, marketing et plus.'},
      {titre:'Pour les clients', texte:'Publiez votre projet et recevez des candidatures de freelancers qualifiés.'},
      {titre:'Pour les freelances', texte:'Créez votre profil, postulez aux projets et développez votre carrière.'},
      {titre:'Solutions entreprises', texte:'Des solutions sur mesure pour les entreprises qui cherchent des talents.'},
    ],
    services: 'Nos Services',
    servicesList: [
      {titre:' Mise en relation rapide', texte:"Trouvez le freelancer idéal en quelques minutes. Notre algorithme intelligent vous connecte avec les meilleurs talents selon vos besoins."},
      {titre:' Paiements sécurisés', texte:"Vos transactions sont protégées. Le paiement n'est libéré qu'après validation de votre projet. Zéro risque, 100% confiance."},
      {titre:' Freelancers vérifiés', texte:'Chaque professionnel est vérifié et noté par notre communauté. Travaillez uniquement avec les meilleurs talents du marché.'},
      {titre:' Support 24/7', texte:"Notre équipe est disponible à tout moment pour vous accompagner. Des experts humains prêts à résoudre vos problèmes rapidement."},
    ]
  },
  English: {
    cat: 'Categories', clients: 'For clients',
    freelances: 'For freelancers', solutions: 'Enterprise solutions',
    explorer: 'Explore', projets: 'Projects', connexion: 'Login',
    inscription: 'Sign up', hero: 'Find the Perfect Freelancer',
    sous: 'Thousands of professionals ready to work on your projects',
    recherche: 'Search for a service...', btn: 'Search',
    catPop: 'Popular Categories', tout: 'Everything you find on FreelancePlatform',
    footer: 'All rights reserved',
    profil: 'Profile', deconnexion: 'Logout',
    publier: 'Post a project',
    messages: 'Messages',
    mesProjets: 'My Projects',
    cats: ['Programming & Tech','Graphics & Design','Digital Marketing',
           'Writing & Translation','Video & Animation','Business','Consulting','Music & Audio'],
    infos: [
      {titre:'Categories', texte:'Explore hundreds of categories: tech, design, marketing and more.'},
      {titre:'For clients', texte:'Post your project and receive applications from qualified freelancers.'},
      {titre:'For freelancers', texte:'Create your profile, apply to projects and grow your career.'},
      {titre:'Enterprise solutions', texte:'Tailored solutions for companies looking for reliable freelance talent.'},
    ],
    services: 'Our Services',
    servicesList: [
      {titre:' Fast Matching', texte:'Find the ideal freelancer in minutes. Our smart algorithm connects you with the best talents based on your needs.'},
      {titre:' Secure Payments', texte:'Your transactions are fully protected. Payment is only released after project validation. Zero risk, 100% trust.'},
      {titre:' Verified Freelancers', texte:'Every professional is verified and rated by our community. Work only with the best talents on the market.'},
      {titre:' 24/7 Support', texte:'Our team is available at any time to support you. Human experts ready to solve your problems quickly.'},
    ]
  },
  'عربي': {
    cat: 'الفئات', clients: 'للعملاء',
    freelances: 'للمستقلين', solutions: 'حلول المؤسسات',
    explorer: 'استكشاف', projets: 'المشاريع', connexion: 'تسجيل الدخول',
    inscription: 'إنشاء حساب', hero: 'ابحث عن المستقل المثالي',
    sous: 'آلاف المحترفين مستعدون للعمل على مشاريعك',
    recherche: 'ابحث عن خدمة...', btn: 'بحث',
    catPop: 'الفئات الشائعة', tout: 'كل ما تجده على المنصة',
    footer: 'جميع الحقوق محفوظة',
    profil: 'الملف الشخصي', deconnexion: 'تسجيل الخروج',
    publier: 'نشر مشروع',
    messages: 'الرسائل',
    mesProjets: 'مشاريعي',
    cats: ['البرمجة والتقنية','الجرافيك والتصميم','التسويق الرقمي',
           'الكتابة والترجمة','الفيديو والرسوم','الأعمال','الاستشارات','الموسيقى'],
    infos: [
      {titre:'الفئات', texte:'استكشف مئات الفئات: تقنية، تصميم، تسويق والمزيد.'},
      {titre:'للعملاء', texte:'انشر مشروعك مجاناً واستقبل طلبات من مستقلين مؤهلين.'},
      {titre:'للمستقلين', texte:'أنشئ ملفك الشخصي، تقدم للمشاريع وطور مسيرتك المهنية.'},
      {titre:'حلول المؤسسات', texte:'حلول مخصصة للشركات الباحثة عن مواهب مستقلة موثوقة.'},
    ],
    services: 'خدماتنا',
    servicesList: [
      {titre:' تواصل سريع', texte:'ابحث عن المستقل المثالي في دقائق. يربطك نظامنا الذكي بأفضل المواهب حسب احتياجاتك.'},
      {titre:' مدفوعات آمنة', texte:'معاملاتك محمية بالكامل. لا يتم تحرير الدفع إلا بعد التحقق من المشروع. صفر مخاطر.'},
      {titre:' مستقلون موثوقون', texte:'كل محترف موثق ومقيّم من مجتمعنا. تعامل فقط مع أفضل المواهب في السوق.'},
      {titre:' دعم على مدار الساعة', texte:'فريقنا متاح في أي وقت لمساعدتك. خبراء بشريون جاهزون لحل مشاكلك بسرعة.'},
    ]
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function Home() {
  const [langue, setLangue] = useState('Français');
  const [search, setSearch] = useState('');
  const [utilisateur, setUtilisateur] = useState(null);
  const t = traductions[langue];
  const isAr = langue === 'عربي';
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('utilisateur');
    if (data) setUtilisateur(JSON.parse(data));
  }, []);

  const handleDeconnexion = () => {
    localStorage.clear();
    setUtilisateur(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <div style={{ fontFamily: 'Arial,sans-serif', margin: 0, padding: 0,
      width: '100%', overflowX: 'hidden', direction: isAr ? 'rtl' : 'ltr' }}>

      <div style={{ backgroundColor: '#1a1a2e', color: 'white',
        padding: '8px 40px', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
        <div style={{ display: 'flex', gap: '25px' }}>
          <span onClick={() => navigate('/categories')}
            style={{ color: '#ccc', textDecoration: 'none', cursor: 'pointer' }}>{t.cat}</span>
          <span onClick={() => navigate('/pour-clients')}
            style={{ color: '#ccc', textDecoration: 'none', cursor: 'pointer' }}>{t.clients}</span>
          <span onClick={() => navigate('/pour-freelancers')}
            style={{ color: '#ccc', textDecoration: 'none', cursor: 'pointer' }}>{t.freelances}</span>
          <span onClick={() => navigate('/solutions')}
            style={{ color: '#ccc', textDecoration: 'none', cursor: 'pointer' }}>{t.solutions}</span>
        </div>
      </div>

      <nav style={{ backgroundColor: '#fff', padding: '15px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={() => navigate('/')} style={{ color: '#7cb342', margin: 0, fontSize: '26px', cursor: 'pointer' }}>
          freelance<span style={{ color: '#333' }}>Platform</span>
        </h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <a href="#" style={{ textDecoration: 'none', color: '#333' }}>{t.explorer}</a>
          <span onClick={() => navigate('/projets')} style={{ cursor: 'pointer', color: '#333' }}>{t.projets}</span>

          {utilisateur && (
            <span onClick={() => navigate('/messages')}
              style={{ cursor: 'pointer', color: '#333', fontWeight: 'bold' }}>{t.messages}</span>
          )}

          {/* LIEN MES PROJETS — visible uniquement pour les clients */}
          {utilisateur?.role === 'client' && (
            <span onClick={() => navigate('/mes-projets')}
              style={{ cursor: 'pointer', color: '#7cb342', fontWeight: 'bold' }}>{t.mesProjets}</span>
          )}

          {utilisateur ? (
            <>
              <span onClick={() => navigate('/profil')}
                style={{ cursor: 'pointer', color: '#333', fontWeight: 'bold' }}>{t.profil}</span>
              <span onClick={handleDeconnexion}
                style={{ cursor: 'pointer', color: '#e53935', fontWeight: 'bold' }}>{t.deconnexion}</span>
            </>
          ) : (
            <span onClick={() => navigate('/connexion')}
              style={{ cursor: 'pointer', color: '#333' }}>{t.connexion}</span>
          )}

          <div style={{ display: 'flex', gap: '5px' }}>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder={t.recherche}
              style={{ padding: '8px 12px', borderRadius: '5px',
                border: '1px solid #ddd', fontSize: '13px', width: '180px' }} />
            <button style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
              padding: '8px 14px', borderRadius: '5px', cursor: 'pointer', fontSize: '13px' }}>🔍</button>
          </div>

          <select value={langue} onChange={(e) => setLangue(e.target.value)}
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}>
            <option>Français</option>
            <option>English</option>
            <option>عربي</option>
          </select>

          <button onClick={() => navigate('/publier')}
            style={{ backgroundColor: 'white', color: '#7cb342', border: '2px solid #7cb342',
              padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            {t.publier}
          </button>

          {!utilisateur && (
            <button onClick={() => navigate('/inscription')}
              style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
                padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              {t.inscription}
            </button>
          )}
        </div>
      </nav>

      {/* SECTION HERO */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '500px', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg,#7cb342,#558b2f)', padding: '80px 50px',
          color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.h2 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            style={{ fontSize: '48px', fontWeight: '900', fontFamily: 'EB Garamond, Georgia, serif',
              textShadow: '2px 4px 10px rgba(0,0,0,0.3)', marginBottom: '20px', letterSpacing: '1px' }}>
            {t.hero}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
            style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.95 }}>
            {t.sous}
          </motion.p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {!utilisateur && (
              <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }} whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/inscription')}
                style={{ backgroundColor: 'white', color: '#7cb342', border: 'none',
                  padding: '15px 30px', borderRadius: '5px', cursor: 'pointer',
                  fontSize: '16px', fontWeight: 'bold' }}>
                {t.inscription} →
              </motion.button>
            )}
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }} whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/publier')}
              style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid white',
                padding: '15px 30px', borderRadius: '5px', cursor: 'pointer',
                fontSize: '16px', fontWeight: 'bold' }}>
              {t.publier} →
            </motion.button>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          style={{ overflow: 'hidden' }}>
          <img src="https://theremotehive.com/wp-content/uploads/2019/07/freelancers.jpg"
            alt="Freelancers" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
      </motion.div>

      {/* CATEGORIES POPULAIRES */}
      <div style={{ padding: '60px 40px', backgroundColor: '#f7f7f7', width: '100%', boxSizing: 'border-box' }}>
        <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px', color: '#333' }}>
          {t.catPop}
        </motion.h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
          {t.cats.map((titre, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
              onClick={() => navigate('/categories')}
              style={{ backgroundColor: 'white', borderRadius: '10px', padding: '30px',
                textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <p style={{ fontWeight: 'bold', color: '#333', fontSize: '15px', margin: 0 }}>{titre}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TOUT CE QUE VOUS TROUVEZ */}
      <div style={{ padding: '60px 40px', backgroundColor: '#fff', width: '100%', boxSizing: 'border-box' }}>
        <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', fontSize: '32px', marginBottom: '50px', color: '#333' }}>
          {t.tout}
        </motion.h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '30px' }}>
          {t.infos.map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.15 }} whileHover={{ scale: 1.03 }}
              style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '30px',
                textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', borderTop: '4px solid #7cb342' }}>
              <h4 style={{ color: '#7cb342', marginBottom: '10px', fontSize: '18px' }}>{item.titre}</h4>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>{item.texte}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* NOS SERVICES */}
      <div style={{ padding: '60px 40px', backgroundColor: '#1a1a2e', width: '100%', boxSizing: 'border-box' }}>
        <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: 'center', fontSize: '32px', marginBottom: '50px', color: 'white' }}>
          {t.services}
        </motion.h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '25px' }}>
          {t.servicesList.map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.05, backgroundColor: '#7cb342' }}
              style={{ backgroundColor: '#2a2a4e', borderRadius: '12px', padding: '30px',
                textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', transition: 'all 0.3s', cursor: 'pointer' }}>
              <h4 style={{ color: '#7cb342', marginBottom: '15px', fontSize: '18px' }}>{item.titre}</h4>
              <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.7' }}>{item.texte}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '70px 40px', backgroundColor: '#f7f7f7', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
        <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ fontSize: '32px', color: '#1a1a2e', marginBottom: '16px' }}>
          Prêt à démarrer ?
        </motion.h3>
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ color: '#666', fontSize: '16px', marginBottom: '30px' }}>
          Rejoignez des milliers de freelancers et de clients sur FreelancePlatform.
        </motion.p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {!utilisateur && (
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/inscription')}
              style={{ backgroundColor: '#7cb342', color: 'white', border: 'none',
                padding: '15px 36px', borderRadius: '8px', cursor: 'pointer',
                fontSize: '16px', fontWeight: 'bold' }}>
              Créer un compte
            </motion.button>
          )}
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/publier')}
            style={{ backgroundColor: '#1a1a2e', color: 'white', border: 'none',
              padding: '15px 36px', borderRadius: '8px', cursor: 'pointer',
              fontSize: '16px', fontWeight: 'bold' }}>
            Publier un projet
          </motion.button>
        </div>
      </div>

      <footer style={{ backgroundColor: '#111', color: 'white', textAlign: 'center', padding: '40px', width: '100%', boxSizing: 'border-box' }}>
        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#7cb342', marginBottom: '10px' }}>freelancePlatform</p>
        <p style={{ color: '#555' }}>2026 FreelancePlatform — {t.footer}</p>
      </footer>
    </div>
  );
}

export default function App() {
  const estConnecte = () => localStorage.getItem('access_token') !== null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/projets" element={<Projets />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/publier" element={<PublierProjet />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/pour-clients" element={<PourClients />} />
        <Route path="/pour-freelancers" element={<PourFreelancers />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/modifier-profil" element={<ModifierProfil />} />
        <Route path="/messages" element={estConnecte() ? <Messagerie /> : <Navigate to="/connexion" />} />

        {/* Phase 4 — Mes Projets (clients) */}
        <Route path="/mes-projets" element={estConnecte() ? <MesProjets /> : <Navigate to="/connexion" />} />
      </Routes>
    </BrowserRouter>
  );
}