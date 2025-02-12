import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import CardsPage from "./pages/CardsPage";
import HomePage from "./pages/HomePage";
import LoginUserPage from "./pages/LoginUserPage";
import UserFormPage from "./pages/UserFormPage";

const fetchCards = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("auth_token")}`,
    },
  });

  if (!response.ok) {
    throw new Response("Erreur lors de la récupération des cartes", {
      status: response.status,
    });
  }

  const data = await response.json();
  return data;
};

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login/user",
        element: <LoginUserPage />,
      },
      {
        path: "/signup/user",
        element: <UserFormPage />,
      },
      {
        path: "/cards",
        element: <CardsPage />,
        loader: fetchCards,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
