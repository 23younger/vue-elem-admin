import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { wrapperEnv, createProxy } from './build/utils'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = wrapperEnv(env);
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    base: VITE_PUBLIC_PATH || '/',
    css: {
      preprocessorOptions: {
        // define global less variable
        less: {
          additionalData: `@import '@/styles/variables.less';`
        }
      }
    },
    server: {
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    }
  }
})
