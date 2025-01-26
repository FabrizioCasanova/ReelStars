
const SearchSeries = async (serie) => {


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzBhZDM5MGMxOWE2YWNlMGUwZTYwMDMyZDA0YTRlMCIsInN1YiI6IjY1YzJhMGZhOTYwMzMxMDBiNWI3YThmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XOntdV8qAcV005YfOZFDqJOzEgoUofUJo8zjNR6Cevs'
        }
    };

    try {

        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${serie}`, options)
        const data = response.json()
        return data

    } catch (error) {

        console.error(error)

        return null

    }
}

export default SearchSeries