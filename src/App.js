import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./screens/Main";
import { ToastContainer } from "react-toastify";

function App() {
  return (

    <BrowserRouter>
      <Main />
      <ToastContainer />

    </BrowserRouter>

);
}

export default App;
