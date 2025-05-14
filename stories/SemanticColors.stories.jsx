import React from 'react';

const ColorSwatch = ({ name, value, description }) => (
  <div style={{ margin: '10px', display: 'inline-block', width: '300px' }}>
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
      {description && (
        <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>{description}</div>
      )}
    </div>
  </div>
);

const ColorGroup = ({ title, description, colors }) => (
  <div style={{ marginBottom: '40px' }}>
    <h2 style={{ 
      marginBottom: description ? '8px' : '20px', 
      color: '#333',
      borderBottom: '1px solid #eee',
      paddingBottom: '8px'
    }}>
      {title}
    </h2>
    {description && (
      <p style={{ 
        color: '#666', 
        marginBottom: '20px',
        fontSize: '14px'
      }}>
        {description}
      </p>
    )}
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
      gap: '16px' 
    }}>
      {Object.entries(colors).map(([name, data]) => (
        <ColorSwatch 
          key={name} 
          name={name} 
          value={data.value} 
          description={data.description} 
        />
      ))}
    </div>
  </div>
);

const semanticColors = {
  content: {
    neutral: {
      description: "Colors for texts and icons. ",
      colors: {
        '$content-neutral-default': {
          value: '#21201C',
          description: 'Default color used for texts and icons'
        },
        '$content-neutral-muted': {
          value: '#6C6861',
          description: 'Used for texts and icons that need to be visually less prominent'
        },
        '$content-neutral-disabled': {
          value: '#CAC5BA',
          description: 'Used for disabled text and icon states'
        },
        '$content-neutral-on-surface': {
          value: '#4D4A42',
          description: 'Used for text and icons on colored surfaces'
        },
        '$content-neutral-disabled-on-surface': {
          value: '#989385',
          description: 'Used for disabled states on colored surfaces'
        }
      }
    },
    colorful: {
      description: "Brand and accent text colors for different contexts",
      colors: {
        '$content-brand-default': {
          value: '#395754',
          description: 'Primary brand color for text and icons'
        },
        '$content-sage-default': {
          value: '#4D523C',
          description: 'Sage accent color for text and icons'
        },
        '$content-desert-default': {
          value: '#65472A',
          description: 'Desert accent color for text and icons'
        },
        '$content-thistle-default': {
          value: '#513D42',
          description: 'Thistle accent color for text and icons'
        },
        '$content-periwinkle-default': {
          value: '#3E4251',
          description: 'Periwinkle accent color for text and icons'
        },
        '$content-mist-default': {
          value: '#3B4B54',
          description: 'Mist accent color for text and icons'
        }
      }
    },
    utility: {
      description: "Status and feedback text colors",
      colors: {
        '$content-success-default': {
          value: '#485E32',
          description: 'Used for success messages and indicators'
        },
        '$content-warning-default': {
          value: '#7C5C13',
          description: 'Used for warning messages and indicators'
        },
        '$content-danger-default': {
          value: '#6F3020',
          description: 'Used for error messages and indicators'
        }
      }
    }
  },
  background: {
    neutral: {
      description: "Base background colors for different surface levels",
      colors: {
        '$background-neutral-base': {
          value: '#FFFFFF',
          description: 'Default background color for the application'
        },
        '$background-neutral-raised': {
          value: '#F7F6F5',
          description: 'Used for slightly elevated surfaces'
        },
        '$background-neutral-layer': {
          value: '#EDECE8',
          description: 'Used for distinct surface layers'
        },
        '$background-neutral-hover': {
          value: '#DCD9D1',
          description: 'Background color for hover states'
        },
        '$background-neutral-inverse': {
          value: '#21201C',
          description: 'Used for inverse/dark surfaces'
        }
      }
    },
    buttons: {
      description: "Background colors for different button variants and states",
      colors: {
        '$background-button-primary-default': {
          value: '#21201C',
          description: 'Default state for primary buttons'
        },
        '$background-button-primary-hover': {
          value: '#4D4A42',
          description: 'Hover state for primary buttons'
        },
        '$background-button-primary-pressed': {
          value: '#4D4A42',
          description: 'Pressed state for primary buttons'
        },
        '$background-button-secondary-default': {
          value: '#EDECE8',
          description: 'Default state for secondary buttons'
        },
        '$background-button-secondary-hover': {
          value: '#DCD9D1',
          description: 'Hover state for secondary buttons'
        },
        '$background-button-secondary-pressed': {
          value: '#DCD9D1',
          description: 'Pressed state for secondary buttons'
        },
        '$background-button-danger-default': {
          value: '#F5E4E0',
          description: 'Default state for danger buttons'
        },
        '$background-button-danger-hover': {
          value: '#ECC9C0',
          description: 'Hover state for danger buttons'
        },
        '$background-button-danger-pressed': {
          value: '#ECC9C0',
          description: 'Pressed state for danger buttons'
        }
      }
    },
    colorful: {
      description: "Brand and accent background colors",
      colors: {
        '$background-brand-default': {
          value: '#E6EFE7',
          description: 'Primary brand background color'
        },
        '$background-sage-default': {
          value: '#ECEDE7',
          description: 'Sage accent background color'
        },
        '$background-desert-default': {
          value: '#F7EBDF',
          description: 'Desert accent background color'
        },
        '$background-thistle-default': {
          value: '#F0E6E9',
          description: 'Thistle accent background color'
        },
        '$background-periwinkle-default': {
          value: '#E1E5F3',
          description: 'Periwinkle accent background color'
        },
        '$background-mist-default': {
          value: '#E2EDF3',
          description: 'Mist accent background color'
        },
        '$background-brand-inverse': {
          value: '#507BA7',
          description: 'Inverse brand background color'
        },
        '$background-sage-inverse': {
          value: '#6D7656',
          description: 'Inverse sage background color'
        },
        '$background-desert-inverse': {
          value: '#8E643C',
          description: 'Inverse desert background color'
        },
        '$background-thistle-inverse': {
          value: '#74585F',
          description: 'Inverse thistle background color'
        },
        '$background-periwinkle-inverse': {
          value: '#575D73',
          description: 'Inverse periwinkle background color'
        },
        '$background-mist-inverse': {
          value: '#556A77',
          description: 'Inverse mist background color'
        }
      }
    },
    utility: {
      description: "Status and feedback background colors",
      colors: {
        '$background-success-brand': {
          value: '#EBF1E5',
          description: 'Used for success states and indicators'
        },
        '$background-warning-brand': {
          value: '#F5EFE0',
          description: 'Used for warning states and indicators'
        },
        '$background-danger-brand': {
          value: '#F5E4E0',
          description: 'Used for error states and indicators'
        }
      }
    }
  },
  border: {
    description: "Border colors for different components and states",
    base: {
      description: "Default border colors for general use",
      colors: {
        '$border-base': {
          value: '#EDECE8',
          description: 'Default border color for general elements'
        }
      }
    },
    input: {
      description: "Border colors for form input states",
      colors: {
        '$border-input-default': {
          value: '#989385',
          description: 'Default border color for input fields'
        },
        '$border-input-selected': {
          value: '#395754',
          description: 'Border color for selected/focused input fields'
        },
        '$border-input-assistive': {
          value: '#E6EFE7',
          description: 'Border color for assisted/helper states'
        },
        '$border-input-danger': {
          value: '#9D442D',
          description: 'Border color for error states'
        },
        '$border-input-muted': {
          value: '#DCD9D1',
          description: 'Border color for muted/disabled states'
        }
      }
    }
  }
};

const meta = {
  title: 'Design System/Semantic Colors',
  component: ColorGroup,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const AllSemanticColors = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '40px', color: '#333' }}>Semantic Color Tokens</h1>
      
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '30px', color: '#333' }}>Content Colors</h2>
        {Object.entries(semanticColors.content).map(([category, data]) => (
          <ColorGroup 
            key={category}
            title={`${category.charAt(0).toUpperCase() + category.slice(1)} Content`}
            description={data.description}
            colors={data.colors}
          />
        ))}
      </section>

      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '30px', color: '#333' }}>Background Colors</h2>
        {Object.entries(semanticColors.background).map(([category, data]) => (
          <ColorGroup 
            key={category}
            title={`${category.charAt(0).toUpperCase() + category.slice(1)} Background`}
            description={data.description}
            colors={data.colors}
          />
        ))}
      </section>

      <section>
        <h2 style={{ marginBottom: '30px', color: '#333' }}>Border Colors</h2>
        {Object.entries(semanticColors.border).filter(([key]) => key !== 'description').map(([category, data]) => (
          <ColorGroup 
            key={category}
            title={`${category.charAt(0).toUpperCase() + category.slice(1)} Borders`}
            description={data.description}
            colors={data.colors}
          />
        ))}
      </section>
    </div>
  ),
}; 