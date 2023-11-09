import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTemperaments,
  orderDogs,
  dogByName,
  dogById,
  allDogs,
  allTemperaments,
  clearDogs,
} from "../../redux/actions";
import style from "./SearchBar.module.css";
import searchIcon from "../../assets/search.png";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  //const order = useSelector((state) => state.orderAndFilter.order);

  function HandleChange(e) {
    e.preventDefault();

    let input = e.target.value;

    setName(input);
  }
  //!FUNCION VIEJA
  /*   const onSearch = async (event) => {
    clearDogs();
    if (name.length > 3) {
      await dispatch(dogByName(name));
      dispatch(orderDogs(order));
    } else if (name.length === 0) {
      dispatch(dogById(1));
    } else {
      dispatch(clearDogs());
      dispatch(dogById(name));
    }
    dispatch(filterTemperaments("All"));
  }; */

  //?Función nueval para buscar por ID && Nombre
  const Numerico = Number(name);
  //console.log(Numerico);
  const onSearch = async (event) => {
    clearDogs();
    if (Numerico) {
      dispatch(dogById(Numerico));
    } else {
      dispatch(dogByName(name));
    }
    dispatch(filterTemperaments("All"));
  };
  return (
    <div className={style.searchBar}>
      <input
        className={style.input}
        type="search"
        placeholder="Search for a name or ID"
        value={name}
        onChange={HandleChange}
      />
      <button className={style.search} onClick={() => onSearch(name)}>
        <img src={searchIcon} />
      </button>
    </div>
  );
}
