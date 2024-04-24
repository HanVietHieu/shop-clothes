import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { PATHS } from "./Path";
import Mainlayout from "./MainLayout";

const RouterList = [
  {
    element: <Mainlayout />,
    children: [
      {
        element: <Home />,
        path: PATHS.HOME_PAGE,
      },
      {
        element: <Login />,
        path: PATHS.LOGIN_PAGE,
      },
      {
        element: <Register />,
        path: PATHS.REGISTER_PAGE,
      },
    ],
  },
];
export default RouterList;
