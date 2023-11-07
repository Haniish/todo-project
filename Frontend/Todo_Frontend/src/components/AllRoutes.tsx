import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import CompletedTasks from "../pages/CompletedTasks";
import SchedulerPage from "../pages/SchedulerPage";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/completedtasks" element={<CompletedTasks />} />
        <Route path="/scheduler" element={<SchedulerPage />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;
