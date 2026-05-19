import React from 'react';

export default function BrandTitle({ showSubtitle = false }) {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '26px', fontWeight: '700' }}>
        <span style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: '#7cb342', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px' }}>
          TF
        </span>
        <span>
          <span style={{ color: '#7cb342' }}>Talent</span>
          <span style={{ color: '#333' }}>Flow</span>
        </span>
      </span>
      {showSubtitle && (
        <span style={{ color: '#555', fontSize: '14px', lineHeight: 1.3 }}>
          La plateforme n°1 de Freelance au Maroc
        </span>
      )}
    </span>
  );
}
