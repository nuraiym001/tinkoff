import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebase";
import { Icon } from "@iconify/react";

import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log({ user: auth.currentUser });
  }, []);

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      navigateToHome();
    } catch (error) {
      console.error(error);
    }
  };

  const googleSignIn = async () => {
    await signInWithPopup(auth, googleProvider);
    navigateToHome();
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const exit = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <ContentWrapper>
        <div className="p-64 pt-32 flex flex-col justify-center items-center">
          <h2 className="mb-12 text-5xl text-white font-semibold">Войти</h2>
          <form className="w-96 mb-6">
            <div className="flex flex-col gap-2 mb-6">
              <span className="text-white">Адрес электронной почты</span>
              <input
                className=" p-4 rounded-md bg-inherit outline-none border-neutral-500 border text-white"
                type="email"
                placeholder="email@index.html"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 mb-8">
              <span className="text-white">Пароль</span>
              <input
                className="p-4 rounded-md bg-inherit outline-none border-neutral-500 border text-white"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div>
              <button
                className="w-full p-4 flex justify-center items-center bg-green-600 rounded-md text-white cursor-pointer"
                onClick={signIn}
                type="submit"
              >
                Войти
              </button>
            </div>
          </form>

          <span className="text-white mb-6">Продолжить через Google</span>

          <button
            onClick={googleSignIn}
            className="flex items-center justify-center gap-1 w-96 p-2 mb-6 bg-white rounded-md"
          >
            <Icon width={24} icon="flat-color-icons:google" />
            <span className=" text-base font-medium text-blue-800">
              Продолжить через Google{" "}
            </span>
          </button>

          <div className="w-96 flex gap-1">
            <p className="text-white">Впервые в iMovie?</p>{" "}
            <Link to="/sign-up" className="text-white hover:text-purple-500">
              Зарегистрироваться
            </Link>
          </div>
          <button className=" bg-slate-700 mt-3 w-96 p-4" onClick={exit}>
            Выйти
          </button>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default SignIn;
