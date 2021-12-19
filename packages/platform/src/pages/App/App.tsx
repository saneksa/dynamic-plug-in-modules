import { Expander } from "@saneksa/core/src";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { FC, useCallback, useEffect, useState } from "react";

const App: FC = observer((props) => {
  const [count, setCount] = useState(0);

  console.warn(toJS(Expander.instance.connectedModules));
  console.warn(toJS(Expander.instance.routes));

  useEffect(() => {
    if (count === 1) {
      Expander.instance.build(["platform", "module-a"]);
    } else if (count === 2) {
      Expander.instance.build(["platform", "module-a", "module-b"]);
    } else if (count === 3) {
      Expander.instance.build(["platform", "module-a", "module-b", "module-c"]);
    } else {
      Expander.instance.build(["platform"]);
      setCount(0);
    }
  }, [count]);

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
          }}
        >
          <div>
            <select
              multiple={true}
              onChange={(e) => {
                console.warn(e.target.options, e.target.value);
              }}
            >
              <option value="platform">platform</option>
              <option value="module-a">module-a</option>
              <option value="module-b">module-b</option>
              <option value="module-c">module-c</option>
            </select>
          </div>
          <div>
            <button type="submit">Подключить</button>
          </div>
        </div>
      </div>
    </div>
  );
});

export { App };
