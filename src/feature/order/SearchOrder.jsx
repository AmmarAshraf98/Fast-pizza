import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    // navigate to order/orderID route using programatic navigation
    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='bg-yellow-100 rounded-full py-2 px-3 text-sm focus:outline-none focus:ring transition-all duration-300 w-28 placeholder-stone-400 sm:w-64 sm:focus:w-72 focus:ring-yellow-500 focus:ring-offset-2'
        placeholder='Search Order #'
      />
    </form>
  );
}
