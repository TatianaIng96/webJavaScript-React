import React, {useState,useEffect} from 'react'; // para crear u estato se importa useState

//config

import { POSTER_SIZE, BACKDROP_SIZE,IMAGE_BASE_URL} from '../config';  // Tamaño del guion bajo del cartel, Telon de fondo y la url de subrayado de imagen

//Component



// Hook
import {useHomeFetch} from '../hooks/useHomeFetch'


//Imagen
import NoImage from '../images/no_image.jpg';

const Home = () => {
    
    const {state,loading,error}=useHomeFetch();

    console.log(state); 

    return <div> Home Page</div>
};

export default Home;

