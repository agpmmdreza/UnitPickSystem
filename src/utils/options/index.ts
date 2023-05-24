import {useRobotTypesOptions} from "../../hooks/useRobotTypesOptions";
import {useHFTypesOptions} from "../../hooks/useHFTypesOptions";
import {NOSHOW_TYPES, TRANSACTIONS_TYPES,} from "../../constants/autocompleteOptions";
import {useDeviceTypesOptions} from "../../hooks/useDeviceTypesOptions";
import useFilterOptions from "../../hooks/useFilterOptions";
import {getRelationshipTypes} from "../../api/dropdown";
import {useVisitTypeOptions} from "../../hooks/dropdownOptions/useVisitTypeOptions";
import useRobotLevelOptions from "../../hooks/dropdownOptions/useRobotLevelOptions";

const APPOINTMENT_TYPES = [
  { key: "local", value: "Local" },
  { key: "international", value: "International" },
];

const DOCTOR_TYPES = [
  { key: "local", value: "Local" },
  { key: "international", value: "International" },
];

const APPOINTMENT_STATUS = [
  { key: "pending", value: "Pending" },
  { key: "checked_in", value: "Checked In" },
  { key: "completed", value: "Completed" },
  { key: "canceled", value: "Canceled" },
];

const GENDER = [
  { key: "male", value: "male" },
  { key: "female", value: "female" },
  { key: "others", value: "others" },
];

const USER_STATUS = [
  {
    key: "active",
    value: "active",
  },
  {
    key: "pending",
    value: "pending",
  },
  {
    key: "denied",
    value: "denied",
  },
];

const ROLES = [
  { key: "doctor", value: "doctor" },
  { key: "staff", value: "staff" },
  { key: "local-admin", value: "local-admin" },
  { key: "super-admin", value: "super-admin" },
  { key: "patient", value: "patient" },
  { key: "cmo", value: "cmo" },
];

export const useAppointmentTypesOption = () => {
  return {
    title: "Appointment Type",
    filters: APPOINTMENT_TYPES,
  };
};

export const useAppointmentStatusOption = () => {
  return {
    title: "Status",
    filters: APPOINTMENT_STATUS,
  };
};

export const useRobotTypeFilterOption = () => {
  const { OPTIONS } = useRobotTypesOptions();

  return {
    title: "Robot Type",
    filters: OPTIONS ? OPTIONS : [],
  };
};

export const useHFTypeFilterOption = () => {
  const { OPTIONS } = useHFTypesOptions();

  return {
    title: "HF Type",
    filters: OPTIONS ? OPTIONS : [],
  };
};

export const useUserStatusOption = () => {
  return {
    title: "Status",
    filters: USER_STATUS,
  };
};

export const useGenderFilterOption = () => {
  return {
    title: "Gender",
    filters: GENDER,
  };
};

export const useDoctorTypesFilterOption = () => {
  return {
    title: "Doctor Type",
    filters: DOCTOR_TYPES,
  };
};

/*export const useFacilityParentFilterOption = ()=>{
  const { OPTIONS } = useFacilityParentsOptions();

  return {
    title: "HF Type",
    filters: OPTIONS ? OPTIONS : [],
  };
}*/

export const useDeviceTypeFilterOption = () => {
  const { OPTIONS } = useDeviceTypesOptions();

  return {
    title: "Medical Device Type",
    filters: OPTIONS ? OPTIONS : [],
  };
};

export const useRolesFilterOption = () => {
  return {
    title: "Role",
    filters: ROLES,
  };
};

export const useTimespanFilterOption = () => {
  return {
    title: "Timespan",
    filters: [
      {
        key: "custom",
        value: "Custom",
        variant: "timespan",
      },
    ],
  };
};

export const useRelationshipFilterOption = () => {
  const relationshipOptions = useFilterOptions(getRelationshipTypes);

  return {
    title: "Relationship",
    filters: relationshipOptions || [],
  };
};

export const useAllRelationshipFilterOption = () => {
  const relationshipOptions = useFilterOptions(getRelationshipTypes);

  return {
    title: "Relationship",
    filters: relationshipOptions
      ? [...relationshipOptions, { key: "my_self", value: "My Self" }]
      : [],
  };
};

export const useTransactionTypesFilterOption = () => {
  return {
    title: "Transaction Type",
    filters: TRANSACTIONS_TYPES,
  };
};

export const useVisitTypeFilterOptions = () => {
  const { OPTIONS } = useVisitTypeOptions();

  return {
    title: "Visit Type",
    filters: OPTIONS || [],
  };
};

export const useRobotLevelFilterOption = () => {
  const { OPTIONS: ROBOT_LEVEL_OPTIONS } = useRobotLevelOptions();

  return {
    title: "Robot Level",
    filters: ROBOT_LEVEL_OPTIONS ? ROBOT_LEVEL_OPTIONS : [],
  };
};

export const useNoShowFilterOption = () => {
  return {
    title: "NoShow Causes",
    filters: NOSHOW_TYPES,
  };
};
