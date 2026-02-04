import { useState, useEffect } from 'react';
import MapComponent from './components/Map';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import { createGeoserverLayers } from './layers/GeoserverLayer';
import './App.css';

function App() {
  const [layerVisible, setLayerVisible] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);
  const [geoData, setGeoData] = useState<any>(null);

  // Fetch local data on mount
  useEffect(() => {
    fetch('/countries.geo.json')
      .then(resp => resp.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Failed to load map data", err));
  }, []);

  // Create layer instances (Polygon + Text)
  const layers = createGeoserverLayers({
    data: geoData,
    visible: layerVisible,
    onClick: (info) => {
      // Click handling provided by layer
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
            layers={layers}
            onFeatureClick={handleFeatureClick}
          />
        </div>

      </div>
    </ErrorBoundary>
  );
}

export default App;
