import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Inscription() {
  const [role, setRole] = useState('client');
  const navigate = useNavigate();

  return (
    <div style={{minHeight:'100vh',backgroundColor:'#f7f7f7',
      display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center'}}>

      {/* NAVBAR */}
      <nav style={{position:'fixed',top:0,left:0,right:0,
        backgroundColor:'#fff',padding:'15px 40px',
        display:'flex',justifyContent:'space-between',
        alignItems:'center',boxShadow:'0 2px 10px rgba(0,0,0,0.1)',zIndex:100}}>
        <h1 onClick={()=>navigate('/')}
          style={{color:'#7cb342',margin:0,fontSize:'26px',cursor:'pointer'}}>
          freelance<span style={{color:'#333'}}>Platform</span>
        </h1>
        <button onClick={()=>navigate('/')}
          style={{backgroundColor:'transparent',color:'#333',
            border:'1px solid #ddd',padding:'8px 20px',
            borderRadius:'5px',cursor:'pointer',fontSize:'14px'}}>
          ← Retour à l'accueil
        </button>
      </nav>

      {/* FORMULAIRE */}
      <motion.div
        initial={{opacity:0, y:50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.7}}
        style={{backgroundColor:'white',padding:'40px',
          borderRadius:'12px',boxShadow:'0 4px 20px rgba(0,0,0,0.1)',
          width:'100%',maxWidth:'450px',marginTop:'80px'}}>

        <motion.h2
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:0.3}}
          style={{textAlign:'center',color:'#7cb342',marginBottom:'5px'}}>
          freelance<span style={{color:'#333'}}>Platform</span>
        </motion.h2>

        <motion.p
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:0.4}}
          style={{textAlign:'center',color:'#666',marginBottom:'30px'}}>
          Créez votre compte gratuitement
        </motion.p>

        {/* CHOIX ROLE */}
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:0.5}}
          style={{display:'flex',marginBottom:'25px',
            border:'1px solid #ddd',borderRadius:'8px',overflow:'hidden'}}>
          <button onClick={()=>setRole('client')}
            style={{flex:1,padding:'12px',border:'none',cursor:'pointer',
              backgroundColor:role==='client'?'#7cb342':'white',
              color:role==='client'?'white':'#333',fontWeight:'bold',
              transition:'all 0.3s'}}>
            Je suis Client
          </button>
          <button onClick={()=>setRole('freelancer')}
            style={{flex:1,padding:'12px',border:'none',cursor:'pointer',
              backgroundColor:role==='freelancer'?'#7cb342':'white',
              color:role==='freelancer'?'white':'#333',fontWeight:'bold',
              transition:'all 0.3s'}}>
            Je suis Freelancer
          </button>
        </motion.div>

        {/* CHAMPS */}
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:0.6}}
          style={{display:'flex',flexDirection:'column',gap:'15px'}}>
          {['Nom complet','Email','Mot de passe','Confirmer le mot de passe'].map((ph,i)=>(
            <motion.input key={i}
              whileFocus={{scale:1.02, borderColor:'#7cb342'}}
              type={ph.includes('passe') ? 'password' : ph === 'Email' ? 'email' : 'text'}
              placeholder={ph}
              style={{padding:'12px',borderRadius:'8px',
                border:'1px solid #ddd',fontSize:'15px',
                outline:'none',transition:'all 0.3s'}}/>
          ))}

          <motion.button
            whileHover={{scale:1.03, backgroundColor:'#558b2f'}}
            whileTap={{scale:0.97}}
            style={{backgroundColor:'#7cb342',color:'white',
              border:'none',padding:'14px',borderRadius:'8px',
              fontSize:'16px',fontWeight:'bold',cursor:'pointer',
              marginTop:'10px',transition:'all 0.3s'}}>
            Créer mon compte
          </motion.button>
        </motion.div>

        <motion.p
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:0.8}}
          style={{textAlign:'center',marginTop:'20px',color:'#666'}}>
          Déjà un compte ?{' '}
          <a href="#" style={{color:'#7cb342',fontWeight:'bold',
            textDecoration:'none'}}>Se connecter</a>
        </motion.p>

      </motion.div>
    </div>
  );
}

export default Inscription;