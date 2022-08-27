import { useState,useEffect,useRef} from 'react';

//API
import API from '../API';
import { isPersistedState } from '../helpers';

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0 
};
//console.log(initialState);
export const useHomeFetch = () =>{

  const [searchTerm,setSearchTerm]=useState('');
  const [state,setState] = useState(initialState); // el estado inicial y el estado de value
  const [loading,setLoading] = useState(false)//
  const[error,setError] = useState(false)// por si se recibe un error de la api
  // configurar el botton
  const [isLoadingMore,setIsLoadingMore] =useState(false);

  

   //obteniendo la API
  const fetchMovies = async(page,searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm,page);
      
      setState(prev =>({
            ...movies,
            results:
            page > 1 ? [...prev.results,...movies.results]: [...movies.results] // matriz de pelis antiguas y nuevas
      }));
    }catch(error){
      setError(true);

    }

    setLoading(false);
  };
  

  //initial and search
  useEffect(() => {
   if (!searchTerm){
      const sessionState=isPersistedState('homeState');

      if(sessionState){
        console.log('grabathing from sessionStorage');
        setState(sessionState);
        return;
      }
    }
    console.log('grabin  from api');
    setState(initialState);
    fetchMovies(1,searchTerm);
  },[searchTerm]);

  //load More
  useEffect(() => {
    if(!isLoadingMore) return;
    fetchMovies(state.page +1,searchTerm);
    setIsLoadingMore(false);
  },[isLoadingMore,searchTerm,state.page]);

  //Write to sessionStorage

 useEffect(() => {
    if(!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state));
  },[searchTerm,state]);

  
  return {state,loading,error,searchTerm, setSearchTerm,setIsLoadingMore};
};