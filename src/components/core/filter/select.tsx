import {useState} from "react";
import {IFilter, IFilterOption, IFilterValue} from ".";
import classes from "./styles.module.scss";
import clsx from "clsx";
import {AmountBold, ArrowRightLinear} from "components/icon";
import FilterCheckbox from "../filterCheckbox";
import TimespanFilter from "../timespanFilter";
import AmountInput from "../amountInput";
import {convertToString} from "utils/form";
import Button from "../button";
import AutoComplete, {IMenuOption} from "../autoComplete";

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
  const SelectAllOptions = () => {
    options[number].filters.forEach((f) => {
      if (
        !value[number].filters.map((x) => x.value).includes(f.value) &&
        !!onFilterSelect
      ) {
        const cloneValues = [...value];
        cloneValues[number].filters.push(f);
        onFilterSelect(cloneValues);
      }
    });
  };
  // render component
  return (
    <div className={classes.filterSelectBox}>
      <div
        data-testid={`test-filter-select-${number}`}
        onClick={handleToggleMenu}
        className={classes.filterSelectBtn}
      >
        <span className={classes.optionTitle}>{content.title}</span>
        <ArrowRightLinear
          className={clsx([
            classes.inputTailIcon,
            isMenuOpen ? classes.rotate : "",
          ])}
        />
      </div>
      {isMenuOpen && (
        <div className={classes.filtersList}>
          <div
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
          </div>

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
            } else if (f.variant === "cost") {
              const selectedFrom = value[number].filters[0]
                ? convertToString(value[number].filters[0].costFrom)
                : "0";
              const selectedTo = value[number].filters[0]
                ? convertToString(value[number].filters[0].costTo)
                : "0";
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
                    <div key={idx} className={classes.cost}>
                      <label htmlFor="costFrom">From</label>
                      <AmountInput
                        icon={AmountBold}
                        type={"USD"}
                        placeholder={"From"}
                        className="mt-1"
                        name="costFrom"
                        value={costFromValue}
                        onChange={(event) => {
                          setCostFromValue(event.target.value);
                          // handleCostSpanUpdate(
                          //   f,
                          //   event.target.value,
                          //   costToValue
                          // );
                        }}
                        disabled={
                          !value[number].filters
                            .map((x) => x.value)
                            .includes(f.value)
                        }
                      />
                      <label htmlFor="costTo" className="mt-2">
                        To
                      </label>
                      <AmountInput
                        icon={AmountBold}
                        type={"USD"}
                        placeholder={"To"}
                        className="mt-1"
                        name="costTo"
                        value={costToValue}
                        onChange={(event) => {
                          setCostToValue(event.target.value);
                          // handleCostSpanUpdate(
                          //   f,
                          //   costFromValue,
                          //   event.target.value
                          // );
                        }}
                        disabled={
                          !value[number].filters
                            .map((x) => x.value)
                            .includes(f.value)
                        }
                        // onBlur={() => {
                        //   // because if the the cost range is not valid then the filter value will not updated, so we have to update the input value to last valid value
                        //   const cloneValues = [...value];
                        //   if (
                        //     cloneValues[number].filters.length > 0 && [
                        //       "costTo" in cloneValues[number].filters[0],
                        //     ]
                        //   ) {
                        //     setCostToValue(
                        //       convertToString(
                        //         cloneValues[number].filters[0].costTo
                        //       )
                        //     );
                        //   }
                        // }}
                      />
                      {!isCostRangeValid(costFromValue, costToValue) && (
                        <span className={classes.cost__invalid}>
                          Invalid cost range!
                        </span>
                      )}
                      <Button
                        className="mt-3"
                        size="small"
                        variant={"outlined"}
                        disabled={!isCostRangeValid(costFromValue, costToValue)}
                        onClick={() =>
                          handleCostSpanUpdate(f, costFromValue, costToValue)
                        }
                      >
                        OK
                      </Button>
                      <span
                        className={classes.cost__selectedRange}
                      >{`Your selected range is: ${Number(
                        selectedFrom
                      )}$ to ${Number(selectedTo)}$`}</span>
                    </div>
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
                  <div className={classes.child}>
                    <TimespanFilter
                      disabled={
                        !value[number].filters
                          .map((x) => x.value)
                          .includes(f.value)
                      }
                      from={from}
                      to={to}
                      setFrom={(i) => {
                        handleTimeSpanUpdate(f, i, to);
                        setFrom(i);
                      }}
                      setTo={(t) => {
                        handleTimeSpanUpdate(f, from, t);
                        setTo(t);
                      }}
                    />
                  </div>
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
