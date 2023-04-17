import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import style from "./Home.module.css";
import Cards from "../Cards/Cards";
import FilterdbApi from "../Filters/FilterdbApi/FilterdbApi.jsx";
import Paginate from "../Paginate/Paginate";
import FilterRating from "../Filters/FilterRating/FilterRating";
import FilterGenre from "../Filters/FilterGenre/FilterGenre";
import FilterAZ from "../Filters/FilterAZ/FilterAZ";
import FilterName from "../Filters/FilterName/FilterName";
import Loading from "../Loading/Loading";
import { getGames, getGenres } from "../../redux/action/action";
export default function Home() {
  const videogames = useSelector((state) => state.videogames); // estado global con todos los personajes
  //depachador // Getgames
  const dispatch = useDispatch();

  const [games, setgames] = useState([...videogames]); // estado para los personajes paginados
  const [paginate, setPaginate] = useState(null); // estado para los personajes paginados
  const [loading, setLoading] = useState(true);
  const [loadingFilters, setLoadingFilters] = useState(null); // estado de loading para los filtros (busqueda por nomre, filtro genres, filtro db/api)
  const [error, setError] = useState(null);

  //se ejecute solo una vez al montar el componente
  useEffect(() => {
    Promise.all([dispatch(getGames()), dispatch(getGenres())])
      .then((results) => {
        // handle results if necessary
        setLoading(false)
      })
      
  }, []);

  //actualizar el estado de paginate cuando videogames cambie,
  useEffect(() => {
    setgames([...videogames])
  }, [videogames]);

  useEffect(() => {
    setPaginate(games.slice(0, 10)); // use slice only if games is an array
  }, [games]);

  return (
    <>
      {loading && <Loading />}

      {!loading && (
        <div className={style.wrapper}>
          <div className={style.filterSection}>
            <div className={style.filter_name}>
              <FilterName setError={setError} setgames={setgames} loadingFilters={loadingFilters} setLoadingFilters={setLoadingFilters} />
            </div>
            { (
              <div className={style.filters}>
                <div className={style.select}>

                {/* {games?.length > 0 && 
                 <div className={style.select}>
                 <FilterGenre videogames={games} setPaginate={setPaginate} setgames={setgames} setError={setError}/>
                 <FilterdbApi videogames={games} setgames={setgames} setLoading={setLoading} setPaginate={setPaginate}/>
                 </div>
                } */}
          
  
                <FilterGenre/>
                <FilterdbApi setgames={setgames}/>
                </div>
                {(!error && games?.length > 1) && (<div className={style.botones}>
                <FilterRating setgames={setgames} games={games}/>
                <FilterAZ setgames={setgames} games={games} />
                </div>)}
                
              </div>
            )}
          </div>

          {!error && !loadingFilters && (
            <div>
              <main className={style.main}>
                <Cards paginate={paginate} />
              </main>
            </div>
          )}

          {!error && !loadingFilters && (
            <div className={style.paginate}>
              <Paginate
                videogames={games}
                setPaginate={setPaginate}
                setLanding={setLoading}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      )}
      {error && <p id={style.error}>{error}</p>}

    </>
  );
}
