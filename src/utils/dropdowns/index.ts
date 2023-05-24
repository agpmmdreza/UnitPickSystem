import {IMenuOption} from "components/core/autoComplete";

export function getDropdownOption(
  options: IMenuOption[] | undefined,
  name?: string,
  id?: string
) {
  const foundOption = options?.find((item) => {
    if (id) {
      return item.key.toLowerCase() === id.toLowerCase();
    } else if (name) {
      return item.value.toLowerCase() === name.toLowerCase();
    }
    return undefined;
  });

  if (foundOption) {
    return foundOption;
  }
  return { key: "", value: "" };
}

export function getMultiSelectDropdownOptions(
  options: IMenuOption[] | undefined,
  names?: string[],
  ids?: string[]
) {
  const result: IMenuOption[] = [];
  if (options) {
    if (ids) {
      ids.forEach((id) => {
        const foundOption = getDropdownOption(options, undefined, id);
        if (foundOption.key !== "") result.push(foundOption);
      });
    } else if (names) {
      names.forEach((name) => {
        const foundOption = getDropdownOption(options, name, undefined);
        if (foundOption.key !== "") result.push(foundOption);
      });
    }
  }

  return result;
}
