import { ISidebarItem } from "components/layout/sidebar";

import {
  ArrowDownOnSquareIcon,
  BellIcon,
  BellSnoozeIcon,
  BookmarkIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterIcon,
  ChevronDoubleDownIcon,
  HomeIcon,
  PencilSquareIcon,
  PresentationChartBarIcon,
  TableCellsIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const SuperAdminItems: ISidebarItem[] = [
  {
    id: "0",
    name: "صفحه اصلی",
    icon: HomeIcon,
    selectedIcon: HomeIcon,
    path: "/panel/admin/dashboard",
    child: [],
  },
  {
    id: "1",
    name: "کاربران",
    icon: UsersIcon,
    selectedIcon: UsersIcon,
    path: "/panel/admin/users",
    child: [],
  },

  {
    id: "2",
    name: "روزها",
    icon: CalendarDaysIcon,
    selectedIcon: CalendarDaysIcon,
    path: "/panel/admin/days",
    child: [],
  },
  {
    id: "3",
    name: "زنگ ها",
    icon: BellIcon,
    selectedIcon: BellIcon,
    path: "/panel/admin/bells",
    child: [],
  },
  {
    id: "4",
    name: "درس ها",
    icon: BookOpenIcon,
    selectedIcon: BookOpenIcon,
    path: "/panel/admin/courses",
    child: [],
  },
  {
    id: "5",
    name: "زنگ های درسی",
    icon: BellSnoozeIcon,
    selectedIcon: BellSnoozeIcon,
    path: "/panel/admin/time-table-bells",
    child: [],
  },
  {
    id: "6",
    name: "انتخاب واحد",
    icon: ChevronDoubleDownIcon,
    selectedIcon: ChevronDoubleDownIcon,
    path: "/panel/admin/unit-pick-time",
    child: [],
  },
  {
    id: "7",
    name: "رشته ها",
    icon: BookmarkIcon,
    selectedIcon: BookmarkIcon,
    path: "/panel/admin/majors",
    child: [],
  },
  {
    id: "8",
    name: "برنامه زمانی دروس",
    icon: TableCellsIcon,
    selectedIcon: TableCellsIcon,
    path: "/panel/admin/time-table",
    child: [],
  },
];

export const MasterItems: ISidebarItem[] = [
  {
    id: "0",
    name: "صفحه اصلی",
    icon: HomeIcon,
    selectedIcon: HomeIcon,
    path: "/panel/master/dashboard",
    child: [],
  },
  {
    id: "4",
    name: "درس ها",
    icon: BookOpenIcon,
    selectedIcon: BookOpenIcon,
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
    name: "اطلاعیه‌ها",
    icon: ChatBubbleBottomCenterIcon,
    selectedIcon: ChatBubbleBottomCenterIcon,
    path: "/panel/master/announcements",
    child: [],
  },
  {
    id: "6",
    name: "ثبت نمرات",
    icon: PencilSquareIcon,
    selectedIcon: PencilSquareIcon,
    path: "/panel/master/submit-grade",
    child: [],
  },
];

export const StudentItems: ISidebarItem[] = [
  {
    id: "0",
    name: "داشبورد",
    icon: HomeIcon,
    selectedIcon: HomeIcon,
    path: "/panel/student/dashboard",
    child: [],
  },
  {
    id: "1",
    name: "انتخاب واحد",
    icon: ArrowDownOnSquareIcon,
    selectedIcon: ArrowDownOnSquareIcon,
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
    icon: PresentationChartBarIcon,
    selectedIcon: PresentationChartBarIcon,
    child: [
      {
        id: "1",
        name: "کارنامه",
        path: "/panel/student/report",
      },
    ],
  },
  {
    id: "3",
    name: "اطلاعیه‌ها",
    icon: ChatBubbleBottomCenterIcon,
    selectedIcon: ChatBubbleBottomCenterIcon,
    path: "/panel/student/announcements",
    child: [],
  },
];
