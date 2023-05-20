import { useRoutes } from "react-router-dom";
import { Login } from "./screens/Login";
import { Main } from "./screens/Main";

export const AppRouter = () => {
  const elements = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/home", element: <Main /> },
  ]);
  return elements;
};
