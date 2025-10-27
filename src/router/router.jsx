import { createBrowserRouter } from "react-router";
import Layout from "../pages/Layout";
import Main from "../pages/main/Main";
import ProductLayout from "../components/product/Layout"
import List from "../components/product/List";
import Detail from "../components/product/Detail";


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
                element: <ProductLayout />,
                path: "product",
                children: [
                    {
                        index: true,
                        element: <List />
                    },
                    {
                        path: "detail",
                        element: <Detail />
                    }
                ]
            },
        ]
  }
])