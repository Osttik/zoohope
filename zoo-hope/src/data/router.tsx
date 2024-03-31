import { Navigate, RouteObject } from "react-router";
import App from "../App";
import { PetList } from "../components/pet-list/petList";
import Pet from "../components/PetPage/Pet";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
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