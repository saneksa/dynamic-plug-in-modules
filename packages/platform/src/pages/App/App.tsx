import { EModuleNames, Expander } from "@saneksa/core/src";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { ChangeEvent, FC, useMemo } from "react";

const App: FC = observer((props) => {
  console.warn(toJS(Expander.instance.connectedModules));

  const moduleNames: EModuleNames[] = useMemo(
    () => [
      EModuleNames.platform,
      EModuleNames.moduleA,
      EModuleNames.moduleB,
      EModuleNames.moduleC,
    ],
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const name = e.target.name as EModuleNames;

    if (checked === true) {
      Expander.instance.connectModules([name]);
    }

    if (checked === false) {
      Expander.instance.disconnectModules([name]);
    }
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
            left: "200px",
          }}
        >
          {moduleNames.map((moduleName) => (
            <div key={moduleName}>
              <input
                name={moduleName}
                type="checkbox"
                onChange={handleChange}
                checked={Expander.instance.connectedModuleNames.has(moduleName)}
              />
              {moduleName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export { App };
