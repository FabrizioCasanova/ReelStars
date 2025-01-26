
const MostPopularMovies = ({ request, handlerClickMovie, UrlImage }) => {

    return (
        request.map((movie) => (
            <>

                <div key={movie.id} className="card-movie" onClick={() => handlerClickMovie(movie)} style={{ backgroundImage: `url(${UrlImage + movie.poster_path})`, backgroundSize: "cover" }}>

                    <h2 className="movie-name">{movie.title}</h2>


                </div>

            </>
            
        ))
    )

}

export default MostPopularMovies