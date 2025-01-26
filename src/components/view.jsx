import Search from "./requestSearch"
import { useEffect, useRef } from "react"
import { ClipLoader } from "react-spinners"
import YouTube from "react-youtube"
import Carousel from "./carrousel"
import BackgroundMovieSelected from "./BackgroundMovieSelected"
import GenreSelected from "./GenreSelected"
import MostPopularMovies from "./mostPopularMovies"
import HeadSection from "./HeadSection"
import SearchedMovies from "./SearchedMovies"
import ActorSelectedMovies from "./ActorSelectedMovies"
import SearchActorMovies from "./SearchActorMovies"
import { Notyf } from "notyf"
import SearchSeries from "./SearhSeries"
import SearchedSeries from "./SearchedSeries"
import BackgroundSerieSelected from "./BackgroundSerieSelected"
import GenreSeriesSelected from "./GenreSeriesSelected"
import MostPopularSeries from "./mostPopularSeries"
import MostPopularActors from "./MostPopularActors"
import { useSeries } from "../seriesContext"


const notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'center',
      y: 'top',
    },
    types: [
      {
        type: 'warning',
        background: 'orange',
        icon: {
          className: 'material-icons',
          tagName: 'i',
          text: 'warning'
        }
      },
      {
        type: 'error',
        background: 'indianred',
        duration: 3000,
        dismissible: true
      }
    ]
  });

const View = ({ request, serieRequest, actorsRequest, loading, listGenres, listSerieGenres }) => {

    const {movieSelected, setMovieSelected, serieSelected, setSerieSelected, trailer, setTrailer, genre, setGenre, cast, setCast, userSearch, setUserSearch, foundMovies, setFoundMovie,
        trailerController, setTrailerController, menuVisible, setMenuVisible, toogleClasses, setToogleClasses, genreSelected, setGenreSelected, genreSerieSelected, setGenreSerieSelected,
        ActorSelected, setActorSelected, FoundSeries, setFoundSeries, MoviesOfActorSelected,setMoviesOfActorSelected, moviesWithGenresSelected, setMoviesWithGenresSelected,
        seriesWithGenresSelected, setSeriesWithGenresSelected, typeOfSearch, setTypeOfSearch } = useSeries()
        

    const UrlImage = "https://image.tmdb.org/t/p/original"

    const inputSearchRef = useRef(null)

    const inputSearch = document.getElementById('inputSearch')

    const iconSearchMobile = document.getElementById('icon-search-mobile')



    const search = (e) => {

        setUserSearch(e.target.value)

    }

    const handlerInput = async () => {

        if (userSearch === '') {

        } else { 

            const callMovies = await Search(userSearch)
 
            if(callMovies.results.length !== 0){

            setFoundMovie(await callMovies.results)

            } else {
                
                notyf.error('No se han encontrado resultados');
                goBackSectionMovies()
            }

            resetGenresInSearchingMovies()
        }
    }

    const handlerInputSerie = async () => {

        if (userSearch === '') {

        } else {

            const callSeries = await SearchSeries(userSearch)

            if(callSeries.results.length !== 0){

            setFoundSeries(await callSeries.results)

            } else {

                notyf.error('No se han encontrado resultados');
                goBackSectionMovies()

            }

            resetGenresInSearchingMovies()
        }
    }

    const handlerInputActor = async () => {

        if (userSearch === '') {

        } else {

            const callMoviesActor = await SearchActorMovies(userSearch)

            if(callMoviesActor.results.length !== 0){

            setActorSelected(await callMoviesActor.results[0].id)

            } else {

                notyf.error('No se han encontrado resultados');
                goBackSectionMovies()

            }

            resetGenresInSearchingMovies()
        }
    }


    const handlerEnterPress = async (e) => {

        if (userSearch === '') {

        } else {

            if (e.key === 'Enter') {

                const callMovies = await Search(userSearch)

                if(callMovies.results.length !== 0){
                    
                    setFoundMovie(await callMovies.results)
                
                    iconSearchMobile.classList.replace('icon-search-mobile', 'icon-search-mobile-none')
             
                } else{

                    notyf.error('No se han encontrado resultados');
                    goBackSectionMovies()

                }
                    resetGenresInSearchingMovies()
                    inputSearch.value = ''

            }
        }
    }

    const handlerEnterPressActor = async (e) => {

        if (userSearch === '') {
            
        } else {

            if (e.key === 'Enter') {

                const callMoviesActor = await SearchActorMovies(userSearch)

            if(callMoviesActor.results.length !== 0){
    
            setActorSelected(await callMoviesActor.results[0].id) 

            iconSearchMobile.classList.replace('icon-search-mobile', 'icon-search-mobile-none')
   
            } else {
                notyf.error('No se han encontrado resultados');
                goBackSectionMovies()
            }
                resetGenresInSearchingMovies()
                inputSearch.value = ''
                
            }
        }
    }
    const handlerEnterPressSeries = async (e) => {

        if (userSearch === '') {
            
        } else {

            if (e.key === 'Enter') {

                const callMoviesSeries = await SearchSeries(userSearch)

            if(callMoviesSeries.results.length !== 0){

                setFoundSeries(await callMoviesSeries.results) 
                iconSearchMobile.classList.replace('icon-search-mobile', 'icon-search-mobile-none')
   
            } else {
                notyf.error('No se han encontrado resultados');
                goBackSectionMovies()
            }
                resetGenresInSearchingMovies()
                inputSearch.value = ''
            }
        }
    }

    const handlerClickMovie = (movie) => {

        setMovieSelected(movie)

        setToogleClasses(!toogleClasses)

        window.scrollTo(0, 0);

    }

    
    const handlerClickSerie = (serie) => {

        setSerieSelected(serie)

        setToogleClasses(!toogleClasses)

        window.scrollTo(0, 0);

    }

    const goBack = () => {

        setToogleClasses(!toogleClasses)

        setMovieSelected({})
        
        setSerieSelected({})
        
    }

    const goBackSectionMovies = () => {

        setFoundMovie([])

        setFoundSeries([])

        setMoviesOfActorSelected([])

        setMoviesWithGenresSelected([])

        setActorSelected('')

        inputSearch.value = ''

        setUserSearch('')

        iconSearchMobile.classList.replace('icon-search-mobile-none', 'icon-search-mobile')

    }

    const toggleTrailerController = () => {

        setTrailerController(!trailerController)

    }
    useEffect(() => {

        if (movieSelected.id) {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzBhZDM5MGMxOWE2YWNlMGUwZTYwMDMyZDA0YTRlMCIsInN1YiI6IjY1YzJhMGZhOTYwMzMxMDBiNWI3YThmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XOntdV8qAcV005YfOZFDqJOzEgoUofUJo8zjNR6Cevs'
                }
            };

            fetch(`https://api.themoviedb.org/3/movie/${movieSelected.id}/videos`, options)
                .then(response => response.json())
                .then(response => setTrailer(response.results.reverse().find(videos => videos.type === "Trailer")))
                .catch(err => console.error(err));

            fetch(`https://api.themoviedb.org/3/movie/${movieSelected.id}?language=en-US`, options)
                .then(response => response.json())
                .then(response => setGenre(response.genres))
                .catch(err => console.error(err));

            fetch(`https://api.themoviedb.org/3/movie/${movieSelected.id}/credits`, options)
                .then(response => response.json())
                .then(response => setCast(response.cast))
                .catch(err => console.error(err));

        }

    }, [movieSelected, setCast, setGenre, setTrailer])

    useEffect(() => {

        if (serieSelected.id) {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzBhZDM5MGMxOWE2YWNlMGUwZTYwMDMyZDA0YTRlMCIsInN1YiI6IjY1YzJhMGZhOTYwMzMxMDBiNWI3YThmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XOntdV8qAcV005YfOZFDqJOzEgoUofUJo8zjNR6Cevs'
                }
            };


            fetch(`https://api.themoviedb.org/3/tv/${serieSelected.id}/videos`, options)
                .then(response => response.json())
                .then(response => setTrailer(response.results.reverse().find(videos => videos.type === "Trailer")))
                .catch(err => console.error(err));

            fetch(`https://api.themoviedb.org/3/tv/${serieSelected.id}?language=en-US`, options)
                .then(response => response.json())
                .then(response => setGenre(response.genres))
                .catch(err => console.error(err));

            fetch(`https://api.themoviedb.org/3/tv/${serieSelected.id}/credits`, options)
                .then(response => response.json())
                .then(response => setCast(response.cast))
                .catch(err => console.error(err));

        }

    }, [serieSelected, setCast, setGenre, setTrailer])


    const clickGenres = (genreID) => {

        setGenreSelected(genreID)

    }

    const clickSerieGenres = (genreID) => {

        setGenreSerieSelected(genreID)

     
    }

    const clickGenresMobile = (genreID) => {

        setGenreSelected(genreID)
        setMenuVisible(!menuVisible)

    }

    const clickGenresSeriesMobile = (genreID) => {

        setGenreSerieSelected(genreID)
        setMenuVisible(!menuVisible)

    }

    const resetGenresMobile = () => {

        setGenreSelected('')

        setMoviesWithGenresSelected([])

        setGenreSerieSelected('')

        setSeriesWithGenresSelected([])

        setMenuVisible(!menuVisible)

    }

    const resetGenres = () => {

        setGenreSelected('')

        setMoviesWithGenresSelected([])

        setGenreSerieSelected('')

        setSeriesWithGenresSelected([])

    }

    const resetGenresInSearchingMovies = () => {

        setGenreSelected('')

        setMoviesWithGenresSelected([])

        setGenreSerieSelected('')

        setSeriesWithGenresSelected([])

    }

    const clickGenreOnMovieSelected = (itemID) => {

        setGenreSelected(itemID)

        setFoundMovie([])

        setFoundSeries([])

        inputSearch.value = ''

        goBack()

    }

    const clickGenreOnSerieSelected = (itemID) => {

        setGenreSerieSelected(itemID)

        setFoundMovie([])
    
        setFoundSeries([])

        inputSearch.value = ''

        goBack()

    }


    const clickPopularActors = (actorID) => {

        window.scrollTo(0, 0);

        setActorSelected(actorID)

        setFoundMovie([])

        setFoundSeries([])

        setMovieSelected({})
        
        setSerieSelected({})

        iconSearchMobile.classList.replace('icon-search-mobile', 'icon-search-mobile-none')

        inputSearch.value = ''

        resetGenresInSearchingMovies()

    }

    const clickActor = (actorID) => {

        setActorSelected(actorID)

        setFoundMovie([])

        setFoundSeries([])

        goBack()

        iconSearchMobile.classList.replace('icon-search-mobile', 'icon-search-mobile-none')

        inputSearch.value = ''

        resetGenresInSearchingMovies()

    }
    useEffect(() => {

        if (genreSelected) {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzBhZDM5MGMxOWE2YWNlMGUwZTYwMDMyZDA0YTRlMCIsInN1YiI6IjY1YzJhMGZhOTYwMzMxMDBiNWI3YThmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XOntdV8qAcV005YfOZFDqJOzEgoUofUJo8zjNR6Cevs'
                }
            };
            

            fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreSelected}`, options)
            .then(response => response.json())
            .then(response => setMoviesWithGenresSelected(response.results))
            .catch(err => console.error(err));



        }

    }, [genreSelected, setMoviesWithGenresSelected])

    useEffect(() => {

        if (genreSerieSelected) {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzBhZDM5MGMxOWE2YWNlMGUwZTYwMDMyZDA0YTRlMCIsInN1YiI6IjY1YzJhMGZhOTYwMzMxMDBiNWI3YThmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XOntdV8qAcV005YfOZFDqJOzEgoUofUJo8zjNR6Cevs'
                }
            };

                fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${genreSerieSelected}`, options)
                .then(response => response.json())
                .then(response => setSeriesWithGenresSelected(response.results))
                .catch(err => console.error(err));
        }

    }, [genreSerieSelected, setSeriesWithGenresSelected])

    useEffect(() => {

        if (ActorSelected) {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzBhZDM5MGMxOWE2YWNlMGUwZTYwMDMyZDA0YTRlMCIsInN1YiI6IjY1YzJhMGZhOTYwMzMxMDBiNWI3YThmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XOntdV8qAcV005YfOZFDqJOzEgoUofUJo8zjNR6Cevs'
                }
            };

            fetch(`https://api.themoviedb.org/3/person/${ActorSelected}/combined_credits`, options)
                .then(response => response.json())
                .then(response => setMoviesOfActorSelected((response.cast.slice(0, 20))))
                .catch(err => console.error(err));

        }

    }, [ActorSelected, setMoviesOfActorSelected])

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    if (loading) {

        return <div className="loader">

            <ClipLoader
                color="#5953DC"
                loading={loading}
                size={90}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }

    const handleSearchIconClick = () => {

        if (inputSearchRef.current) {
            inputSearchRef.current.focus()

        }
    };

    return (
        <>
            {trailerController ? (
                <>
                    <YouTube
                        videoId={trailer.key}
                        className="reproductorContainer"
                        opts={{

                            width: "100%",
                            height: "100%",
                            playerVars: {
                                autoplay: 1,
                                controls: 1,
                                cc_load_policy: 0,
                                fs: 1,
                                iv_load_policy: 0,
                                modestbranding: 0,
                                rel: 1,
                                showinfo: 0,
                            },
                        }}
                    />
                    <svg className="buttonCloseTrailer" width={32} height={32} onClick={toggleTrailerController} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" ><path d="m15.707,9.707l-2.293,2.293,2.293,2.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293,2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.293,2.293,2.293-2.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414Zm8.293,2.293c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-2,0c0-5.514-4.486-10-10-10S2,6.486,2,12s4.486,10,10,10,10-4.486,10-10Z" /></svg>

                </>
            ) :
                null
            }

            {!movieSelected.id && !serieSelected.id && request ? (

                <div>

                    <Carousel picsArray={request.map((movie) => (`${UrlImage + movie.backdrop_path}`))}></Carousel>

                </div>

            ) : 

            !movieSelected.id ? (

                <BackgroundSerieSelected  toogleClasses={toogleClasses} clickActor={clickActor} UrlImage={UrlImage} serieSelected={serieSelected} goBack={goBack} cast={cast} genre={genre} clickGenreOnSerieSelected={clickGenreOnSerieSelected} toggleTrailerController={toggleTrailerController}  />

            ) :

                (
                    <BackgroundMovieSelected toogleClasses={toogleClasses} clickActor={clickActor} UrlImage={UrlImage} movieSelected={movieSelected} goBack={goBack} cast={cast} genre={genre} clickGenreOnMovieSelected={clickGenreOnMovieSelected} toggleTrailerController={toggleTrailerController} />
                )
            }


            <HeadSection typeOfSearch={typeOfSearch} setTypeOfSearch={setTypeOfSearch} goBack={goBack} notyf={notyf} handleSearchIconClick={handleSearchIconClick} MoviesOfActorSelected={MoviesOfActorSelected} inputSearchRef={inputSearchRef} handlerEnterPress={handlerEnterPress} handlerEnterPressActor={handlerEnterPressActor} handlerEnterPressSeries={handlerEnterPressSeries} search={search} handlerInput={handlerInput} handlerInputActor={handlerInputActor} handlerInputSerie={handlerInputSerie} foundMovies={foundMovies} foundSeries={FoundSeries} toggleMenu={toggleMenu} menuVisible={menuVisible} resetGenres={resetGenres} resetGenresMobile={resetGenresMobile} listGenres={listGenres} listSerieGenres={listSerieGenres} clickSerieGenres={clickSerieGenres} clickGenres={clickGenres} clickGenresMobile={clickGenresMobile} clickGenresSeriesMobile={clickGenresSeriesMobile} genreSerieSelected={genreSerieSelected} genreSelected={genreSelected} goBackSectionMovies={goBackSectionMovies} />

            {/* Se chequea si se busco alguna pelicula o serie y si se selecciono algun genero o algun actor. Dependiendo del caso, se muestra lo buscado, el genero seleccionado, las 20 peliculas del actor, o las 20 peliculas mas vistas del momento segun TMDB */}

            <section className={toogleClasses ? "section-movie-none" : "section-movie-cards"}>

                {foundMovies.length === 0 && FoundSeries.length === 0 && seriesWithGenresSelected.length === 0 && moviesWithGenresSelected.length !== 0 ? (

                    <GenreSelected moviesWithGenresSelected={moviesWithGenresSelected} handlerClickMovie={handlerClickMovie} UrlImage={UrlImage} />

                ) :

                    foundMovies.length === 0 && FoundSeries.length === 0 && seriesWithGenresSelected.length === 0 && MoviesOfActorSelected.length !== 0 ? (

                        <ActorSelectedMovies MoviesOfActorSelected={MoviesOfActorSelected} handlerClickMovie={handlerClickMovie} goBack={goBack} UrlImage={UrlImage} />

                    ) :

                        foundMovies.length === 0 && FoundSeries.length === 0 && seriesWithGenresSelected.length === 0 ? (

                            typeOfSearch === 1 ?

                            <MostPopularMovies request={request} handlerClickMovie={handlerClickMovie} UrlImage={UrlImage} />

                            : typeOfSearch === 2 ? 

                            <MostPopularSeries serieRequest={serieRequest} handlerClickSerie={handlerClickSerie} UrlImage={UrlImage} />

                            : 

                            <MostPopularActors actorsRequest={actorsRequest} clickPopularActors={clickPopularActors} UrlImage={UrlImage} />

                        ) :

                        foundMovies.length === 0 && seriesWithGenresSelected.length === 0 ? (

                            <SearchedSeries foundSeries={FoundSeries} handlerClickSerie={handlerClickSerie} UrlImage={UrlImage} />

                        ) :

                        foundMovies.length === 0 ? (

                            <GenreSeriesSelected seriesWithGenresSelected={seriesWithGenresSelected} handlerClickSerie={handlerClickSerie} UrlImage={UrlImage} />

                        ) :

                            (
                                <SearchedMovies foundMovies={foundMovies} handlerClickMovie={handlerClickMovie} UrlImage={UrlImage} />
                            )
                }

            </section>
        </>
    )
}

export default View