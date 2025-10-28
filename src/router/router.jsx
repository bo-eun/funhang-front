import { createBrowserRouter } from "react-router";
import Layout from "../pages/Layout";
import Main from "../pages/main/Main";
import Login from "../pages/login/Login";
import FindId from "../pages/login/FindId";
import FindPw from "../pages/login/FindPw";
import SignUp from "../pages/login/SignUp";
import ProductLayout from "../components/product/Layout"
import List from "../pages/product/List";
import Detail from "../pages/product/Detail";
import BoardLayout from "../components/board/BoardLayout";


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
                path: "main",
                children: [
                  {
                    index: true,
                    element: <Main/>
                  }
                ]
            },
            {
                path: "login",
                children: [
                  {
                    index: true,
                    element: <Login/>
                  },
                  {
                    path:"findId",
                    element: <FindId/>
                  },
                  {
                    path:"findPw",
                    element: <FindPw/>
                  },
                  {
                    path:"signUp",
                    element: <SignUp/>
                  }
                ]
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

            {
              path: "board",
              children: [
                {
                  index: true,
                  element:<BoardLayout 
                  type='list'
                  pageTitle='게시판'
                  />
                },
                {
                  path: "detail",
                  element:<BoardLayout
                  type='detail'
                  pageTitle='게시판 상세'
                  />
                },
                {
                  path: "update",
                  element:<BoardLayout
                  type='update'
                  pageTitle='게시판 수정'
                  />
                },
                {
                  path: "write",
                  element:<BoardLayout
                  type='write'
                  pageTitle='게시판 등록'
                  />
                }
                
              ]
            }
        ]
  }
])