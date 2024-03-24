import { Navigate, RouteObject } from "react-router";
import App from "../App";
import { PetList } from "../components/pet-list/petList";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/petList",
    element: <PetList />,
  },

  { // Needs to be in the end
    path: "*",
    element: <Navigate to="/" />
  },
];

export default routes;