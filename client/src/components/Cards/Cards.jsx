import React, { useState } from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";

export default function Cards(props) {
  const { dogs, onClose } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8; // Número de perros por página

  // Calcular el índice de inicio y fin para la página actual
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  // Obtener los perros para la página actual
  const dogsToShow = dogs.slice(startIndex, endIndex);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={style.container}>
        {dogsToShow.map((dog) => (
          <Card
            key={dog.id + Math.random() * 10}
            id={dog?.id}
            name={dog?.name}
            weight={dog.weight ? dog.weight : dog.peso}
            image={dog?.imagen}
            temperament={dog?.temperament}
            onClose={onClose}
          />
        ))}
      </div>

      {}
      <div className={style.pagination}>
        {/* previous */}
        <button
          className={style.next}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          PREV
        </button>

        {/* page buttons*/}
        {Array.from(
          { length: Math.ceil(dogs.length / perPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? style.actual : style.other}
            >
              {index + 1}
            </button>
          )
        )}

        {/* next */}
        <button
          className={style.next}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(dogs.length / perPage)}
        >
          NEXT
        </button>
      </div>
    </>
  );
}
