const BackgroundMovieSelected = ({ toogleClasses, UrlImage, movieSelected, cast, goBack, genre, clickActor, clickGenreOnMovieSelected, toggleTrailerController }) => {



    return (

        <div className={toogleClasses ? "backdrop" : "poster"} style={{ backgroundImage: `url(${UrlImage + movieSelected.backdrop_path})` }}>

            <div className={toogleClasses ? "backdropDetails" : "posterDetails"}>

                <svg className="arrowBack" onClick={goBack} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path onClick={goBack} d="M13.775,18.707,8.482,13.414a2,2,0,0,1,0-2.828l5.293-5.293,1.414,1.414L9.9,12l5.293,5.293Z" /></svg>

                <div className="divDetails">

                    <h1 className="posterTitle">{movieSelected.title}</h1>

                    <h3 className="posterReleaseDate">{movieSelected.release_date}</h3>

                    <h3 className="posterFeaturesTitle">Movie Cast</h3>

                    {cast ? (

                        <div style={{ marginBottom: "4%" }} className="divGenres">{cast.slice(0, 3).map(item => (<p onClick={() => clickActor(item.id)} key={item.id} className="textGenres">{item.name}</p>))}</div>

                    ) : null}

                    <h3 className="posterFeaturesTitle">Movie Genre</h3>

                    {genre ? (
                        <div className="divGenres">{genre.map(item => (<p onClick={() => clickGenreOnMovieSelected(item.id)} className="textGenres" key={item.id}>{item.name}</p>))}</div>

                    ) : null}

                    <h3 className="posterOverview">{movieSelected.overview}</h3>

                    <button className="buttonSeeTrailer" onClick={toggleTrailerController}> Ver Trailer</button>

                </div>


            </div>

        </div>

    )
}


export default BackgroundMovieSelected