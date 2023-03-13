import styles from "./AddMovie.module.css";
import { useRef } from "react";

const AddMovie = (props) => {
  const titleRef = useRef('')
  const releaseDateRef = useRef('')
  const openingTextRef = useRef('')
  const submitHandler = (e) => {
    console.log(e.type);
    e.preventDefault();
    const movie = {
      title: titleRef.current.value,
      releaseDate: releaseDateRef.current.value,
      openingText: openingTextRef.current.value,
    };
    props.onAddMovie(movie);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef}></input>
      </div>
      <div className={styles.control}>
        <label htmlFor="date">Release Date</label>
        <input type="date" id="date" ref={releaseDateRef}></input>
      </div>
      <div className={styles.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
      </div>
      <button>Add movie</button>
    </form>
  );
};

export default AddMovie;
