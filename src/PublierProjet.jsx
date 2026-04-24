import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function PublierProjet() {
  const navigate = useNavigate();
  const [etape, setEtape] = useState(1);
  const [form, setForm] = useState({
    titre:'', categorie:'', description:'',
    budget:'', delai:'', competences:''
  });

  const categories = ['Développement Web','Design','Marketing',
    'Développement Mobile','Traduction','Vidéo','Business','Consulting'];

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  return (
    <div style={{minHeight:'100vh',backgroundColor:'#f7f7f7',
      fontFamily:'Arial,sans-serif'}}>

      {/* NAVBAR */}
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
          <span onClick={()=>navigate('/projets')}
            style={{cursor:'pointer',color:'#333'}}>Projets</span>
          <span onClick={()=>navigate('/connexion')}
            style={{cursor:'pointer',color:'#333'}}>Connexion</span>
          <button onClick={()=>navigate('/inscription')}
            style={{backgroundColor:'#7cb342',color:'white',
              border:'none',padding:'10px 20px',borderRadius:'5px',
              cursor:'pointer',fontWeight:'bold'}}>Inscription</button>
        </div>
      </nav>

      {/* HEADER */}
      <motion.div
        initial={{opacity:0}} animate={{opacity:1}}
        style={{background:'linear-gradient(135deg,#7cb342,#558b2f)',
          padding:'40px',textAlign:'center',color:'white'}}>
        <motion.h2
          initial={{opacity:0,y:-30}} animate={{opacity:1,y:0}}
          transition={{duration:0.7}}
          style={{fontSize:'40px',fontWeight:'900',
            fontFamily:'EB Garamond, Georgia, serif',
            marginBottom:'10px'}}>
          Publier un projet
        </motion.h2>
        <p style={{fontSize:'16px',opacity:0.9}}>
          Décrivez votre projet et recevez des candidatures
        </p>

        {/* ETAPES */}
        <div style={{display:'flex',justifyContent:'center',
          gap:'10px',marginTop:'20px',alignItems:'center'}}>
          {[1,2,3].map((e)=>(
            <div key={e} style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{width:'35px',height:'35px',borderRadius:'50%',
                backgroundColor: etape>=e ? 'white' : 'rgba(255,255,255,0.3)',
                color: etape>=e ? '#7cb342' : 'white',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontWeight:'bold',fontSize:'16px'}}>
                {e}
              </div>
              {e < 3 && <div style={{width:'50px',height:'2px',
                backgroundColor: etape>e ? 'white' : 'rgba(255,255,255,0.3)'}}/>}
            </div>
          ))}
        </div>
        <p style={{marginTop:'10px',opacity:0.9,fontSize:'14px'}}>
          {etape===1 ? 'Informations générales' :
           etape===2 ? 'Budget et délai' : 'Confirmation'}
        </p>
      </motion.div>

      {/* FORMULAIRE */}
      <div style={{maxWidth:'700px',margin:'40px auto',padding:'0 20px'}}>

        {/* ETAPE 1 */}
        {etape===1 && (
          <motion.div
            initial={{opacity:0,x:50}} animate={{opacity:1,x:0}}
            transition={{duration:0.5}}
            style={{backgroundColor:'white',borderRadius:'12px',
              padding:'40px',boxShadow:'0 4px 20px rgba(0,0,0,0.08)'}}>

            <h3 style={{color:'#333',marginBottom:'25px'}}>
              Informations générales
            </h3>

            <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
              <div>
                <label style={{display:'block',marginBottom:'8px',
                  color:'#333',fontWeight:'bold'}}>
                  Titre du projet *
                </label>
                <motion.input whileFocus={{scale:1.01}}
                  type="text" name="titre"
                  value={form.titre} onChange={handleChange}
                  placeholder="Ex: Créer un site e-commerce..."
                  style={{width:'100%',padding:'12px',borderRadius:'8px',
                    border:'1px solid #ddd',fontSize:'15px',
                    boxSizing:'border-box',outline:'none'}}/>
              </div>

              <div>
                <label style={{display:'block',marginBottom:'8px',
                  color:'#333',fontWeight:'bold'}}>
                  Catégorie *
                </label>
                <select name="categorie"
                  value={form.categorie} onChange={handleChange}
                  style={{width:'100%',padding:'12px',borderRadius:'8px',
                    border:'1px solid #ddd',fontSize:'15px',
                    boxSizing:'border-box',outline:'none'}}>
                  <option value="">Choisir une catégorie</option>
                  {categories.map((cat,i)=>(
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{display:'block',marginBottom:'8px',
                  color:'#333',fontWeight:'bold'}}>
                  Description du projet *
                </label>
                <motion.textarea whileFocus={{scale:1.01}}
                  name="description"
                  value={form.description} onChange={handleChange}
                  placeholder="Décrivez votre projet en détail..."
                  rows={5}
                  style={{width:'100%',padding:'12px',borderRadius:'8px',
                    border:'1px solid #ddd',fontSize:'15px',
                    boxSizing:'border-box',outline:'none',resize:'vertical'}}/>
              </div>

              <div>
                <label style={{display:'block',marginBottom:'8px',
                  color:'#333',fontWeight:'bold'}}>
                  Compétences requises
                </label>
                <motion.input whileFocus={{scale:1.01}}
                  type="text" name="competences"
                  value={form.competences} onChange={handleChange}
                  placeholder="Ex: React, Python, Photoshop..."
                  style={{width:'100%',padding:'12px',borderRadius:'8px',
                    border:'1px solid #ddd',fontSize:'15px',
                    boxSizing:'border-box',outline:'none'}}/>
              </div>
            </div>

            <motion.button
              whileHover={{scale:1.03}} whileTap={{scale:0.97}}
              onClick={()=>setEtape(2)}
              style={{backgroundColor:'#7cb342',color:'white',
                border:'none',padding:'14px 30px',borderRadius:'8px',
                fontSize:'16px',fontWeight:'bold',cursor:'pointer',
                marginTop:'25px',width:'100%'}}>
              Suivant →
            </motion.button>
          </motion.div>
        )}

        {/* ETAPE 2 */}
        {etape===2 && (
          <motion.div
            initial={{opacity:0,x:50}} animate={{opacity:1,x:0}}
            transition={{duration:0.5}}
            style={{backgroundColor:'white',borderRadius:'12px',
              padding:'40px',boxShadow:'0 4px 20px rgba(0,0,0,0.08)'}}>

            <h3 style={{color:'#333',marginBottom:'25px'}}>
              Budget et délai
            </h3>

            <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
              <div>
                <label style={{display:'block',marginBottom:'8px',
                  color:'#333',fontWeight:'bold'}}>
                  Budget estimé (€) *
                </label>
                <motion.input whileFocus={{scale:1.01}}
                  type="number" name="budget"
                  value={form.budget} onChange={handleChange}
                  placeholder="Ex: 500"
                  style={{width:'100%',padding:'12px',borderRadius:'8px',
                    border:'1px solid #ddd',fontSize:'15px',
                    boxSizing:'border-box',outline:'none'}}/>
              </div>

              <div>
                <label style={{display:'block',marginBottom:'8px',
                  color:'#333',fontWeight:'bold'}}>
                  Délai souhaité *
                </label>
                <select name="delai"
                  value={form.delai} onChange={handleChange}
                  style={{width:'100%',padding:'12px',borderRadius:'8px',
                    border:'1px solid #ddd',fontSize:'15px',
                    boxSizing:'border-box',outline:'none'}}>
                  <option value="">Choisir un délai</option>
                  <option>Moins de 1 semaine</option>
                  <option>1 à 2 semaines</option>
                  <option>1 mois</option>
                  <option>Plus de 1 mois</option>
                </select>
              </div>

              {/* RECAP */}
              <div style={{backgroundColor:'#f9f9f9',borderRadius:'8px',
                padding:'20px',borderLeft:'4px solid #7cb342'}}>
                <h4 style={{color:'#333',marginBottom:'10px'}}>
                  Récapitulatif
                </h4>
                <p style={{color:'#666',fontSize:'14px',margin:'5px 0'}}>
                  Titre : {form.titre || 'Non renseigné'}
                </p>
                <p style={{color:'#666',fontSize:'14px',margin:'5px 0'}}>
                  Catégorie : {form.categorie || 'Non renseignée'}
                </p>
                <p style={{color:'#666',fontSize:'14px',margin:'5px 0'}}>
                  Compétences : {form.competences || 'Non renseignées'}
                </p>
              </div>
            </div>

            <div style={{display:'flex',gap:'15px',marginTop:'25px'}}>
              <motion.button
                whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                onClick={()=>setEtape(1)}
                style={{backgroundColor:'white',color:'#333',
                  border:'1px solid #ddd',padding:'14px 30px',
                  borderRadius:'8px',fontSize:'16px',
                  cursor:'pointer',flex:1}}>
                ← Retour
              </motion.button>
              <motion.button
                whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                onClick={()=>setEtape(3)}
                style={{backgroundColor:'#7cb342',color:'white',
                  border:'none',padding:'14px 30px',borderRadius:'8px',
                  fontSize:'16px',fontWeight:'bold',
                  cursor:'pointer',flex:2}}>
                Publier le projet →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ETAPE 3 - CONFIRMATION */}
        {etape===3 && (
          <motion.div
            initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
            transition={{duration:0.5}}
            style={{backgroundColor:'white',borderRadius:'12px',
              padding:'60px 40px',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',
              textAlign:'center'}}>

            <motion.div
              initial={{scale:0}} animate={{scale:1}}
              transition={{delay:0.2,type:'spring'}}>
              <p style={{fontSize:'80px',margin:0}}>✅</p>
            </motion.div>

            <h3 style={{color:'#7cb342',fontSize:'28px',margin:'20px 0 10px'}}>
              Projet publié avec succès !
            </h3>
            <p style={{color:'#666',fontSize:'16px',marginBottom:'30px'}}>
              Votre projet est maintenant visible par les freelancers.
              Vous recevrez des candidatures très bientôt !
            </p>

            <div style={{display:'flex',gap:'15px',justifyContent:'center'}}>
              <motion.button
                whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                onClick={()=>navigate('/projets')}
                style={{backgroundColor:'#7cb342',color:'white',
                  border:'none',padding:'14px 30px',borderRadius:'8px',
                  fontSize:'16px',fontWeight:'bold',cursor:'pointer'}}>
                Voir les projets
              </motion.button>
              <motion.button
                whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                onClick={()=>navigate('/')}
                style={{backgroundColor:'white',color:'#333',
                  border:'1px solid #ddd',padding:'14px 30px',
                  borderRadius:'8px',fontSize:'16px',cursor:'pointer'}}>
                Retour accueil
              </motion.button>
            </div>
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

export default PublierProjet;