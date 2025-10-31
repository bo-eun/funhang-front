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
import AdminBoardList from "../pages/admin/board/AdminBoardList";
import MypageLayout from "../components/mypage/Layout";
import WishList from "../pages/mypage/WishList";
import Point from "../pages/mypage/Point";
import LoginLayout from "../components/login/LoginLayout";
import AdminLayout from "../components/admin/AdminLayout";
import Coupon from "../pages/mypage/Coupon";
import DailyCheck from "../pages/mypage/DailyCheck";
import EditProfile from "../pages/mypage/EditProfile";

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
        children: [
          {
            index: true,
            element: <Main />,
          },
        ],
      },
      {
        element: <LoginLayout/>,
        path: "login",
        children: [
          {
            index: true,
            element: <Login/>,
            handle: { title: "로그인" } 
          },
          {
            path: "findId",
            element: <FindId />,
            handle: { title: "아이디 찾기" } 
          },
          {
            path: "findPw",
            element: <FindPw />,
            handle: { title: "비밀번호 찾기" } 
          },
          {
            path: "signUp",
            element: <SignUp />,
            handle: { title: "회원가입" } 
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
        path: "board",
        children: [
          {
            index: true,
            element: <BoardList />,
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
      { element:<AdminLayout/>,
        path: "admin",
        children: [
          {
            index: true,
            element: <AdminBoardList />,
            handle: { title: "게시판 관리" } 
          },
        ],
      },
      
    ],
  },
]);
