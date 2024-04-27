import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from "./Components/Login.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TodoForm from "./Components/Todo.tsx";
import App from "./App.tsx";
import SignUpPage from "./Components/SignUp.tsx";

const route = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: `/todo/:userId`,
    element: <TodoForm />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
];

const router = createBrowserRouter(route);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
