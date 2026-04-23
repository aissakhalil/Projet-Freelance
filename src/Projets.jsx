import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const projetsData = [
  {id:1, titre:'Créer un site e-commerce', budget:'500€', client:'Ahmed K.',
   categorie:'Développement Web', description:'Je cherche un développeur pour créer une boutique en ligne complète avec paiement intégré.', date:'il y a 2 heures'},
  {id:2, titre:'Logo pour startup tech', budget:'150€', client:'Sara M.',
   categorie:'Design', description:'Besoin dun logo moderne et professionnel pour ma startup dans le domaine de la tech.', date:'il y a 5 heures'},
  {id:3, titre:'Gérer mes réseaux sociaux', budget:'300€', client:'Karim B.',
   categorie:'Marketing', description:'Gestion complète de mes réseaux sociaux Instagram Facebook et LinkedIn pendant 1 mois.', date:'il y a 1 jour'},
  {id:4, titre:'Application mobile React Native', budget:'1200€', client:'Nadia R.',
   categorie:'Développement Mobile', description:'Développer une application mobile iOS et Android pour mon service de livraison.', date:'il y a 2 jours'},
  {id:5, titre:'Traduction français-anglais', budget:'200€', client:'Mehdi T.',
   categorie:'Traduction', description:'Traduction de 50 pages de documents techniques du français vers langlais.', date:'il y a 3 jours'},
  {id:6, titre:'Vidéo promotionnelle', budget:'400€', client:'Leila S.',
   categorie:'Vidéo', description:'Création dune vidéo promotionnelle de 2 minutes pour mon restaurant.', date:'il y a 4 jours'},
];

const categories = ['Tous','Développement Web','Design','Marketing',
  'Développement Mobile','Traduction','Vidéo'];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function Projets() {
  const navigate = useNavigate();
  const [catActive, setCatActive] = useState('Tous');
  const [search, setSearch] = useState('');

  const projetsFiltres = projetsData.filter(p => {
    const matchCat = catActive === 'Tous' || p.categorie === catActive;
    const matchSearch = p.titre.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{minHeight:'100vh',backgroundColor:'#f7f7f7',
      fontFamily:'Arial,sans-serif'}}>

      <nav style={{backgroundColor:'#fff',padding:'15px 40px',
        display:'flex',justifyContent:'space-between',
        alignItems:'center',boxShadow:'0 2px 10px rgba(0,0,0,0.1)',
        position:'sticky',top:0,zIndex:100}}>
        <h1 onClick={()=>navigate('/')}
          style={{color:'#7cb342',margin:0,fontSize:'26px',cursor:'pointer'}}>
          freelance<span style={{color:'#333'}}>Platform</span>
        </h1>
        <div style={{display:'flex',gap:'15px',alignItems:'center'}}>
          <span onClick={()=>navigate('/')}
            style={{cursor:'pointer',color:'#333'}}>Accueil</span>
          <span onClick={()=>navigate('/connexion')}
            style={{cursor:'pointer',color:'#333'}}>Connexion</span>
          <button onClick={()=>navigate('/inscription')}
            style={{backgroundColor:'#7cb342',color:'white',
              border:'none',padding:'10px 20px',borderRadius:'5px',
              cursor:'pointer',fontWeight:'bold'}}>Inscription</button>
        </div>
      </nav>

      <motion.div
        initial={{opacity:0}} animate={{opacity:1}}
        style={{background:'linear-gradient(135deg,#7cb342,#558b2f)',
          padding:'50px 40px',textAlign:'center',color:'white'}}>
        <motion.h2
          initial={{opacity:0,y:-30}} animate={{opacity:1,y:0}}
          transition={{duration:0.7}}
          style={{fontSize:'48px',fontWeight:'900',
  fontFamily:'EB Garamond, Georgia, serif',
  letterSpacing:'1px',
  textShadow:'2px 4px 10px rgba(0,0,0,0.3)',
  marginBottom:'20px'}}>
  Projets disponibles
          Projets disponibles
        </motion.h2>
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:0.3}}
          style={{display:'flex',justifyContent:'center',gap:'10px'}}>
          <input type="text"
            placeholder="Rechercher un projet..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            style={{padding:'12px 20px',width:'400px',
              borderRadius:'5px',border:'none',fontSize:'15px'}}/>
          <button style={{backgroundColor:'#333',color:'white',
            border:'none',padding:'12px 25px',borderRadius:'5px',
            cursor:'pointer',fontSize:'15px'}}>Rechercher</button>
        </motion.div>
      </motion.div>

      <div style={{padding:'40px',maxWidth:'1200px',margin:'0 auto'}}>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{once:true}}
          variants={fadeUp}
          style={{display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'30px'}}>
          {categories.map((cat,i)=>(
            <button key={i}
              onClick={()=>setCatActive(cat)}
              style={{padding:'8px 18px',borderRadius:'20px',
                border:'none',cursor:'pointer',fontWeight:'bold',
                backgroundColor: catActive===cat ? '#7cb342' : 'white',
                color: catActive===cat ? 'white' : '#333',
                boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
                transition:'all 0.3s'}}>
              {cat}
            </button>
          ))}
        </motion.div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'25px'}}>
          {projetsFiltres.map((projet,i)=>(
            <motion.div key={projet.id}
              initial="hidden" whileInView="visible" viewport={{once:true}}
              variants={fadeUp}
              transition={{delay: i * 0.1}}
              whileHover={{scale:1.02,boxShadow:'0 8px 25px rgba(0,0,0,0.12)'}}
              style={{backgroundColor:'white',borderRadius:'12px',
                padding:'25px',boxShadow:'0 2px 10px rgba(0,0,0,0.07)',
                cursor:'pointer',transition:'all 0.3s'}}>

              <span style={{backgroundColor:'#e8f5e9',color:'#7cb342',
                padding:'4px 12px',borderRadius:'20px',
                fontSize:'12px',fontWeight:'bold'}}>
                {projet.categorie}
              </span>

              <h4 style={{margin:'15px 0 10px',color:'#333',fontSize:'17px'}}>
                {projet.titre}
              </h4>

              <p style={{color:'#777',fontSize:'13px',lineHeight:'1.6',
                marginBottom:'15px'}}>
                {projet.description}
              </p>

              <div style={{display:'flex',justifyContent:'space-between',
                alignItems:'center',marginTop:'10px',
                borderTop:'1px solid #f0f0f0',paddingTop:'15px'}}>
                <div>
                  <p style={{margin:0,color:'#333',fontSize:'13px'}}>
                    {projet.client}
                  </p>
                  <p style={{margin:0,color:'#aaa',fontSize:'12px'}}>
                    {projet.date}
                  </p>
                </div>
                <div style={{textAlign:'right'}}>
                  <p style={{margin:0,fontSize:'20px',fontWeight:'bold',
                    color:'#7cb342'}}>{projet.budget}</p>
                  <motion.button
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                    style={{backgroundColor:'#7cb342',color:'white',
                      border:'none',padding:'8px 16px',borderRadius:'5px',
                      cursor:'pointer',marginTop:'5px',fontWeight:'bold'}}>
                    Postuler
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {projetsFiltres.length === 0 && (
          <motion.div
            initial={{opacity:0}} animate={{opacity:1}}
            style={{textAlign:'center',padding:'60px',color:'#aaa'}}>
            <p style={{fontSize:'50px'}}>Aucun projet trouvé</p>
          </motion.div>
        )}
      </div>

      <footer style={{backgroundColor:'#1a1a2e',color:'white',
        textAlign:'center',padding:'30px',marginTop:'40px'}}>
        <p style={{color:'#7cb342',fontWeight:'bold',fontSize:'18px'}}>
          freelancePlatform
        </p>
        <p style={{color:'#aaa',fontSize:'13px'}}>
          2026 FreelancePlatform Tous droits réservés
        </p>
      </footer>
    </div>
  );
}

export default Projets;