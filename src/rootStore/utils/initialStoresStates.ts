import { THint, TLeftPanelStoreCurrent, TWidget } from '@stores/rootStore/utils/types';
import { v4 } from 'uuid';

export const initialLeftPanelCurrent: TLeftPanelStoreCurrent = {
  show: false,
  className: '',
  showLines: false
};

export const initialHint: THint = {
  uuid: v4(),
  type: '',
  open: false,
  name: '',
  size: {
    width: 0,
    height: 0
  },
  position: {
    top: 0,
    left: 0
  },
  body: null
};

export const initialWidget: TWidget = {
  uuid: v4(),
  name: '',
  title: '',
  size: {
    width: 232,
    height: 232
  },
  minSize: {
    width: 232,
    height: 232
  },
  position: {
    top: 20, // ???
    left: Math.floor(Math.random() * 100) // ???
  },
  isCreate: true,
  isSingle: false,
  isHidden: false,
  data: {
    indicatorId: ''
  }
};

export const initialWidgets = [initialWidget];
