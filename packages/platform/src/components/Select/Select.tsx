import { ChangeEvent, useCallback } from "react";
import { forwardRef } from "react";

export type TOption = {
  value: string;
  caption: string;
};

interface ISelectProps {
  options: TOption[];
  multiple?: boolean;
  onChange?: (values: string[]) => void;
}

export const Select = forwardRef<HTMLSelectElement | null, ISelectProps>(
  (props, ref) => {
    const { options, multiple, onChange } = props;

    const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
      const options = e.target?.options;

      const result = [];

      if (options) {
        for (const option of options) {
          option.selected && result.push(option.value);
        }
      }

      if (typeof onChange === "function") {
        onChange(result);
      }
    }, []);

    return (
      <select multiple={multiple} ref={ref} onChange={handleChange}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.caption}
          </option>
        ))}
      </select>
    );
  }
);
