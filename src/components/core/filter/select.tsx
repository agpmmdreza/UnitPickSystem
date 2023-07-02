import { useState } from "react";
import { IFilter, IFilterOption, IFilterValue } from ".";
import classes from "./styles.module.scss";
import clsx from "clsx";
import FilterCheckbox from "../filterCheckbox";
import AutoComplete, { IMenuOption } from "../autoComplete";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

interface IFilterSelectProps {
  content: IFilter;
  value: IFilterValue[];
  number: number;
  onFilterSelect?: (filters: IFilterValue[]) => void;
  options: IFilter[];
}

function isCostRangeValid(costFrom: string, costTo: string) {
  const from = Number(costFrom);
  const to = Number(costTo);
  if (to < from) {
    return false;
  }
  return true;
}

// items for filter component
const FilterSelect = ({
  content,
  value,
  number,
  onFilterSelect,
  options,
}: IFilterSelectProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [from, setFrom] = useState(new Date(Date.now()));
  const [to, setTo] = useState(new Date(Date.now()));
  const [costFromValue, setCostFromValue] = useState("");
  const [costToValue, setCostToValue] = useState("");
  const [dropdown, setDropdown] = useState<IMenuOption>({ key: "", value: "" });

  // handle toggling menu
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // function for handle selecting filter options
  const handleClickFilterOption =
    (f: IFilterOption, isAdding: boolean) => () => {
      if (!!onFilterSelect) {
        // add
        if (isAdding) {
          let cloneValues = [...value];
          if (f.variant === "dropdown") {
            cloneValues[number].filters.push({
              value: f.value,
              key: f.key,
              dropdown: dropdown,
            });
          } else if (f.variant === "cost") {
            cloneValues[number].filters.push({
              value: f.value,
              key: f.key,
              costFrom: costFromValue,
              costTo: costToValue,
            });
          } else if (f.variant === "timespan") {
            cloneValues[number].filters.push({
              value: f.value,
              key: f.key,
              to: to,
              from: from,
            });
          } else {
            cloneValues[number].filters.push({ value: f.value, key: f.key });
          }
          onFilterSelect(cloneValues);
          // remove
        } else {
          let cloneValues = [...value];
          cloneValues[number].filters = cloneValues[number].filters.filter(
            (x) => x.value !== f.value
          );
          onFilterSelect(cloneValues);
        }
      }
    };

  function handleCostSpanUpdate(f: IFilterOption, from: string, to: string) {
    const isValid = isCostRangeValid(from, to);
    // console.log("from: ", from, " to: ", to, " result: ", isValid);

    if (isValid) {
      let cloneValues = [...value];
      cloneValues[number].filters = [
        ...cloneValues[number].filters.map((m) => {
          if (m.key === f.key) {
            return { key: m.key, value: m.value, costFrom: from, costTo: to };
          }
          return m;
        }),
      ];
      if (onFilterSelect) {
        onFilterSelect(cloneValues);
      }
    }
  }

  const handleTimeSpanUpdate = (f: IFilterOption, from: Date, to: Date) => {
    let cloneValues = [...value];
    cloneValues[number].filters = [
      ...cloneValues[number].filters.map((m) => {
        if (m.key === f.key) {
          return { key: m.key, value: m.value, from: from, to: to };
        }
        return m;
      }),
    ];
    if (onFilterSelect) {
      onFilterSelect(cloneValues);
    }
  };
  const handleDropdownUpdate = (
    f: IFilterOption,
    dropdownValue: IMenuOption
  ) => {
    let cloneValues = [...value];
    cloneValues[number].filters = [
      ...cloneValues[number].filters.map((m) => {
        if (m.key === f.key) {
          return { key: m.key, value: m.value, dropdown: dropdownValue };
        }
        return m;
      }),
    ];
    if (onFilterSelect) {
      onFilterSelect(cloneValues);
    }
  };
  // function for selecting all options

  // render component
  return (
    <div className={classes.filterSelectBox}>
      <div
        data-testid={`test-filter-select-${number}`}
        onClick={handleToggleMenu}
        className={classes.filterSelectBtn}
      >
        <span className={classes.optionTitle}>{content.title}</span>
        <ArrowSmallRightIcon
          className={clsx([
            classes.inputTailIcon,
            isMenuOpen ? classes.rotate : "",
          ])}
        />
      </div>
      {isMenuOpen && (
        <div className={classes.filtersList}>
          {/* <div
            onClick={SelectAllOptions}
            className={classes.filterSelectOption}
          >
            {" "}
            <FilterCheckbox
              checked={
                options[number].filters.length === value[number].filters.length
              }
            />
            <span className="op">All</span>
          </div> */}

          {content.filters.map((f, idx) => {
            if (f.variant === "dropdown") {
              return (
                <div key={idx} className={classes.childOption}>
                  <div
                    onClick={handleClickFilterOption(
                      f,
                      !value[number].filters
                        .map((x) => x.value)
                        .includes(f.value)
                    )}
                    className={classes.filterSelectOption}
                    data-testid={`test-filter-option-${f.key}`}
                  >
                    {" "}
                    <FilterCheckbox
                      checked={value[number].filters
                        .map((x) => x.value)
                        .includes(f.value)}
                    />
                    <span className="op">{f.value}</span>
                  </div>
                  <div className={classes.child}>
                    <label htmlFor={`dropdown${idx}`}>{f.dropdownLabel}</label>
                    <AutoComplete
                      name={`dropdown${idx}`}
                      disabled={
                        !value[number].filters
                          .map((x) => x.value)
                          .includes(f.value) || f.dropdownProps?.disabled
                      }
                      value={dropdown}
                      onChange={(v) => {
                        setDropdown(v);
                        handleDropdownUpdate(f, v);
                      }}
                      {...f.dropdownProps}
                    />
                  </div>
                </div>
              );
            } else if (f.variant === "timespan") {
              return (
                <div key={idx} className={classes.childOption}>
                  <div
                    onClick={handleClickFilterOption(
                      f,
                      !value[number].filters
                        .map((x) => x.value)
                        .includes(f.value)
                    )}
                    className={classes.filterSelectOption}
                    data-testid={`test-filter-option-${f.key}`}
                  >
                    {" "}
                    <FilterCheckbox
                      checked={value[number].filters
                        .map((x) => x.value)
                        .includes(f.value)}
                    />
                    <span className="op">{f.value}</span>
                  </div>
                  <div className={classes.child}></div>
                </div>
              );
            }
            if (!f.child) {
              return (
                <div
                  key={idx}
                  onClick={handleClickFilterOption(
                    f,
                    !value[number].filters.map((x) => x.value).includes(f.value)
                  )}
                  className={classes.filterSelectOption}
                  data-testid={`test-filter-option-${f.key}`}
                >
                  {" "}
                  <FilterCheckbox
                    checked={value[number].filters
                      .map((x) => x.value)
                      .includes(f.value)}
                  />
                  <span className="op">{f.value}</span>
                </div>
              );
            } else {
              return (
                <div key={idx} className={classes.childOption}>
                  <div
                    onClick={handleClickFilterOption(
                      f,
                      !value[number].filters
                        .map((x) => x.value)
                        .includes(f.value)
                    )}
                    className={classes.filterSelectOption}
                    data-testid={`test-filter-option-${f.key}`}
                  >
                    {" "}
                    <FilterCheckbox
                      checked={value[number].filters
                        .map((x) => x.value)
                        .includes(f.value)}
                    />
                    <span className="op">{f.value}</span>
                  </div>
                  <div className={classes.child}>{f.child}</div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default FilterSelect;
