/* eslint-disable eqeqeq */
import React, {HTMLAttributes, useEffect, useRef, useState} from "react";
import classes from "./styles.module.scss";
import clsx from "clsx";
import {ArrowDownBold} from "components/icon";
import Input from "components/core/input";
import Checkbox from "components/core/checkbox";
import Chip from "components/core/chip";
import {TChipColor} from "interfaces";

export interface IMenuOption {
  key: string;
  value: string;
  color?: TChipColor;
}

export interface ISelectDefaultProps extends HTMLAttributes<HTMLElement> {
  name?: string;
  value?: IMenuOption[];
  onItemSelect: (value: IMenuOption[]) => void;
  className?: string;
  icon?: any; // input head icon , dont pass anything if u dont want icon
  options: IMenuOption[];
  placeholder?: string;
  size: "small" | "normal" | "big";
  disabled?: boolean;
  readOnly?: boolean;
}

// custom multi select input for selecting multiple items at once
const MultiSelect = ({
  name,
  value,
  onItemSelect,
  className,
  icon: Icon,
  options,
  placeholder,
  size,
  disabled,
  readOnly,
  ...rest
}: ISelectDefaultProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  // for innner state
  const [inputText, setInputText] = useState("");
  // for innner state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  // function for opening menu
  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };
  // function for closing when clicked in outside
  const handleClickOutside = (event: any) => {
    if (
      boxRef.current &&
      !boxRef.current.contains(event.target) &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };
  // attach click listener
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // function for handle item click event
  const handleMenuItemClick = (op: IMenuOption) => () => {
    setIsMenuOpen(false);
    if (!!value) {
      let array = [...value];
      if (value.findIndex((x) => x.key == op.key) === -1) {
        // add
        array.push(op);
        onItemSelect(array);
      } else {
        // remove
        array = array.filter((x) => x.key != op.key);
        onItemSelect(array);
      }
    }
  };

  // render component
  return (
    <div
      className={clsx([classes.inputContainer, className, "position-relative"])}
      data-testid="test-multi-select"
      {...rest}
    >
      <div
        data-disabled={!!disabled}
        data-size={size}
        data-testid="test-input"
        ref={boxRef}
        className={classes.chipBox}
        onClick={!!disabled || !!readOnly ? undefined : handleOpenMenu}
      >
        <div className="d-flex align-items-center w-100">
          {!!Icon && <Icon className={classes.inputHeadIcon} />}
          {!!value?.length ? (
            <div className="d-flex flex-wrap  w-100">
              {value.map((x) => {
                return (
                  <Chip
                    text={x.value}
                    color={!!x.color ? x.color : ("gray-light" as TChipColor)}
                    className="mg-1"
                  />
                );
              })}
            </div>
          ) : (
            <span className="text">{placeholder}</span>
          )}
        </div>

        <ArrowDownBold
          className={clsx([
            classes.inputTailIcon,
            isMenuOpen ? classes.rotate : "",
          ])}
        />
      </div>

      <div
        ref={menuRef}
        style={{
          top: boxRef.current?.offsetHeight,
        }}
        className={clsx([classes.menuContainer])}
        data-open={isMenuOpen}
      >
        <Input
          type="search"
          validation="success"
          placeholder="Search Department by name"
          onChange={handleInputChange}
          value={inputText}
        />
        {!!options.filter((x: IMenuOption) => x.value.includes(inputText))
          .length ? (
          options
            .filter((x: IMenuOption) => x.value.includes(inputText))
            .map((op) => {
              return (
                <div
                  data-testid={`test-option-${op.key}`}
                  key={op.key}
                  onClick={handleMenuItemClick(op)}
                  className={clsx([
                    "d-flex align-items-center",
                    classes.menuItem,
                  ])}
                >
                  <Checkbox
                    checked={
                      value?.findIndex(
                        (x) => String(x.key) === String(op.key)
                      ) !== -1
                    }
                    onChange={(v) => {}}
                  />
                  <span className="ms-3">{op.value}</span>
                </div>
              );
            })
        ) : (
          <div className={classes.noOption}>No options</div>
        )}
      </div>
    </div>
  );
};

MultiSelect.defaultProps = {
  onItemSelect: () => {},
  options: [],
  value: [],
  size: "big",
};

export default MultiSelect;
