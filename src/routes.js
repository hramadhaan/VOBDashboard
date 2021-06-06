// core components
import Dashboard from "views/admin/Dashboard.js";
// import Icons from "views/admin/Icons.js";
import Login from "views/auth/Login.js";
// import Maps from "views/admin/Maps.js";
// import Profile from "views/admin/Profile.js";
import Register from "views/auth/Register.js";
import Tables from "views/admin/Tables.js";
// @material-ui/icons components
// import AccountCircle from "@material-ui/icons/AccountCircle";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Grain from "@material-ui/icons/Grain";
import LocationOn from "@material-ui/icons/LocationOn";
import Person from "@material-ui/icons/Person";
import Tv from "@material-ui/icons/Tv";
import Category from "views/admin/CategoryView";
// import VpnKey from "@material-ui/icons/VpnKey";
import AddCategoryView from "views/admin/AddCategoryView";
import ArticleView from "views/admin/ArticleView";
import AddArticleView from "views/admin/AddArticleView";
import UserView from "views/admin/UserView";
import AddUserView from "views/admin/AddUserView";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: Tv,
    iconColor: "Primary",
    component: Dashboard,
    layout: "/admin",
  },
  { divider: true },
  {
    path: "/icons",
    name: "Kategori",
    icon: Grain,
    iconColor: "Primary",
    component: Category,
    layout: "/admin",
  },
  {
    path: "/add-category",
    name: "Tambah Kategori",
    component: AddCategoryView,
    layout: "/admin",
  },
  { divider: true },
  {
    path: "/maps",
    name: "Artikel",
    icon: LocationOn,
    iconColor: "Warning",
    component: ArticleView,
    layout: "/admin",
  },
  {
    path: "/add-article",
    name: "Tambah Artikel",
    component: AddArticleView,
    layout: "/admin",
  },
  { divider: true },
  {
    path: "/user-list",
    name: "Pengguna",
    icon: Person,
    iconColor: "WarningLight",
    component: UserView,
    layout: "/admin",
  },
  {
    path: "/add-user",
    name: "Tambah Pengguna",
    component: AddUserView,
    layout: "/admin",
  },
  { divider: true },
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
    // name: "Login",
    // icon: VpnKey,
    // iconColor: "Info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    // name: "Register",
    // icon: AccountCircle,
    // iconColor: "ErrorLight",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
