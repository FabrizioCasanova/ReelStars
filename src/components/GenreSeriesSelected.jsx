const GenreSeriesSelected = ({ seriesWithGenresSelected, handlerClickSerie, UrlImage }) => {

    return (

        seriesWithGenresSelected.map((serie) => (

            <>

                <div key={serie.id} className="card-movie" onClick={() => handlerClickSerie(serie)} style={{ backgroundImage: `url(${UrlImage + serie.poster_path})`, backgroundSize: "cover" }}>

                    <h2 className="movie-name">{serie.title}</h2>


                </div>

            </>
        ))
    )

}

export default GenreSeriesSelected