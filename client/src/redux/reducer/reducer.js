import { GET_GAMES, SEARCH_GAME, FILTERS,GET_GENRES, GET_PLATFORMS } from "../action/action";

const initialState = {
  videogames: [],
  copygames:[],
  genres:[],
  platforms:[]

};

const rootReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    //obtener todos los juegos
    case GET_GAMES:
      return {
        ...state,
        videogames: [...action.payload],
        copygames:[...action.payload]
      };
    //obtener todos los generos
    case GET_GENRES:
      return {
        ...state,
        genres:[...action.payload]
      };
    //obtener todos las plataformas
    case GET_PLATFORMS:
      return {
        ...state,
        platforms:[...action.payload]
      };

    //buscar juegos por nombre
    case SEARCH_GAME:
      return {
        ...state,
        videogames: [...action.payload],
        // copygames:[...action.payload]
      };
    //filtrar db/api

    case FILTERS: {
      return {
        ...state,
        videogames: [...action.payload],
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
