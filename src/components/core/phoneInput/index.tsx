import React, {useEffect, useRef, useState} from "react";
import classes from "./styles.module.scss";
import clsx from "clsx";

export interface ICountryItem {
  flag: any;
  code: string;
  name?: string;
}

export interface IPhoneNumber {
  code: string;
  number: string;
}

export interface IDefaultProps {
  name?: string;
  value: IPhoneNumber;
  onChange: (country: ICountryItem, number: string) => void;
  placeholder?: string;
  icon?: any;
  className?: string;
  size: "small" | "normal" | "big";
  countries: ICountryItem[];
  disabled?: boolean;
  readOnly?: boolean;
}

// function to return country by its code
const findCountryByCode = (
  code: string,
  countries: ICountryItem[]
): ICountryItem => {
  let idx = countries.findIndex((x) => {
    return x.code === code;
  });

  if (idx === -1) return countries[0];
  else return countries[idx];
};
// custom input for phone number
const PhoneInput = ({
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  className,
  size,
  countries,
  disabled,
  readOnly,
}: IDefaultProps) => {
  const [selectedCountry, setSelectedCountry] = useState<ICountryItem>(
    countries?.filter((i) => i.name === "United States")[0]
      ? countries?.filter((i) => i.name === "United States")[0]
      : countries[0]
  );
  // first item of countries array is default selected item
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // function for handling input change event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(selectedCountry, e.target.value?.split(" ").join(""));
  };

  // function to opening and closing menu
  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // function for handle clicking on country items and set selected country to its value
  const handleClickOption = (x: ICountryItem) => () => {
    setSelectedCountry(x);
    onChange(x, value.number);
  };

  // function for closing menu when outside is clicked
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  // attach event handlers
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  // set country if it is in props
  useEffect(() => {
    if (value?.code) {
      if (selectedCountry?.code !== value?.code)
        setSelectedCountry(findCountryByCode(value?.code, countries));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.code]);

  // render component
  return (
    <div
      data-testid="test-phone-box"
      data-size={size}
      className={clsx([classes.inputContainer, className])}
      data-disabled={!!disabled}
    >
      <div
        onClick={!!disabled || !!readOnly ? undefined : handleOpenMenu}
        className={clsx([classes.selectBox, "position-relative"])}
        ref={ref}
        data-testid="test-phone-menu"
      >
        {!!selectedCountry?.flag && (
          <div className={clsx(classes.iconContainer)}>
            <img src={selectedCountry?.flag} alt="flag" width={20} />
          </div>
        )}
        {/* {!countries.length && } */}
        {/* <span className="margin">+</span>  */}
        {!!selectedCountry?.code ? (
          <div className="d-flex">{`${selectedCountry?.code}`}</div>
        ) : (
          "+1"
        )}
        {isMenuOpen && (
          <div
            id="menu"
            className={clsx([
              classes.menuStyle,
              "position-absolute w-100  d-flex  flex-column",
            ])}
            onKeyDown={(e) => console.log(e)}
          >
            {countries.map((x, i) => {
              return (
                <div
                  className={clsx(["d-flex gap-2 px-2", classes.menuItem])}
                  onClick={handleClickOption(x)}
                  data-testid={`test-phone-country-${x.code}`}
                  key={i}
                >
                  {!!x.flag && <img src={x.flag} alt="flag" width={18} />}
                  {x.name && <span style={{ fontSize: 14 }}>{x.name}</span>}
                  <span style={{ fontSize: 14 }}>({x.code})</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className={clsx(classes.sep)}>
        <div className={clsx(classes.inside)}></div>
      </div>
      <div className={classes.inputBox} data-validation="none">
        {!!Icon && <Icon className={classes.inputHeadIcon} />}

        <input
          name={name}
          value={value?.number
            ?.replace(/[a-zA-Z\s]/g, "")
            ?.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
          className={classes.input}
          placeholder={placeholder}
          onChange={handleInputChange}
          data-testid="test-phone-input"
          disabled={!!disabled}
          readOnly={!!readOnly}
        />
      </div>
    </div>
  );
};

PhoneInput.defaultProps = {
  icon: undefined,
  onChange: () => {},
  size: "big",
  countries: [],
  value: { code: "", number: "" },
};

export default PhoneInput;
