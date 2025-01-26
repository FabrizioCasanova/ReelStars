import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const SeriesContext = createContext();

// Proveedor del contexto
export const SeriesProvider = ({ children }) => {

    const [movieSelected, setMovieSelected] = useState({})

    const [serieSelected, setSerieSelected] = useState({})

    const [trailer, setTrailer] = useState({})

    const [cast, setCast] = useState('')

    const [genre, setGenre] = useState('')

    const [userSearch, setUserSearch] = useState('')

    const [foundMovies, setFoundMovie] = useState([])

    const [trailerController, setTrailerController] = useState(false)

    const [menuVisible, setMenuVisible] = useState(false);

    const [toogleClasses, setToogleClasses] = useState(false)

    const [genreSelected, setGenreSelected] = useState('')

    const [genreSerieSelected, setGenreSerieSelected] = useState('')

    const [ActorSelected, setActorSelected] = useState('')

    const [FoundSeries, setFoundSeries] = useState([])

    const [MoviesOfActorSelected, setMoviesOfActorSelected] = useState([])

    const [moviesWithGenresSelected, setMoviesWithGenresSelected] = useState([])

    const [seriesWithGenresSelected, setSeriesWithGenresSelected] = useState([])

    const [typeOfSearch, setTypeOfSearch] = useState(1);

    return (
        <SeriesContext.Provider value={{ 
            movieSelected, setMovieSelected,
            serieSelected, setSerieSelected, 
            trailer, setTrailer, 
            genre, setGenre, 
            cast, setCast,
            userSearch,setUserSearch,
            foundMovies,setFoundMovie,
            trailerController,setTrailerController,
            menuVisible,setMenuVisible,
            toogleClasses,setToogleClasses,
            genreSelected,setGenreSelected,
            genreSerieSelected,setGenreSerieSelected,
            ActorSelected, setActorSelected,
            FoundSeries,setFoundSeries,
            MoviesOfActorSelected,setMoviesOfActorSelected,
            moviesWithGenresSelected,setMoviesWithGenresSelected,
            seriesWithGenresSelected,setSeriesWithGenresSelected,
            typeOfSearch, setTypeOfSearch
        }}>
            {children}
        </SeriesContext.Provider>
    );
};

// Hook para usar el contexto fácilmente
export const useSeries = () => useContext(SeriesContext);
