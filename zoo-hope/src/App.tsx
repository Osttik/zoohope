import { Route, Routes } from "react-router-dom";
import routes from "./data/router";
import Overlay from "./components/overlay/Overlay";

function App() {
  return (
    <div className="App">
      <Overlay>
        <Routes>
          {routes.map((r, i) => (
            <Route path={r.path} element={r.element} key={i} />
          ))}
        </Routes>
      </Overlay>
    </div>
  );
}

export default App;
