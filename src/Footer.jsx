import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{ backgroundColor: '#f8fafc', color: '#1f2937', padding: '60px 20px', width: '100%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '30px', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#7cb342', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '18px' }}>
                TF
              </div>
              <h2 style={{ margin: 0, fontSize: '22px', color: '#111827', fontWeight: '800' }}>
                Talent<span style={{ color: '#7cb342' }}>Flow</span>
              </h2>
            </div>
            <p style={{ color: '#475569', lineHeight: 1.8, maxWidth: '320px' }}>
              La plateforme n°1 pour trouver des talents et des projets freelances au Maroc.
            </p>
          </div>

          <div>
            <h3 style={{ marginBottom: '18px', color: '#111827', fontSize: '16px', fontWeight: '700' }}>Navigation</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#475569', fontSize: '14px' }}>Accueil</span>
              <span onClick={() => navigate('/projets')} style={{ cursor: 'pointer', color: '#475569', fontSize: '14px' }}>Projets</span>
              <span onClick={() => navigate('/pour-clients')} style={{ cursor: 'pointer', color: '#475569', fontSize: '14px' }}>Pour les clients</span>
              <span onClick={() => navigate('/pour-freelancers')} style={{ cursor: 'pointer', color: '#475569', fontSize: '14px' }}>Pour les freelancers</span>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '18px', color: '#111827', fontSize: '16px', fontWeight: '700' }}>Légal</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ color: '#475569', fontSize: '14px', cursor: 'pointer' }}>Politique de Confidentialité</span>
              <span style={{ color: '#475569', fontSize: '14px', cursor: 'pointer' }}>Conditions d'Utilisation</span>
              <span style={{ color: '#475569', fontSize: '14px', cursor: 'pointer' }}>Préférences Cookies</span>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '18px', color: '#111827', fontSize: '16px', fontWeight: '700' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ color: '#475569', fontSize: '14px' }}>✉ contact@talentflow.ma</span>
              <span style={{ color: '#475569', fontSize: '14px' }}>📍 Maroc</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '40px', borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', color: '#64748b', fontSize: '14px' }}>
          <span>© 2026 TalentFlow. Tous droits réservés.</span>
          <span>Fait avec <span style={{ color: '#ef4444' }}>❤</span> au Maroc</span>
        </div>
      </div>
    </footer>
  );
}
