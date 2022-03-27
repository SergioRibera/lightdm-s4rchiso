import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    // base: '/usr/share/web-greeter/themes/s4rchiso',
    base: './',
    // "nody-greeter-types": "^1.0.6",
    plugins: [react()]
})
