import { GeoJsonLayer, TextLayer } from '@deck.gl/layers';
import type { PickingInfo } from '@deck.gl/core';

// Helper to generate a consistent color from a string
function stringToColor(str: string): [number, number, number] {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    const hex = "00000".substring(0, 6 - c.length) + c;

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
}

// Simple centroid calculator for labels
function getLabelPosition(feature: any): [number, number] {
    if (!feature.geometry) return [0, 0];

    // For Point
    if (feature.geometry.type === 'Point') {
        return feature.geometry.coordinates as [number, number];
    }

    // For Polygon/MultiPolygon (Simple bounding box center approx)
    let coords = [];
    if (feature.geometry.type === 'Polygon') {
        coords = feature.geometry.coordinates[0];
    } else if (feature.geometry.type === 'MultiPolygon') {
        // Use the first polygon (usually the largest main landmass)
        coords = feature.geometry.coordinates[0][0];
    }

    if (!coords || coords.length === 0) return [0, 0];

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of coords) {
        // p is [lng, lat]
        if (p[0] < minX) minX = p[0];
        if (p[1] < minY) minY = p[1];
        if (p[0] > maxX) maxX = p[0];
        if (p[1] > maxY) maxY = p[1];
    }

    return [(minX + maxX) / 2, (minY + maxY) / 2];
}

export function createGeoserverLayers({
    data,
    visible = true,
    onClick
}: {
    data?: any;
    visible?: boolean;
    onClick?: (info: PickingInfo) => void;
}) {
    if (!data) return [];

    const polygonLayer = new GeoJsonLayer({
        id: 'geoserver-polygons',
        data,
        visible,
        pickable: true,
        autoHighlight: true,
        highlightColor: [255, 255, 255, 200],
        stroked: true,
        filled: true,
        lineWidthMinPixels: 1,
        // Smooth looking white borders
        getLineColor: [255, 255, 255, 180],
        getFillColor: (d: any) => {
            const name = d.properties?.name || 'unknown';
            const [r, g, b] = stringToColor(name);
            return [r, g, b, 102]; // ~40% opacity
        },
        getLineWidth: 20,
        onClick: onClick,
        parameters: {
            depthTest: false // Avoid z-fighting for smoother look
        }
    });

    const textLayer = new TextLayer({
        id: 'geoserver-labels',
        data: data.features || [],
        visible,
        pickable: false,
        getPosition: (d: any) => getLabelPosition(d),
        getText: (d: any) => d.properties?.name || '',
        getSize: 12,
        getColor: [50, 50, 50, 255], // Dark Grey for professional look
        getAngle: 0,
        getTextAnchor: 'middle',
        getAlignmentBaseline: 'center',
        fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 600,
        outlineWidth: 2,
        outlineColor: [255, 255, 255, 255] // White halo for readability
    });

    return [polygonLayer, textLayer];
}
