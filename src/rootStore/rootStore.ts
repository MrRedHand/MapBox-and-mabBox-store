import leftPanelStore from '@stores/rootStore/leftPanelStore/leftPanelStore';
import widgetsStore from '@stores/rootStore/widgetsStore/widgetsStore';
import widgetsRepoStore from '@stores/rootStore/widgetsRepoStore/widgetsRepoStore';
import rightPanelStore from '@stores/rootStore/rightPanelStore/rightPanelStore';
import fieldsStore from '@stores/rootStore/fieldsStore/fieldsStore';
import mapStore from '@stores/rootStore/mapStore/mapStore';
import dropdownStore from './dropdownStore/dropdownStore';

export default class RootStore {
  leftPanelStore: typeof leftPanelStore;

  widgetsStore: typeof widgetsStore;

  widgetsRepoStore: typeof widgetsRepoStore;

  rightPanelStore: typeof rightPanelStore;

  fieldsStore: typeof fieldsStore;

  mapStore: typeof mapStore;

  dropdownStore: typeof dropdownStore;

  constructor() {
    this.leftPanelStore = leftPanelStore;
    this.widgetsStore = widgetsStore;
    this.widgetsRepoStore = widgetsRepoStore;
    this.rightPanelStore = rightPanelStore;
    this.fieldsStore = fieldsStore;
    this.mapStore = mapStore;
    this.dropdownStore = dropdownStore;
  }
}
