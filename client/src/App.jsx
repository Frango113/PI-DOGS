import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import style from "./App.module.css";
// Importaciones de redux
import { useDispatch, useSelector } from "react-redux";
import { clearDogs, allDogs } from "./Redux/actions";
// Importaciones de componentes
import LandingPage from "./components/Landing/LandingPage";
import Cards from "./components/Cards/Cards";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Detail from "./components/Detail/Detail";

export default function App() {
  const dogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearDogs());
    dispatch(allDogs());
  }, []);

  useEffect(() => {
    dispatch(clearDogs) && navigate("/");
  }, []);
//holi
  return (
    <div className={style.App}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Cards dogs={dogs} />
              <Footer />
            </>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <>
              <Navbar />
              <Detail />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}
