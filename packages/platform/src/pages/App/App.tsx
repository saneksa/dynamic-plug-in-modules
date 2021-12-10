import { Expander } from "@saneksa/core/src";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";

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
      setCount(0);
    }
  }, [count]);

  return (
    <div>
      Apps
      <div>
        {toJS(Expander.instance.modules).map((m) => (
          <div>{m.name}</div>
        ))}

        <button
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
          }}
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
        >
          Подключить модуль ({count})
        </button>
      </div>
    </div>
  );
});

export { App };
