import mapboxgl from 'mapbox-gl';

export interface IMapStore {
  layers: IMapWidgets | {};
  addNewLayer: (widgetUUID: string, layerParams: ILayer) => void;
  toggleLayer: (widgetUUID: string, layerUUID: string, state: boolean) => void;
  getWidgetLayers: (widgetUUID: string) => IWidgetLayers;
  removeLayer: (layerUUID: string) => void;
  addReferenceToMap: (map: mapboxgl.Map, widgetUUID: string, layerUUID: string) => void;
}

export interface IMapWidgets {
  [uuid: string]: IWidgetLayers;
}

export interface IWidgetLayers {
  [uuid: string]: ILayer;
}

export interface ILayer {
  uuid: string;
  name: string;
  color: string;
  url: string;
  visible: boolean;
  type: TLayerType;
  heat: boolean;
  mapReference?: mapboxgl.Map;
}

export type TLayerType = 'points' | 'polygons' | 'lines';
