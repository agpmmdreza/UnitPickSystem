import clsx from "clsx";
import IconButton from "components/core/iconButton";
import {TrashLinear} from "components/icon";
import {ReactNode} from "react";
import ItemNumberLabel from "./itemNumberLabel";
import classes from "./styles.module.scss";

/**
 * Interface for a column of ListItem shown in "label: value" format
 */
interface IListItemColumn {
  label: string;
  value: string;
}

/**
 * Interface for contents (columns) shown in the ListItem
 */
export interface IListItemContent {
  /** Title of item (first column) */
  title?: string | ReactNode;
  /** Contents as columns after title  */
  columns: IListItemColumn[];
}

/**
 * ListItem component properties
 */
interface IListItemProps {
  /** Row number of item  */
  numberLabel?: number;
  /** Data to be shown in item  */
  data: IListItemContent;
  /** Is item deletable? */
  deletable?: boolean;
  /** Function to be called on deletion of item  */
  onDeleteItem?: () => void;
  /** Icon if there was no number indexing */
  icon?: ReactNode;
}

const ListItem = ({
  numberLabel,
  data,
  deletable = false,
  onDeleteItem,
  icon,
}: IListItemProps) => {
  return (
    <div className={classes.card}>
      {icon ? (
        <span className="pe-3">{icon}</span>
      ) : (
        <ItemNumberLabel numberLabel={numberLabel || 0} />
      )}

      <div className="row w-100">
        {/* <div className="col"></div> */}
        {data.title && (
          <span className={clsx(classes.cardTitle, "col-auto pe-5")}>
            {data.title}
          </span>
        )}

        {data.columns.map((column, idx) => (
          <div
            key={idx}
            className={clsx([
              "col d-flex align-items-center justify-content-center",
              !data.title && idx === 0 && "col-auto justify-content-start pe-5",
            ])}
          >
            <span className={classes.columnLabel}> {column.label} </span>
            <span className={classes.columnValue}> {column.value} </span>
          </div>
        ))}
        {deletable && (
          <div className="col-auto d-flex justify-content-end ms-auto">
            <IconButton
              className={classes.deleteIcon}
              onClick={onDeleteItem}
              variant="text"
              icon={TrashLinear}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListItem;
