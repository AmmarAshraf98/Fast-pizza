import React from "react";
import { Link } from "react-router-dom";

export default function LinkComp({ children, to }) {
  return (
    <Link
      className='text-sm text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-300'
      to={to}
    >
      {children}
    </Link>
  );
}
