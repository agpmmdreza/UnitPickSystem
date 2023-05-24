import {HTMLAttributes, ReactNode} from "react";
import classes from "./styles.module.scss";
import clsx from "clsx";
import {FilterLinear} from "components/icon";
import useOutsideDetect from "hooks/useOutsideDetect";
import Select from "./select";
import {IDefaultProps, IMenuOption} from "../autoComplete";
import {useHistory} from "react-router";

type omittedProps = "value" | "onChange" | "name";
type IDropdownProps = Omit<IDefaultProps, omittedProps>;

export interface IFilterOption {
  key: string;
  value: string;
  variant?: "basic" | "timespan" | "cost" | "dropdown";
  child?: ReactNode;
  dropdownProps?: IDropdownProps;
  dropdownLabel?: string;
}

export interface IFilter {
  title: string;
  filters: IFilterOption[];
}

export interface IFilterValue {
  title: string;
  filters: IFilterValueOption[];
}

export interface IFilterValueOption {
  key: string;
  value: string;
  to?: Date;
  from?: Date;
  costFrom?: string;
  costTo?: string;
  dropdown?: IMenuOption;
}

export interface IFilterDefaultProps extends HTMLAttributes<any> {
  options: IFilter[];
  value: IFilterValue[];
  color?: "transparent" | "white";
  className?: string;
  onFilterSelect?: (filters: IFilter[]) => void;
  setToUrl?: boolean; // if you want to set the filters to url param and memorizing your last choices, set it to true and use `useFilter` hook to handle it in your tables
}

// filter button component
const Filter = ({
  options,
  value,
  color,
  className,
  onFilterSelect,
  setToUrl,
  ...rest
}: IFilterDefaultProps) => {
  const history = useHistory();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useOutsideDetect(false);
  // function for handling opening and closing toggle menu
  const handleToggleMenu = () => {
    setIsComponentVisible(!isComponentVisible);
  };
  // function for closing toggle menu
  // const handleClose = () => {
  //   setIsComponentVisible(false);
  // };
  // function for clearing filter
  const handleClearFilter = () => {
    if (!!onFilterSelect) {
      let cloneValues = [...value];

      cloneValues.forEach((x) => {
        x.filters.length = 0;
      });

      onFilterSelect(cloneValues);
      if (setToUrl) {
        const params = new URLSearchParams();
        params.delete("filters");
        history.replace({ search: params.toString() });
      }
    }
  };
  // render filter options
  const getFilterOptions = () => {
    const filterSelectHandle = (f: IFilter[]) => {
      if (setToUrl) {
        const params = new URLSearchParams(history.location.search);
        // params.delete("filters");
        params.set("filters", encodeURIComponent(JSON.stringify(f)));
        // console.log(params.toString());

        history.replace({ search: params.toString() });
      }
      onFilterSelect?.(f);
    };
    return (
      <>
        {options.map((x, number) => {
          return (
            <Select
              key={`${x.title}-${number}`}
              content={x}
              value={
                value.length !== 0
                  ? value
                  : options.map((item) => {
                      return { title: item.title, filters: [] };
                    })
              }
              onFilterSelect={filterSelectHandle}
              {...{ number, options, setToUrl }}
            />
          );
        })}
      </>
    );
  };
  // render component
  return (
    <div
      data-testid="test-filter"
      ref={ref}
      className={clsx([classes.container, className])}
      {...rest}
    >
      <div
        data-testid="test-button"
        data-color={color}
        className={classes.filterBtn}
        onClick={handleToggleMenu}
      >
        <FilterLinear className={classes.icon} />
        Filter
      </div>

      <div
        data-testid="test-filter-menu"
        className={classes.menuContainer}
        data-open={isComponentVisible}
      >
        <div className={clsx(classes.inside)}>
          <div className={clsx([classes.menuTitle])}>
            <span className="title">Filters</span>

            <div className={classes.tools}>
              <span onClick={handleClearFilter}>ClearAll</span>
              {/* <span className="mx-1">-</span> */}
              {/* <span onClick={handleClose}>save view</span> */}
            </div>
          </div>
          {/* <div className={classes.divider} /> */}
          {getFilterOptions()}
        </div>
      </div>
    </div>
  );
};

Filter.defaultProps = {
  color: "transparent",
  onFilterSelect: () => {},
  variant: "basic",
};

export default Filter;
