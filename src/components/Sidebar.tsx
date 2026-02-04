import React from 'react';

interface SidebarProps {
    layerVisible: boolean;
    onToggleLayer: (visible: boolean) => void;
    selectedFeature: any | null;
}

const Sidebar: React.FC<SidebarProps> = ({ layerVisible, onToggleLayer, selectedFeature }) => {
    return (
        <div style={{
            width: '320px',
            height: '100%',
            backgroundColor: '#ffffff',
            boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #e0e0e0',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
            {/* Header */}
            <div style={{
                padding: '20px',
                borderBottom: '1px solid #eee',
                backgroundColor: '#f8f9fa'
            }}>
                <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#2c3e50' }}>GeoServer Workspace</h2>
                <p style={{ margin: '5px 0 0', fontSize: '0.8rem', color: '#7f8c8d' }}>
                    Interactive Vector Layer Demo
                </p>
            </div>

            {/* Layer Control */}
            <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#95a5a6', marginTop: 0 }}>
                    Layers
                </h3>
                <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '10px 0'
                }}>
                    <input
                        type="checkbox"
                        checked={layerVisible}
                        onChange={(e) => onToggleLayer(e.target.checked)}
                        style={{ marginRight: '10px', transform: 'scale(1.2)' }}
                    />
                    <span style={{ fontSize: '1rem', color: '#34495e' }}>Workspace Overlay</span>
                </label>
            </div>

            {/* Feature Details */}
            <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#95a5a6', marginTop: 0 }}>
                    Feature Details
                </h3>

                {selectedFeature ? (
                    <div>
                        <div style={{
                            backgroundColor: '#e8f6f3',
                            border: '1px solid #d1f2eb',
                            borderRadius: '4px',
                            padding: '10px',
                            marginBottom: '15px'
                        }}>
                            <strong>Selected: </strong> {selectedFeature.properties?.name || 'Unknown Feature'}
                        </div>

                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <tbody>
                                {Object.entries(selectedFeature.properties || {}).map(([key, value]) => (
                                    <tr key={key} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#2c3e50', width: '40%' }}>{key}</td>
                                        <td style={{ padding: '8px 0', color: '#34495e', wordBreak: 'break-word' }}>{String(value)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{
                        padding: '20px',
                        textAlign: 'center',
                        color: '#bdc3c7',
                        fontStyle: 'italic',
                        border: '2px dashed #ecf0f1',
                        borderRadius: '8px'
                    }}>
                        Click on a map feature to view its attributes.
                    </div>
                )}
            </div>

            {/* Footer */}
            <div style={{ padding: '15px', borderTop: '1px solid #eee', fontSize: '0.75rem', color: '#bdc3c7', textAlign: 'center' }}>
                Powered by Deck.gl & MapLibre
            </div>
        </div>
    );
};

export default Sidebar;
