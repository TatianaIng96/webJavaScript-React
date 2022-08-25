import { useState,useEffect,useRef} from 'react';

//API
import API from '../API';

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0 
};
//console.log(initialState);
export const useHomeFetch = () =>{
  const [state,serState] = useState(initialState); // el estado inicial y el estado de value
  const [loading,setLoading] = useState(false)//
  const[error,setError] = useState(false)// por si se recibe un error de la api
  
   //obteniendo la API
  const fetchMovies = async(page,searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm,page);
      
      serState(prev =>({
            ...movies,
            results:
            page > 1 ? [...prev.results,...movies.results]: [...movies.results] // matriz de pelis antiguas y nuevas
      }));
    }catch(error){
      setError(true);

    }

    setLoading(false);
  };
  
  //initial render
  useEffect(() => {
      fetchMovies(1);
  },[]);
  
  return {state,loading,error};
};