import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Connexion() {
  const navigate = useNavigate();

  return (
    <div style={{minHeight:'100vh',backgroundColor:'#f7f7f7',
      display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center'}}>

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

      <motion.div
        initial={{opacity:0,y:50}}
        animate={{opacity:1,y:0}}
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
          Connectez-vous à votre compte
        </motion.p>

        <motion.div
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:0.5}}
          style={{display:'flex',flexDirection:'column',gap:'15px'}}>

          <motion.input
            whileFocus={{scale:1.02}}
            type="email"
            placeholder="Email"
            style={{padding:'12px',borderRadius:'8px',
              border:'1px solid #ddd',fontSize:'15px',outline:'none'}}/>

          <motion.input
            whileFocus={{scale:1.02}}
            type="password"
            placeholder="Mot de passe"
            style={{padding:'12px',borderRadius:'8px',
              border:'1px solid #ddd',fontSize:'15px',outline:'none'}}/>

          <a href="#" style={{color:'#7cb342',fontSize:'13px',
            textDecoration:'none',textAlign:'right'}}>
            Mot de passe oublié ?
          </a>

          <motion.button
            whileHover={{scale:1.03,backgroundColor:'#558b2f'}}
            whileTap={{scale:0.97}}
            style={{backgroundColor:'#7cb342',color:'white',
              border:'none',padding:'14px',borderRadius:'8px',
              fontSize:'16px',fontWeight:'bold',cursor:'pointer',
              marginTop:'10px',transition:'all 0.3s'}}>
            Se connecter
          </motion.button>

          <motion.button
            whileHover={{scale:1.03}}
            whileTap={{scale:0.97}}
            style={{backgroundColor:'white',color:'#333',
              border:'1px solid #ddd',padding:'14px',borderRadius:'8px',
              fontSize:'16px',cursor:'pointer',display:'flex',
              alignItems:'center',justifyContent:'center',gap:'10px'}}>
            🔵 Se connecter avec Google
          </motion.button>

        </motion.div>

        <motion.p
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:0.8}}
          style={{textAlign:'center',marginTop:'20px',color:'#666'}}>
          Pas encore de compte ?{' '}
          <span onClick={()=>navigate('/inscription')}
            style={{color:'#7cb342',fontWeight:'bold',cursor:'pointer'}}>
            S'inscrire
          </span>
        </motion.p>

      </motion.div>
    </div>
  );
}

export default Connexion;