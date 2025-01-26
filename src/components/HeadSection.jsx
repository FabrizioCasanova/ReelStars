import { useState } from "react"

const HeadSection = ({ typeOfSearch, setTypeOfSearch, notyf, handleSearchIconClick, clickGenresMobile, clickGenresSeriesMobile, clickSerieGenres, MoviesOfActorSelected, inputSearchRef, handlerEnterPress, handlerEnterPressActor, handlerEnterPressSeries, search, handlerInput, handlerInputSerie, handlerInputActor, foundMovies, foundSeries, toggleMenu, menuVisible, resetGenresMobile, resetGenres, listSerieGenres, listGenres, clickGenres, genreSelected, genreSerieSelected, goBackSectionMovies }) => {

    const [showDropdown, setShowDropdown] = useState(false);
    
    const handleSelectOption = (optionSelected) => {

        setShowDropdown(false);

        resetGenres()

        switch (optionSelected) {

            case "Peliculas": setTypeOfSearch(1)
                break;
            case "Series": setTypeOfSearch(2)
                break;
            case "Actores": setTypeOfSearch(3)
                break
            default: notyf.error('Opcion no reconocida')
                break;

        }
    };

    return (
        <>


            <div className="nav-container">

                <svg viewBox="0 0 24 24" onClick={handleSearchIconClick} className="icon-search-mobile" id="icon-search-mobile" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#9190a0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.1" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" fill="#9190a0"></path> <path d="M15 15L21 21" stroke="#9190a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#9190a0" stroke-width="2"></path> </g></svg>


                <div className="nav">


                    {MoviesOfActorSelected.length === 0 && foundMovies.length === 0 && foundSeries.length === 0 && (
                        <div className="dropdown">
                            <button
                                className="dropdown-button"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                ▼
                            </button>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-item" onClick={() => handleSelectOption("Peliculas")}>
                                        Peliculas
                                    </div>
                                    <div className="dropdown-item" onClick={() => handleSelectOption("Series")}>
                                        Series
                                    </div>
                                    <div className="dropdown-item" onClick={() => handleSelectOption("Actores")}>
                                        Actores
                                    </div>
                                </div>
                            )}
                        </div>
                    )}


                    <input type="text" ref={inputSearchRef} onKeyUp={typeOfSearch === 1 ? handlerEnterPress : typeOfSearch === 2 ? handlerEnterPressSeries : handlerEnterPressActor} onChange={search} id="inputSearch" className="holder" placeholder={typeOfSearch === 1 ? "Busca una pelicula aqui" : typeOfSearch === 2 ? "Busca una serie aqui" : "Busca un actor aqui"} />

                    <svg viewBox="0 0 24 24" onClick={typeOfSearch === 1 ? handlerInput : typeOfSearch === 2 ? handlerInputSerie : handlerInputActor} className="icon-search" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#9190a0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.1" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" fill="#9190a0"></path> <path d="M15 15L21 21" stroke="#9190a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#9190a0" stroke-width="2"></path> </g></svg>

                </div>

                {foundMovies.length === 0 && MoviesOfActorSelected.length === 0 && foundSeries.length === 0 ? (

                    <>
                        {/* Menú hamburguesa para los 900 PX*/}
                        <div className="hamburger" onClick={toggleMenu}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>

                        {/* Menú de categorías */}
                        <div id="menu" className={`menu ${menuVisible ? 'show' : ''}`}>
                            <ul>
                                <li onClick={resetGenresMobile}>None</li>
                                {
                                    typeOfSearch === 1 ? (
                                        listGenres ? (
                                            listGenres.map((genre) => (
                                                <li style={{ cursor: "pointer" }} key={genre.id} onClick={() => clickGenresMobile(genre.id)}>
                                                    {genre.name}
                                                </li>
                                            ))
                                        ) : (
                                            <li>No Genres Available</li>
                                        )
                                    ) : typeOfSearch === 2 ? (
                                        listSerieGenres ? (
                                            listSerieGenres.map((genre) => (
                                                <li style={{ cursor: "pointer" }} key={genre.id} onClick={() => clickGenresSeriesMobile(genre.id)}>
                                                    {genre.name}
                                                </li>
                                            ))
                                        ) : (
                                            <li>No Series Genres Available</li>
                                        )
                                    ) : (
                                        <li>No Genres Available</li>
                                    )
                                }
                            </ul>
                        </div>


                        <select name={"Movie-genre"} value={typeOfSearch === 1 ? genreSelected : typeOfSearch === 2 ? genreSerieSelected : null} className="comboBoxGenre" onChange={(e) => typeOfSearch === 1 ? clickGenres(e.target.value) : typeOfSearch === 2 ? clickSerieGenres(e.target.value) : null}>

                            <option className="optionGenre" onClick={resetGenres}> None </option>


                            {
                                typeOfSearch === 1 ? (
                                    listGenres ? (
                                        listGenres.map((genre) => (
                                            <option className="optionGenre" value={genre.id} key={genre.id}>
                                                {genre.name}
                                            </option>
                                        ))
                                    ) : null
                                ) : typeOfSearch === 2 ? (
                                    listSerieGenres ? (
                                        listSerieGenres.map((genre) => (
                                            <option className="optionGenre" value={genre.id} key={genre.id}>
                                                {genre.name}
                                            </option>
                                        ))
                                    ) : null
                                ) : null
                            }

                        </select>
                    </>

                ) : foundMovies.length === 0 && foundSeries.length === 0 ? (

                    <svg className="arrowBackSectionMovies" onClick={goBackSectionMovies} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="50" height="50"><path className="arrowbackHover" onClick={goBackSectionMovies} d="M13.775,18.707,8.482,13.414a2,2,0,0,1,0-2.828l5.293-5.293,1.414,1.414L9.9,12l5.293,5.293Z" /></svg>

                ) : foundMovies.length === 0 ? (

                    <svg className="arrowBackSectionMovies" onClick={goBackSectionMovies} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="50" height="50"><path className="arrowbackHover" onClick={goBackSectionMovies} d="M13.775,18.707,8.482,13.414a2,2,0,0,1,0-2.828l5.293-5.293,1.414,1.414L9.9,12l5.293,5.293Z" /></svg>

                ) :

                    <svg className="arrowBackSectionMovies" onClick={goBackSectionMovies} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="50" height="50"><path className="arrowbackHover" onClick={goBackSectionMovies} d="M13.775,18.707,8.482,13.414a2,2,0,0,1,0-2.828l5.293-5.293,1.414,1.414L9.9,12l5.293,5.293Z" /></svg>
                }
            </div>
        </>
    )
}
export default HeadSection