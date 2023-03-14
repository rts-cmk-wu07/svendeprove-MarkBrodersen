import { useState } from "react";

export default function useSelect(options) {
  const [selected, setSelected] = useState("Vælg noget");

  function selectHandler(event) {
    setSelected(event.target.value);
  }

  const select = (
    <select name="hookSelect" onChange={selectHandler}>
      <option selected>vælg noget</option>
      {options.map((item, i) => (
        <option key={i}>{item}</option>
      ))}
    </select>
  );
  return { selected, select };
}
