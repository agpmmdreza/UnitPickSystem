import {useState} from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";

export const PhoneNumberCell = ({ value }: { value: string | null }) => {
  const [selected, setSelected] = useState(false);

  return (
    <span
      className={clsx(classes.phone, selected && classes.phoneSelected)}
      onClick={() => setSelected((p) => !p)}
    >
      {value || "- - -"}
    </span>
  );
};
