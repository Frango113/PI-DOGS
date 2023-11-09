import React, { useState } from "react";
import style from "./Form.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Form() {
  const [dogAdd, setDogAdd] = useState(false);
  const [create, setCreate] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    imagen: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
    temperament: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //! Validations
    if (
      !formData.name ||
      !formData.temperament ||
      !formData.maxWeight ||
      !formData.minWeight ||
      !formData.maxHeight ||
      !formData.maxHeight ||
      !formData.imagen ||
      !formData.life_span
    ) {
      alert("Por favor, complete los campos obligatorios.");
      return;
    }

    let errorMessage = "";

    if (typeof formData.name !== "string") {
      errorMessage = "El nombre debe ser una cadena de texto.";
    } else if (typeof formData.imagen !== "string") {
      errorMessage = "La imagen debe ser una cadena de texto (URL).";
    } else if (
      isNaN(formData.minHeight) ||
      isNaN(formData.maxHeight) ||
      isNaN(formData.minWeight) ||
      isNaN(formData.maxWeight)
    ) {
      errorMessage =
        "Las propiedades de altura y peso deben ser números válidos.";
    }

    if (errorMessage) {
      alert(`Error de validación: ${errorMessage}`);
    } else {
      try {
        let newDog = {
          name: formData.name,
          imagen: formData.imagen,
          peso: `${formData.minWeight} - ${formData.maxWeight}`,
          altura: `${formData.minHeight} - ${formData.maxHeight}`,
          life_span: formData.life_span,
          temperament: formData.temperament,
        };
        const response = await axios.post(
          "http://localhost:3001/dogs/",
          newDog
        );

        if (response) {
          // La solicitud se completó con éxito

          setDogAdd(true);
          setCreate(false);
        } else {
          // Hubo un error en la solicitud
          console.log("There was an error while creating the dog breed");
        }
      } catch (error) {
        console.error(
          "There was an error while sending data to the server: ",
          error
        );
        console.log("There was an error while creating the dog breed");
      }
    }
  };

  const handleBackClick = () => {
    // Cuando se hace clic en el botón "BACK", ocultar el mensaje.
    setDogAdd(false);
  };

  return (
    <>
      {dogAdd && (
        <div className={style.containerAdd}>
          <h1 className={style.add}>Dog has been succesfully added!</h1>
          <h2 className={style.addH2}>
            Congrats, you can now go back to the main page <br></br>&& serach
            your dog by its name! <br></br>
            <br></br>Happy <br></br> Dogging!
          </h2>
          <Link to="/home" className={style.back}>
            <button onClick={handleBackClick}>BACK</button>
          </Link>
        </div>
      )}
      {create && (
        <div className={style.container}>
          <form onSubmit={handleSubmit} className={style.create}>
            <label>
              Name:
              <input
                className={style.input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Insert name"
              />
            </label>
            <label>
              Image:
              <input
                className={style.input}
                type="text"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                placeholder="Insert image url"
              />
            </label>
            <label>
              Min Height:
              <input
                className={style.input}
                type="number"
                name="minHeight"
                value={formData.minHeight}
                onChange={handleChange}
                placeholder="Insert minimum height"
              />
            </label>
            <label>
              Max height:
              <input
                className={style.input}
                type="number"
                name="maxHeight"
                value={formData.maxHeight}
                onChange={handleChange}
                placeholder="Insert maximum height"
              />
            </label>
            <label>
              Min weight:
              <input
                className={style.input}
                type="number"
                name="minWeight"
                value={formData.minWeight}
                onChange={handleChange}
                placeholder="Insert minimumm weight"
              />
            </label>
            <label>
              Max weight:
              <input
                className={style.input}
                type="number"
                name="maxWeight"
                value={formData.maxWeight}
                onChange={handleChange}
                placeholder="insert maximum weight"
              />
            </label>
            <label>
              Life Span:
              <input
                className={style.input}
                type="number"
                name="life_span"
                value={formData.life_span}
                onChange={handleChange}
                placeholder="Insert life span"
              />
            </label>
            <label>
              Temper(s) (Separated by a semicolon):
              <input
                className={style.input}
                type="text"
                name="temperament"
                value={formData.temperament}
                onChange={handleChange}
                placeholder="Insert Tempers"
              />
            </label>
            <button type="submit" className={style.button}>
              Dog away!
            </button>
          </form>
        </div>
      )}
    </>
  );
}
