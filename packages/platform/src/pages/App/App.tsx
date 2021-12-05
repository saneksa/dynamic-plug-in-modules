import { Expander } from "@saneksa/core/src";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import type { FC } from "react";

const App: FC = observer((props) => {
  console.warn(toJS(Expander.instance.modules));
  console.warn(toJS(Expander.instance.routes));

  return (
    <div>
      Apps
      <div>
        {toJS(Expander.instance.modules).map((m) => (
          <div>{m.name}</div>
        ))}

        <button
          onClick={() => {
            Expander.instance.build(["platform", "module-a"]);
          }}
        >
          Подключить модуль А
        </button>
      </div>
    </div>
  );
});

export { App };
