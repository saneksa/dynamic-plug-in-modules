import { EModuleNames, Expander } from "@saneksa/core/src";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import type { ChangeEvent, FC } from "react";

const App: FC = observer(() => {
  console.warn(toJS(Expander.instance.connectedModules));

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
          {Expander.instance.modules.map((module) => (
            <div key={module.name}>
              <input
                name={module.name}
                type="checkbox"
                onChange={handleChange}
                checked={Expander.instance.connectedModuleNames.has(
                  module.name
                )}
              />
              {module.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export { App };
