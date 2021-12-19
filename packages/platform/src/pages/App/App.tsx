import { Expander } from "@saneksa/core/src";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import {
  Select,
  TOption,
} from "@saneksa/platform/src/components/Select/Select";
import { FC, useMemo, useRef, useState } from "react";

const App: FC = observer((props) => {
  console.warn(toJS(Expander.instance.routes));

  const options = useMemo(
    () =>
      [
        {
          caption: "platform",
          value: "platform",
        },
        {
          caption: "module-a",
          value: "module-a",
        },
        {
          caption: "module-b",
          value: "module-b",
        },
        {
          caption: "module-c",
          value: "module-c",
        },
      ] as TOption[],
    []
  );

  const handleConnect = (moduleNames: string[]) => {
    Expander.instance.connectModules(moduleNames);
  };

  const handleDisconnect = (moduleNames: string[]) => {
    Expander.instance.disconnectModules(moduleNames);
  };

  return (
    <div>
      Apps
      <div>
        {Expander.instance.connectedModules.map((m) => (
          <div key={m.name}>{m.name}</div>
        ))}

        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              marginRight: "24px",
            }}
          >
            <div>Список подключения модулей</div>

            <Select
              multiple={true}
              options={options}
              onChange={handleConnect}
            />
          </div>

          <div>
            <div>Список отключения модулей</div>

            <Select
              multiple={true}
              options={options}
              onChange={handleDisconnect}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export { App };
