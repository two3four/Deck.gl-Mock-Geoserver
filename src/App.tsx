import React from 'react';
import MapComponent from './components/Map';
import ErrorBoundary from './components/ErrorBoundary';
import { createGeoserverLayer } from './layers/GeoserverLayer';
import './App.css';

function App() {
  // Create layer instance
  const geoserverLayer = createGeoserverLayer({
    visible: true,
    onClick: (info) => {
      // Handle click at App level if needed, or keep in layer definition
      if (info.object) {
        console.log('App level click handler:', info.object);
      }
    }
  });

  return (
    <ErrorBoundary>
      <div className="App">
        <MapComponent layers={[geoserverLayer]} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
