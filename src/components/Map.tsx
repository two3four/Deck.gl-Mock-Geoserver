import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { Map as MapLibre } from 'react-map-gl/maplibre';
import type { LayersList } from '@deck.gl/core';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapProps {
  layers?: LayersList;
  onFeatureClick?: (info: any) => void;
}

// Global view for Countries data
const INITIAL_VIEW_STATE = {
  longitude: 0,
  latitude: 20,
  zoom: 2,
  pitch: 0,
  bearing: 0
};

// CartoDB Positron (Fast, Free, Production Ready)
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

const MapComponent: React.FC<MapProps> = ({ layers = [], onFeatureClick }) => {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  const onViewStateChange = ({ viewState }: any) => {
    setViewState(viewState);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <DeckGL
        initialViewState={viewState}
        controller={true}
        layers={layers}
        onViewStateChange={onViewStateChange}
        getTooltip={({ object }: any) => object && {
          html: `<div style="padding: 4px;"><strong>${object.properties?.name || 'Feature'}</strong></div>`,
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            fontSize: '0.8em',
            borderRadius: '4px'
          }
        }}
        onClick={(info) => {
          if (onFeatureClick) {
            onFeatureClick(info);
          }
        }}
      >
        <MapLibre
          mapStyle={MAP_STYLE}
          style={{ width: '100%', height: '100%' }}
        />
      </DeckGL>
    </div>
  );
};

export default MapComponent;
