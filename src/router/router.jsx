import { createBrowserRouter } from "react-router";
import Layout from "../pages/Layout";
import Main from "../pages/main/Main";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
        children: [
            {
                index: true,
                element: <Main />,
            },
        ]
  }
])