import { Route, Routes } from "react-router-dom";
import routes from "./data/router";
import Overlay from "./components/overlay/Overlay";
import PetContext from "./PetsContext";
import { PetProvider } from "./PetsProvider";

function App() {
  return (
    <div className="App">
      <PetProvider>
        <Overlay>
          <Routes>
            {routes.map((r, i) => (
              <Route path={r.path} element={r.element} key={i} />
            ))}
          </Routes>
        </Overlay>
      </PetProvider>
    </div>
  );
}

export default App;
