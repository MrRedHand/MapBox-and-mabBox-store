import mapboxgl from 'mapbox-gl';
import { ILayer } from '@stores/rootStore/mapStore/types';
import mapStore from '@stores/rootStore/mapStore/mapStore';

export const heatmap = (map: mapboxgl.Map, layerParams: ILayer, widgetUUID: string) => {
  if (!map.getLayer(layerParams.uuid)) {
    map.addSource(layerParams.name, {
      type: 'geojson',
      data: layerParams.url
    });

    map.addLayer(
      {
        id: layerParams.uuid,
        type: 'heatmap',
        source: layerParams.name,
        maxzoom: 9,
        paint: {
          // Increase the heatmap weight based on frequency and property magnitude
          'heatmap-weight': ['interpolate', ['linear'], ['get', 'mag'], 0, 0, 6, 1],
          // Increase the heatmap color weight weight by zoom level
          // heatmap-intensity is a multiplier on top of heatmap-weight
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
          // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
          // Begin color ramp at 0-stop with a 0-transparancy color
          // to create a blur-like effect.
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(33,102,172,0)',
            0.2,
            'rgb(103,169,207)',
            0.4,
            'rgb(241,201,222)',
            0.6,
            'rgb(246,160,107)',
            0.8,
            'rgb(246,110,184)',
            1,
            'rgb(244,14,112)'
          ],
          // Adjust the heatmap radius by zoom level
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0]
        }
      },
      'waterway-label'
    );

    mapStore.addReferenceToMap(map, widgetUUID, layerParams.uuid);
  }

  map.setLayoutProperty(layerParams.uuid, 'visibility', layerParams.visible ? 'visible' : 'none');
};
