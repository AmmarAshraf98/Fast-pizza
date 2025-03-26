import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./feature/menu/Menu";
import CreateUser from "./feature/user/CreateUser";
import Cart from "./feature/cart/Cart";
import CreateOrder, {
  action as orderAction,
} from "./feature/order/CreateOrder";
import Order, { loader as orderLoader } from "./feature/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    // error occure while routing error like notFound page
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        // call api while component being called not after render
        loader: menuLoader,
        // error occure while fetching data error
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: orderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={routes} />;
}
