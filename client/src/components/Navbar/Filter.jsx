import style from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  orderDogs,
  filterTemperaments,
  filterOrigin,
} from "../../Redux/actions";

export default function Filter() {
  const dispatch = useDispatch();
  const temperament = useSelector((state) => state.temperament);
  const order = useSelector((state) => state.orderAndFilter.order);
  const tempFilter = useSelector((state) => state.orderAndFilter.tempFilter);
  const originFilter = useSelector(
    (state) => state.orderAndFilter.originFilter
  );

  const handleOrder = (event) => {
    dispatch(orderDogs(event.target.value));
  };
  const handleFilterByTemp = (event) => {
    dispatch(filterTemperaments(event.target.value));
  };
  const handleFilterByOrigin = (event) => {
    dispatch(filterOrigin(event.target.value));
  };

  return (
    <div className={style.filters}>
      <select name="order" value={order} onChange={handleOrder}>
        <option value="A">A-Z</option>
        <option value="D">Z-A</option>
        <option value="maxWeight">HEAVIEST</option>
        <option value="minWeight">LIGHTEST</option>
      </select>
      <select
        name="filterTemp"
        value={tempFilter}
        onChange={handleFilterByTemp}
      >
        <option value="All">ALL</option>
        {temperament.map((temp) => {
          return (
            <option value={temp} key={temp}>
              {temp.toUpperCase()}
            </option>
          );
        })}
      </select>
      <select
        name="filterOrigin"
        value={originFilter}
        onChange={handleFilterByOrigin}
      >
        <option value="all">ALL</option>
        <option value="real">API</option>
        <option value="created">CREATED</option>
      </select>
    </div>
  );
}
