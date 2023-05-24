import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { auth, db } from "../../../config/firebase";
import dayjs from "dayjs";
import { onAuthStateChanged } from "firebase/auth";

const Reviews = ({ movieId }) => {
  const [text, setText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      const q = query(
        collection(db, "reviews"),
        where("movieId", "==", movieId),
        orderBy("createdDate", "desc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setIsLoading(false);
        setReviews(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });

    loadReviews();
  }, [movieId]);

  const sendReview = async () => {
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        movieId,
        createdDate: Date.now(),
        text,
        authorEmail: auth?.currentUser?.email,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setText("");
    }
  };

  return (
    <div>
      <ContentWrapper>
        <h4 className="mb-6 text-2xl text-white">Отзывы</h4>
        {isLoading ? (
          <p className="mb-4 text-white text-2xl">Отзывы грузятся...</p>
        ) : (
          <ul>
            {reviews.map((r) => (
              <li
                key={r.id}
                className="mb-4 p-4 shadow bg-slate-700 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-400 uppercase text-xl font-semibold text-white">
                    {r.authorEmail[0]}
                  </span>
                  <p className=" text-2xl text-white">{r.authorEmail}</p>
                </div>
                <p className=" mb-4 whitespace-pre-line text-white text-sm leadi">
                  {r.text}
                </p>
                <span className="text-base text-white">
                  {dayjs(r.createdDate).format("MMM D, YYYY HH:mm")}
                </span>
              </li>
            ))}
          </ul>
        )}

        {isAuth && (
          <>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 mb-6 outline-none rounded-md text-base"
              name="Review"
              placeholder="Оставьте отзыв"
              rows={4}
            />
            <div className="flex justify-end">
              <button
                className=" p-4 text-white text-lg bg-blue-500 hover:bg-blue-700 rounded-lg cursor-pointer duration-75"
                onClick={sendReview}
              >
                Оставить отзыв
              </button>
            </div>
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Reviews;
