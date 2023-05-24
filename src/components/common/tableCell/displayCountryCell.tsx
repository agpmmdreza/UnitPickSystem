import {memo, useMemo} from "react";
import countries from "../../../constants/countries.json";
import classes from "./styles.module.scss";

//? cell that displays the flag of country

const findCountryByName = (name: string): { name: string; flag: string } => {
  let idx = countries.findIndex((x) => {
    return x.name === name;
  });

  if (idx === -1) return countries[0];
  else return countries[idx];
};

function DisplayCountryCell({ value }: { value: string }) {
  let flagSrc = useMemo(() => {
    return findCountryByName(value).flag;
  }, [value]);

  return (
    <div className="w-100 d-flex flex-row justify-content-center align-items-center">
      {flagSrc && (
        <img src={flagSrc} alt={value} className={classes.countryCell__flag} />
      )}
      <span className={classes.countryCell__title}>{value}</span>
    </div>
  );
}
export default memo(DisplayCountryCell);
