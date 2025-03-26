import React from "react";
import CartOverviwe from "../feature/cart/CartOverview";
import Header from "./Header";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

export default function AppLayout() {
  const navigate = useNavigation();
  const isLoading = navigate.state === "loading";

  return (
    <div className='grid grid-rows-[auto_1fr_auto] h-dvh font-cutsom'>
      {isLoading && <Loader />}

      <Header />

      <div className='overflow-auto'>
        <main className='max-w-3xl mx-auto'>
          <Outlet />
        </main>
      </div>

      <CartOverviwe />
    </div>
  );
}
