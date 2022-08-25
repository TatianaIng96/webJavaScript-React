import React, {useState,useEffect} from 'react'; // para crear u estato se importa useState

//config

import { POSTER_SIZE, BACKDROP_SIZE,IMAGE_BASE_URL} from '../config';  // Tamaño del guion bajo del cartel, Telon de fondo y la url de subrayado de imagen

//Component
import HeroImage from './HeroImage';
import Grid from './Grid';


// Hook
import {useHomeFetch} from '../hooks/useHomeFetch'


//Imagen
import NoImage from '../images/no_image.jpg';

const Home = () => {
    
    const {state,loading,error}=useHomeFetch();

    console.log(state); 
    //imagen de fondo
    return (
        <> 
            {state.results[0] ? (
                <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                    title={state.results[0].original_title}
                    text={state.results[0].overview}
                />
            ) : null}
            <Grid header='Popular Movies'> 
                {state.results.map(movie => (
                  <div key={movie.id}>{movie.title}</div>  
                ))}
            </Grid>
        </>      
    );
};

export default Home;

