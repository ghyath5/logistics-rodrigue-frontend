import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";
import { useState } from "react";
import Main from "./screens/Main";
import Header from "./components/partials/Header";
import SideBar from "./components/partials/SideBar";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [isOpen, setOpen] = useState(true);
  return (
    <div className="App">
      <BrowserRouter>
        <Header isOpen={isOpen} setOpen={setOpen} />
        <div className="position-relative ">
          <SideBar isOpen={isOpen} setOpen={setOpen} />
          <Main />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
