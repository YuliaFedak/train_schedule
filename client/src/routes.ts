import {ADMIN_PAGE, LOGIN_PAGE, TRAIN_TABLE_PAGE, WELCOME_PAGE} from "./utils/consts";
import General from "./pages/general";
import Login from "./pages/login";
import Table from "./pages/table";
import AdminGeneral from "./pages/adminGeneral";

export const userRoutes = [
    {
        path: WELCOME_PAGE,
        Component: General
    },
    {
        path: LOGIN_PAGE,
        Component: Login
    },
    {
        path: TRAIN_TABLE_PAGE,
        Component: Table
    }
]

export const adminRoutes = [
    {
        path: ADMIN_PAGE,
        Component: AdminGeneral
    }
];
