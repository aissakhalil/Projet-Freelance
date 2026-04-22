import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Inscription from './Inscription';
import Connexion from './Connexion';

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
    cats: ['Programmation & Tech','Graphisme & Design','Marketing Digital',
           'Rédaction & Traduction','Vidéo & Animation','Business','Consulting','Musique & Audio'],
    infos: [
      {titre:'Catégories', texte:'Explorez des centaines de catégories : tech, design, marketing et plus.'},
      {titre:'Pour les clients', texte:'Publiez votre projet et recevez des candidatures de freelancers qualifiés.'},
      {titre:'Pour les freelances', texte:'Créez votre profil, postulez aux projets et développez votre carrière.'},
      {titre:'Solutions entreprises', texte:'Des solutions sur mesure pour les entreprises qui cherchent des talents.'},
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
    cats: ['Programming & Tech','Graphics & Design','Digital Marketing',
           'Writing & Translation','Video & Animation','Business','Consulting','Music & Audio'],
    infos: [
      {titre:'Categories', texte:'Explore hundreds of categories: tech, design, marketing and more.'},
      {titre:'For clients', texte:'Post your project and receive applications from qualified freelancers.'},
      {titre:'For freelancers', texte:'Create your profile, apply to projects and grow your career.'},
      {titre:'Enterprise solutions', texte:'Tailored solutions for companies looking for reliable freelance talent.'},
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
    cats: ['البرمجة والتقنية','الجرافيك والتصميم','التسويق الرقمي',
           'الكتابة والترجمة','الفيديو والرسوم','الأعمال','الاستشارات','الموسيقى'],
    infos: [
      {titre:'الفئات', texte:'استكشف مئات الفئات: تقنية، تصميم، تسويق والمزيد.'},
      {titre:'للعملاء', texte:'انشر مشروعك مجاناً واستقبل طلبات من مستقلين مؤهلين.'},
      {titre:'للمستقلين', texte:'أنشئ ملفك الشخصي، تقدم للمشاريع وطور مسيرتك المهنية.'},
      {titre:'حلول المؤسسات', texte:'حلول مخصصة للشركات الباحثة عن مواهب مستقلة موثوقة.'},
    ]
  }
};


const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function Home() {
  const [langue, setLangue] = useState('Français');
  const t = traductions[langue];
  const isAr = langue === 'عربي';
  const navigate = useNavigate();

  return (
    <div style={{fontFamily:'Arial,sans-serif',margin:0,padding:0,
      width:'100%',overflowX:'hidden',direction: isAr ? 'rtl' : 'ltr'}}>

      <div style={{backgroundColor:'#1a1a2e',color:'white',
        padding:'8px 40px',display:'flex',
        justifyContent:'space-between',fontSize:'13px'}}>
        <div style={{display:'flex',gap:'25px'}}>
          <a href="#" style={{color:'#ccc',textDecoration:'none'}}>{t.cat}</a>
          <a href="#" style={{color:'#ccc',textDecoration:'none'}}>{t.clients}</a>
          <a href="#" style={{color:'#ccc',textDecoration:'none'}}>{t.freelances}</a>
          <a href="#" style={{color:'#ccc',textDecoration:'none'}}>{t.solutions}</a>
        </div>
      </div>

      <nav style={{backgroundColor:'#fff',padding:'15px 40px',
        display:'flex',justifyContent:'space-between',
        alignItems:'center',boxShadow:'0 2px 10px rgba(0,0,0,0.1)'}}>
        <h1 style={{color:'#7cb342',margin:0,fontSize:'26px'}}>
          freelance<span style={{color:'#333'}}>Platform</span>
        </h1>
        <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
          <a href="#" style={{textDecoration:'none',color:'#333'}}>{t.explorer}</a>
          <a href="#" style={{textDecoration:'none',color:'#333'}}>{t.projets}</a>
          <span onClick={()=>navigate('/connexion')}
            style={{cursor:'pointer',color:'#333'}}>{t.connexion}</span>
          <select value={langue} onChange={(e)=>setLangue(e.target.value)}
            style={{padding:'8px',borderRadius:'5px',border:'1px solid #ddd'}}>
            <option>Français</option>
            <option>English</option>
            <option>عربي</option>
          </select>
          <button onClick={()=>navigate('/inscription')}
            style={{backgroundColor:'#7cb342',color:'white',
              border:'none',padding:'10px 20px',borderRadius:'5px',
              cursor:'pointer',fontWeight:'bold'}}>{t.inscription}</button>
        </div>
      </nav>

      <motion.div
        initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}
        style={{background:'linear-gradient(135deg,#7cb342,#558b2f)',
          padding:'120px 40px',textAlign:'center',color:'white',
          width:'100%',boxSizing:'border-box'}}>
        <motion.h2
          initial={{opacity:0,y:-40}} animate={{opacity:1,y:0}}
          transition={{duration:0.8}}
          style={{fontSize:'58px',fontWeight:'900',
            fontFamily:'EB Garamond, Georgia, serif',
            textShadow:'2px 4px 10px rgba(0,0,0,0.3)',
            marginBottom:'20px',letterSpacing:'1px'}}>
          {t.hero}
        </motion.h2>
        <motion.p
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{duration:1, delay:0.3}}
          style={{fontSize:'20px',marginBottom:'40px',opacity:0.95}}>
          {t.sous}
        </motion.p>
        <motion.div
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{duration:0.8, delay:0.5}}
          style={{display:'flex',justifyContent:'center',gap:'10px'}}>
          <input type="text" placeholder={t.recherche}
            style={{padding:'18px 25px',width:'450px',
              borderRadius:'5px',border:'none',fontSize:'16px'}}/>
          <button style={{backgroundColor:'#333',color:'white',
            border:'none',padding:'18px 35px',borderRadius:'5px',
            cursor:'pointer',fontSize:'16px',fontWeight:'bold'}}>{t.btn}</button>
        </motion.div>
      </motion.div>

      <div style={{padding:'60px 40px',backgroundColor:'#f7f7f7',
        width:'100%',boxSizing:'border-box'}}>
        <motion.h3
          initial="hidden" whileInView="visible" viewport={{once:true}}
          variants={fadeUp}
          style={{textAlign:'center',fontSize:'32px',
            marginBottom:'40px',color:'#333'}}>{t.catPop}</motion.h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'20px'}}>
          {t.cats.map((titre,i)=>(
            <motion.div key={i}
              initial="hidden" whileInView="visible" viewport={{once:true}}
              variants={fadeUp}
              transition={{delay: i * 0.1}}
              whileHover={{scale:1.05,boxShadow:'0 8px 20px rgba(0,0,0,0.15)'}}
              style={{backgroundColor:'white',borderRadius:'10px',
                padding:'30px',textAlign:'center',cursor:'pointer',
                boxShadow:'0 2px 10px rgba(0,0,0,0.08)'}}>
              <p style={{fontWeight:'bold',color:'#333',fontSize:'15px',margin:0}}>{titre}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{padding:'60px 40px',backgroundColor:'#fff',
        width:'100%',boxSizing:'border-box'}}>
        <motion.h3
          initial="hidden" whileInView="visible" viewport={{once:true}}
          variants={fadeUp}
          style={{textAlign:'center',fontSize:'32px',
            marginBottom:'50px',color:'#333'}}>{t.tout}</motion.h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'30px'}}>
          {t.infos.map((item,i)=>(
            <motion.div key={i}
              initial="hidden" whileInView="visible" viewport={{once:true}}
              variants={fadeUp}
              transition={{delay: i * 0.15}}
              whileHover={{scale:1.03}}
              style={{backgroundColor:'#f9f9f9',borderRadius:'12px',
                padding:'30px',textAlign:'center',
                boxShadow:'0 2px 10px rgba(0,0,0,0.06)',
                borderTop:'4px solid #7cb342'}}>
              <h4 style={{color:'#7cb342',marginBottom:'10px',fontSize:'18px'}}>{item.titre}</h4>
              <p style={{color:'#666',fontSize:'14px',lineHeight:'1.6'}}>{item.texte}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <footer style={{backgroundColor:'#1a1a2e',color:'white',
        textAlign:'center',padding:'40px',width:'100%',boxSizing:'border-box'}}>
        <p style={{fontSize:'22px',fontWeight:'bold',color:'#7cb342'}}>freelancePlatform</p>
        <p style={{color:'#aaa'}}>© 2026 FreelancePlatform — {t.footer}</p>
      </footer>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;