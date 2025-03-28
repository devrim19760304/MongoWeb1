import { BrowserRouter, Route, Routes } from "react-router-dom";

import GetData from "./components/GetData";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AddData from "./components/AddData";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alldata" element={<GetData />} />
        <Route path="/addnew" element={<AddData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
