import { EModuleNames } from "@saneksa/core/src/const";
import { observer } from "mobx-react";
import type { ChangeEvent, FC } from "react";

const App: FC = observer(() => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const name = e.target.name as EModuleNames;

    if (checked === true) {
      window.modules.connectModules([name]);
    }

    if (checked === false) {
      window.modules.disconnectModules([name]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        columnGap: "100px",
      }}
    >
      <div>
        <div>Apps</div>

        {window.modules.connectedModules.map((m) => (
          <div key={m.name}>{m.name}</div>
        ))}
      </div>

      <div>
        {window.modules.modules.map((module) => (
          <div key={module.name}>
            <input
              name={module.name}
              type="checkbox"
              onChange={handleChange}
              checked={window.modules.connectedModuleNames.has(module.name)}
            />
            {module.name}
          </div>
        ))}
      </div>

      <div>
        <button onClick={window.modules.destroy}>Destroy</button>
      </div>
    </div>
  );
});

export { App };
