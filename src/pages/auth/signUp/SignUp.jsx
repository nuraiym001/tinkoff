import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebase";
import { Icon } from "@iconify/react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const googleSignUp = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  return (
    <div className="pt-32 flex flex-col justify-center items-center">
      <h2 className="mb-8 text-5xl text-white font-semibold">Регистрация</h2>
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
            className=" p-4 rounded-md bg-inherit outline-none border-neutral-500 border text-white"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mb-8">
          <span className="text-white">Повторите пароль</span>
          <input
            className=" p-4 rounded-md bg-inherit outline-none border-neutral-500 border text-white"
            type="password"
            placeholder="Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div>
          <button
            className="w-full p-4 flex justify-center items-center bg-green-600 rounded-md text-white cursor-pointer"
            onClick={signUp}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>

      <button
        className="w-96 bg-blue-500 p-3 mb-4 cursor-pointer flex items-center justify-center text-white rounded-md"
        onClick={googleSignUp}
      >
        <Icon width={24} icon="flat-color-icons:google" />
        Зарегистрироваться через Google
      </button>

      <div className="mb-64 w-196 flex gap-1">
        <p className="text-white">У вас есть аккаунт?</p>{" "}
        <Link to="/sign-in" className="text-white hover:text-purple-500">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
