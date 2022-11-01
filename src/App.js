import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";
import { useState } from "react";
import Main from "./screens/Main";
import Header from "./components/partials/Header";
import SideBar from "./components/partials/SideBar";
import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./screens/AuthRoutes";

function App() {
  const [isOpen, setOpen] = useState(true);
  const [token, setToken] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        {token ? (
          <>
            <Header isOpen={isOpen} setOpen={setOpen} />
            <div className="position-relative ">
              <SideBar isOpen={isOpen} setOpen={setOpen} />
              <Main />
            </div>
          </>
        ) : (
          <AuthRoutes />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
