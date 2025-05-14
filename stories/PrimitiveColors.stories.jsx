import React from 'react';

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

const primitiveColors = {
  neutral: {
    '$neutral-white': '#FFFFFF',
    '$neutral-100': '#F7F6F5',
    '$neutral-200': '#EDECE8',
    '$neutral-300': '#DCD9D1',
    '$neutral-400': '#CAC5BA',
    '$neutral-500': '#989385',
    '$neutral-600': '#6C6861',
    '$neutral-700': '#4D4A42',
    '$neutral-800': '#21201C',
  },
  brand: {
    '$brand-100': '#F3F7F7',
    '$brand-200': '#E6EFE7',
    '$brand-300': '#CEDFDD',
    '$brand-400': '#B5CECC',
    '$brand-500': '#78A6A1',
    '$brand-600': '#507BA7',
    '$brand-700': '#395754',
    '$brand-800': '#172423',
  },
  sage: {
    '$sage-100': '#F6F7F3',
    '$sage-200': '#ECEDE7',
    '$sage-300': '#D8DCCE',
    '$sage-400': '#C8CD99',
    '$sage-500': '#97A17C',
    '$sage-600': '#6D7656',
    '$sage-700': '#4D523C',
    '$sage-800': '#20231A',
  },
  desert: {
    '$desert-100': '#FBF5EF',
    '$desert-200': '#F7EBDF',
    '$desert-300': '#EFD6BE',
    '$desert-400': '#E6C19D',
    '$desert-500': '#C58E5A',
    '$desert-600': '#8E643C',
    '$desert-700': '#65472A',
    '$desert-800': '#2B1E12',
  },
  thistle: {
    '$thistle-100': '#F8F3F5',
    '$thistle-200': '#F0E6E9',
    '$thistle-300': '#DFCDD2',
    '$thistle-400': '#CFB5BC',
    '$thistle-500': '#A37B86',
    '$thistle-600': '#74585F',
    '$thistle-700': '#513D42',
    '$thistle-800': '#221A1C',
  },
  periwinkle: {
    '$periwinkle-100': '#F2F4FA',
    '$periwinkle-200': '#E1E5F3',
    '$periwinkle-300': '#C4CBE7',
    '$periwinkle-400': '#A7B2DC',
    '$periwinkle-500': '#7A82A4',
    '$periwinkle-600': '#575D73',
    '$periwinkle-700': '#3E4251',
    '$periwinkle-800': '#1A1C23',
  },
  mist: {
    '$mist-100': '#F0F6F9',
    '$mist-200': '#E2EDF3',
    '$mist-300': '#C5DBE8',
    '$mist-400': '#A8CADD',
    '$mist-500': '#78955A',
    '$mist-600': '#556A77',
    '$mist-700': '#3B4B54',
    '$mist-800': '#192024',
  },
  green: {
    '$green-100': '#F5F8F2',
    '$green-200': '#EBF1E5',
    '$green-300': '#D6E2CA',
    '$green-400': '#C2D4AF',
    '$green-500': '#90B16F',
    '$green-600': '#668547',
    '$green-700': '#485E32',
    '$green-800': '#1D2714',
  },
  yellow: {
    '$yellow-100': '#FAF7F0',
    '$yellow-200': '#F5EFE0',
    '$yellow-300': '#EADEC2',
    '$yellow-400': '#E0CEA3',
    '$yellow-500': '#C6A457',
    '$yellow-600': '#B2851C',
    '$yellow-700': '#7C5C13',
    '$yellow-800': '#352808',
  },
  red: {
    '$red-100': '#FAF2EF',
    '$red-200': '#F5E4E0',
    '$red-300': '#ECC9C0',
    '$red-400': '#E2ADA0',
    '$red-500': '#CB6C54',
    '$red-600': '#9D442D',
    '$red-700': '#6F3020',
    '$red-800': '#2E130D',
  },
};

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