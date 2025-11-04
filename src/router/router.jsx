import { createBrowserRouter, Navigate } from "react-router";
import Layout from "../pages/Layout";
import Main from "../pages/main/Main";
import Login from "../pages/login/Login";
import FindId from "../pages/login/FindId";
import FindPw from "../pages/login/FindPw";
import SignUp from "../pages/login/SignUp";
import ProductLayout from "../components/product/Layout";
import List from "../pages/product/List";
import Detail from "../pages/product/Detail";
import Store from "../pages/store/Store";
import BoardList from "../pages/board/BoardList";
import BoardDetail from "../pages/board/BoardDetail";
import BoardForm from "../pages/board/BoardForm";
import MypageLayout from "../components/mypage/Layout";
import WishList from "../pages/mypage/WishList";
import Point from "../pages/mypage/Point";
import LoginLayout from "../components/login/LoginLayout";
import Coupon from "../pages/mypage/Coupon";
import DailyCheck from "../pages/mypage/DailyCheck";
import EditProfile from "../pages/mypage/EditProfile";
import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";
import NotAuthorized from "../components/NotAuthorized";
import AdminProductList from "../pages/admin/product/AdminProductList";
import SubLayout from "../pages/SubLayout";
import AdminProductUpdate from "../pages/admin/product/AdminProductUpdate";
import UserList from "../pages/admin/user/UserList";
import AdminCategoryList from "../pages/admin/category/List";
import AdminCouponList from "../pages/admin/coupon/List";
import AdminBanner from "../pages/admin/banner/Banner";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="main" replace />,
      },
      {
        path: "main",
        element: <Main />,
      },
      {
        element: <LoginLayout/>,
        path: "login",
        children: [
          {
            index: true,
            element: <Login/>,
          },
          {
            path: "findId",
            element: <FindId />,
          },
          {
            path: "findPw",
            element: <FindPw />,
          },
          {
            path: "signUp",
            element: <SignUp />,
          },
        ],
      },
      {
        element: <ProductLayout />,
        path: "product",
        children: [
          {
            index: true,
            element: <List />,
          },
          {
            path: "detail",
            element: <Detail />,
          },
        ],
      },

      {
        element:<SubLayout/>,
        path: "board",
        children: [
          {
            index: true,
            element: <BoardList/>,
          },
          {
            path: "detail",
            element: <BoardDetail />,
          },
          {
            path: "update",
            element: <BoardForm type="update" />,
          },
          {
            path: "write",
            element: <BoardForm type="write" />,
          },
        ],
      },
      {
        element: <Store />,
        path: "store",
      },
      {
        path: "mypage",
        element: <MypageLayout />,
        children: [
          {
            path: "wish",
            element: <WishList />,
          },
          {
            path: "point",
            element: <Point />,
          },
          {
            path: "coupon",
            element: <Coupon />,
          },
          {
            path: "check",
            element: <DailyCheck />,
          },
          {
            path: "profile",
            element: <EditProfile />,
          },
        ],
      },
      //관리자페이지
      { 
        path: "admin",
        element: (
          <AdminProtectedRoute>
            <SubLayout />
          </AdminProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="product" replace />
          },
          {
            path: "product",
            element: <AdminProductList/>,
          },
          {
            path: "product/update",
            element: <AdminProductUpdate/>,
          },
          {
            path: "user",
            element: <UserList/>,
          },
          {
            path: "board",
            element: <BoardList />,
          },
          {
            path: "category",
            element: <AdminCategoryList />
          },
          {
            path: "coupon",
            element: <AdminCouponList />
          },         
          {
            path: "banner",
            element: <AdminBanner />
          },  
        ],
      },
      {
        path: "admin/board",
        element: (
          <AdminProtectedRoute>
            <BoardList/>
          </AdminProtectedRoute>
        ),
        handle: { title: "게시판 관리" },
      },
      // ✅ 접근 차단 페이지 등록
      {
        path: "not-authorized",
        element: <NotAuthorized />,
      },
      
    ],
  },
]);
