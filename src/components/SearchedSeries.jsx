const SearchedSeries = ({ foundSeries, handlerClickSerie, UrlImage }) => {

    return (
          foundSeries.map((serie) => (
            <div key={serie.id} className="card-movie" onClick={() => handlerClickSerie(serie)} style={{ backgroundImage: `url(${UrlImage + serie.poster_path})`, backgroundSize: "cover" }}>

                <h2 className="movie-name">{serie.name}</h2>

            </div>


        ))
    )

}

export default SearchedSeries