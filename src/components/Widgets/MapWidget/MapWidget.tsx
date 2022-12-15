import useMap from '@components/Widgets/MapWidget/hooks/useMap';
import * as React from 'react';
import './widgetMap.scss';
import DnDWidgetHead from '@components/Widgets/DnDWidgetHead';
import Hint from '@components/Hint';
import { Icon } from '@components/index';
import { FC, useEffect } from 'react';
import { IMapWidgetProps } from '@components/Widgets/MapWidget/types';
import widgetsStores from '@stores/widgetsStores';
import WidgetMenu from '@components/WidgetMenu';
import { useRootStore } from '@stores/rootStore/hooks/useRootStore';
import { observer } from 'mobx-react-lite';
import rightPanelStore from '@stores/rightPanelStore';

const MapWidget: FC<IMapWidgetProps> = observer(props => {
  const { mapStore } = useRootStore();

  const { widget, uuid } = props;

  const widgetLayers = mapStore.getWidgetLayers(uuid);

  const { mapRef, map } = useMap(widgetLayers, uuid);

  const renderMapSettingsMenu = hintUUID => {
    const sets = {
      hintUUID,
      id: uuid,
      close: () => widgetsStores.close(uuid),
      hide: () => widgetsStores.hide(uuid),
      cb: () => null
    };

    return <WidgetMenu name='MapSettings' sets={sets} />;
  };

  // временный костыль для триигера ресайза окна браузера
  // для ресайза канваса карты
  useEffect(() => {
    const updateLoop = setInterval(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
    return () => clearInterval(updateLoop);
  }, []);

  return (
    <div className='map-widget'>
      <DnDWidgetHead uuid={uuid} visibleTitle title={widget.current.title}>
        <div onClick={() => rightPanelStore.open('MapSettings', widget.current, uuid)}>
          <Icon
            className='row-settings-menu-item-icon'
            icon='icon-action-settings-enabled'
            size='18'
          />
        </div>
        <Hint content={hintUUID => renderMapSettingsMenu(hintUUID)}>
          <Icon icon='icon-action-threedots-enabled' size={18} />
        </Hint>
      </DnDWidgetHead>
      <div className='map-body'>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
});

export default MapWidget;
