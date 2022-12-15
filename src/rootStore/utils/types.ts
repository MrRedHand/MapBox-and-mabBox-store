export type THintsStore = {
  hints: THint[];
  addHint: () => string;
  removeHint: (uuid: string) => void;
  updateHint: (uuid: string, params: object) => void;
  getHint: (uuid: string) => THint;
  getOpenedHints: () => THint[];
};

export type THint = {
  uuid: string;
  type: string;
  open: boolean;
  name: string;
  size: TSize;
  position: TPosition;
  body: JSX.Element | null;
};

export type TFieldsStore = {
  fields: TFields;
  initStore: () => void;
  get getTree(): object;
};

export type TFields = {
  data: any;
  list: any[];
  state: string;
};

export type TRightPanelStore = {
  state: TRightPanelState;
  currentTab: (newTabIndex?: number) => number;
  open: (name: string, params?: object) => void;
  close: () => void;
  isOpen: (name: string) => boolean;
};

export type TRightPanelState = {
  show: boolean;
  name: string;
  params: object;
  tab: number;
};

export type TWidgetsRepoStore = {
  state: TWidgetsRepoStoreState;
  open: () => void;
  close: () => void;
  get getClassName(): string;
  get getOpenStatus(): boolean;
  extend: () => void;
};

export type TWidgetsStore = {
  widgets: TWidget[] | null;
  filtered: boolean;
  filteredArray: any[];
  currentFocused: string;

  updateWidget: (widgetUuid: string, params: TWidget) => void;
  setWidgetPosition: (widgetUuid: string, newPosition: TPosition) => void;
  setWidgetSize: (widgetUuid: string, newSize: TSize) => void;
  setWidgetMinSize: (widgetUuid: string, newSize: TSize) => void;
  getWidgetMinSize: (widgetUuid: string) => TSize;
  getWidgetSize: (widgetUuid: string) => TSize;
  getWidgetName: (widgetUuid: string) => string;
  getWidgetPosition: (widgetUuid: string) => TPosition;
  getWidgetIsCreate: (widgetUuid: string) => boolean;
  getWidgetIsSinge: (widgetUuid: string) => boolean;
  getWidgetIsHidden: (widgetUuid: string) => boolean;
  getWidgetData: (widgetUuid: string) => any;
  getWidget: (widgetUuid: string) => TWidget;
  findWidgetByUuid: (widgetUuid: string) => TWidget;
  filter: (type: string) => void;
  get getAllWidgets(): TWidget[];
  get getDragWidgets(): TWidget[];
  get dragWidgetsUUID(): string[];
  //
  // //Общие методы стора, бывшего WidgetsStore
  initStore: () => void;
  addWidget: (widgetParams: object) => string;
  removeWidget: (widgetUuid: string) => void; // Бывший close принимавший uuid и удалявший из массива
  // filter : () => void
  showWidget: (widgetUuid: string) => void; // Бывший show
  hideWidget: (widgetUuid: string) => void; // Бывший hide
  removeAllWidgets: () => void; // Бывший remove
  updateAllWidgets: (newWidgets: TWidget[]) => void; // Бывший update
  saveCollection: () => void;

  get getFocusedWidget(): string;
  setFocusedWidget: (uuid: string) => void;
};

export type TWidget = {
  uuid: string;
  position: TPosition;
  size: TSize;
  minSize: TSize;
  image?: string;
  name: string; // (old:window) (indicator / khor ) import / expression-builder
  title: string; // title
  isCreate: boolean; // (old:mode) create
  isSingle: boolean; // (old:space) multi / single
  isHidden: boolean;
  data: {
    [key: string]: any;
    indicatorId: string;
  };
};

export type TWidgetsRepoStoreState = {
  show: boolean;
  className: string;
};

type TPosition = {
  top: number;
  left: number;
};

type TSize = {
  width: number;
  height: number;
};

export type TLeftPanelStore = {
  current: TLeftPanelStoreCurrent;
  open: () => void;
  close: () => void;
  getClassName: () => string;
  getIsOpen: () => boolean;
  getShowLines: () => boolean;
  setLines: (newState: boolean) => void;
};

export type TLeftPanelStoreCurrent = {
  show: boolean;
  className: string;
  showLines: boolean;
};
