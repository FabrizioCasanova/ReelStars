import { useState, useEffect } from "react";

const Carrousel = ({ picsArray }) => {

  const [current, setCurrent] = useState(0);

  const newPicsArray = picsArray.filter((url) => {

    const img = new Image();
    img.src = url;

    return img.width > 2500;

  })

  const nextSlide = () => {

    if (current === newPicsArray.length - 1) {

      setCurrent(0);

    } else {

      setCurrent(current + 1);

    }

  };

  useEffect(() => {

    const intervalId = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalId);

  });

  return (

    <div id="background-poster-100vh" className="overflow-hidden relative">

      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,

        }}
      >

        {newPicsArray.map((url) => (

          <img key={url} src={url} alt="Movies Pictures" />

        ))}

      </div>
    </div>
  );
}

export default Carrousel