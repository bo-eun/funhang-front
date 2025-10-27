import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server :{
     historyApiFallback: true, // ✅ 중요: SPA 라우팅 문제 방지
    open : true,
    port : 4000,
    //서버와의 통신을 위한 proxy 설정 > 
    proxy :{
      '/api' : {
        target : 'http://localhost:9090/api',
        changeOrigin : true,
        rewrite : (path) => path.replace(/^\/api/, '')
      }
    }
  }

})
