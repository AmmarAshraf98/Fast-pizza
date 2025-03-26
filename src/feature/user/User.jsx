import React from "react";
import { useSelector } from "react-redux";

export default function User() {
  const { userName } = useSelector((state) => state.user);

  if (!userName) return null;
  return <p className='text-sm hidden md:block font-semibold'>{userName}</p>;
}
