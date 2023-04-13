import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Viewbook from "./components/Viewbook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/viewbook" element={<Viewbook />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
