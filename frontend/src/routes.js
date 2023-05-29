import { useRoutes } from "react-router-dom";
import { Login } from "./screens/Login";
import { Home } from "./screens/Home";

export const AppRouter = () => {
  const elements = useRoutes([
    {/* path: "/", element: <Login /> */},
    { path: "/", element: <Home /> },
  ]);
  return elements;
};
