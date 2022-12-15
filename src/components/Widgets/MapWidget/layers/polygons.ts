import mapboxgl from 'mapbox-gl';
import { ILayer } from '@stores/rootStore/mapStore/types';
import mapStore from '@stores/rootStore/mapStore/mapStore';

export const polygons = (map: mapboxgl.Map, layerParams: ILayer, widgetUUID: string) => {
  if (!map.getLayer(layerParams.uuid)) {
    map.addSource(layerParams.name, {
      type: 'geojson',
      data: layerParams.url
    });

    map.addLayer({
      id: layerParams.uuid,
      type: 'fill',
      source: layerParams.name,
      paint: {
        'fill-color': layerParams.color,
        'fill-opacity': 0.8
      }
    });

    mapStore.addReferenceToMap(map, widgetUUID, layerParams.uuid);
  }

  map.setLayoutProperty(layerParams.uuid, 'visibility', layerParams.visible ? 'visible' : 'none');
};
