import { createBrowserRouter } from "react-router";
import Layout from "../pages/Layout";
import Main from "../pages/main/Main";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <Main/>
                    </ProtectedRoute>
                )
            },
        ]
  }
])