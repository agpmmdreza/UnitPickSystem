import PhoneInput, {ICountryItem, IDefaultProps as IPhoneInputProps,} from "components/core/phoneInput";
import FormBaseElement, {IBaseProps, IFormikFieldProps} from "./base";
import {PhoneBold} from "../icon";

interface IFormPhoneInputProps {
  rootProps?: Partial<IPhoneInputProps>;
  countries: ICountryItem[];
}

// form component for wrapping phone number input component
function FormPhoneInput({
  onChange,
  value,
  countries,
  rootProps,
  ...props
}: IFormPhoneInputProps & IBaseProps & IFormikFieldProps) {
  // render component
  return (
    // phone number input
    // with phone bold icon
    <FormBaseElement {...props}>
      <PhoneInput
        countries={countries}
        value={value}
        onChange={(countryItem, number) => {
          const code = countryItem ? countryItem.code : "";
          onChange({ code: code, number });
        }}
        icon={PhoneBold}
        {...rootProps}
      />
    </FormBaseElement>
  );
}

export default FormPhoneInput;
