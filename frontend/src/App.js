import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Button from "./components/UI/atoms/button";
import Search from "./components/UI/atoms/search"
import Footer from "./components/UI/molecules/footer";
import NavBar from "./components/UI/molecules/NavBar";
import Login from "./components/pages/login";
import ItemOverview from "./components/pages/itemOverview";
import Home from "./components/pages/home";
import User from "./components/pages/user";
function App() {

  //TODO: why is below not working?
  // if (!localStorage.getItem("token")) {
  //   return <Login />
  // }
  return (
    <div className="App">
      <NavBar />
      {/* <BrowserRouter> */}
      <Routes>
        <Route exact path="/btn" element={<Button buttonType={"USER"} redirectUrl={"https://stackoverflow.com/"} />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/item/:itemID" element={<ItemOverview />} />
        <Route exact path="/user/:userID" element={<User />} />
        <Route exact path="/shop" element={<User />} />
        <Route exact path="/shop/:shopName" element={<User />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
        
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
