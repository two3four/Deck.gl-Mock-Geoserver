import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import type { LayersList } from '@deck.gl/core';

interface MapProps {
  layers?: LayersList;
  onFeatureClick?: (info: any) => void;
}

// Global view for Countries data
const INITIAL_VIEW_STATE = {
  longitude: 10,
  latitude: 20,
  zoom: 1.5,
  pitch: 0,
  bearing: 0
};

const MapComponent: React.FC<MapProps> = ({ layers = [], onFeatureClick }) => {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  const onViewStateChange = ({ viewState }: any) => {
    setViewState(viewState);
  };

  return (
    // Professional Map Background Color (matches standard water layers)
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#cad2d3' }}>
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
      </DeckGL>
    </div>
  );
};

export default MapComponent;
