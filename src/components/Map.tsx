import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { Map as MapLibre } from 'react-map-gl/maplibre';
import type { LayersList } from '@deck.gl/core';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapProps {
  layers?: LayersList;
}

const INITIAL_VIEW_STATE = {
  longitude: -74.006,
  latitude: 40.7128,
  zoom: 12,
  pitch: 0,
  bearing: 0
};

// MapTiler key from environment or fallback
const MAP_STYLE = 'https://demotiles.maplibre.org/style.json'; // Fallback style

const MapComponent: React.FC<MapProps> = ({ layers = [] }) => {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [tooltip, setTooltip] = useState<{ x: number, y: number, object: any } | null>(null);

  const onViewStateChange = ({ viewState }: any) => {
    setViewState(viewState);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <DeckGL
        initialViewState={viewState}
        controller={true}
        layers={layers}
        onViewStateChange={onViewStateChange}
        getTooltip={({ object }: any) => object && {
          html: `<h3>${object.properties?.name || 'Feature'}</h3><div>${JSON.stringify(object.properties)}</div>`,
          style: {
            backgroundColor: '#fff',
            fontSize: '0.8em',
            padding: '5px'
          }
        }}
        onClick={(info) => {
          if (info.object) {
            console.log('Clicked:', info.object);
            alert(`Clicked feature: ${JSON.stringify(info.object.properties)}`);
          }
        }}
      >
        <MapLibre
          mapStyle={MAP_STYLE}
          style={{ width: '100%', height: '100%' }}
        />
      </DeckGL>

      {/* Overlay UI for instructions */}
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        background: 'white',
        padding: 10,
        borderRadius: 4,
        zIndex: 100,
        maxWidth: 300
      }}>
        <h3>Deck.gl + MapLibre Demo</h3>
        <p>Click on features to see attributes.</p>
        <p style={{ fontSize: '0.8rem', color: '#666' }}>
          Simulating Geoserver Vector Layers using GeoJSON.
        </p>
      </div>
    </div>
  );
};

export default MapComponent;
