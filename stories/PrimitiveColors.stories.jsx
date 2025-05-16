import React from 'react';
import { primitiveColors } from './colorTokens';

const ColorSwatch = ({ name, color, value }) => (
  <div style={{ margin: '10px', display: 'inline-block', width: '200px' }}>
    <div
      style={{
        width: '100%',
        height: '100px',
        backgroundColor: value,
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

const ColorGroup = ({ title, colors }) => (
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
      {Object.entries(colors).map(([name, value]) => (
        <ColorSwatch key={name} name={name} value={value} />
      ))}
    </div>
  </div>
);

const meta = {
  title: 'Design System/Primitive Colors',
  component: ColorGroup,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const AllPrimitiveColors = {
  render: () => (
    <div style={{ padding: '20px' }}>
      {Object.entries(primitiveColors).map(([category, colors]) => (
        <ColorGroup 
          key={category} 
          title={`${category.charAt(0).toUpperCase() + category.slice(1)} Colors`} 
          colors={colors} 
        />
      ))}
    </div>
  ),
}; 