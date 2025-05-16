import React from 'react';

const GradientSwatch = ({ name, value }) => (
  <div style={{ margin: '10px', display: 'inline-block', width: '200px' }}>
    <div
      style={{
        width: '100%',
        height: '100px',
        background: value,
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginBottom: '8px'
      }}
    />
    <div style={{ fontSize: '14px' }}>
      <div style={{ fontWeight: 'bold' }}>{name}</div>
      <div style={{ color: '#666', fontFamily: 'monospace' }}>{value}</div>
    </div>
  </div>
);

const GradientGroup = ({ title, gradients }) => (
  <div style={{ marginBottom: '40px' }}>
    <h2 style={{ 
      marginBottom: '20px', 
      color: '#333',
      borderBottom: '1px solid #eee',
      paddingBottom: '8px'
    }}>
      {title}
    </h2>
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
      gap: '16px' 
    }}>
      {Object.entries(gradients).map(([name, value]) => (
        <GradientSwatch key={name} name={name} value={value} />
      ))}
    </div>
  </div>
);

const meta = {
  title: 'Design System/Gradients',
  component: GradientGroup,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const BodyGradients = {
  render: () => {
    const gradients = {
      'Gradient/Body/Green': 'linear-gradient(180deg, #ebf1e5 0%, #ffffff 100%)',
      'Gradient/Body/Yellow': 'linear-gradient(180deg, #f5efe0 0%, #ffffff 100%)',
      'Gradient/Body/Red': 'linear-gradient(180deg, #f5e4e0 0%, #ffffff 100%)'
    };

    return (
      <div style={{ padding: '20px' }}>
        <GradientGroup title="Body Gradients" gradients={gradients} />
      </div>
    );
  },
}; 