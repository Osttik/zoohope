import { Navigate, RouteObject } from "react-router";
import { PetList } from "../components/pet-list/petList";
import Pet from "../components/PetPage/Pet";
import Home from "../components/home";


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

  { // Needs to be in the end
    path: "*",
    element: <Navigate to="/" />
  },
];

export default routes;