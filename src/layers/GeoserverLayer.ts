import { GeoJsonLayer } from '@deck.gl/layers';
import type { PickingInfo } from '@deck.gl/core';

// Mock Data URL - simulating a WFS GeoJSON response or Vector Tiles
// Using a public dataset for the demo (US specific or whatever is reliable)
// Local Countries Data (Fast, Reliable)
const MOCK_GEOSERVER_URL = '/countries.geo.json';

export function createGeoserverLayer({
    id = 'geoserver-layer',
    data = MOCK_GEOSERVER_URL,
    visible = true,
    onClick
}: {
    id?: string;
    data?: string | any;
    visible?: boolean;
    onClick?: (info: PickingInfo) => void;
}) {
    return new GeoJsonLayer({
        id,
        data,
        visible,
        pickable: true,
        autoHighlight: true,
        highlightColor: [0, 255, 255, 200],
        stroked: true,
        filled: true,
        lineWidthMinPixels: 4,
        getLineColor: [255, 100, 100],
        getFillColor: [200, 200, 200, 100],
        getLineWidth: 20,
        // Add interactivity
        onClick: onClick,

        // In a real Geoserver scenario using MVT (Vector Tiles):
        // import { MVTLayer } from '@deck.gl/geo-layers';
        // return new MVTLayer({
        //   data: 'http://your-geoserver/gwc/service/tms/1.0.0/workspace:layer@EPSG:900913@pbf/{z}/{x}/{y}.pbf',
        //   ...
        // });
    });
}
