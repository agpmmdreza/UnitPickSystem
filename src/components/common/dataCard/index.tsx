import clsx from "clsx";
import Avatar from "components/core/avatar";
// import Button from "components/core/button/index";
import classes from "./styles.module.scss";
// import { CanceledLinear, Finished, Timer } from "components/icon";
// import { ReactComponent as EditIcon } from "assets/icons/linear/edit-linear.svg";
import BasicTable from "components/core/basicTable";
import {ReactNode} from "react";
import CountryFlag from "../countryFlag";
import {RobotTypeChip} from "../tableCell";

//? Returns required columns for table
const APPOINTMENT_COLUMNS = [
  {
    Header: "Appt ID",
    accessor: "appt_id",
  },
  {
    Header: "Appt Type",
    accessor: "appt_type",
  },
  {
    Header: "Appt Date",
    accessor: "appt_date",
  },
  {
    Header: "Appt Time",
    accessor: "appt_time",
  },
  {
    Header: "Robot ID",
    accessor: "robot_id",
  },
  {
    Header: "Robot Type",
    accessor: "robot_name",
    Cell: RobotTypeChip,
  },
  {
    Header: "Patient ID",
    accessor: "patient_id",
  },
  {
    Header: "Patient Name",
    accessor: "patient_name",
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
];

const DOCTOR_APPT_COLUMNS = [
  {
    Header: "Appt ID",
    accessor: "appt_id",
  },
  {
    Header: "Appt Type",
    accessor: "appt_type",
  },
  {
    Header: "Appt Date",
    accessor: "appt_date",
  },
  {
    Header: "Appt Time",
    accessor: "appt_time",
  },
  {
    Header: "Robot ID",
    accessor: "robot_id",
  },
  {
    Header: "Robot Type",
    accessor: "robot_type",
    Cell: RobotTypeChip,
  },
  {
    Header: "Robot Name",
    accessor: "robot_name",
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
];

const DOCTOR_APPOINTMENT_COLUMNS = [
  {
    Header: "Appt ID",
    accessor: "appt_id",
  },
  {
    Header: "Appt Type",
    accessor: "appt_type",
  },
  {
    Header: "Appt Date",
    accessor: "appt_date",
  },
  {
    Header: "Appt Time",
    accessor: "appt_time",
  },
  {
    Header: "Patient ID",
    accessor: "patient_id",
  },
  {
    Header: "Patient Name",
    accessor: "patient_name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Robot ID",
    accessor: "robot_id",
  },
  {
    Header: "Robot Type",
    accessor: "robot_type",
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
];
const PATIENT_APPOINTMENT_COLUMNS = [
  {
    Header: "Appt ID",
    accessor: "appt_id",
  },
  {
    Header: "Appt Type",
    accessor: "appt_type",
  },
  {
    Header: "Visit Type",
    accessor: "visit_type",
  },
  {
    Header: "Appt Date",
    accessor: "appt_date",
  },
  {
    Header: "Appt Time",
    accessor: "appt_time",
  },
  {
    Header: "Robot ID",
    accessor: "robot_id",
  },
  {
    Header: "Robot Type",
    accessor: "robot_type",
    Cell: RobotTypeChip,
  },
  {
    Header: "Robot Name",
    accessor: "robot_name",
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
];

const DOCTOR_SUMMARY_COLUMNS = [
  {
    Header: "Appt ID",
    accessor: "appt_id",
  },
  {
    Header: "Appt Type",
    accessor: "appt_type",
  },
  {
    Header: "Appt Date",
    accessor: "appt_date",
  },
  {
    Header: "Appt Time",
    accessor: "appt_time",
  },
  {
    Header: "Patient ID",
    accessor: "patient_id",
  },
  {
    Header: "Patient Name",
    accessor: "patient_name",
  },
  {
    Header: "DOB",
    accessor: "birth",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Robot ID",
    accessor: "robot_id",
  },
  {
    Header: "Robot Type",
    accessor: "robot_type",
    Cell: RobotTypeChip,
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
];

const STORING_RESULTS_COLUMNS = [
  {
    Header: "Patient Name",
    accessor: "patient_name",
  },
  {
    Header: "Relationship",
    accessor: "relationship",
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
  {
    Header: "Robot Type",
    accessor: "robot_type",
  },
  {
    Header: "Robot Location",
    accessor: "robot_location",
  },
  {
    Header: "Measurement Date",
    accessor: "measurement_date",
  },
  {
    Header: "Measurement Time",
    accessor: "measurement_time",
  },
];

const SUPER_ADMIN_APPOINTMENTS = [
  {
    Header: "Appt ID",
    accessor: "appt_id",
  },
  {
    Header: "Appt Type",
    accessor: "appt_type",
  },
  {
    Header: "Visit Type",
    accessor: "visit_type",
  },
  {
    Header: "Appt Date",
    accessor: "appt_date",
  },
  {
    Header: "Appt Time",
    accessor: "appt_time",
  },
  {
    Header: "Robot ID",
    accessor: "robot_id",
  },
  {
    Header: "Robot Name",
    accessor: "robot_name",
  },
  {
    Header: "Patient ID",
    accessor: "patient_id",
  },
  {
    Header: "Patient Name",
    accessor: "patient_name",
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
];

const SUPER_ADMIN_SUMMARY_NOTES = [
  {
    Header: "Appt ID",
    accessor: "appt_id",
  },
  {
    Header: "Appt Type",
    accessor: "appt_type",
  },
  {
    Header: "Visit Type",
    accessor: "visit_type",
  },
  {
    Header: "Appt Date",
    accessor: "appt_date",
  },
  {
    Header: "Appt Time",
    accessor: "appt_time",
  },
  {
    Header: "Robot ID",
    accessor: "robot_id",
  },
  {
    Header: "Robot Name",
    accessor: "robot_name",
  },
  {
    Header: "Patient ID",
    accessor: "patient_id",
  },
  {
    Header: "Patient Name",
    accessor: "patient_name",
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
];

const PATIENT_FOLLOW_UP = [
  {
    Header: "Appt ID",
    accessor: "appt_id",
  },
  {
    Header: "Appt Type",
    accessor: "appt_type",
  },
  {
    Header: "Visit Date",
    accessor: "visit_date",
  },
  {
    Header: "Visit Time",
    accessor: "visit_time",
  },
  {
    Header: "Patient Name",
    accessor: "patient_name",
  },
  {
    Header: "Patient DOB",
    accessor: "birth",
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
  {
    Header: "Follow Up Status",
    accessor: "status",
  },
];

const PATIENT_ORDER = [
  {
    Header: "Appt ID",
    accessor: "appt_id",
  },
  {
    Header: "Appt Type",
    accessor: "appt_type",
  },
  {
    Header: "Visit Date",
    accessor: "visit_date",
  },
  {
    Header: "Visit Time",
    accessor: "visit_time",
  },
  {
    Header: "Timezone",
    accessor: "timezone",
  },
  {
    Header: "Patient Name",
    accessor: "patient_name",
  },
  {
    Header: "Patient DOB",
    accessor: "birth",
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
];

const PATIENT_REFERRAL = [
  {
    Header: "Appt ID",
    accessor: "appt_id",
  },
  {
    Header: "Appt Type",
    accessor: "appt_type",
  },
  {
    Header: "Visit Date",
    accessor: "visit_date",
  },
  {
    Header: "Visit Time",
    accessor: "visit_time",
  },
  {
    Header: "Timezone",
    accessor: "timezone",
  },
  {
    Header: "Patient Name",
    accessor: "patient_name",
  },
  {
    Header: "Patient DOB",
    accessor: "birth",
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
];

const PATIENT_PRESCRIPTION = [
  {
    Header: "Appt ID",
    accessor: "appt_id",
  },
  {
    Header: "Appt Type",
    accessor: "appt_type",
  },
  {
    Header: "Visit Date",
    accessor: "visit_date",
  },
  {
    Header: "Visit Time",
    accessor: "visit_time",
  },
  {
    Header: "Timezone",
    accessor: "timezone",
  },
  {
    Header: "Patient Name",
    accessor: "patient_name",
  },
  {
    Header: "Patient DOB",
    accessor: "birth",
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
];

const PATIENT_STORED_RESULT = [
  {
    Header: "Patient Name",
    accessor: "patient_name",
  },
  {
    Header: "Patient Gender",
    accessor: "gender",
  },
  {
    Header: "Report For",
    accessor: "report_for",
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
  {
    Header: "Measurement Date",
    accessor: "date",
  },
  {
    Header: "Measurement Time",
    accessor: "time",
  },
];

const STAFF_INTAKE_COLUMNS = [
  {
    Header: "Appt ID",
    accessor: "id",
  },
  {
    Header: "Appt Type",
    accessor: "appt_type",
  },
  {
    Header: "Visit Type",
    accessor: "visit_type",
  },
  {
    Header: "Appt Date",
    accessor: "appt_date",
  },
  {
    Header: "Appt Time",
    accessor: "appt_time",
  },
  {
    Header: "Robot Type",
    accessor: "robot_type",
    Cell: RobotTypeChip,
  },
  {
    Header: "Robot ID",
    accessor: "robot_id",
  },
  {
    Header: "Robot Name",
    accessor: "robot_name",
  },
  { Header: "Patient ID", accessor: "patient_id" },
  { Header: "Patient Name", accessor: "patient_name" },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
  {
    Header: "Language",
    accessor: "language",
  },
];

const PATIENT_SUMMARY_NOTES = [
  {
    Header: "Appt ID",
    accessor: "appt_id",
  },
  {
    Header: "Appt Type",
    accessor: "appt_type",
  },
  {
    Header: "Visit Type",
    accessor: "visit_type",
  },
  {
    Header: "Appt Date",
    accessor: "appt_date",
  },
  {
    Header: "Appt Time",
    accessor: "appt_time",
  },
  {
    Header: "DOB",
    accessor: "birth",
  },
  {
    Header: "Relationship",
    accessor: "relationship",
  },
  {
    Header: "Patient ID",
    accessor: "patient_id",
  },
  {
    Header: "Patient Name",
    accessor: "patient_name",
  },
  {
    Header: "HF Name",
    accessor: "hf_name",
  },
];

const getTableColumns = (variant: string) => {
  switch (variant) {
    case "appointment":
      return APPOINTMENT_COLUMNS;
    case "doctorAppointment":
      return DOCTOR_APPOINTMENT_COLUMNS;
    case "patientAppointment":
      return PATIENT_APPOINTMENT_COLUMNS;
    case "storingResult":
      return STORING_RESULTS_COLUMNS;
    case "superAppointments":
      return SUPER_ADMIN_APPOINTMENTS;
    case "superSummary":
      return SUPER_ADMIN_SUMMARY_NOTES;
    case "doctorSummary":
      return DOCTOR_SUMMARY_COLUMNS;
    case "patientFollowUp":
      return PATIENT_FOLLOW_UP;
    case "patientOrder":
      return PATIENT_ORDER;
    case "patientReferral":
      return PATIENT_REFERRAL;
    case "patientPrescription":
      return PATIENT_PRESCRIPTION;
    case "patientStoredResult":
      return PATIENT_STORED_RESULT;
    case "staffIntakeForms":
      return STAFF_INTAKE_COLUMNS;
    case "patientSummary":
      return PATIENT_SUMMARY_NOTES;
    case "doctorAppt":
      return DOCTOR_APPT_COLUMNS;
    default:
      return [];
  }
};

export interface IDataCardProps {
  avatar?: string;
  avatarSrc?: string;
  cardActions?: ReactNode;
  classname?: string;
}

export interface IAppointmentData {
  appt_id: string;
  appt_type: string;
  appt_date: string;
  appt_time: string;
  robot_id: string;
  robot_name: string;
  patient_id: string;
  patient_name: string;
  hf_name: string;
}

type ConditionalProps =
  | {
      variant: "appointment";
      icon?: never;
      name: string;
      role?: never;
      flag?: never;
      date?: never;
      id: string;
      deviceType?: never;
      specialty: string;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "doctorAppt";
      icon?: never;
      name: string;
      role?: never;
      flag?: never;
      date?: never;
      id: string;
      deviceType?: never;
      specialty: string;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "doctorAppointment";
      icon?: never;
      name?: never;
      role?: never;
      flag?: never;
      date?: never;
      id?: never;
      deviceType?: never;
      specialty?: never;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "patientAppointment";
      icon?: never;
      name?: string | null;
      role?: never;
      flag?: never;
      date?: never;
      id?: string | null;
      deviceType?: never;
      specialty?: string | null;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "doctorSummary";
      icon?: never;
      name?: never;
      role?: never;
      flag?: never;
      date?: never;
      id?: never;
      deviceType?: never;
      specialty?: never;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "message";
      icon?: never;
      name: string;
      role?: never;
      flag: string;
      date?: string;
      id?: never;
      deviceType?: never;
      specialty?: string;
      receiver?: never;
      message?: string;
      tableData?: never;
      columns?: never;
    }
  | {
      variant: "notification";
      icon?: never;
      name: string;
      role: string;
      flag?: never;
      date: string;
      id?: never;
      deviceType?: never;
      specialty?: never;
      receiver?: string;
      message?: string;
      tableData?: never;
      columns?: never;
    }
  | {
      variant: "storingResult";
      avatar: string;
      icon?: never;
      name: string;
      role?: never;
      flag?: never;
      date?: never;
      id: string;
      deviceType: string;
      specialty?: never;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "superAppointments";
      icon?: never;
      name?: string;
      role?: never;
      flag?: never;
      date?: never;
      id?: string;
      deviceType?: never;
      specialty?: string;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "superSummary";
      icon?: never;
      name: string;
      role?: never;
      flag?: never;
      date?: never;
      id: string;
      deviceType?: never;
      specialty: string;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "patientFollowUp";
      icon?: never;
      name: string;
      role?: never;
      flag?: never;
      date?: never;
      id: string;
      deviceType?: never;
      specialty: string;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "patientOrder";
      icon?: never;
      name: string;
      role?: never;
      flag?: never;
      date?: never;
      id: string;
      deviceType?: never;
      specialty: string;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "patientReferral";
      icon?: never;
      name: string;
      role?: never;
      flag?: never;
      date?: never;
      id: string;
      deviceType?: never;
      specialty: string;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "patientPrescription";
      icon?: never;
      name: string;
      role?: never;
      flag?: never;
      date?: never;
      id: string;
      deviceType?: never;
      specialty: string;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "patientStoredResult";
      avatar?: never;
      icon?: never;
      name: string;
      role?: never;
      flag?: never;
      date?: never;
      id?: never;
      deviceType?: string;
      specialty?: never;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "staffIntakeForms";
      icon?: never;
      name: string;
      role?: never;
      flag?: never;
      date?: never;
      id: string;
      deviceType?: never;
      specialty: string;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    }
  | {
      variant: "patientSummary";
      icon?: never;
      name: string;
      role?: never;
      flag?: never;
      date?: never;
      id: string;
      deviceType?: never;
      specialty: string;
      receiver?: never;
      message?: never;
      tableData: {};
      columns?: any[];
    };

type DataCardProps = IDataCardProps & ConditionalProps;

const DataCard = ({
  name,
  variant = "appointment",
  avatar,
  role,
  date,
  id,
  deviceType,
  specialty,
  receiver,
  message,
  flag,
  tableData,
  icon,
  cardActions,
  classname,
  columns,
  ...rest
}: DataCardProps) => {
  return (
    <>
      <div className={clsx([classes.card, classname])}>
        <div className={classes.card__body}>
          {(avatar ||
            (variant !== "doctorAppointment" &&
              variant !== "doctorSummary")) && (
            <div className={classes.card__info}>
              {variant !== "patientStoredResult" && (
                <div className="d-flex align-items-center">
                  {icon ? (
                    <div className={classes.card__icon}> {icon} </div>
                  ) : (
                    <Avatar
                      size="big"
                      name={name!}
                      src={avatar || ""}
                      className={classes.card__avatar}
                    />
                  )}
                </div>
              )}

              <div className="d-flex flex-column justify-content-center">
                <div className={classes.card__title}>
                  <div className="pe-1">{name}</div>
                  {variant === "message" ? (
                    <div className={classes.card__flag}>
                      <CountryFlag flag={flag!} />
                    </div>
                  ) : (
                    variant !== "patientStoredResult" && (
                      <div className={classes.card__id}>
                        {id || role ? `  (${id || role})` : ""}{" "}
                      </div>
                    )
                  )}
                </div>

                {(specialty || date || deviceType) && (
                  <span
                    className={date ? classes.card__date : classes.card__type}
                  >
                    {specialty || date || deviceType}
                  </span>
                )}
              </div>
            </div>
          )}

          <div
            className={clsx(
              "d-flex",
              (variant === "doctorAppointment" ||
                variant === "superAppointments") &&
                "flex-grow-1"
            )}
            // style={
            //   variant === "doctorAppointment" || variant === "superAppointments"
            //     ? {
            //         display: "flex",
            //         width: "100%",
            //       }
            //     : { display: "flex" }
            // }
          >
            {cardActions}
          </div>
        </div>

        {message && (
          <div className={classes.card__content}>
            {/* <span className={classes.card__type}> to: {receiver} </span> */}
            <div
              dangerouslySetInnerHTML={{ __html: message }}
              className={clsx(
                classes.card__message,
                variant === "notification" && classes.textOverflow
              )}
            />
          </div>
        )}

        {tableData && (
          <div className={classes.card__content}>
            <BasicTable
              columns={columns || getTableColumns(variant)}
              data={[tableData]}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DataCard;
