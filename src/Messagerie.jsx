import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Messagerie() {
  const navigate = useNavigate();
  const [utilisateur, setUtilisateur] = useState({ nom: "Utilisateur" });
  const [contactSelectionne, setContactSelectionne] = useState(null);
  const [nouveauMessage, setNouveauMessage] = useState("");

  // Simulation de contacts
  const contacts = [
    { id: 1, nom: "Ahmed K.", role: "Client", avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png", dernierMsg: "Bonjour, votre profil m'intéresse." },
    { id: 2, nom: "Sara M.", role: "Client", avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", dernierMsg: "Pouvez-vous m'envoyer votre portfolio ?" },
  ];

  // Simulation de messages
  const [messages, setMessages] = useState([
    { id: 1, sender: 1, text: "Bonjour, votre profil m'intéresse pour mon site e-commerce.", time: "10:30" },
    { id: 2, sender: "me", text: "Bonjour Ahmed ! Je suis disponible pour en discuter.", time: "10:35" },
  ]);

  useEffect(() => {
    try {
      const data = localStorage.getItem('utilisateur');
      if (data) {
        setUtilisateur(JSON.parse(data));
      }
    } catch (e) {
      console.error("Erreur de lecture du localStorage", e);
    }
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!nouveauMessage.trim()) return;
    
    const msg = {
      id: Date.now(),
      sender: "me",
      text: nouveauMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, msg]);
    setNouveauMessage("");
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f7f7', fontFamily: 'Arial, sans-serif' }}>
      
      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#fff', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 onClick={() => navigate('/')} style={{ color: '#7cb342', margin: 0, fontSize: '26px', cursor: 'pointer' }}>
          freelance<span style={{ color: '#333' }}>Platform</span>
        </h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#333' }}>Accueil</span>
          <span onClick={() => navigate('/projets')} style={{ cursor: 'pointer', color: '#333' }}>Projets</span>
          <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#7cb342', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/profil')}>
            {utilisateur?.nom ? utilisateur.nom.charAt(0) : "U"}
          </div>
        </div>
      </nav>

      {/* CONTENEUR PRINCIPAL */}
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '30px auto', height: '80vh', backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        
        {/* LISTE DES DISCUSSIONS */}
        <div style={{ width: '350px', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
            <h2 style={{ fontSize: '20px', margin: 0, color: '#333' }}>Messages</h2>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {contacts.map(c => (
              <div 
                key={c.id} 
                onClick={() => setContactSelectionne(c)}
                style={{ padding: '15px 20px', display: 'flex', gap: '12px', cursor: 'pointer', backgroundColor: contactSelectionne?.id === c.id ? '#f0f7e9' : 'transparent', borderBottom: '1px solid #f9f9f9', transition: '0.2s' }}
              >
                <img src={c.avatar} alt="avatar" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '14px', color: '#333' }}>{c.nom}</strong>
                    <span style={{ fontSize: '11px', color: '#aaa' }}>12:45</span>
                  </div>
                  <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                    {c.dernierMsg}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ZONE DE CHAT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
          {contactSelectionne ? (
            <>
              <div style={{ padding: '15px 25px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={contactSelectionne.avatar} alt="avatar" style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px' }}>{contactSelectionne.nom}</h4>
                  <span style={{ fontSize: '11px', color: '#7cb342' }}>● En ligne</span>
                </div>
              </div>

              <div style={{ flex: 1, padding: '25px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#fdfdfd' }}>
                {messages.map(m => (
                  <motion.div 
                    initial={{ opacity: 0, x: m.sender === "me" ? 20 : -20 }} 
                    animate={{ opacity: 1, x: 0 }}
                    key={m.id} 
                    style={{ 
                      maxWidth: '70%', 
                      alignSelf: m.sender === "me" ? 'flex-end' : 'flex-start',
                      backgroundColor: m.sender === "me" ? '#7cb342' : '#eee',
                      color: m.sender === "me" ? 'white' : '#333',
                      padding: '12px 18px',
                      borderRadius: m.sender === "me" ? '18px 18px 0 18px' : '18px 18px 18px 0',
                      fontSize: '14px'
                    }}
                  >
                    {m.text}
                    <div style={{ fontSize: '10px', marginTop: '5px', textAlign: 'right', opacity: 0.7 }}>{m.time}</div>
                  </motion.div>
                ))}
              </div>

              <form onSubmit={handleSend} style={{ padding: '20px', borderTop: '1px solid #eee', display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={nouveauMessage}
                  onChange={(e) => setNouveauMessage(e.target.value)}
                  placeholder="Écrivez votre message..." 
                  style={{ flex: 1, padding: '12px 20px', borderRadius: '25px', border: '1px solid #ddd', outline: 'none' }} 
                />
                <button type="submit" style={{ backgroundColor: '#7cb342', color: 'white', border: 'none', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer' }}>
                  ➤
                </button>
              </form>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', flexDirection: 'column' }}>
              <span style={{ fontSize: '50px' }}>💬</span>
              <p>Sélectionnez une discussion pour commencer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}