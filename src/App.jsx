import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import { router } from './router/router';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


//react -query 설정
const queryClient = new QueryClient({
    defaultOptions: {
      queries :{
        retry : 1,
        staleTime : 1 * 60 * 1000,
        gcTime:  1 * 60 * 1000,
        refetchOnWindowFocus: true // 포커스를 다시 받았을 때 재실행 여부 
      }
    }
});




function App() {
  return (
    <>
     <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-center"
          style={{top: '150px',height:'150px'}}
          toastStyle={{
            color: "black",
            fontSize: "16px",
            fontWeight: "500",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
          }}
          progressStyle={{
            backgroundColor: "yellow" // <- 여기서 color가 아니라 backgroundColor
          }}
          autoClose={3000}       // 3초 후 자동 닫힘
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          // theme="light"
          icon={false}
        />
       <RouterProvider router={router}/>
     </QueryClientProvider>
    </>
  )
}

export default App
