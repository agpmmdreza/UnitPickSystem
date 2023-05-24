import {IResponse} from "api";
import {IMenuOption} from "components/core/autoComplete";
import {IFormikFieldProps} from "components/form/base";
import {FormikHelpers, FormikProps} from "formik";
import {MutateOptions} from "react-query";
import {IPhoneNumber, ITime, TRange} from "interfaces";
import {notify} from "../../components/core/toast";

export function getFormikFieldProps<T extends { [key: string]: any }>(
  name: string,
  label: string,
  formik: FormikProps<T>
): IFormikFieldProps {
  return {
    nameId: name,
    label,
    onChange: (value: any) => formik.setFieldValue(name, value),
    // value: formik.values[name],
    value: getInnerValue(name, formik.values),
    error: formik.errors[name],
  };
}
// function that return inner value
function getInnerValue(name: string, object: object): any {
  if (Object.keys(object).length === 0) {
    return undefined;
  }
  // console.log("object: ", object);
  let extractedValue = object;
  const nameArray = name.split(".");
  if (!object.hasOwnProperty(nameArray[0])) {
    return undefined;
  }
  nameArray.forEach((element) => {
    if (extractedValue) {
      extractedValue = extractedValue[element as keyof typeof object];
    }
  });
  return extractedValue;
}
// function that generate required message for form input
export function generateRequiredMessage(name: string): string {
  return `Please enter the ${name}`;
}

// function for submitting
export function submitEntity<T, V, U extends { [key: string]: any }>(
  isLoading: boolean,
  mutate: (
    variables: T,
    options?: MutateOptions<IResponse<V>, unknown, T, unknown> | undefined
  ) => void,
  mapped_values: T,
  actions?: FormikHelpers<U>,
  actionsOnSuccess?: (data?: IResponse<V>) => void
) {
  if (!isLoading) {
    mutate(mapped_values, {
      onSuccess: (data) => {
        console.log("response data: ", data.data.data);

        notify.success(data.data.message || "");
        actions?.resetForm();
        if (actionsOnSuccess) {
          actionsOnSuccess(data);
        }
      },
    });
  }
}

// function that manage update
export function updateEntity<T, V>(
  updateIsLoading: boolean,
  updateMutate: (
    variables: T,
    options?: MutateOptions<IResponse<V>, unknown, T, unknown> | undefined
  ) => void,
  mapped_values: T,
  actionsOnSuccess?: () => void
) {
  if (!updateIsLoading) {
    updateMutate(mapped_values, {
      onSuccess: (data) => {
        notify.success(data.data.message || "");
        if (actionsOnSuccess) {
          actionsOnSuccess();
        }
      },
    });
  }
}

// function that return index of duplicate option
export function getDuplicateIndex(array: IMenuOption[], object: IMenuOption) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element.key === object.key && element.value === object.value) {
      return index;
    }
  }
  return -1;
}

export function encodeTime(time: ITime) {
  // change the time to the format that the API wants

  const minute = convertToTwoDigits(time.minute);
  if (time.period === "PM") {
    const hour = convertToTwoDigits(time.hour + 12);
    return `${hour}:${minute}`;
  }
  return `${convertToTwoDigits(time.hour)}:${minute}`;
}
export function convertToTwoDigits(num: number): string {
  return ("00" + num).slice(-2);
}
export function decodeTime(time: string): ITime {
  // change the time to the format of ITime

  const splitted_time = time.split(":");
  if (Number(splitted_time[0]) >= 12) {
    return {
      hour: (Number(splitted_time[0]) - 12) as TRange<0, 12>,
      minute: Number(splitted_time[1]) as TRange<0, 60>,
      period: "PM",
    };
  }
  return {
    hour: Number(splitted_time[0]) as TRange<0, 12>,
    minute: Number(splitted_time[1]) as TRange<0, 60>,
    period: "AM",
  };
}

export function encodePhone(phone: IPhoneNumber | undefined) {
  // change the phone number to the format that the API wants

  if (!phone || !phone.code || !phone.number) return "";

  return `${phone.code}-${phone.number}`;
}

export function decodePhone(phone: string | null): IPhoneNumber {
  // change the time to the format of IPhoneNumber
  if (phone === null) {
    return { code: "", number: "" };
  }
  // const number = phone.replace(/[-. ()]/g, "").slice(-10);
  const phoneNum = phone.split("-");
  return { code: phoneNum[0], number: phoneNum[1] };
}
// convert postal code to what api wants
export function decodePostalCode(code: string) {
  return code.replace(/[-. ()]/g, "");
}

/**
 * convert the received languages to IAssignedLanguages type
 * @param languages
 */

/**
 * To avoid of null exception in reading data of property of null, use this function.
 * This function accept null and undefined value and return the right string.
 * @param value string
 * @returns string
 */
export function convertToString(value: string | number | undefined | null) {
  if (value === undefined || value === null) {
    return "";
  }
  return value + "";
}
