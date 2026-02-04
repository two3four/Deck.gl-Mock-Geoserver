import { useState } from 'react';
import MapComponent from './components/Map';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import { createGeoserverLayer } from './layers/GeoserverLayer';
import './App.css';

function App() {
  const [layerVisible, setLayerVisible] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);

  // Create layer instance with dynamic visibility
  const geoserverLayer = createGeoserverLayer({
    visible: layerVisible,
    onClick: (info) => {
      // We handle the click in the Map component via prop, but the layer needs this to know it IS clickable
      // The actual state update happens in the map's onFeatureClick handler
      // This is mainly to ensure 'info.object' is picked up by Deck.gl
    }
  });

  const handleFeatureClick = (info: any) => {
    if (info && info.object) {
      console.log("Selected:", info.object);
      setSelectedFeature(info.object);
    } else {
      setSelectedFeature(null);
    }
  };

  return (
    <ErrorBoundary>
      <div className="App" style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>

        {/* Sidebar Panel */}
        <Sidebar
          layerVisible={layerVisible}
          onToggleLayer={setLayerVisible}
          selectedFeature={selectedFeature}
        />

        {/* Map Area */}
        <div style={{ flex: 1, position: 'relative' }}>
          <MapComponent
            layers={[geoserverLayer]}
            onFeatureClick={handleFeatureClick}
          />
        </div>

      </div>
    </ErrorBoundary>
  );
}

export default App;
