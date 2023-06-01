import logo from "./logo.svg";
import "./App.css";
import { AppRouter } from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppRouter></AppRouter>
    </BrowserRouter>
  );
}

export default App;
