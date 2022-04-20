import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Button from "./components/UI/atoms/button";
import Search from "./components/UI/atoms/search"
import Footer from "./components/UI/molecules/footer";
import NavBar from "./components/UI/molecules/NavBar";
function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <NavBar />
      <div className="App">
        <Routes>
          <Route exact path="/btn" element={<Button buttonType={"USER"} redirectUrl={"https://stackoverflow.com/"} />} />
          <Route exact path="/search" element={<Search />} />
          
        </Routes>
      </div>
      {/* </BrowserRouter> */}

      <Footer />
    </div>
  );
}

export default App;
