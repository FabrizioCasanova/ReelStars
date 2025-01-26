import useState from "react"

const BurgerMenu = ({ listGenres, clickGenres, resetGenres }) => {


    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (

        <>


            {/* Menú hamburguesa */}
            <div className="hamburger" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            {/* Menú de categorías */}
            <div id="menu" className={`menu ${menuVisible ? 'show' : ''}`}>
                <ul>
                    <li onClick={resetGenres}>None</li>
                    {listGenres ? (
                        listGenres.map((genre) => (
                            <li key={genre.id} onClick={() => clickGenres(genre.id)}>
                                {genre.name}
                            </li>
                        ))
                    ) : (
                        <li>No Genres Available</li>
                    )}
                </ul>
            </div>

        </>


    )
}

export default BurgerMenu