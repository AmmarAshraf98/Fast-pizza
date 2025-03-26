import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../feature/order/SearchOrder";
import User from "../feature/user/User";

export default function Header() {
  return (
    <header
      className=' bg-yellow-400 uppercase tracking-widest py-3 px-4 sm:px-6 border-b border-stone-200 flex items-center justify-between
'
    >
      <Link to='/'>Fast Pizza Co.</Link>
      <SearchOrder />
      <User />
    </header>
  );
}
