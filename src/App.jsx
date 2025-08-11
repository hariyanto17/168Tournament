import { createBrowserRouter, RouterProvider } from "react-router";
import {
  Bagan,
  Contact,
  Dashboard,
  Services,
  Login,
  Register,
  Streamers,
} from "./pages";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/Bagan",
    Component: Bagan,
  },
  {
    path: "/services",
    Component: Services,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/streamers",
    Component: Streamers,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
