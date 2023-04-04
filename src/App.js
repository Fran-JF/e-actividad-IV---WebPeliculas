// Realizamos las importaciones necesarias
import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from 'react-youtube';
import './App.css';
// Imagen del logo
import logo from "../src/img/logo-cine.png";

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
  const [movies, setMovies] = useState([]);
  // Obtener información de la caja de texto
  const [searchkey, setSearchKey] = useState("");
  // Constantes para el switch del trailer (encendido, apagado)
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({title: "Cargando Peliculas"});
  const [playing, setPlaying] = useState(false);

  //! Función para hacer la petición get y traer la colección peliculas de la API
  const buscarPeliculas = async(searchkey) =>{
    const type = searchkey ? "search" : "discover"
    //Creamos una constante donde hacesmos una destructuración rápida
    const {data: {results},
    //Petición a la API en donde le pasamos la endpoint (concatenamos)
  } = await axios.get(`${API_URL}/${type}/movie`, {
    //Enviamos parametros a la API
    params: {
      api_key: API_KEY, // validación
      query: searchkey, // búsqueda para filtrar
    },
  });

  // Guardamos los resultados en la variable de estado
  setMovies(results)
  // Establecemos la posición (de la colección queremos el primer resultado)
  setMovie(results[0])
  }

  //! Función para buscar peliculas
  //Filtro para buscar una key y a traves de ella encontrar el trailer correspondiente
  const buscarTrailer=(e)=>{
    e.preventDefault()
    //pedimos a la funcion la variable de estado para capturar el id de la pelicula a buscar
    buscarPeliculas(searchkey)
  }


  //! Montamos el componente a renderizar
  useEffect(()=>{
    buscarPeliculas();
    // [] Condición dependencias o no dependencias
  },[])

  //! Función para buscar una pelicula en especifico
  // filtra la pelicula que selecionemos, peticion de un solo objeto

  const buscarPelicula= async(id)=>{
    //destrucruramos la data, colocamos la peticion como en la doc. y enviamos un objeto
    const {data} = await axios.get(`${API_URL}/movie/${id}`,{
      params:{
        api_key: API_KEY,
        append_to_response:"videos"
      }
    })
    //Validamos los datos de la pelicula
    if (data.videos && data.videos.results) {
      // Gurdamos los resultados de la busqueda en una variable
      const trailer = data.videos.results
    }

  }

  //! Renderización
  return (
  <body>
    <div>
      {/*Búscador*/}
      {/*onSubmit permite que permite a la función*/}
      <form className="container caja-texto" onSubmit={buscarTrailer}>
        {/*onChange permite escuchar la información que se ingrese en la caja de texto*/}
        <input className="input-buscador" type="text" placeholder="Buscar..." onChange={(e)=> setSearchKey(e.target.value)}/>
        <button className="boton-buscador btn btn-primary">
            Buscar
        </button>
      </form>
    </div>
    <div>
      {/*Contenedor de todos los poster de las peliculas*/}
      <div className="container mt-3">
        {/*Renderizado*/}
        <div className="row">
          {movies.map((movie)=>(
            <div key={movie.id} className="container-imagen col-md-3 mb-3">
              <img src={`${URL_IMAGEN + movie.poster_path}`} alt="Poster de la película" height={"90%"} width="100%"></img>
              <h4 className="text-center">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/*Sección (Footer)*/}
        <section class="contenedor6">
            <footer class="footer">
                {/*Logo del footer*/}
                <img src={logo} alt="logo cineLatino" class="logo-footer"></img>
                {/*Contenedor de los iconos*/}
                <div class="iconos-contenedor">
                    <a href="#" class="icon"></a>
                    <a href="#" class="icon"></a>
                    <a href="#" class="icon"></a>
                    <a href="#" class="icon"></a>
                </div>
                {/*Lista con los parametros del footer*/}
                <ul class="menu-contenedor">
                    <li class="item-menu">Cookies</li>
                    <li class="item-menu">Privacy</li>
                    <li class="item-menu">Refounds</li>
                    <li class="item-menu">Autor: José Uzcátegui</li>
                    <li class="item-menu">Ing. Computación</li>
                </ul>
                {/*<Copyright del footer*/}
                <span class="copyright">2022, UVM. Todos los derechos reservados</span>
            </footer>
        </section>
  </body>  
  );
}

export default App;
