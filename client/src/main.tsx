import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from "./Components/feature/Login/Login.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TodoForm from "./Components/feature/Todo/Todo.tsx";
import App from "./App.tsx";
import SignUpPage from "./Components/feature/Signin/SignUp.tsx";
import { path } from "./constant/path.tsx";
import ForgotPassword from "./Components/feature/ForgotPassword/ForgotPassword.tsx";
import Profile from "./Components/feature/profile/profile.tsx";

const route = [
  {
    path: path.home,
    element: <App />,
  },
  {
    path: path.todo,
    element: <TodoForm />,
  },
  {
    path: path.login,
    element: <LoginPage />,
  },
  {
    path: path.signUp,
    element: <SignUpPage />,
  },
  {
    path: path.forgotPassword,
    element: <ForgotPassword />,
  },
  {
    path: path.profile,
    element: <Profile />,
  },
];

const router = createBrowserRouter(route);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
