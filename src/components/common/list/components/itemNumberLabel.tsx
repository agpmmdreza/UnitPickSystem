import classes from "./styles.module.scss";

/**
 * ItemNumberLabel component properties
 */
interface IItemNumberLabelProps {
  numberLabel: number;
}

/**
 * This component shows row number (index) of item
 */
const ItemNumberLabel = ({ numberLabel }: IItemNumberLabelProps) => {
  return (
    <div className={classes.numberContainer}>
      <span className={classes.numberLabel}>{numberLabel}</span>
    </div>
  );
};

export default ItemNumberLabel;
