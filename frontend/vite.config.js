import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3003,
        watch: {
            usePolling: true,
        },
        proxy: {
            '/api': {
                target: 'http://localhost:5003',
                changeOrigin: true,
            },
        },
    },
});
