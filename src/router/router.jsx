import { createBrowserRouter } from "react-router";
import Layout from "../pages/Layout";
import Main from "../pages/main/Main";
import Login from "../pages/login/login";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
        children: [
            {
                index: true,
                element: <Main />,
            },
            {
                path: "login",
                children: [
                  {
                    index: true,
                    element: <Login/>
                  }
                ]
            },
            {
                path: "main",
                children: [
                  {
                    index: true,
                    element: <Main/>
                  }
                ]
            },

        ]
  }
])