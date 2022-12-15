import mapboxgl from 'mapbox-gl';
import { ILayer } from '@stores/rootStore/mapStore/types';
import mapStore from '@stores/rootStore/mapStore/mapStore';

export const points = (map: mapboxgl.Map, layerParams: ILayer, widgetUUID: string) => {
  if (!map.getLayer(layerParams.uuid)) {
    map.addSource(layerParams.name, {
      type: 'geojson',
      data: layerParams.url
    });

    map.addLayer({
      id: layerParams.uuid,
      type: 'circle',
      source: layerParams.name,
      paint: {
        'circle-radius': 5,
        'circle-stroke-width': 1,
        'circle-color': layerParams.color || '#F40E70',
        'circle-stroke-color': 'white'
      }
    });

    mapStore.addReferenceToMap(map, widgetUUID, layerParams.uuid);
  }

  map.setLayoutProperty(layerParams.uuid, 'visibility', layerParams.visible ? 'visible' : 'none');
};
