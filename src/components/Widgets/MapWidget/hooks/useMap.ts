import { useEffect, useRef } from 'react';
import cfg from '@config';
import mapboxgl from 'mapbox-gl';
import { IWidgetLayers } from '@stores/rootStore/mapStore/types';
import { points } from '@components/Widgets/MapWidget/layers/points';
import { polygons } from '@components/Widgets/MapWidget/layers/polygons';
import { heatmap } from '@components/Widgets/MapWidget/layers/heatmap';

const useMap = (widgetLayers: IWidgetLayers, widgetUUID: string) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map>();

  mapboxgl.accessToken = cfg.mapBoxToken;
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [105.25252844849587, 57.956595016138124], // для линий center: [103.9112000, 57.1334000] // для потребностей [66.99462912841545, 63.635283648353436],
      zoom: 2,
      renderWorldCopies: false
    });
  }, []);

  useEffect(() => {
    if (!map?.current) return;

    if (widgetLayers) {
      Object.entries(widgetLayers).map(([uuid, layerParams]) => {
        if (layerParams.type === 'points' && !layerParams.heat) {
          points(map.current, layerParams, widgetUUID);
        }

        if (layerParams.heat) {
          heatmap(map.current, layerParams, widgetUUID);
        }

        if (layerParams.type === 'polygons') {
          polygons(map.current, layerParams, widgetUUID);
        }
        return null;
      });
    }
  }, [map, widgetLayers]);

  return { map, mapRef };
};

export default useMap;
