import { useEffect, useState } from "react";
import View from "./view";

const Discover = () => {


    const [request, setRequest] = useState([])
    
    const [serieRequest, setSerieRequest] = useState([])

    const [actorsRequest, setActorsRequest] = useState([])

    const [listGenres, setListGenres] = useState('')

    const [listSerieGenres, setListSerieGenres] = useState('')

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzBhZDM5MGMxOWE2YWNlMGUwZTYwMDMyZDA0YTRlMCIsInN1YiI6IjY1YzJhMGZhOTYwMzMxMDBiNWI3YThmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XOntdV8qAcV005YfOZFDqJOzEgoUofUJo8zjNR6Cevs'
            }
        };

        fetch('https://api.themoviedb.org/3/discover/movie', options)
            .then(response => response.json())
            .then(response => {
                setRequest(response.results);
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            });

            
        fetch('https://api.themoviedb.org/3/discover/tv', options)
        .then(response => response.json())
        .then(response => {
            setSerieRequest(response.results);
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setLoading(false)
        });

        fetch('https://api.themoviedb.org/3/person/popular', options)
        .then(response => response.json())
        .then(response => {
            setActorsRequest(response.results);
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setLoading(false)
        });

        


        fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
            .then(response => response.json())
            .then(response => setListGenres(response.genres))
            .catch(err => console.error(err));


            fetch("https://api.themoviedb.org/3/genre/tv/list?language=en", options)
            .then(response => response.json())
            .then(response => setListSerieGenres(response.genres))
            .catch(err => console.error(err));


    }, [])


    return (
        <>
            <View request={request} serieRequest={serieRequest} actorsRequest={actorsRequest} loading={loading} listGenres={listGenres} listSerieGenres={listSerieGenres} />
        </>
    )
}


export default Discover;


