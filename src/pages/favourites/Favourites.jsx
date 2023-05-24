import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Carousel from "../../components/carousel/Carousel";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img";
import CircleRating from "../../components/circleRating/CircleRating";
import Genres from "../../components/genres/Genres";

import PosterFallback from "../../assets/no-poster.png";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";

import "./style.scss";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

const MovieList = ({ data, endpoint }) => {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  return (
    <div className="carouselItems-favourites">
      {data?.map((item) => {
        const posterUrl = item.poster_path
          ? url.poster + item.poster_path
          : PosterFallback;
        return (
          <div
            key={item.id}
            className="carouselItem"
            onClick={() =>
              navigate(`/${item.media_type || endpoint}/${item.id}`)
            }
          >
            <div className="posterBlock">
              <Img src={posterUrl} />
              <CircleRating rating={item.vote_average.toFixed(1)} />
              <Genres data={item.genres.map((g) => g.id).slice(0, 2)} />
            </div>
            <div className="textBlock">
              <span className="title">{item.title || item.name}</span>
              <span className="date">
                {dayjs(item.release_date || item.first_air_date).format(
                  "MMM D, YYYY"
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Favourites = () => {
  const { user, isAuth } = useSelector((state) => state.auth);

  const [movies, setMovies] = useState([]);

  const loadMovies = (movieIds) => {
    Promise.all(movieIds.map((id) => fetchDataFromApi(`/movie/${id}`))).then(
      (res) => {
        setMovies(res);
      }
    );
  };
  useEffect(() => {
    const loadFavourites = async () => {
      const q = query(
        collection(db, "favourites"),
        where("authorEmail", "==", user.email),
        where("isFavourite", "==", true)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const resData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        loadMovies(resData.map((item) => item.movieId));
      });
    };
    if (isAuth) {
      loadFavourites();
    }
  }, [isAuth]);

  return (
    <div className="pt-24 pb-10">
      <ContentWrapper>
        <h2 className="mb-8 text-4xl text-white font-semibold">Избранные</h2>
        <MovieList data={movies} endpoint={"movie"} />
      </ContentWrapper>
    </div>
  );
};

export default Favourites;
