// core components
import Dashboard from "views/admin/Dashboard.js";
// import Icons from "views/admin/Icons.js";
import Login from "views/auth/Login.js";
import Maps from "views/admin/Maps.js";
import Profile from "views/admin/Profile.js";
import Register from "views/auth/Register.js";
import Tables from "views/admin/Tables.js";
// @material-ui/icons components
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Grain from "@material-ui/icons/Grain";
import LocationOn from "@material-ui/icons/LocationOn";
import Person from "@material-ui/icons/Person";
import Tv from "@material-ui/icons/Tv";
import Category from "views/admin/CategoryView";
import VpnKey from "@material-ui/icons/VpnKey";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: Tv,
    iconColor: "Primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Kategori",
    icon: Grain,
    iconColor: "Primary",
    component: Category,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Artikel",
    icon: LocationOn,
    iconColor: "Warning",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Management",
    icon: Person,
    iconColor: "WarningLight",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Notifications",
    icon: FormatListBulleted,
    iconColor: "Error",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: VpnKey,
    iconColor: "Info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: AccountCircle,
    iconColor: "ErrorLight",
    component: Register,
    layout: "/auth",
  },
  {
    divider: true,
  },
];
export default routes;
