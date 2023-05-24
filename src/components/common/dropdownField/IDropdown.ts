import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {FormikProps} from "formik";

export interface IDropdown<T> {
  formik: FormikProps<T>;
  fieldName: keyof T & string; // the field name of this dropdown that u use in formik field.
  rootProps?: Partial<IAutoCompleteProps>;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
  icon?: any;
  id?: string; // for auto selecting the option in editing or viewing mode.
  // that is the id of the field which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'key' === 'id'
  name?: string; // for auto selecting the option in editing or viewing mode.
  // that is the name of the field which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'value' === 'name'
}
