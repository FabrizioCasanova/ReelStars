
const MostPopularActors = ({ actorsRequest, clickPopularActors, UrlImage }) => {

    return (
        actorsRequest.map((actor) => (
            <>

                <div key={actor.id} className="card-movie" onClick={() => clickPopularActors(actor.id)} style={{ backgroundImage: `url(${UrlImage + actor.profile_path})`, backgroundSize: "cover" }}>

                    <h2 className="movie-name">{actor.name}</h2>

                </div>

            </>
            
        ))
    )

}

export default MostPopularActors