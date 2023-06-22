import {
  AppointmentBold,
  AppointmentDuotone,
  AvailabilityBold,
  AvailabilityDoutone,
  FinancialBold,
  FinancialDuotone,
  HospitalBold,
  MonitorDuotone,
  PacsDuotone,
  ReportBold,
  ReportDuotone,
} from "components/icon";
import { ISidebarItem } from "components/layout/sidebar";
import { SummaryDuotone } from "components/icon/summary";
import { SummaryBold } from "components/icon/summaryBold";
import { MonitorBold } from "components/icon/monitorBold";
import { HospitalDuotone } from "components/icon/hospitalDuotone";
import { UsersDuotone } from "components/icon/users";
import { AssignDuotone } from "components/icon/assign";
import { AssignBold } from "components/icon/assignBold";
import { UsersBold } from "components/icon/usersBold";
import { IntakeFormDuotone } from "components/icon/intakeForm";
import { IntakeFormBold } from "components/icon/intakeFormBold";
import { HealthRecordDuotone } from "components/icon/healthRecord";
import { HealthRecordBold } from "components/icon/healthRecordBold";
import { FamilyDuotone } from "components/icon/family";
import { FamilyBold } from "components/icon/familyBold";
import { PastMedicalHistoryDuotone } from "components/icon/history";
import { PastMedicalHistoryBold } from "components/icon/historyBold";

export const PrefrencesItems: ISidebarItem[] = [];

export const SuperAdminItems: ISidebarItem[] = [
  {
    id: "0",
    name: "صفحه اصلی",
    icon: SummaryDuotone,
    selectedIcon: SummaryBold,
    path: "/panel/admin/dashboard",
    child: [],
  },
  {
    id: "1",
    name: "کاربران",
    icon: HospitalDuotone,
    selectedIcon: HospitalBold,
    path: "/panel/admin/users",
    child: [],
  },

  {
    id: "2",
    name: "روزها",
    icon: MonitorDuotone,
    selectedIcon: MonitorBold,
    path: "/panel/admin/days",
    child: [],
  },
  {
    id: "3",
    name: "زنگ ها",
    icon: AssignDuotone,
    selectedIcon: AssignBold,
    path: "/panel/admin/bells",
    child: [],
  },
  {
    id: "4",
    name: "درس ها",
    icon: UsersDuotone,
    selectedIcon: UsersBold,
    child: [
      {
        id: "1",
        name: "لیست درس ها",
        path: "/panel/admin/courses",
      },
    ],
  },
  {
    id: "5",
    name: "زنگ های درسی",
    icon: FinancialDuotone,
    selectedIcon: FinancialBold,
    path: "/panel/admin/time-table-bells",
    child: [],
  },
  {
    id: "6",
    name: "انتخاب واحد",
    icon: FinancialDuotone,
    selectedIcon: FinancialBold,
    path: "/panel/admin/unit-pick-time",
    child: [],
  },
  {
    id: "7",
    name: "رشته ها",
    icon: FinancialDuotone,
    selectedIcon: FinancialBold,
    path: "/panel/admin/majors",
    child: [],
  },
];

export const DoctorItems: ISidebarItem[] = [
  {
    id: "0",
    name: "Summary",
    icon: SummaryDuotone,
    selectedIcon: SummaryBold,
    path: "/panel/doctor/dashboard",
    child: [],
  },
  {
    id: "1",
    name: "Availability Time",
    icon: AvailabilityDoutone,
    selectedIcon: AvailabilityBold,
    child: [
      {
        id: "1",
        path: "/panel/doctor/availability-time",
        name: "Availability Time List",
      },
      {
        id: "2",
        path: "/panel/doctor/assigned-robots",
        name: "Assigned Robots",
      },
    ],
  },
  {
    id: "2",
    name: "My Appointments",
    icon: AppointmentDuotone,
    selectedIcon: AppointmentBold,
    child: [
      {
        id: "0",
        name: "Scheduled Appointments",
        path: "/panel/doctor/appointments/scheduled",
      },
      {
        id: "1",
        name: "On Demand Appointments",
        path: "/panel/doctor/appointments/on-demand",
      },
    ],
  },
  {
    id: "3",
    name: "My Patients",
    icon: UsersDuotone,
    selectedIcon: UsersBold,
    child: [
      {
        id: "0",
        name: "View Patients List",
        path: "/panel/doctor/patients/list",
      },
      {
        id: "1",
        name: "Patient Stored Results From Robot",
        path: "/panel/doctor/patients/stored-results",
      },
      {
        id: "2",
        name: "Past Visit Summary Note",
        path: "/panel/doctor/patients/past-visit-summary",
      },
      {
        id: "3",
        name: "Visit Summary Note Management",
        path: "/panel/doctor/patients/summary-note-management",
      },
    ],
  },
  {
    id: "4",
    name: "My Staff",
    icon: UsersDuotone,
    selectedIcon: UsersBold,
    path: "/panel/doctor/staffs",
    child: [],
  },
  {
    id: "5",
    name: "Report Generation",
    icon: ReportDuotone,
    selectedIcon: ReportBold,
    path: "/panel/doctor/reports",
    child: [],
  },
  {
    id: "6",
    name: "PACS",
    icon: PacsDuotone,
    selectedIcon: PacsDuotone,
    child: [
      {
        name: "PACS Viewer",
        path: "/panel/doctor/pacs/viewer",
        id: "1",
      },
      {
        name: "Upload Study",
        path: "/panel/doctor/pacs/upload-study",
        id: "2",
      },
      {
        name: "PACS Admin",
        id: "3",
        path: "/panel/doctor/pacs/admin",
      },
    ],
  },
];

export const PatientItems: ISidebarItem[] = [
  {
    id: "0",
    name: "Summary",
    icon: SummaryDuotone,
    selectedIcon: SummaryBold,
    path: "/panel/patient/dashboard",
    child: [],
  },
  {
    id: "1",
    name: "Intake Form Management",
    icon: IntakeFormDuotone,
    selectedIcon: IntakeFormBold,
    path: "/panel/patient/intake-form-management",
    child: [],
  },
  {
    id: "6",
    name: "Past Medical History",
    icon: PastMedicalHistoryDuotone,
    selectedIcon: PastMedicalHistoryBold,
    path: "/panel/patient/past-medical-history",
    child: [],
  },
  {
    id: "2",
    name: "Appointments Management",
    icon: AppointmentDuotone,
    selectedIcon: AppointmentBold,
    child: [
      {
        id: "0",
        name: "Scheduled Appointments",
        path: "/panel/patient/appointments/scheduled",
      },
      {
        id: "1",
        name: "On Demand Appointments",
        path: "/panel/patient/appointments/on-demand",
      },
    ],
  },
  {
    id: "3",
    name: "Health Record",
    icon: HealthRecordDuotone,
    selectedIcon: HealthRecordBold,
    child: [
      {
        id: "0",
        name: "Visit Summary",
        path: "/panel/patient/visit-summary",
      },
      {
        id: "1",
        name: "New Self Report",
        path: "/panel/patient/new-self-report",
      },
      {
        id: "2",
        name: "Stored Results",
        path: "/panel/patient/view-stored-result",
      },
      {
        id: "3",
        name: "Follow Up/Orders/Referrals/Prescriptions",
        path: "/panel/patient/follow-up",
      },
    ],
  },
  {
    id: "4",
    name: "Financial Management",
    icon: FinancialDuotone,
    selectedIcon: FinancialBold,
    child: [
      {
        id: "0",
        name: "My Payments",
        path: "/panel/patient/financial-records",
      },
      {
        id: "1",
        name: "My Wallet",
        path: "/panel/patient/wallet-balance",
      },
    ],
  },
  {
    id: "5",
    name: "My Family List",
    icon: FamilyDuotone,
    selectedIcon: FamilyBold,
    path: "/panel/patient/family-members",
    child: [],
  },
];
