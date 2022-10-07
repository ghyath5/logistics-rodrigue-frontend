import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";
import { useState } from "react";
import Main from "./screens/Main";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

function App() {
  const [isOpen, setOpen] = useState(true);
  return (
    <div className="App">
      <Header isOpen={isOpen} setOpen={setOpen} />
      <div className="position-relative ">
        <SideBar isOpen={isOpen} setOpen={setOpen} />
        <Main />
      </div>
    </div>
  );
}

export default App;
