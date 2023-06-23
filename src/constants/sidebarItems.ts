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
  {
    id: "8",
    name: "برنامه زمانی دروس",
    icon: FinancialDuotone,
    selectedIcon: FinancialBold,
    path: "/panel/admin/time-table",
    child: [],
  },
];

export const MasterItems: ISidebarItem[] = [
  {
    id: "0",
    name: "صفحه اصلی",
    icon: SummaryDuotone,
    selectedIcon: SummaryBold,
    path: "/panel/master/dashboard",
    child: [],
  },
  {
    id: "1",
    name: "کاربران",
    icon: HospitalDuotone,
    selectedIcon: HospitalBold,
    path: "/panel/master/users",
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
        path: "/panel/master/courses",
      },
    ],
  },
  {
    id: "5",
    name: "زنگ های درسی",
    icon: FinancialDuotone,
    selectedIcon: FinancialBold,
    path: "/panel/master/time-table-bells",
    child: [],
  },
];

export const StudentItems: ISidebarItem[] = [
  {
    id: "0",
    name: "داشبورد",
    icon: SummaryDuotone,
    selectedIcon: SummaryBold,
    path: "/panel/student/dashboard",
    child: [],
  },
  {
    id: "1",
    name: "انتخاب واحد",
    icon: IntakeFormDuotone,
    selectedIcon: IntakeFormBold,
    child: [
      {
        id: "0",
        name: "انتخاب واحد",
        path: "/panel/student/units/add",
      },
      {
        id: "1",
        name: "دروس دانشجو در نیمسال",
        path: "/panel/student/units/chosen",
      },
    ],
  },
  {
    id: "2",
    name: "گزارش",
    icon: IntakeFormDuotone,
    selectedIcon: IntakeFormBold,
    child: [
      {
        id: "1",
        name: "کارنامه",
        path: "/panel/master/courses",
      },
    ],
  },
];
