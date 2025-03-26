import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, onClick }) {
  const classNAme = `bg-yellow-400 cursor-pointer font-semibold disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2  rounded-full uppercase tracking-wide hover:bg-yellow-300 inline-block transition-colors duration-300`;

  const style = {
    primary: classNAme + " md:px-6 text-sm  md:py-4 py-3 px-4",
    small: classNAme + " md:px-4 md:py-3 py-2 px-2.5 text-xs",
    secondary:
      "cursor-pointer text-sm sm:px-6 text-stone-500 sm:py-3.5 py-2.5 px-4 font-semibold disabled:cursor-not-allowed focus:outline-none border border-2 border-stone-200 focus:ring focus:ring-stone-200 focus:bg-stone-200 focus:ring-offset-2  rounded-full uppercase tracking-wide hover:bg-stone-200 inline-block hover:text-stone-700 transition-colors duration-300",
  };

  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );

  return (
    <button className={style[type]} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
