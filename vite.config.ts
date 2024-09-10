import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/weather': {
                target: 'https://meteostat.p.rapidapi.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/weather/, '/point/hourly'),
                secure: false,
                ws: true,
            }
        }
    },
})
