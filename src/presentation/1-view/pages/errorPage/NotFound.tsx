import { useState } from "react";
import Button from "./Button";
import styles from "./404other.module.css";
import { useLocation } from "react-router-dom";

async function getGif(id) {
  let gif;
  try {
    gif = await import(`../../assets/gifs/${id}.webp`);
  } catch (e) {
    gif = await import(`../../assets/gifs/${id}.gif`);
  }
  return gif.default;
}
const Gifs = ["sadface","giphy_error2", "giphy_error3", "giphy_error4", "giphy_error5" ]; // replace with your own GIFs
//const errorGifs = [error404,giphy_error2, giphy_error3, giphy_error4, giphy_error5 ]; // replace with your own GIFs
const gifsErrors = [
  "d2jjuAZzDSVLZ5kI",
  "Bp3dFfoqpCKFyXuSzP",
  "hv5AEBpH3ZyNoRnABG",
  "hLwSzlKN8Fi6I",
];

const NotFound = () => {
  let location = useLocation();
  const [fondo, setFondo] = useState(styles.fondo);

  const randomImage = () => {
    return `https://media.giphy.com/media/${
      gifsErrors[Math.floor(Math.random() * gifsErrors.length) + 1]
    }/giphy.gif`;
  };
  const [img, setImg] = useState(randomImage);
  const [width, setWidth] = useState("none");
 
  
  const theError = async () => {
    const randomGif = Gifs[Math.floor(Math.random() * Gifs.length)];
    const gif = await getGif(randomGif);
    setImg(gif);
    setWidth(300);
    setFondo(styles.testbg);
  };
  
  return (
    <>
      <div className={fondo}>
        <div className={styles.pageErrorStyles}>
          <code>No match for: {location.pathname}</code>
          <span className={styles.codeErrorStyles}>404</span>
          <span className={`${styles.msgErrorStyles} text-white`}>
            Sometimes getting lost isn't that bad
          </span>
          <img
            className={styles.gifErrorStyles}
            src={img}
            onError={theError}
            width={width}
            alt="alt-page-404"
          />
          <Button href="/" bgcolor="red" color="white" content="Go back home" />
        </div>
      </div>
    </>
  );
};

export default NotFound;
 /*
  const theError = () => {
    const randomGif = errorGifs[Math.floor(Math.random() * errorGifs.length)];
    setImg(randomGif);
    setWidth(300);
    setFondo(styles.testbg);
  };
  */