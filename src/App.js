// Realizamos las importaciones necesarias
import React, { useState } from "react";
import axios from "axios";
import YouTube from 'react-youtube';
import './App.css';

function App() {
  //! Declaramos las constantes para hacer las peticiones
  // Constante para el endpoint
  const API_URL = "https://api.themoviedb.org/3";
  // Constante Autentificación de la API key
  const API_KEY = "1541b29aa49661a886e50520c26e8ade";
  // Constante de Petición o endpoint de la imagen
  const IMAGEN_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGEN = "https://image.tmdb.org/t/p/original";

  //! Creacion de variables de estado
  // Constante para la peticion a la API y trater la colleccion para trabajarla
  const [peliculas, colpeliculas] = useState([]);
  // Obtener información de la caja de texto
  const [buscarLlave, colLlave] = useState("");
  // Constantes para el switch del trailer (encendido, apagado)
  const [trailer, colTrailer] = useState(null);
  const [pelicula, colPelicula] = useState({title: "Cargando Peliculas"});
  const [reproducir, colReproducir] = useState(false);

  //! Función para hacer la petición get y traer la colección peliculas de la API
  const buscarPeliculas = async(buscarLlave) =>{
    const type = buscarLlave ? "buscar" : "encontrar";
    //Creamos una constante donde hacesmos una destructuración rápida
    const {data: {results},
    //Petición a la API en donde le pasamos la endpoint (concatenamos)
  } = await axios.get(`${API_URL}/${type}/movie`, {
    //Enviamos parametros a la API
    params: {
      api_key: API_KEY, // validación
      query: buscarLlave // búsqueda para filtrar
    },
  });

  // Guardamos los resultados en la variable de estado
  colpeliculas(results)
  // Establecemos la posición (de la colección queremos el primer resultado)
  colpeliculas(results[0])
  }


  return (
    <div>

    </div>
  );
}

export default App;
