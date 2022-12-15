import { useContext } from 'react';
import RootStore from '@stores/rootStore/rootStore';
import { StoreContext } from '@stores/rootStore/storeProvider';

export const useRootStore = (): RootStore => useContext(StoreContext);
