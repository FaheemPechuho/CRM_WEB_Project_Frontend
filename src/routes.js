
import { Icon } from "@chakra-ui/react";
import { HiUsers } from "react-icons/hi";
import { MdInsertChartOutlined, MdInventory, MdLock } from "react-icons/md";
// icon
import React from "react";
import { AiFillFolderOpen, AiOutlineMail } from "react-icons/ai";
import { FaHistory, FaWpforms } from "react-icons/fa";
import { PiVideoCameraDuotone } from "react-icons/pi";
import { FaCreativeCommonsBy } from "react-icons/fa";
import { ROLE_PATH } from "./roles";
import ChangeImage from "views/admin/image";
import Validation from "views/admin/validation";
import CustomField from "views/admin/customField";
import TableField from "views/admin/tableField";
import {
  CgCalendar,
  CgCreditCard,
  CgDialpad,
  CgHome,
  CgListTree,
  CgPhone,
  CgUserList,
} from "react-icons/cg";
import { GrTask } from "react-icons/gr";

// Admin Imports
const MainDashboard = React.lazy(() => import("views/admin/default"));

// My component
const Contact = React.lazy(() => import('views/admin/contact'));
const ContactView = React.lazy(() => import('views/admin/contact/View'));
const ContactImport = React.lazy(() => import("views/admin/contact/components/ContactImport"));

const User = React.lazy(() => import("views/admin/users"));
const UserView = React.lazy(() => import("views/admin/users/View"));

const Property = React.lazy(() => import("views/admin/property"));
const PropertyView = React.lazy(() => import("views/admin/property/View"));
const PropertyImport = React.lazy(() => import("views/admin/property/components/PropertyImport"))

const Lead = React.lazy(() => import("views/admin/lead"));
const CallHistory = React.lazy(() => import("views/admin/callHistory"));
const LeadView = React.lazy(() => import("views/admin/lead/View"));
const LeadImport = React.lazy(() => import("views/admin/lead/components/LeadImport"));


const Task = React.lazy(() => import("views/admin/task"));
const DailyReport = React.lazy(() => import("views/admin/dailyReport"));
const TaskView = React.lazy(() => import("views/admin/task/components/taskView"));
const Calender = React.lazy(() => import("views/admin/calender"));
const Payments = React.lazy(() => import("views/admin/payments"));
const Role = React.lazy(() => import("views/admin/role"));
const Inventory = React.lazy(() => import("views/admin/inventory"));

const Document = React.lazy(() => import("views/admin/document"));

const EmailHistory = React.lazy(() => import("views/admin/emailHistory"));
const EmailHistoryView = React.lazy(() => import("views/admin/emailHistory/View"));

const Meeting = React.lazy(() => import("views/admin/meeting"));
const MettingView = React.lazy(() => import("views/admin/meeting/View"));

const PhoneCall = React.lazy(() => import("views/admin/phoneCall"));
const PhoneCallView = React.lazy(() => import("views/admin/phoneCall/View"));

const Report = React.lazy(() => import("views/admin/reports"));
// Auth Imports
const SignInCentered = React.lazy(() => import("views/auth/signIn"));
// admin setting 
const AdminSetting = React.lazy(() => import("views/admin/adminSetting"));


const routes = [
  // ========================== Dashboard ==========================
  {
    name: "Dashboard",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/default",
    icon: <Icon as={CgHome} width='20px' height='33px' color='inherit' />,
    component: MainDashboard,
  },
  // ========================== Admin Layout ==========================
  // ------------- lead Routes ------------------------
  {
    name: "Lead",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/lead",
    icon: <Icon as={CgUserList} width='20px' height='33px' color='inherit' />,
    component: Lead,
  },
 
  {
    name: "Lead history",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/leadHistory/:lid",
    icon: <Icon as={FaHistory} width='20px' height='33px' color='inherit' />,
    component: CallHistory,
    under: "lead",
    parentName: "Lead",
  },
  {
    name: "Lead",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    under: "lead",
    parentName: "Lead",
    path: "/leadView/:id",
    component: LeadView,
  },
  {
    name: "Lead Import",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    under: "lead",
    parentName: "Lead",
    path: "/leadImport",
    component: LeadImport,
  },
  // --------------- contact Routes --------------------
  {
    name: "Contacts",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/contacts",
    icon: <Icon as={CgDialpad} width='20px' height='33px' color='inherit' />,
    component: Contact,
  },
  {
    name: "Contacts",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    under: "contacts",
    parentName: "Contacts",
    path: "/contactView/:id",
    component: ContactView,
  },

  {
    name: "Contact Import",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    both: true,
    under: "contacts",
    parentName: "Contacts",
    path: "/contactImport",
    component: ContactImport,
  },
  // ------------- Property Routes ------------------------
  {
    name: "Property",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/properties",
    icon: <Icon as={CgListTree} width='20px' height='33px' color='inherit' />,
    component: Property,
  },
  {
    name: "Property ",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    parentName: "Property",
    under: "properties",
    path: "/propertyView/:id",
    component: PropertyView,
  },
  {
    name: "Property Import",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    both: true,
    under: "properties",
    parentName: "Property",
    path: "/propertyImport",
    component: PropertyImport,
  },
  // -----------------------------Admin setting-------------------------------------
  {
    name: "Admin Setting",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    parentName: "admin",
    under: "admin",
    path: "/admin-setting",
    component: AdminSetting,
  },

  // ------------- Task Routes ------------------------
  {
    name: "Task",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/task",
    icon: <Icon as={GrTask} width='20px' height='33px' color='inherit' />,
    component: Task,
  },
  {
    name: "Task ",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    under: "task",
    parentName: "Task",
    path: "/view/:id",
    component: TaskView,
  },
  // ------------- Meeting Routes ------------------------
  {
    name: "Meeting",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/metting",
    icon: <Icon as={PiVideoCameraDuotone} width='20px' height='33px' color='inherit' />,
    component: Meeting,
  },
  {
    name: "Meeting ",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    under: "metting",
    parentName: "Meeting",
    path: "/metting/:id",
    component: MettingView,
  },
  // ------------- Phone Routes ------------------------
  {
    name: "Call",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/phone-call",
    icon: <Icon as={CgPhone} width='20px' height='33px' color='inherit' />,
    component: PhoneCall,
  },

 
  {
    name: "Call ",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    under: "phone-call",
    parentName: "Call",
    path: "/phone-call/:id",
    component: PhoneCallView,
  },
  // ------------- Email Routes------------------------
  {
    // separator: 'History',
    name: "Email",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/email",
    icon: <Icon as={AiOutlineMail} width='20px' height='33px' color='inherit' />,
    component: EmailHistory,
  },
  {
    name: "Email ",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    under: "email",
    parentName: "Email",
    path: "/Email/:id",
    component: EmailHistoryView,
  },
  // ------------- Calender Routes ------------------------
  {
    name: "Calender",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/calender",
    icon: <Icon as={CgCalendar} width='20px' height='33px' color='inherit' />,
    component: Calender,
  },
  // ------------- Payments Routes ------------------------
  {
    name: "Payments",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/payments",
    icon: <Icon as={CgCreditCard} width='20px' height='33px' color='inherit' />,
    component: Payments,
  },

  // ------------- Roles Routes ------------------------
  {
    name: "Roles",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/role",
    under: "role",
    icon: <Icon as={FaCreativeCommonsBy} width='20px' height='33px' color='inherit' />,
    component: Role,
  },
  {
    name: "Custom Fields",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/custom-Fields",
    under: "customField",
    icon: <Icon as={FaWpforms} width='20px' height='33px' color='inherit' />,
    component: CustomField,
  },
  {
    name: "Change Images",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/change-images",
    under: "image",
    icon: <Icon as={FaCreativeCommonsBy} width='20px' height='33px' color='inherit' />,
    component: ChangeImage,
  },
  {
    name: "Validation",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/validations",
    under: "Validation",
    icon: <Icon as={FaCreativeCommonsBy} width='20px' height='33px' color='inherit' />,
    component: Validation,
  },
  {
    name: "Table Fields",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/table-field",
    under: "tableField",
    icon: <Icon as={FaWpforms} width='20px' height='33px' color='inherit' />,
    component: TableField,
  },
  // // ------------- Text message Routes ------------------------
  // {
  //   name: "Text Msg",
  //   layout: [ROLE_PATH.admin, ROLE_PATH.user],
  //
  //   path: "/text-msg",
  //   icon: <Icon as={MdOutlineMessage} width='20px' height='33px' color='inherit' />,
  //   component: TextMsg,
  // },
  // {
  //   name: "Text Msg View",
  //   layout: [ROLE_PATH.admin, ROLE_PATH.user],
  //
  //   under: "text-msg",
  //   path:  text-msg/:id",
  //   component: TextMsgView,
  // },
  // ------------- Document Routes ------------------------
  {
    name: "Documents",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/documents",
    icon: <Icon as={AiFillFolderOpen} width='20px' height='33px' color='inherit' />,
    component: Document,
  },
  // ----------------- Reporting Layout -----------------
   {
      name: "Daily Report",
      layout: [ROLE_PATH.user, ROLE_PATH.superAdmin],
      path: "/daily-report",
      icon: (
        <Icon
          as={MdInsertChartOutlined}
          width="20px"
          height="20px"
          color="inherit"
        />
      ),
      component: DailyReport,
  },
  {
    name: "Reporting and Analytics",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/reporting-analytics",
    icon: <Icon as={MdInsertChartOutlined} width='20px' height='33px' color='inherit' />,
    component: Report,
  },
   {
    name: "Inventory",
    icon: <Icon as={MdInventory} width='20px' height='33px' color='inherit' />,
    layout: [ROLE_PATH.superAdmin],
    path: "/inventory",
    component: Inventory,
  },
  // ------------- user Routes ------------------------
  {
    name: "Users",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    path: "/user",
    under: "user",
    icon: <Icon as={HiUsers} width='20px' height='33px' color='inherit' />,
    component: User,
  },
  {
    name: "User View",
    layout: [ROLE_PATH.superAdmin, ROLE_PATH.user],
    parentName: "Email",
    under: "user",
    path: "/userView/:id",
    component: UserView,
  },
  // ========================== User layout ==========================

  // ========================== auth layout ==========================
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='33px' color='inherit' />,
    component: SignInCentered,
  },
];

export default routes;
