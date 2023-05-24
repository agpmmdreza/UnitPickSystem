import styles from "./styles.module.scss";

/**
 * Interface for CountryFlag copomnent props
 */
export interface ICountryFlagProps {
  flag: string;
  name?: string;
}

/**
 * CountryFlag component for showing country flag and name (optional)
 */
function CountryFlag({ flag, name }: ICountryFlagProps) {
  return (
    <div className={styles.flagContainer}>
      <img className={styles.flag} src={flag} alt={name} />
      {name && <span className={styles.text}> {name || "- - -"}</span>}
    </div>
  );
}

export default CountryFlag;
