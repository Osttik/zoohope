import { Navigate, RouteObject } from "react-router";
import { PetList } from "../components/pet-list/petList";
import Pet from "../components/PetPage/Pet";
import Home from "../components/home";
import { HelpUsPage } from "../components/helpUsPage/helpUsPageage";
import { LoginPage } from "../components/login-page";
import { AdminPage } from "../components/admin-page";
import { AccessFunc } from "../components/login-page/access";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/petList",
    element: <PetList />,
  },
  {
    path: "/animal/:id",
    element: <Pet />,
  },
  {
    path: "/admin",
    element: <AccessFunc role="admin"><AdminPage /></AccessFunc>
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/helpUs",
    element: <HelpUsPage />,
  },
  
  { // Needs to be in the end
    path: "*",
    element: <Navigate to="/" />
  },
];

export default routes;
