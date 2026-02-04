import { GeoJsonLayer } from '@deck.gl/layers';
import type { PickingInfo } from '@deck.gl/core';

// Mock Data URL - simulating a WFS GeoJSON response or Vector Tiles
// Using a public dataset for the demo (US specific or whatever is reliable)
// Local Countries Data (Fast, Reliable)
const MOCK_GEOSERVER_URL = '/countries.geo.json';

// Helper to generate a consistent color from a string
function stringToColor(str: string): [number, number, number] {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // improved color generation for professional look strings
    // Mixing with a base value to avoid too dark/neon colors
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    const hex = "00000".substring(0, 6 - c.length) + c;

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
}

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
        highlightColor: [255, 255, 255, 200],
        stroked: true,
        filled: true,
        lineWidthMinPixels: 1, // Sharp lines
        getLineColor: [255, 255, 255, 150], // White borders
        getFillColor: (d: any) => {
            const name = d.properties?.name || 'unknown';
            const [r, g, b] = stringToColor(name);
            return [r, g, b, 102]; // ~40% opacity
        },
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
