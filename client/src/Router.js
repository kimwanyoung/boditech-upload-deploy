import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sheet from "./pages/Sheet";
import Login from "./pages/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Sheet" element={<Sheet/>}/>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;