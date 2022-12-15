import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { IMapStore } from '@stores/rootStore/mapStore/types';

const mapStore: IMapStore = makeAutoObservable({
  layers: {},
  addNewLayer(widgetUUID, data) {
    runInAction(() => {
      if (!mapStore.layers[widgetUUID]) {
        mapStore.layers[widgetUUID] = {};
      }
      mapStore.layers[widgetUUID][data.uuid] = data;
    });
  },
  toggleLayer(widgetUUID, layerUUID, state) {
    runInAction(() => {
      mapStore.layers[widgetUUID][layerUUID].visible = state;
    });
  },
  getWidgetLayers(widgetUUID) {
    return toJS(mapStore.layers[widgetUUID]);
  },
  removeLayer(layerUUID) {
    runInAction(() => {
      Object.entries(mapStore.layers).map(([uuid, layers]) => {
        Object.entries(layers).map(([innerUUID, layer]) => {
          if (layer.uuid === layerUUID) {
            layer.mapReference.removeLayer(layerUUID);
            delete mapStore.layers[uuid][innerUUID];
          }
        });
      });
    });
  },
  addReferenceToMap(map, widgetUUID, layerUUID) {
    runInAction(() => {
      mapStore.layers[widgetUUID][layerUUID].mapReference = map;
    });
  }
});

export default mapStore;
