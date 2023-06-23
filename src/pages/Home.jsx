import React from "react";
import Typed from "typed.js";
import { FaPlay } from "react-icons/fa";
import { LuHeart, LuChefHat } from "react-icons/lu";
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti'

function Home() {
  const { width, height } = useWindowSize();
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Hola Haña^500, queremos decirte algunas cosas.",
        "Así que hicimos esto para que las puedas ver.",
      ],
      typeSpeed: 50,
      loop: true
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (

    <div className="background">
      <Confetti width={width} height={height} />
      <div className="container container-home">
        <p style={{ textAlign: 'center' }} className="chef">
          <LuChefHat />
        </p>
        <h1>
          <span ref={el}></span>
        </h1>
        <p>
          Escucha las canciones que recopilamos para ti, las
          elegimos con mucho cariño {<LuHeart/>}
        </p>
        <div className="d-grid gap-2">
          <a href="/songs" className="btn btn-pinky">
            <FaPlay />
          </a>
        </div>
      </div>
    </div>
  );
}
export default Home;
